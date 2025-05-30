import axios from 'axios'
import * as cheerio from 'cheerio'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const query = req.nextUrl.searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  const results = []

  try {
    const url1 = `https://mangareader.to/search?keyword=${encodeURIComponent(query)}`
    const res1 = await axios.get(url1)
    const $1 = cheerio.load(res1.data)

    $1('.manga-detail').each(function () {
      const title = $1(this).find('h3 a').text().trim()
      const link = $1(this).find('h3 a').attr('href')
      const image = $1(this).parent().find('img').attr('src')
      results.push({ title, link, image, source: 'MangaReader' })
    })
  } catch (error) {
    console.error('Error scraping MangaReader:', error.message)
  }


  try {
    const url3 = `https://mangaplus.shueisha.co.jp/search_result?keyword=${encodeURIComponent(query)}`
    const res3 = await axios.get(url3)
    const $2 = cheerio.load(res3.data)

    $2('.AllTitle-module_lang_2Gl1c').each(function () {
      const title = $2(this).find('p').text().trim()
      const image = $2(this).parent().find(' img').attr('src')
      const link = $2(this).find('a').attr('href')
      results.push({ title, image, source: 'mangaplus' })
    })
  } catch (error) {
    console.error('Error scraping MangaPlaza:', error.message)
  }

  // Return combined results
  return NextResponse.json(results)
}

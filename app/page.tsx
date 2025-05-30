'use client'
import React, { useState } from 'react'

const page = () => {
  const [value, setValue] = useState('')
  const [results, setResults] = useState([])
  const [newUrl, setNewUrl] = useState('')

  
  async function searchButton(e) {
    e.preventDefault()
    if (value.trim() === '') {
      alert('Enter something')
      return
    }
    const res = await fetch(`/api/scrape?query=${encodeURIComponent(value)}`)
    const data = await res.json()
    console.log(data)
    setResults(data)
  }

  return (
    <div className='flex justify-center items-start bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen w-full p-10'>
      <div className='w-full max-w-6xl'>
        <h1 className='text-6xl md:text-7xl font-extrabold text-white text-center mb-10 tracking-wide drop-shadow-xl'>
          Manga Reader
        </h1>

        <div className='flex justify-center mb-10 gap-4'>
          <input
            onChange={function (e) { setValue(e.target.value) }}
            value={value}
            className='bg-white/90 rounded-lg p-3 px-6 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 shadow-md'
            type="text"
            placeholder='Enter manga name...'
          />
          <button
            onClick={searchButton}
            className='bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md'
          >
            Search
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {results.map(function (result, index) {
            return (
              <div
                key={index}
                onClick={function () {
                  const NewUrl = `https://mangareader.to${result.link}`
                  setNewUrl(NewUrl)
                  window.open(NewUrl, '_blank')
                  setValue('')
                  setResults([])
                  console.log(NewUrl)
                  
                }}
                className='cursor-pointer backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-2xl p-4 shadow-lg hover:scale-105 transition transform duration-300 flex flex-col items-center'
              >
                <img
                  src={result.image}
                  alt={result.title}
                  className='h-[150px] w-[150px] object-cover rounded-xl mb-4 shadow-md'
                />
                <h2 className='text-xl font-semibold text-center'>{result.title}</h2>
                <h2 className='text-xl font-semibold text-center'>{result.author}</h2>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default page

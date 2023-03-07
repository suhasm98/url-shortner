import { useState } from 'react'
import './App.css'

const baseUrl = 'http://localhost:5050'

function App() {
  const [url, setUrl] = useState('')
  const [shortendUrl, setShortenUrl] = useState('')
  const handleOnShorten = () => {
    if (url) {
      fetch(`${baseUrl}/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      })
        .then(res => res.json())
        .then(value => {
          setShortenUrl(value.shortenedUrl)
        })
    }
  }
  return (
    <div className='mainContainer'>
      <h1 className='appHeader'>URL- Shotner</h1>
      <div className='inputContainer'>
        <input onChange={e => setUrl(e.target.value)} className='urlInput' />
        <button className='shortenButton' onClick={handleOnShorten}>
          Shorten
        </button>
      </div>
      {shortendUrl && (
        <a
          className='shortUrlLink'
          href={`${baseUrl}/${shortendUrl}`}
          rel='noreferrer'
          target='_blank'
        >{`${baseUrl}/${shortendUrl}`}</a>
      )}
    </div>
  )
}

export default App

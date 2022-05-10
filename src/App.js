import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [pepes, setPepes] = useState([])
  const [myPepes, setMyPepes] = useState([])
  const [search, setSearch] = useState('')
  const [image, setImage] = useState()

  useEffect(() => {
    fetch('/sammakot')
      .then(response => response.json())
      .then(data => {
        setPepes(data)
        setMyPepes(data)
      })
  }, [])

  const onSubmit = event => {
    event.preventDefault()
    const _search = search.toLowerCase()
    const _myPepes = pepes.filter(pepe => pepe.tags.search(_search) > -1)
    setMyPepes(_myPepes)
  }

  const onShow = image => {
    setImage(image)
  }

  const onHide = () => {
    setImage(null)
  }

  return (
    <div className='App'>
      <div className='search'>
        <form onSubmit={onSubmit}>
          <input type='text' value={search} onChange={e => setSearch(e.target.value)} />
        </form>
      </div>
      {
        myPepes.map((pepe, index) => (
          <div key={`pepe_${index}`} className='sammakko'>
            <div className='image' style={{ backgroundImage: `url(https://nobully.zone/${pepe.filename})` }} onClick={() => onShow(`https://nobully.zone/${pepe.filename}`)} />
            <textarea readOnly value={pepe.tags} />
          </div>
        ))
      }
      {
        image
          ? (
            <React.Fragment>
              <div className='sammakkozoom' style={{ backgroundImage: `url(${image})` }} />
              <div className='overlay' onClick={onHide} />
            </React.Fragment>
            )
          : <div />
      }
    </div>
  )
}

export default App

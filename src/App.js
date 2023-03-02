import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [showPopUp, setShowPopUp] = useState(true)
  const [currency, setCurrency] = useState('en')
  const [productMeta, setProductMeta] = useState()
  const [searchInput, setSearchInput] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [results, setResults] = useState()
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    if(itemsPerPage || offset) {
      handleSubmit()
    }
  }, [currency, itemsPerPage, offset])

  async function handleSubmit(e) {
    if(e)
      e.preventDefault()
    
    if(searchInput.length > 0) {
      try {
        const data = await axios.get(`https://global.atdtravel.com/api/products?geo=${currency}`, {
          params: {
            title: searchInput,
            limit: itemsPerPage,
            offset: offset,
          }
        })
            setResults(data.data.data)
            setProductMeta(data.data.meta)
    } catch (error) {
      console.error(error)
    }
    } else {
      setResults(null)
      setProductMeta(null)
    }
  }
  function changeCurrency(e) {
    setCurrency(e.target.value)
  }

  function submitCurrency(e) {
    e.preventDefault()
    setShowPopUp(false)
  }

  function changeItemsPerPage(e) {
    setItemsPerPage(e.target.value)
    setOffset(0)
  }

  function search(e) {
    setSearchInput(e.target.value)
  }

  return (
    <div className='main'>
      <h1>Product Search</h1>
      {showPopUp &&
      (<><h4>Select currency</h4><form onSubmit={submitCurrency}>
          <label>English based currency</label>
          <input className='radio--checkbox'  type='radio' value='en' checked={currency === 'en'} onChange={changeCurrency} />
          <label>Irish based currency</label>
          <input className='radio--checkbox' type='radio' value='en-ie' checked={currency === 'en-ie'} onChange={changeCurrency} />
          <label>German based currency</label>
          <input className='radio--checkbox'  type='radio' value='de-de' checked={currency === 'de-de'} onChange={changeCurrency} />
          <button type='submit'>Confirm</button>
        </form></>) 
      }
        {!showPopUp &&
        (<div className='search--div'>
          <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={searchInput} onChange={search}/>
        <button className='search--btn' type='submit'>Search</button>
          </form>
        </div>) 
        }
      {results && 
        (<><p>Change Items Per Page</p><select onChange={changeItemsPerPage}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
          <option value={productMeta.total_count}>All</option>
        </select>
        <div className='result--table'>
          <div className='result--definitions'>
          <p className='image--p'>Image</p>
          <p className='title--p'>Title</p>
          <p className='destination--p'>Destination</p>
          </div>
            {results.map(product => {
              return <div className='individual--row' key={product.id}>
                <img src={product.img_sml} alt='i' />
                <div className='result--div'>
                <p className='result--title'>{product.title}</p>
                <p className='result--destination'>{product.dest}</p>
                </div>
              </div>
            })}
          </div>
          {offset <= productMeta.total_count && <button className='load--btn' onClick={() => setOffset(offset + 10)}>Load</button>}
          </>)}
    </div>
  )
}

export default App

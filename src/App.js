import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import ResultSection from './components/ResultSection'
import CurrencySelector from './components/CurrencySelector'


function App() {
  
  const [showPopUp, setShowPopUp] = useState(true)
  const [currency, setCurrency] = useState('en')
  const [productMeta, setProductMeta] = useState()
  const [searchInput, setSearchInput] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [results, setResults] = useState()
  const [offset, setOffset] = useState(0)
  const [error, setError] = useState('')

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
            setError('')
    } catch (error) {
      console.error(error)
      setError('No results were found')
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
    resetOffset()
  }

  function search(e) {
    setSearchInput(e.target.value)
  }

  function resetOffset() {
    setOffset(0)
  }

  if (productMeta) {
    console.log(productMeta)
    console.log('total minus offset', productMeta.total_count)
    console.log('offset', offset)

  }

  return (
    <div className='main'>
      <h1>Product Search</h1>
      
      {showPopUp &&
      <CurrencySelector 
        submitCurrency={submitCurrency}
        changeCurrency={changeCurrency}
        currency={currency}
      /> 
      }
      {!showPopUp &&
        (<SearchBar 
          handleSubmit={handleSubmit}
          searchInput={searchInput}
          search={search}
          resetOffset={resetOffset}
        />)}
      {error ? <p>{error}</p> :
      (results &&
      (<> 
        <ResultSection 
          setItemsPerPage={setItemsPerPage}
          setOffset={setOffset}
          total_count={productMeta.total_count}
          results={results}
          changeItemsPerPage={changeItemsPerPage}
          itemsPerPage={itemsPerPage}
        />
          <button className='load--btn' onClick={() => setOffset(prevOffset => prevOffset + Number(itemsPerPage))} disabled={productMeta.count < productMeta.limit || productMeta.count === productMeta.total_count}>Load</button>
          </>))}
    </div>
  )
}

export default App

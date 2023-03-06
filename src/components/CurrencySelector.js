export default function CurrencySelector(props) {

  const currencyTypes = [
  {label: 'English based currency', type: 'en'}, 
  {label: 'Irish based currency', type: 'en-ie'}, 
  {label: 'German based currency', type: 'de-de'}
]
  return (
    <div className='currency--main'>
      <h4>Select currency</h4>
      <form className='currency--form' onSubmit={props.submitCurrency}>
        {currencyTypes.map((curr, i) => {
          const {label, type} = curr
          return <div className='currency--form--input' key={i}>
          <label>{label}</label>
          <input value={type} className='radio--checkbox' type='radio' checked={type === props.currency} onChange={props.changeCurrency}/>
          </div>
        })}
        <button className='currency--submit--btn' type='submit'>Confirm</button>
      </form>
    </div>
  )
}
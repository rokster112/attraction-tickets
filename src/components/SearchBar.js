export default function SearchBar(props) {

  return (
    <div className='search--div'>
      <form onSubmit={props.handleSubmit}>
        <label>Title</label>
        <input value={props.searchInput} onChange={props.search}/>
        <button onClick={props.resetOffset} className='search--btn' type='submit'>Search</button>
      </form>
    </div>
  )
}
export default function ResultSection(props) {

  return (
    <>
    <p>Change Items Per Page</p>
    <select onChange={props.changeItemsPerPage} value={props.itemsPerPage}>
    <option value='10'>10</option>
    <option value='20'>20</option>
    <option value='50'>50</option>
    <option value={props.total_count}>All</option>
  </select>
  <div className='result--table'>
    <div className='result--definitions'>
    <p className='image--p'>Image</p>
    <p className='title--p'>Title</p>
    <p className='destination--p'>Destination</p>
    </div>
      {props.results.map(product => {
        const {id, img_sml, title, dest} = product
        return <div className='individual--row' key={id}>
          <img src={img_sml} alt='i' />
          <div className='result--div'>
          <p className='result--title'>{title}</p>
          <p className='result--destination'>{dest}</p>
          </div>
        </div>
      })}
    </div>
    </>
  )
}
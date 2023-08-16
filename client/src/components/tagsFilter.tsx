const TagsFilter = () => {
  return (
    <div className="w-100">
        <h3>Tags:</h3>
        <div className='chat d-flex flex-column justify-content-between border border-success w-100'>
            <div />
            <div className='border border-5 border-primary m-3 p-2'>
                <input type="text" placeholder='Message...' className='border border-success w-75'  />
                <button className='border border-success ms-3'>Send Tag</button>
            </div>
        </div>
    </div>
  )
}

export default TagsFilter

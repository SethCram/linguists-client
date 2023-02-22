
export default function UserInput() {
  return (
    <form
        className='container app__container'
        onSubmit={handleSubmit}
    >
        <div className='app__container__databases'>
          <label htmlFor="app__container__databases__file__input">
            <i className="app__container__databases__upload__icon fa-solid fa-plus"></i>
          </label>
          <input
              type="file"
              id="app__container__databases__file__input"
              style={{ display: "none" }} 
              onChange={file=>{handleFileUpload(file.target.files[0])}}
          />
          <Dropdown
            className='app__container__databases__dropdown'
            options={dbNames}
            onChange={(fileObj) => { setSelectedDbName(fileObj.value) }}
            value={selectedDbName}
            placeholder="Select a database to query..."
          />
        </div>
        <input
          className='app__container__question'
          type="text"
          placeholder='Enter a request..'
          onChange={(event) => { setQuestion(event.target.value); }}
        />
        <button
          className="btn btn-primary app__container__submit"
          type="submit"
          disabled={isFetching || isUploading || !question || !selectedDbName} //disable btn if fetching, uploading, or one of inputs not set
        >
          Search
        </button>
    </form>
  )
}

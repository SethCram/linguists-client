import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function App() {

  const [dbNames, setDbNames] = useState(null);
  const [dbFile, setDbFile] = useState(null);
  let isFetching = false;

  useEffect(() => { //cant detch data in here since using sync funct
    
    const fetchDbs = async () => {
      try {
        //possible problem with WSL reqs CORS auth
        const response = await axios.get("http://localhost:8000/getDatabases/");  

        setDbNames(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDbs();

  }, [])

  const getDbFile = async (fileName) => {
    const response = await axios.get("/getDatabases/" + fileName);

    return response.data;
  }

  const handleSubmit = async () => {
    isFetching = true;

    isFetching = false;
  }

  return (
    <section id="app">
      <h5>Capstone-Linguists</h5>
      <h2>Frontend UI</h2>
      
      <form
        className='container app__container'
        onSubmit={handleSubmit}
      >
        <Dropdown
          className='app__container__dropdown'
          options={dbNames}
          onChange={(fileName) => { setDbFile(getDbFile(fileName)) }}
          value={0}
          placeholder="Select a database to query..."
        />
        <input
          className='app__container__question'
          type="text"
          placeholder='Enter a request..'
        />
        <button
          className="btn btn-primary app__container__submit"
          type="submit"
          disabled={isFetching}
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default App;

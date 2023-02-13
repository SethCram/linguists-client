import './App.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function App() {

  const [dbNames, setDbNames] = useState(null);
  const [selectedDbName, setSelectedDbName] = useState(null);
  const [dbFile, setDbFile] = useState(null);
  let isFetching = false;
  const userRequestRef = useRef(null);
  const [sql, setSql] = useState("");
  const [results, setResults] = useState([]);

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

  }, []);

  useEffect(() => {

    const getDbFile = async () => {
      try {
        const response = await axios.get("/getDatabases/" + selectedDbName, {
          file_name: selectedDbName
        });
        setDbFile(response.data);
      } catch (error) {
        console.log(error);
      }
      
    };
    getDbFile();

  }, [selectedDbName]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    isFetching = true;

    try {
      const response = await axios.get(`/ask/${selectedDbName}/${userRequestRef}`, {
        db_id: selectedDbName,
        question: userRequestRef
      });
      setSql(response.data.query);
      setResults(response.data.execution_results);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      isFetching = false;
    }
  };

  const handleFileUpload = async (file) => {

    try {
      const response = await axios.post("/upload/", file);
      console.log(response.data);
      //setSelectedDbName(response.data.fileName);
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <section id="app">
      <h5>Capstone-Linguists</h5>
      <h2>Frontend UI</h2>

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
              onChange={file=>{handleFileUpload(file.target.value)}}
          />
          <Dropdown
            className='app__container__databases__dropdown'
            options={dbNames}
            onChange={(fileName) => { setSelectedDbName(fileName) }}
            value={selectedDbName}
            placeholder="Select a database to query..."
          />
        </div>
        <input
          className='app__container__question'
          type="text"
          placeholder='Enter a request..'
          ref={userRequestRef}
        />
        {sql && 
          <>
            <label>SQL Generated</label>
            <p>{sql}</p>
          </>
        }
        {results && console.log(results) && // not sure why label's showing up
          <>
            <label>SQL Results</label>
            <ul>
              {results.map((rslt, i) => (
                <li key={i}>{rslt}</li>
              ))}
            </ul>
          </>
        }
        <button
          className="btn btn-primary app__container__submit"
          type="submit"
          disabled={isFetching || !userRequestRef || !selectedDbName} //disable btn if fetching or one of inputs not set
        >
          Search
        </button>
      </form>
      {selectedDbName &&
        <>
          {/* Give a description of the selected database + show it in a graphical fashion */ }
        </>
      }
    </section>
  );
}

export default App;

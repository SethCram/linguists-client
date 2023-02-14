import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Header from './components/header/Header';

//for some reson, not enough to set proxy in package.json
axios.defaults.baseURL = "http://localhost:8000/";

function App() {

  const [dbNames, setDbNames] = useState(null);
  const [selectedDbName, setSelectedDbName] = useState(null);
  const [dbFile, setDbFile] = useState(null);
  const [sql, setSql] = useState("");
  const [results, setResults] = useState([]); //can't use empty list to init here for conditional txt display
  const [isFetching, setIsFetching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [queriedDb, setQueriedDb] = useState(null);

  useEffect(() => { //cant detch data in here since using sync funct
    
    const fetchDbs = async () => {
      try {
        const response = await axios.get("getDatabases/");

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
        if (selectedDbName)
        {
          const response = await axios.get("getDatabases/" + selectedDbName, {
            file_name: selectedDbName
          });
          setDbFile(response.data);
        }
        
      } catch (error) {
        console.log(error);
      }
      
    };
    getDbFile();

  }, [selectedDbName]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsFetching(true);

    try {
      const response = await axios.get(`/ask/${selectedDbName}/${question}`, {
        db_id: selectedDbName,
        question: question
      });

      setQueriedDb(selectedDbName);
      setAskedQuestion(question);
      setSql(response.data[0].query); //not sure why returns arr of results
      setResults(response.data[0].execution_results);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsFetching(false);
    }
  };

  const handleFileUpload = async (file) => {

    setIsUploading(true);

    try {

      const formData = new FormData();
      const fileName = file.name;

      formData.append("name", fileName);
      formData.append("file", file);

      const response = await axios.post("/upload/", formData);
      
      console.log(response.data);

      setSelectedDbName(fileName.split('.')[0]);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsUploading(false);
    }
    
  };

  return (
    <div id='app' className={(isFetching || isUploading) && 'loading'}>
      <Header/>
      <section id="userinput">
        <h5>Interact with the System</h5>
        <h2>User Input</h2>

        <form
          className='container userinput__container'
          onSubmit={handleSubmit}
        >
          <div className='userinput__databases'>
            <label htmlFor="userinput__databases__file__input">
              <i className="userinput__databases__upload__icon fa-solid fa-plus"></i>
            </label>
            <input
                type="file"
                id="userinput__databases__file__input"
                style={{ display: "none" }} 
                onChange={file=>{handleFileUpload(file.target.files[0])}}
            />
            <Dropdown
              className='userinput__databases__dropdown'
              options={dbNames}
              onChange={(fileObj) => { setSelectedDbName(fileObj.value) }}
              value={selectedDbName}
              placeholder="Select a database to query..."
              required //doesnt work in dropdown
            />
          </div>
          <textarea
            name='message'
            rows='7'
            placeholder='Enter a request...'
            onChange={(event) => setQuestion(event.target.value)}
            required />
          <button
            className="btn btn-primary userinput__submit"
            type="submit"
            disabled={isFetching || isUploading || !question || !selectedDbName} //disable btn if fetching, uploading, or one of inputs not set
          >
            Search
          </button>
        </form>
      </section>

      <section id="output">
        <h5>{askedQuestion ? askedQuestion : "User Requested"}</h5>
        <h2>Results</h2>

        <div className='container output__container'>
          {sql && 
            <div className='output__item output__sql'>
              <h3><b>Generated SQL</b></h3>
              <p>{sql}</p>
            </div>
          }
          {Array.isArray(results) && results.length !== 0 && //only display if results available
            <div className='output__item output__rslts'>
              <h3><b>Information from {queriedDb} Database</b></h3>
              <ul className='output__rslts__list'>
                {results.map((rslt, i) => (
                  <li className='output__rslts__list__elly' key={i}>{rslt}</li>
                ))}
              </ul>
            </div>
          }
        </div>
      </section>

      {selectedDbName &&
        <>
          {/* Give a description of the selected database + show it in a graphical fashion */ }
        </>
      }
    </div>
  );
}

export default App;

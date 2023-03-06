import "./UserInput.css"
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function UserInput({ setAskedQuestion, setSql, setQueriedDb, setResults }) {
  const [dbNames, setDbNames] = useState(null);
  const [selectedDbName, setSelectedDbName] = useState(null);
  const [dbFile, setDbFile] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [question, setQuestion] = useState("");
  const [askErrorMsg, setAskErrorMsg] = useState("");
  const [uploadErrorMsg, setUploadErrorMsg] = useState("");

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

    setAskErrorMsg("");

    setIsFetching(true);

    try {
      const response = await axios.get(`/ask/${selectedDbName}/${question}`, {
        db_id: selectedDbName,
        question: question
      });

      console.log(response);

      console.log(selectedDbName);
      setQueriedDb(selectedDbName);
      console.log(question);
      setAskedQuestion(question);
      console.log(response.data[0].query);
      setSql(response.data[0].query); //not sure why returns arr of results
      console.log(response.data[0].execution_results)
      setResults(response.data[0].execution_results);
      //console.table(response.data[0].execution_results);
      
      //redirect user to output section where results appeared
      window.location.href = "#output"
      console.log(response)
    }
    catch (error) {
      setAskErrorMsg("Something went wrong. Please ensure your questions is possible given the selected database.");
      //console.log(error.response.data);
      console.log(error);
    }
    finally {
      setIsFetching(false);
    }
  };

  const handleFileUpload = async (file) => {

    setIsUploading(true);
    setUploadErrorMsg("");

    try {

      const formData = new FormData();
      const fileName = file.name;

      formData.append("name", fileName);
      formData.append("file", file);

      //try to upload db file
      try {
        await axios.post("/upload/", formData);
      //if couldn't upload db file, try to load 
      } catch (error) {
        //console.log(error);
        await axios.post("/upload/sql", formData);
      }

      const dbName = fileName.split('.')[0]

      //update selected and possible db names
      setDbNames([...dbNames, dbName]);
      setSelectedDbName(dbName);
    }
    catch (error) {
      setUploadErrorMsg("Something went wrong with the file upload. Ensure an SQLite3 compatible SQL or database file is being uploaded and it's uniquely named.")
      //console.log(error.response.data.detail);
      //setUploadErrorMsg(error.response.data.detail);
    }
    finally {
      setIsUploading(false);
    }
    
  };

  const rmFromArr = (target, arr) => {
    return arr.filter((element) => element !== target )
  }

  const handleFileDelete = async () => {
    //should set isDeleting?

    //delete select db name
    const fileName = selectedDbName;

    try {
      await axios.delete("/deleteSqlDb", {
        params: {
          file_name: fileName
        }
      });

      //rmeove deleted db name and unselect it
      setDbNames(rmFromArr(fileName, dbNames));
      setSelectedDbName(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="userinput">
        <h5>Interact with the System</h5>
        <h2>User Input</h2>

        <form
          className='container userinput__container'
          onSubmit={handleSubmit}
        >
          {uploadErrorMsg &&
            <p className='userinput__error'>{uploadErrorMsg}</p>
          }
          <span className='userinput__databases'>
            <label htmlFor="userinput__databases__file__input">
              <i className="bordered__icon userinput__databases__upload__icon fa-solid fa-plus"></i>
            </label>
            <input
                type="file"
                id="userinput__databases__file__input"
                style={{ display: "none" }} 
                onChange={file=>{handleFileUpload(file.target.files[0])}}
            />
            <Dropdown
              className='userinput__databases__dropdown'
              controlClassName="userinput__dropdown__control"
              placeholderClassName='userinput__dropdown__ph'
              menuClassName='userinput__dropdown__menu'
              options={dbNames}
              onChange={(fileObj) => { setSelectedDbName(fileObj.value) }}
              value={selectedDbName}
              placeholder="Select a database to query..."
               //doesnt work in dropdown
            />
            {selectedDbName && 
              <>
                <label htmlFor="userinput__databases__file__delete">
                  <i className="bordered__icon userinput__databases__delete__icon fa-regular fa-trash-can"></i>
                </label>
                <input
                  type="button"
                  id="userinput__databases__file__delete"
                  style={{ display: "none" }} 
                  onClick={handleFileDelete}
                />
              </>
            }
          </span>
          <textarea
            name='message'
            rows='7'
            placeholder='Enter a request...'
            onChange={(event) => setQuestion(event.target.value)}
            required />
          <button
          className={`btn btn-primary userinput__submit ${(isFetching || isUploading) ? "loading" : ""}`}
            type="submit"
            disabled={isFetching || isUploading || !question || !selectedDbName} //disable btn if fetching, uploading, or one of inputs not set
          >
            Search
          </button>
          {askErrorMsg &&
            <p className='userinput__error'>{askErrorMsg}</p>
          }
        </form>
      </section>
  )
}

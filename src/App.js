import './App.css';
import axios from 'axios';
import { useState } from 'react';
import 'react-dropdown/style.css';
import Header from './components/header/Header';
import UserInput from './components/userinput/UserInput';
import Output from './components/output/Output';

function App() {
  const [results, setResults] = useState([]); 
  const [askedQuestion, setAskedQuestion] = useState("");
  const [queriedDb, setQueriedDb] = useState(null);
  const [sql, setSql] = useState("");

  return (
    <div id='app'>
      <Header />
      
      <UserInput
        setAskedQuestion={setAskedQuestion}
        setSql={setSql}
        setQueriedDb={setQueriedDb}
        setResults={setResults} 
      />

      <Output
        askedQuestion={askedQuestion}
        sql={sql}
        queriedDb={queriedDb}
        results={results} 
      />
    </div>
  );
}

export default App;

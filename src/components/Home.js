import React from 'react';
import Axios from "axios"
import { useEffect, useState } from "react";
import '../App.css';
const Home = ()=>{

const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    setError('');
    setResponse(null);


    try {
        const parsedData = JSON.parse(jsonInput);
  
        if (!Array.isArray(parsedData.data)) {
          throw new Error("JSON 'data' field should be an array.");
        }
  
        // Call the API using axios
        const res = await Axios.post('https://bajaj-backend-e6w8.onrender.com/bfhl', parsedData);
  
        setResponse(res.data);
      } catch (e) {
        setError(e.message);
      }  
  };

  const handleSelectChange = (event) => {
    const options = Array.from(event.target.selectedOptions).map(option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="result">
        {selectedOptions.includes('alphabets') && (
          <p>Alphabets: {response.alphabets.join(', ')}</p>
        )}
        {selectedOptions.includes('numbers') && (
          <>
            <p> Numbers: {response.numbers.join(', ')}</p>
            {/* <p>Odd Numbers: {response.odd_numbers.join(', ')}</p> */}
          </>
        )}
        {selectedOptions.includes('highest_lowercase_alphabet') && (
          <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet || 'None'}</p>
        )}
      </div>
    );
  };

  return (
      <div className="App">
        
      <h1>JSON Validator and API Caller</h1>
      <div className="input-container">
        <textarea
          rows="5"
          cols="40"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data": ["2", "4", "5", "a", "B"]}'
        ></textarea>
        <br />
        <button onClick={handleSubmit}>Submit</button>
        {error && <div className="error">{error}</div>}
      </div>

      {response && (
        <div className="dropdown-container">
          <label htmlFor="multiSelect">Select Response Data:</label>
          <select id="multiSelect" multiple onChange={handleSelectChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );


}

export default Home;
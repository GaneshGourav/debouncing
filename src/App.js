import React, { useState, useEffect } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [timerId, setTimerId] = useState(null);

  // Simulating an API call with a Promise and delay
  const fetchResults = (input) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const hardcodedResults = ['apple', 'apricot', 'banana', 'grape', 'orange'];
        const filteredResults = hardcodedResults.filter((item) =>
          item.toLowerCase().includes(input.toLowerCase())
        );
        resolve(filteredResults);
      }, 1000); // Simulated API delay of 1 second
    });
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    // Debouncing: Clear the previous timer if there's one
    if (timerId) {
      clearTimeout(timerId);
    }

    // Set a new timeout for the debounced API call
    const newTimerId = setTimeout(() => {
      if (input) {
        fetchResults(input).then((data) => {
          setResults(data);
        });
      } else {
        setResults([]); // Clear results if the input is empty
      }
    }, 500); // 500ms debounce delay

    setTimerId(newTimerId);
  };

  return (
    <div>
      <h1>Debounced Search Application</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <ul>
        {results.length > 0 ? (
          results.map((result, index) => <li key={index}>{result}</li>)
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
};

export default App;

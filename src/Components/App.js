import React, {useState, useEffect} from 'react'
import '../App.css';
import Axios from 'axios';

import SearchForm from './SearchForm';
import GifList from './GifList';

function App() {

  const [data, setData] = useState([]); // declare state for data fetch value
  const [query, setQuery] = useState('cats'); // declare new state for search value
  const [isLoading, setIsLoading] = useState(true); // declare a new state for loading state value

  const performSearch = (search) => setQuery(search);

  // Data fetch calls in promise change
  useEffect( () => { 
    Axios(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=tD4vO9cKUlwLSwaSawgGjSeO4yBmmYoK`)
      .then(response => setData(response.data.data))
      .catch(error => console.log('Error fetching and parsing data', error))
      .finally(() => setIsLoading(false))
  }, [query]);

  return (
    <>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">GifSearch</h1>
          <SearchForm onSearch={performSearch}/>
        </div>
      </div>
      <div className="main-content">
        {isLoading ? <p>Loading...</p> : <GifList data={data} /> }
      </div>
    </>
  );
}

export default App


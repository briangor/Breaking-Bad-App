import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/ui/Header';
import Search from './components/ui/Search';
import CharacterGrid from './components/characters/CharacterGrid';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [serverErr, setServerErr] = useState(false);
  const [quotes, setQuotes] = useState([]);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`);

        setItems(result.data);
        setIsLoading(false);
      } catch (error) {
        console.log(`${error.name}: There is a ${error.message}`);
        setServerErr(true);
      }
    }
    fetchItems();
  }, [query]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const result = await axios.get('https://api.breakingbadquotes.xyz/v1/quotes');
        setQuotes(result.data[0]);
        console.log(quotes);
      } catch (error) {
        console.log(error);
      }
    }
    fetchQuotes();
  },[query]);

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={items} />
      {serverErr && <p className='msg'>The server might be down :(</p>}
      {quotes && 
      <div className='quotes'>
        <p>{quotes.quote}</p>
        <p>~ {quotes.author}</p>
      </div>}
    </div>
  );
}

export default App;

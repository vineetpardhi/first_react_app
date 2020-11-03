import axios from 'axios'
import './App.css';
import React ,{useState,useEffect,Component} from 'react';
import Category_list from './components/Category_list';
import { Credentials } from './Credentials';


const App = () => {
    const spotify=Credentials();
    const [token,setToken]=useState('');
    const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});

    useEffect(() => {

      axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })
      .then(tokenResponse => {      
        setToken(tokenResponse.data.access_token);
        
        axios('https://api.spotify.com/v1/browse/categories?locale=sv_IN&country=IN&limit=20&offset=5', {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
        })
        .then (genreResponse => { 
          setGenres({
            selectedGenre: genres.selectedGenre,
            listOfGenresFromAPI: genreResponse.data.categories.items
          })
        });
        
      });
  
    }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 


    return (
      <div className="App">
        <Category_list items={genres.listOfGenresFromAPI}/>
      </div>
    );
  



    }
export default App;

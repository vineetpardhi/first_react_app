import axios from 'axios'
import './App.css';
import React ,{useState,useEffect} from 'react';
import CategoryList from './components/Category_list';
import { Credentials } from './Credentials';
import { PlayList } from './components/Playlists';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



function SpotifyRequestComponent(){
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
      
      axios('https://api.spotify.com/v1/browse/categories?&country=IN&locale=sv_IN&limit=20&offset=0', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
      })
      .then (genreResponse => { 
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      });
      
    });

  }, [token,genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 



  return genres.listOfGenresFromAPI;


}


const App = () => {
    const genres= SpotifyRequestComponent();
    if (!genres) {
      return <h1>Loading...</h1>;
    }
    return (
      
      < div className="App">    
        
          <Router>
          <Switch>
            <Route path="/" exact component={() => (<CategoryList items={genres} />)}/>
            <Route path="/playlists/:id" component={PlayList}/>
          </Switch>
        </Router>
      </div>
    );

}




export default App;

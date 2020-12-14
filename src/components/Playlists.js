import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Credentials } from '../Credentials';
import {Container,Row,Col,Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export function PlayList ({match}) {

  
  const spotify=Credentials();
   
  const [playlists,setPlayLists]=useState({selectedPlaylist:'',listofPlayListFromAPI:[]});
  const [isloaded,setLoading]=useState(true);

  const val=match.params.id;

  

    useEffect(()=>{

      fetchPlayList();
     

      return ()=>{
        setPlayLists({
          selectedPlaylist:'',
          listofPlayListFromAPI:[]
        });
      }
      
    },[]);

  

  


  

    const fetchPlayList = ()=>{
      //  since OAuth is required in Spotify API

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',  // this is a grant type of OAuth 
      method: 'POST'
    }).then(tokenResponse => {  
       
      axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?country=IN&limit=5`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (playlistsresponse => { 

      setPlayLists({
        selectedPlaylist:playlists.selectedPlaylist,
        listofPlayListFromAPI:playlistsresponse.data.playlists.items
      });

      setLoading(false);

      console.log(playlistsresponse);
      });
      
    }).catch(error=>{
      console.log(error.message);
    });
   
    
  
    
}
    if(!playlists)
    {
      return (<h1>Playlists Not Found</h1>);
    }
    if(isloaded)
    {
      return (<h1>Loading....</h1>);
    }
    return(
        <>
       <h1>List of PlayLists for {val}</h1>
       <Container>
                <Row>{playlists.listofPlayListFromAPI.map((item,index)=>(
                  <Col xs={3} md={3}  key={index}>
                  <Card className="mb-3" style={{color:"#000"}} key={item.id}>
                  <Card.Img src={item.images[0].url}  alt={item.name}/>
                  <Card.Body>
                    <Card.Title>
                      {item.name}
                    </Card.Title>
                    <Card.Text>
                     {item.description}
                    </Card.Text>
                    <Button variant="primary" key={item.id}>
                      Read More
                    </Button>
                  </Card.Body>
                  </Card>
                </Col> 
                  ))}
                </Row>
        </Container>
      </>
    );

}



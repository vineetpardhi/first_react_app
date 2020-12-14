import React from 'react';
import {Container,Row,Col,Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';




const CategoryList = (props)=>{


  

        return (  
            <div className="CategoryList" > 
              <h2>List of Spotify Categories in India</h2>
              <div>
              <Container>
                <Row>{props.items.map((item,index)=>(
                  <Col xs={3} md={3}  key={item.id}>
                  <Card className="mb-3" style={{color:"#000"}} key={item.id}>
                  <Card.Img src={item.icons[0].url}  alt={item.name}/>
                  <Card.Body>
                    <Card.Title>
                      {item.name}
                    </Card.Title>
                    <Card.Text>
                      This is an category of Spotify
                    </Card.Text>
                    <Button variant="primary" key={item.id}>
                      <Link style={{color:'white' }} to={`/playlists/${item.id}`}>ReadMore</Link>
                    </Button>
                  </Card.Body>
                  </Card>
                </Col> 
                  ))}
                </Row>
              </Container>
              </div>
              
            </div>
            
        );

   }


export default CategoryList

import React,{ Component } from 'react'
import {Container,Row,Col,Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Category_list = props => {
    
        return (
            <div className="Category_list" > 
              <h2>List of Spotify Categories in India</h2>
              <div>
              <Container>
                <Row>{props.items.map((items,index)=>(
                  <Col xs={3} md={3}  key={items.id}>
                  <Card className="mb-3" style={{color:"#000"}} key={items.id}>
                  <Card.Img src={items.icons[0].url}  alt={items.name}/>
                  <Card.Body>
                    <Card.Title>
                      {items.name}
                    </Card.Title>
                    <Card.Text>
                      This is an category of Spotify
                    </Card.Text>
                    <Button variant="primary">ReadMore</Button>
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

export default Category_list

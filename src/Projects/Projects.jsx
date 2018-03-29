import React, { Component } from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import './Projects.css';

class Projects extends Component {
   render() {
      return (
         <div>
            <Row>
               <Col md={2} />
               <Col md={8}>
                  <Jumbotron className='Projects'>
                     <h2>
                        Coming soon
                     </h2>
                     <h4>
                        In the meantime, check out my GitHub
                     </h4>
                  </Jumbotron>
               </Col>
               <Col md={2} />
            </Row>
         </div>
      )
   }
}

export default Projects;
import React, { Component } from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import MarkdownRenderer from 'react-markdown-renderer';
import './About.css';

class About extends Component {
   constructor(props) {
      super(props);

      this.markdown = '```js \nlet my = new ElliotKirk()' 
      + '\n\nmy.interests \n> [\'artificial intelligence\', \'full-stack development\', ' 
      + '\'data science\']'
      + '\n\nmy.languages \n> [\'JavaScript\', \'Python\', \'Java\', \'PHP\', \'SQL\', \'C\']' 
      + '\n\nmy.technologies \n> [\'React\', \'Git\', \'Node.js\']'
      + '\n\nmy.hobbies \n> [\'slacklining\', \'climbing\', \'biking\']';
   }
   render() {
      return (
         <section>
            <Row className='Title'>
               <Col md={2}/>
               <Col md={8}>
                  <h4 className='AboutHeader'>
                     Hello there, my name is Elliot Kirk
                  </h4>
               </Col>
               <Col md={2}/>
            </Row>

         <Row>
            <Col md={2}/>
            <Col md={8}>
            <Jumbotron className='Code'>
               <Jumbotron className='About'>
                  <MarkdownRenderer markdown={this.markdown}/>
               </Jumbotron>
            </Jumbotron>
            </Col>
            <Col md={2}/>
         </Row>
         </section>
      )
   }
}

export default About;
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import './Content.css';

class Content extends Component {
   render() {
      return (
         <Row className='Menu'>
            <Col md={4}>
               <Card title='projects' {...this.props} />
            </Col>
            <Col md={4}>
               <Card title='about' {...this.props} />
            </Col>
            <Col md={4}>
               <a target='_blank' href='https://github.com/eskirk' rel="noopener noreferrer">
                  <Card title='github' {...this.props} />
               </a>
            </Col>
         </Row>
      )
   }
}

class Card extends Component {
   constructor(props) {
      super(props);

      this.title = this.props.title;
   }

   clicked(title) {
      console.log(title);

      if (title !== 'github')
         this.props.history.push('/' + this.title);
   }

   render() {
      return (
         <div className='Card' onClick={() => this.clicked(this.title)}>
            <h3>
               {this.title}
            </h3>
         </div>
      );
   }
}

export default Content;
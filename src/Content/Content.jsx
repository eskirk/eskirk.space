import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import './Content.css';

class Content extends Component {
   render() {
      return (
         <Row className='Menu'>
            <Col md={4}>
               <Card title='Projects' {...this.props} />
            </Col>
            <Col md={4}>
               <Card title='About' {...this.props} />
            </Col>
            <Col md={4}>
               <a target='_blank' href='https://github.com/eskirk' rel="noopener noreferrer">
                  <Card title='GitHub' {...this.props} />
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

      if (title !== 'GitHub')
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
import React, { Component } from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import './Projects.css';

class Projects extends Component {
   render() {
      return (
         <div className='ProjectsContainer'>
            <Col xs={10}>
               <Project
                  title='A genetic algorithm written in Python that learns to play pong'
                  link='https://github.com/eskirk/GeneticAlgorithmPong'
               />
               <Project
                  title='A simple natural selection simulator written in Python'
                  link='https://github.com/eskirk/NaturalSelection'
               />
               <Project
                  title='A Restful chat service web API written in Node.js'
                  link='https://github.com/eskirk/ChatService'
               />
               <Project
                  title='The React.js front-end for the chat service web application'
                  link='https://github.com/eskirk/CHS-react'
               />
            </Col>
         </div >
      )
   }
}

class Project extends Component {
   constructor(props) {
      super(props);

      this.title = props.title;
      this.link = props.link;
   }

   render() {
      return (
         <div>
            <Jumbotron className='Project'>
               <h4>
                  {this.title}
               </h4>
               <br />
               <a href={this.link}>GitHub</a>
            </Jumbotron>
         </div>
      )
   }
}

export default Projects;
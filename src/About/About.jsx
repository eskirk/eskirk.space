import React, { Component } from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import './About.css';
import { DeviceDvr } from 'material-ui';

class About extends Component {
   render() {
      return (
         <div>
            <Code/>
         </div>
      )
   }
}

class Code extends Component {
   render() {
      return (
         <Jumbotron className='Code'>
            <Jumbotron className='About'>
               <code className='CodeBlock'>
                  let my = new ElliotKirk()
                  <br/><br/>
                  my.interests 
                  <br/>
                  > ['artificial intelligence', 'full-stack development', 'data science']
                  <br/><br/>
                  my.hobbies 
                  <br/>
                  > ['slacklining', 'climbing', 'biking', 'coding']
                  <br/><br/>
                  my.education
                  <br/>
                  > 'Cal Poly San Luis Obispo - Computer Science'
                  <br/><br/>
                  my.graduation_date
                  <br/>
                  > 'Fall 2018'
                  <br/><br/>
                  my.resume 
                  <br/>
                  > <a target='_blank' href='./Resume.pdf' rel="noopener noreferrer">Resume.pdf</a>
               </code>
            </Jumbotron>
         </Jumbotron>
      )
   }
}

export default About;
import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Resume from './Resume.pdf';
import './About.css';

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
                  > ['artificial intelligence', 'full-stack web development', 'data science']
                  <br/><br/>
                  my.hobbies 
                  <br/>
                  > ['slacklining', 'climbing', 'biking', 'coding']
                  <br/><br/>
                  my.education
                  <br/>
                  > 'California Polytechnic State University - San Luis Obispo'
                  <br/><br/>
                  my.major
                  <br/>
                  > 'Computer Science'
                  <br/><br/>
                  my.graduation_date
                  <br/>
                  > 'Fall 2018'
                  <br/><br/>
                  my.email
                  <br/>
                  > 'elliot.s.kirk@gmail.com'
                  <br/><br/>
                  my.resume 
                  <br/>
                  > <a href={Resume} target='_blank' rel="noopener noreferrer">Resume.pdf</a>
               </code>
            </Jumbotron>
         </Jumbotron>
      )
   }
}

export default About;
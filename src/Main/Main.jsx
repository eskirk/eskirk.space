import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Hamburger from 'react-hamburgers';
import { slide as Menu } from 'react-burger-menu'
import World from '../Environment/World';
import Projects from '../Projects/Projects';
import About from '../About/About';
import './Main.css';
import './hamburgers.css';

class Main extends Component {
   constructor(props) {
      super(props);

      this.state = {
         active: false,
         hiddenWorld: false
      }
   }

   isMenuOpen(state) {
      this.setState({
         active: state.isOpen
      })
   }

   menuClicked(path) {
      console.log(path);

      if (path !== 'github')
         this.props.history.push('/' + this.path);
   }

   render() {
      return (
         <div id='MainWrapper'>
            {/* Hidden sidebar menu */}
            <Menu right={true}
               isOpen={this.state.active}
               pageWrapId={'Main'}
               outerContainerId={'MainWrapper'}
               onStateChange={this.isMenuOpen.bind(this)}>

               <a href='#' onClick={() => this.props.history.push('/')}>Home</a>
               <a href='#' onClick={() => this.props.history.push('/projects')}>Projects</a>
               <a target='_blank' href='https://github.com/eskirk' rel='noopener noreferrer'>GitHub</a>

               <br/>
               {this.state.hiddenWorld ? 
                  <a href='#' onClick={() => this.setState({hiddenWorld: !this.state.hiddenWorld})}>Turn on background</a>
               :
                  <a href='#' onClick={() => this.setState({hiddenWorld: !this.state.hiddenWorld})}>Turn off background</a>}
            </Menu>

            <div className='Main' id='Main' ref={e => this.element = e}>
               <header className='Main-header'>
                  <Row>
                     <Col xs={6}>
                        <h1 className='Main-title'>elliot kirk</h1>
                     </Col>
                     <Col xs={6} className='Menu-button'>
                        <Hamburger
                           active={this.state.active}
                           type='slider'
                           onClick={() => this.setState({ active: !this.state.active })}
                        />
                     </Col>
                  </Row>
               </header>
               <div>
                  <Switch>
                     {/* Homepage */}
                     <Route exact path='/' render={() =>
                        <div className='AboutContainer'>
                           {!this.state.hiddenWorld ? <World {...this.props} /> : ''}
                           <About {...this.props} />
                        </div>}
                     />

                     {/* Projects page */}
                     <Route path='/Projects' render={() =>
                        <Projects {...this.props} />
                     } />

                     {/* About page */}
                     <Route path='/About' render={() =>
                        <About {...this.props} />
                     } />
                  </Switch>
               </div>
            </div>
         </div>
      );
   }
}

export default Main;

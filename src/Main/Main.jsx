import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Tilt from 'react-tilt';
import World from '../Environment/World';
import Content from '../Content/Content';
import Projects from '../Projects/Projects';
import About from '../About/About';

import './Main.css';

class Main extends Component {
   render() {
      return (
         <div className="Main" ref={e => this.element = e}>
            <header className="Main-header">
               <h1 className="Main-title">Elliot Kirk</h1>
            </header>
            <div>
               <Switch>
                  {/* Homepage */}
                  <Route exact path='/' render={() =>
                     <div>
                        <World {...this.props} />
                        <Content {...this.props} />
                     </div>}
                  />

                  {/* Projects page */}
                  <Route path='/Projects' render={() => 
                     <Projects {...this.props} />
                  }/>

                  {/* About page */}
                  <Route path='/About' render={() => 
                     <About {...this.props} />
                  }/>
               </Switch>
            </div>
         </div>


      );
   }
}

export default Main;

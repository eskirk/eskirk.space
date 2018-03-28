import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Main from './Main/Main';
import registerServiceWorker from './registerServiceWorker';

const router = (
   <BrowserRouter>
      <Route path='/' component={Main} />
   </BrowserRouter>
);

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();

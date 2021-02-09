import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Create from './Components/Create/Create';
import Repairs from './Components/Repairs/Repairs';
import {Switch, Route} from 'react-router-dom';
import AddModel from './Components/AddModel/AddModel';
import AuthPage from './Components/AuthPage/AuthPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/' component={AuthPage}/>
        <Route path='/create' component={Create}/>
        <Route path='/addModel' component={AddModel}/>
        <Route path="/" children={<div>404 NOT FOUND</div>} />
        {/* <Create/> */}
        {/* <RepairmentsList/> */}
      </Switch>
    </div>
  );
}

export default App;

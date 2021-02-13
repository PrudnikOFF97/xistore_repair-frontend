import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Header/Header';
import Create from './Components/Create/Create';
import Repairs from './Components/Repairs/Repairs';
import {Switch, Route, Redirect} from 'react-router-dom';
import { AuthContext } from './Context/auth-context';
import AddModel from './Components/AddModel/AddModel';
import AuthPage from './Components/AuthPage/AuthPage';
import Loader from 'react-loader-spinner';

let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  const login = useCallback((uid, token, expirationDate) => {
    setIsloading(true);
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsloading(false);

  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
    let token = null;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    setIsloading(false)
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);
  let route = (
  <>
    {token ? <Route exact path='/' component={Repairs}/> : <Redirect to="/auth" />} 
    {token ? <Route path='/create' component={Create}/> : <Redirect to="/auth" />}
    {token ? <Route path='/addModel' component={AddModel}/> : <Redirect to="/auth" />}
  </>

  )

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <div className="App">
        <Header/>
        <Switch>
          {console.log(token)}
          <Route path='/auth' component={AuthPage}/>
          {/* <Route children={<div>404 NOT FOUND</div>} /> */}
          {!isLoading ? route : <Loader className="app__loader" type="TailSpin" color="#FF6700" height={150} width={150} />}
          {/* <RepairmentsList/> */}
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

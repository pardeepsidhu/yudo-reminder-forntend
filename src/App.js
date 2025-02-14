import './App.css';
import Nav from './components/Nav';
import Login from "./components/Login"
import Alert from './components/Alert';
import { useEffect, useState } from 'react';


function App() {

  return (
 <div>
  <Nav  />
  <Login />
 </div>
  );
}

export default App;

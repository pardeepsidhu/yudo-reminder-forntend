import './App.css';
import Nav from './components/Nav';
import Login from "./components/Login"
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import Private from './components/Private';
import About from './components/About';
import Inbox from "./components/Inbox"
import { useEffect, useState } from 'react';
import ShowAllEmails from './components/AllEmails';
import ErrorPage from './components/Error';
import Home from './components/Home';
import Alert from './components/Alert';

function App() {
  const [user,setUser]=useState(false);
  const [message,setMessage]=useState("")

  useEffect(()=>{
    let user =localStorage.getItem("user")
    if(user){
      setUser(true)
    }
  },[])


  const test=async()=>{
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}`);

    } catch (error) {
      console.log({error:"Some Error Accured In Back-End !"})
    }
  }
  useEffect(()=>{
    test();
  })

  return (
  <Router>
    <Nav user={user} setUser={setUser} setMessage={setMessage}/>
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login setMessage={setMessage} setUser={setUser}/>} />
      <Route path='/about' element={<About />} />
      <Route path='/inbox' element={<Inbox setMessage={setMessage} />} />
      <Route path="/allreminder" element={<ShowAllEmails setMessage={setMessage} />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
    <Alert message={message} setMessage={setMessage} />
  </Router>
  );
}

export default App;

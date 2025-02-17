import './App.css';
import Nav from './components/Nav';
import Login from "./components/Login"
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import Private from './components/Private';
import About from './components/About';
import Inbox from "./components/Inbox"
import { useEffect } from 'react';
import ShowAllEmails from './components/AllEmails';
import ErrorPage from './components/Error';
import Home from './components/Home';

function App() {

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
    <Nav />
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/inbox' element={<Inbox />} />
      <Route path="/allreminder" element={<ShowAllEmails />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  </Router>
  );
}

export default App;

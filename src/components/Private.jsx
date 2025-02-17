import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Private() {
    let navigate =useNavigate();
    useEffect(()=>{
        let user = localStorage.getItem("user");
        if(!user) navigate("/login");
    },[])
  return (
    <></>
  )
}

import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from'axios';

export const SignUp=()=>{
    const navigate = useNavigate();
const [data,setData]=useState({
  title:'',
    username:'',
    email:'',
    password:''
})
const[form,setForm]=useState('');

const {title,username,email,password}=data;
const changeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
}
 const submitHandler=(e)=>{
    e.preventDefault();
    console.log(data);
    if ( data.title.trim().length === 0||data.username.trim().length === 0 ||data.email.trim().length === 0 ||data.password.trim().length === 0) {
        setForm(true);
        return;
      }
      setForm(false);
    axios.post("http://localhost:3001/User",data,{
    headers:{
    "content-type":"application/json"
    },})
    .then((response) => {
        if (response.data.success) {
          setData({ title:"",name: "", email: "", password: "" });
          navigate("/sign-in");
        }
      })
      .catch((error) => {
        setForm(true);
      }); 
 }
    
    return(
      <div className='main'>
        <div className='register'>
            <form onSubmit={submitHandler} id="register">
              <h2>User Registration Form</h2>
            <div >
              <br/>
                    <label>Title:  </label>
                    {/* <input type="text"  name="title" value={title} onChange={changeHandler}></input> */}
                    <select id="name" type="text" name="title" value={title} onChange={changeHandler}>
                      <option>Mr</option>
                      <option>Ms</option>
                      <option>Miss</option>
                    </select>
                </div>
                <div >
                  <br/>
                    <label>Username</label><br/>
                    <input id="name" type="text" placeholder="your name" name="username" value={username} onChange={changeHandler}></input>
                </div>
                <div >
                  <br/>
                    <label>email</label><br/>
                    <input id="name" type="email" placeholder="your email" name="email" value={email} onChange={changeHandler}></input>
                </div>
                <div >
                  <br/>
                    <label>password</label><br/>
                    <input id="name" type="password"  placeholder="your password" name="password" value={password} onChange={changeHandler}></input>
                </div>
                <div >
                  <br/>
                    <button type="submit" id="submit" > Submit</button>
                    
                </div>


            </form>
            {form ? (
        <div className="alert alert-danger">
          <p className="alert-message">
            Invalid user details. Please verify once and resubmit.
          </p>
        </div>
      ) : null}
        </div>
        </div>
    )
}
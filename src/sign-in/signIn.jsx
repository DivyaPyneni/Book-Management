import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from'axios'

export const SignIn=()=>{
    const navigate = useNavigate();
 const [data,setData]=useState({email:'',password:''});
 const {email,password}=data;
const changeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
}
const[form,setForm]=useState('');

const submitHandler=(e)=>{
    e.preventDefault();
    console.log(data);
    if ( data.email.trim().length === 0 ||data.password.trim().length === 0) {
        setForm(true);
        return;
      }
      setForm(false);
      axios.post("http://localhost:3001/User/users",data,{
          headers:{
          "content-type":"application/json"
          },})
          .then((response) => {
              if (response.data.success) {
                const token=response.data.data.token;
                 localStorage.setItem("accessToken",token)
                localStorage.setItem("user_details",JSON.stringify(response.data.data.user))
                setData({email: "", password: "" });
                navigate("/books-management");
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
                    <h2>Sign In</h2>
                    <br/>
                    <div>
                        <label >email</label>
                        <br/>
                        <input id="name" type="email" placeholder='your email' name="email" value={email}  onChange={changeHandler}/>
                    </div>
                    <br/>
                    <div>
                        <label >Password</label><br/>
                        <input id="name" type="password" placeholder='your password'  name="password" value={password} onChange={changeHandler}/>
                    </div>
                    <br/>
                    <div>
                        <button id="submit" type="submit"> Submit</button>
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
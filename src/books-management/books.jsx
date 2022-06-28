import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";


export const Books=()=>{
    const [data,setData]=useState({title:'',brief:'',category:'',subCategory:''});
const [form,setForm]=useState("")
const [books,setBooks]=useState([]);
const {title,brief,category,subCategory}=data;
const changeHandler=e=>{
    setData({...data,[e.target.name]:e.target.value})
}
const submitHandler=e=>{
    e.preventDefault();
    if(data.title.trim().length===0||data.category.trim().length===0){
        setForm(true);
        return;
    }
    const token=localStorage.getItem("accessToken")
    //console.log(token);
    setForm(false);
    //console.log(data);
    axios.post("http://localhost:3001/Books",data,{
        headers:{
            "content-type":"application/json",
            authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        if(response.data.success){
            const book=response.data.data.books;
           // console.log(book);
            setBooks([...books,book]);
            setData({title:"",brief:"",category:"",subCategory:""})
        }
    }).catch((error)=>console.error(error))
}

const handleDeleteBook=(id)=>{
    const token=localStorage.getItem("accessToken");
    axios.delete(`http://localhost:3001/Books/${id}`,{
     headers:{
         authorization:`Bearer ${token}`
     }
    }).then((response)=>{
     if(response.data.success){
         console.log(response.data.success);
         const filters=books.filter(({_id})=> _id !== id )
         setBooks(filters)
     }
    })
 }


useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:3001/Books", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const books = response.data.data.allBooks;
        //console.log(response.data);
       // console.log(books);
        setBooks(books);
      })
      .catch((error) => {
        console.log("Hellooo")
        console.error(error);
      });
  },[]);


return(
    <div className='main'>
    <div className='register'>   
            <form onSubmit={submitHandler} id='register'>
            <h4>My Book/Books</h4>
            <br/>
                <div  className='scroll'>
                    {  <ul>
                          { 
                            books.map((ref)=>{
                             return(
                                    <li key={ref._id}>
                                              <div >
                                                <span >{ref.title}</span>
                                              <span >
                                                <Link id="bg" to={"/Books/" + ref._id}>
                                                  <button id="icon">
                                                  <FontAwesomeIcon  icon={faPen} />
                                                  </button>
                                                </Link>
                                                </span>
                                                <span >
                                                <button id="bg" onClick={()=>handleDeleteBook(ref._id)} >
                                                  <FontAwesomeIcon  icon={faTrash} />
                                                </button>
                                                </span>
                                              </div>
                                            </li>)
                                        })
                                }
                         </ul>
                    }
                </div>
                <br/>
                <h2>Create My Book</h2>
                <br/>
                <div>
                    <label>Title</label>
                    <br/>
                    <input id='name' type="text" name="title" value={title} onChange={changeHandler}></input>
                </div>
                <br/>
                <div>
                    <label>Brief</label><br/>
                    <input id='name' type="text" name="brief" value={brief} onChange={changeHandler}></input>
                </div>
                <br/>
                <div>
                    <label>Category</label><br/>
                    <input id='name' type="text" name="category" value={category} onChange={changeHandler}></input>
                </div>
                <br/>
                <div>
                    <label>Sub-Category</label><br/>
                    <input id='name' type="text" name="subCategory" value={subCategory} onChange={changeHandler}></input>
                </div>
                <br/>
                <div>
                    <button id='submit' type="submit">Submit</button>
                </div>
            </form>
        {form ? (
        <div className="alert alert-danger">
          <p className="alert-message">
            Title and Category fields are required.
          </p>
        </div>
      ) : null}
    </div>
    </div>
)
}
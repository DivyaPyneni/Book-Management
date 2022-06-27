import React,{useState,useEffect} from 'react';
import { useNavigate ,useParams} from "react-router-dom";
import axios from 'axios';
export const BookEdit=()=>{

    const navigate=useNavigate();
    const [books,setBooks]=useState({title:"", brief:"",category:"",subCategory:""});
    const { id: bookId } = useParams();
console.log({ id: bookId });
    const {title,brief,category,subCategory}=books;
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        axios
          .get(`http://localhost:3001/Books/${bookId}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              setBooks(response.data.data.book);
            }
          })
          .catch((error) => console.error(error));
      }, [bookId]);

      const handleBookEdit = (e) => {
        e.preventDefault();
        if (books.title.trim().length===0||books.category.trim().length===0) {
          return;
        }
        const token = localStorage.getItem("accessToken");
        axios
          .put(`http://localhost:3001/Books/${books._id}`, books, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              navigate("/book-management");
            }
          })
          .catch((error) => console.error(error));
      };

      const changeHandler = (e) => {
        setBooks({ ...books, [e.target.name]: e.target.value });
      };

    return(
      <div className='main'>
        <div className='edit'>
                <form id='edit' onSubmit={handleBookEdit}>
                  <h2>Updating My Book Details</h2>
                  <br/>
                <div>
                    <label>Title</label><br/>
                    <input id="name" type="text" name="title" value={title} onChange={changeHandler}></input>
                </div>
                <br/>
                <div>
                    <label>Brief</label><br/>
                    <input id="name" type="text" name="brief" value={brief} onChange={changeHandler}></input>
                </div>
                <br/>
                <div>
                    <label>Category</label><br/>
                    <input id="name" type="text" name="category" value={category} onChange={changeHandler}></input>
                </div>
                <br/>
                <div>
                    <label>Sub-Category</label><br/>
                    <input id="name" type="text" name="subCategory" value={subCategory} onChange={changeHandler}></input>
                </div>
                <br/>
                <div>
                    <button id="submit" type="submit">Submit</button>
                </div>
                </form>
        </div>
        </div>
    )
}

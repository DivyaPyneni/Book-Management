import { Routes, Route } from "react-router-dom";
import './App.css';
import {SignIn} from'./sign-in/signIn';
import {SignUp} from'./sign-up/signUp';
import {Books} from './books-management/books'
import {Navbar} from './Navigation/navbar';
import {BookEdit} from './books-management/bookEdit'
import {Home} from './home/home';


function App() {
  return (
    <>
    <center>
    <header><Navbar/></header>
    </center>
    <main>
    <Routes>
          <Route path="/" element={<Home/>}    />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/books-management" element={<Books />} />
          <Route path="/Books/:id" element={<BookEdit />} />
    </Routes>
    </main>
    </>   
  );
}

export default App;

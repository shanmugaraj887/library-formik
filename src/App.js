import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Mybooks from './bookshelf/Mybooks';
import { Routes, Route, Link } from "react-router-dom";
import Adminpage from './admin/Adminpage';
import Editbook from './admin/Editbook';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function App() {

  const [books, setBooks] = useState([])


  const getbooks = () => {
    fetch("https://638f3c7a9cbdb0dbe320f75c.mockapi.io/books", {
      method: 'GET',
    }
    )
      .then(data => data.json())
      .then(res => setBooks(res))

  }
  useEffect(() => getbooks(), [])
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar ><div style={{ display: "flex", justifyContent: "space-between", width: "100%" }} >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link style={{ marginRight: "20px", border: "none", textDecoration: "none", color: "white" }} to="/mybooks">MyBooks</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link style={{ marginRight: "20px", border: "none", textDecoration: "none", color: "white" }} to="/books">Books</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link style={{ marginRight: "20px", border: "none", textDecoration: "none", color: "white" }} to="/adminpage">Admin Page</Link>
            </Typography>
          </div>
          <div>
            <b>
              XYZ library
            </b>
          </div>
        </div>


        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="mybooks" element={<Mybooks />} />
        <Route path="books" element={<Books books={books} getbooks={getbooks} />} />
        <Route path="/" element={<Books books={books} getbooks={getbooks} />} />
        <Route path="adminpage" element={<Adminpage />} />
        <Route path="/editbook/:id" element={<Editbook books={books} getbooks={getbooks} />} />
      </Routes>

    </div>
  );
}

function Books({ books, getbooks }) {

  const addbook = (id) => {
    books.map((book) => (book.id === id ? (
      fetch("https://638f3c7a9cbdb0dbe320f75c.mockapi.io/mybooks",
        {
          method: 'POST',
          body: JSON.stringify(book),
          headers: { "Content-type": "application/json" }
        }
      )) : book)

    )
  }

  return (
    <div >
      <div className="container">
        <div className="row">
          {books.map((book) => (
            <div style={{ marginTop: "25px" }} className="col-md-4">
              <div style={{ padding: "20px", borderRadius: "7px", boxShadow: "2px 2px 20px black" }} className='per-book '>
                <div><b>{book.title}</b></div>
                <img style={{ margin: "15px" }} src={book.imageLink} height={200} width={200} alt="" />
                <div style={{ margin: "10px" }}>
                  <Button variant='contained' onClick={() => { addbook(book.id) }}>Add to My Books</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


}


export default App;

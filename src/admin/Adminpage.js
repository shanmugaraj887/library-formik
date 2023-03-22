import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import AddForm from './AddForm';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Adminpage() {

    const [books, setBooks] = useState([])


    const getbooks = () => {
        fetch("https://638f3c7a9cbdb0dbe320f75c.mockapi.io/books", {
            method: 'GET',
        }
        )
            .then(data => data.json())
            .then(res => setBooks(res))

    }
    const navigate = useNavigate()


    const deletebook = (id) => {
        fetch(`https://638f3c7a9cbdb0dbe320f75c.mockapi.io/books/${id}`, {
            method: 'DELETE',
        }).then(() => getbooks())
    }
    useEffect(() => getbooks(), [])
    return (

        <div>
            <AddForm getbooks={getbooks} />

            <div>
                <div className="container">
                    <div className="row">
                        {books.map((book) => (
                            <div style={{ marginTop: "25px" }} className="col-md-4">
                                <div style={{ padding: "20px", borderRadius: "7px", boxShadow: "2px 2px 20px black" }} className='per-book '>
                                    <div><b>{book.title}</b></div>
                                    <img style={{ margin: "15px" }} src={book.imageLink} height={200} width={200} alt="" />
                                    <div style={{ margin: "10px" }}>
                                        <Stack style={{ display: "flex", justifyContent: "center" }} spacing={2} direction="row">
                                            <Button variant='contained' onClick={() => { deletebook(book.id) }}>Deletebook</Button>
                                            <Button variant='contained' onClick={() => navigate(`/editbook/${book.id}`)}>Edit</Button>
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Adminpage
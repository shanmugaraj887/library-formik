import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button';

function Mybooks() {
    const [book, setBook] = useState([])

    const mibook = () => {
        fetch("https://638f3c7a9cbdb0dbe320f75c.mockapi.io/mybooks", {
            method: 'GET',
        }
        )
            .then(data => data.json())
            .then(res => setBook(res))
    }


    const deletebook = (id) => {
        fetch(`https://638f3c7a9cbdb0dbe320f75c.mockapi.io/mybooks/${id}`, {
            method: 'DELETE',
        }).then(() => mibook())

    }
    useEffect(() => mibook(), [])

    return (

        <>

            <div className="container">
                <div className="row">
                    {book.map((book) => (
                        <div style={{ marginTop: "25px" }} className="col-md-4">
                            <div style={{ padding: "20px", borderRadius: "7px", boxShadow: "2px 2px 20px black" }} className='per-book '>
                                <div><b>{book.title}</b></div>
                                <img style={{ margin: "15px" }} src={book.imageLink} height={200} width={200} alt="" />
                                <div style={{ margin: "10px" }}>
                                    <Button variant='contained' onClick={() => { deletebook(book.id) }}>Remove</Button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>


        </>

    )
}

export default Mybooks
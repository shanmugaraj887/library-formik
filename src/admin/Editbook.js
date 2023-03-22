import React from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



function Editbook({ books, getbooks }) {

    const navigate = useNavigate()
    const { id } = useParams()

    const edibook = books[id]

    const bookValidation = Yup.object({
        title: Yup.string().min(3, "Please put a bigger title"),
        imageLink: Yup.string().min(10, "Please add a valid image link"),
        link: Yup.string().min(12, "Please add a valid link"),
    })

    const formik = useFormik({
        initialValues: {
            title: edibook.title,
            imageLink: edibook.imageLink,
            link: edibook.link
        }, validationSchema: bookValidation,
        onSubmit: (values) => {
            fetch(`https://638f3c7a9cbdb0dbe320f75c.mockapi.io/books/${id}`, {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            }).then(() => getbooks())
            console.log(values)
            alert("Updating please wait")
            setTimeout(() => {
                navigate("/adminpage")
            }, 2000);

        }

    })


    return (
        <div style={{ margin: "15px" }}>EDIT BOOK

            <form onSubmit={formik.handleSubmit}>
                <TextField style={{ margin: "30px", marginBottom: "5px" }} type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} name="title" id="outlined-basic" label="Title" variant="outlined" value={formik.values.title} />
                <div >{formik.touched.title && formik.errors.title ? formik.errors.title : null}
                </div>

                <TextField style={{ margin: "30px", marginBottom: "5px" }} type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} name="imageLink" id="outlined-basic" label="Imagelink" variant="outlined" value={formik.values.imageLink} />
                <div >{formik.touched.imageLink && formik.errors.imageLink ? formik.errors.imageLink : null}
                </div>


                <TextField style={{ margin: "30px", marginBottom: "5px" }} type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} name="link" id="outlined-basic" label="Book Link" variant="outlined" value={formik.values.link} />
                <div >{formik.touched.link && formik.errors.link ? formik.errors.link : null}
                </div>

                <Stack style={{ display: "flex", justifyContent: "center" }} spacing={2} direction="row">
                    <Button variant='contained' type='submit'>Update</Button>
                    <Button variant='contained' onClick={() => navigate(-1)}>cancel</Button>
                </Stack>
            </form>
        </div>
    )
}

export default Editbook
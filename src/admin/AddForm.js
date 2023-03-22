import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function AddForm({ getbooks }) {
    const bookValidation = Yup.object({
        title: Yup.string().min(3, "Please put a bigger title"),
        imageLink: Yup.string().min(10, "Please add a valid image link"),
        link: Yup.string().min(12, "Please add a valid link"),
    })
    const formik = useFormik({
        initialValues: {
            title: "",
            imageLink: "",
            link: ""
        }, validationSchema: bookValidation,
        onSubmit: (values) => {
            const addNewBook = {
                title: values.title,
                imageLink: values.imageLink,
                link: values.link,
            }
            fetch("https://638f3c7a9cbdb0dbe320f75c.mockapi.io/books", {
                method: 'POST',
                body: JSON.stringify(addNewBook),
                headers: { "Content-type": "application/json" }
            }).then(() => getbooks())
        }
    })





    return (
        <div >

            <form onSubmit={formik.handleSubmit}>
                <TextField style={{ margin: "20px", marginBottom: "5px" }} type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} name="title" id="outlined-basic" label="Title" variant="outlined" value={formik.values.title} />
                <div >{formik.touched.title && formik.errors.title ? formik.errors.title : null}
                </div>

                <TextField style={{ margin: "20px", marginBottom: "5px" }} type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} name="imageLink" id="outlined-basic" label="Imagelink" variant="outlined" value={formik.values.imageLink} />
                <div >{formik.touched.imageLink && formik.errors.imageLink ? formik.errors.imageLink : null}
                </div>


                <TextField style={{ margin: "20px", marginBottom: "10px" }} type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} name="link" id="outlined-basic" label="Book Link" variant="outlined" value={formik.values.link} />
                <div >{formik.touched.link && formik.errors.link ? formik.errors.link : null}
                </div>


                <Button type='submit' color="success" variant="contained">ADD book</Button>
            </form>
        </div>
    )
}

export default AddForm
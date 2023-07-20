import emailjs from 'emailjs-com'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
// require('dotenv').config()

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [contactErr, setContactErr] = useState<boolean>(false)

  const [addressErr, setAddressErr] = useState<boolean>(false)

  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast("We got it and we're on it!", {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast',
    })
  }

  // Function called on submit that uses emailjs to send email of valid contact form
  const handleSubmit = async () => {
    // Destrcture data object
    console.log(name)
    if (!phone && !email) {
      setContactErr(true)
      return
    } else {
      setContactErr(false)
    }

    if (!address) {
      setAddressErr(true)
      return
    } else {
      setAddressErr(false)
    }

    try {
      const templateParams = {
        name,
        email,
        phone,
        address,
      }
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_USER_ID
      )
      await emailjs.send('service_1zpzabj', 'template_9ga09bn', templateParams, 'GHK1gj9QBoExI8YNf')

      toastifySuccess()

      setSubmitted(true)
    } catch (e) {
      console.log(e)
      setSubmitted(false)
    }
  }

  return (
    <Container>
      {submitted ? (
        <Grid container direction="column" alignItems="center" marginBottom={'2em'}>
          <Grid item marginTop={'10em'}>
            <Typography variant="h2" gutterBottom>
              Awesome!!
            </Typography>
          </Grid>
          <Grid item marginBottom={'1em'}>
            <Typography variant="h4" gutterBottom>
              We're prepping for your home and will be in touch real soon!
            </Typography>
          </Grid>
          <Grid item marginBottom={'10em'}>
            <Typography variant="body1" gutterBottom>
              In the meantime, you can call us at (786) 305-7797 if you need anything!
            </Typography>
          </Grid>

          <Typography></Typography>
        </Grid>
      ) : (
        <>
          <Grid container direction="column" alignItems="center" marginBottom={'2em'}>
            <Grid item marginTop={'4em'}>
              <Typography variant="h2" gutterBottom>
                Ready to get fill your place?
              </Typography>
            </Grid>
            <Grid item width={'40%'} minWidth={'300px'}>
              <TextField
                variant="standard"
                fullWidth
                id="name"
                label="Name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item width={'40%'} minWidth={'300px'}>
              <TextField
                variant="standard"
                fullWidth
                required
                error={contactErr}
                helperText={contactErr ? 'An email or phone number is required' : null}
                id="phone"
                label="Phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item width={'40%'} minWidth={'300px'}>
              <TextField
                variant="standard"
                fullWidth
                required
                id="email"
                error={contactErr}
                helperText={contactErr ? 'An email or phone number is required' : null}
                label="Email"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item width={'40%'} minWidth={'300px'}>
              <TextField
                variant="standard"
                fullWidth
                required
                id="address"
                error={addressErr}
                helperText={addressErr ? 'We need to know the address to lease the place!' : null}
                label="Property Address"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
                multiline
              />
            </Grid>
            <Grid item marginTop={'2em'} width={'20%'} minWidth={'75px'}>
              <Button variant="contained" type="submit" color="primary" fullWidth onClick={handleSubmit}>
                Let's Go!
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      <ToastContainer />
    </Container>
  )
}

export default ContactForm

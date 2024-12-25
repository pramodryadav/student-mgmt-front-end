import { Box, Grid2, TextField } from '@mui/material'
import React from 'react'

const Login = () => {
  return (
    <Grid2 container className="loginMainContainer">
      <Grid2 size={{ xs: 12,lg:3}}>
        <form className='loginForm'>
     
        <TextField
          size='small'
          fullWidth
        />
        <TextField
          size='small'
          fullWidth
        />
    </form>
      </Grid2>

    </Grid2>
  )
}

export default Login
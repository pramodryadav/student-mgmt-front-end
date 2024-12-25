import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

interface LoaderProps {
    open:boolean
}

const Loader = ({open}:LoaderProps) => {
  return (
    <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={open}
   
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  )
}

export default Loader
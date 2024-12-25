import React from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useAllPayments from '../hooks/useAllPayments'
import BasicTable from '../../../components/Table'
import CustomSelect from '../../../components/Select'
import { Box, Button, Grid2 } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';

const AllPayments = () => {
    const {
        rows, 
        columns, 
        loading, 
        month, 
        handleChangeMonth, 
        months,
        handleExport,
        handleReset
    } = useAllPayments()
    return (
        <Grid2 container display="flex" justifyContent="flex-end" spacing={2}>
            <Grid2 size={{ xs: 6, lg:3}} >
                <CustomSelect
                    value={month}
                    name="month"
                    label='Months'
                    handleChange={handleChangeMonth}
                    options={months}

                />
                
            </Grid2>
            <Grid2 size={{ xs: 3,lg:1}}>
            <Button startIcon={<FileDownloadIcon/>} fullWidth onClick={handleExport} variant='contained'>Export</Button>
                
            </Grid2>
            <Grid2 size={{ xs: 3,lg:1}}>
            <Button startIcon={<RestoreIcon/>} fullWidth onClick={handleReset} variant='contained'>Reset</Button>
                
            </Grid2>
            
            <Grid2 size={{ xs: 12}}>
                <BasicTable rows={rows} columns={columns} loading={loading} />
            </Grid2>


        </Grid2>

    )
}

export default AllPayments
import React from 'react';
import { FormikProps } from 'formik';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Option {
    label: string;
    value: string
}

interface CustomSelectProps {
    name: string;
    value: string;
    label: string;
    handleChange: (e: SelectChangeEvent) => void;
    handleBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    options: Option[]
}

const CustomSelect: React.FC<CustomSelectProps> = ({ name, value, label, handleChange, handleBlur, options }) => {
    return (
        <FormControl size='small' fullWidth>
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                
                value={value}
                label={label}
                onChange={handleChange}
                name={name}
                onBlur={handleBlur}

            >
                {options.map((option: Option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

        </FormControl>
    )
}

export default CustomSelect
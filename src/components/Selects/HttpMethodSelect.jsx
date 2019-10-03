import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from './styles'
import { httpMethods } from '../../assets/httpmethods'

const HttpMethodSelect = props => {
    const { disable, handleMethodChange, value } = props
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl} disabled={disable}>
            <InputLabel htmlFor="type-simple">Method</InputLabel>
            <Select
                value={value}
                label="Http Method"

                onChange={handleMethodChange}
                inputProps={{
                    name: 'ContentType',
                    id: 'type-simple',
                }}
            >
                {httpMethods.map((httpMethod) => {
                    return <MenuItem value={httpMethod.name}>{httpMethod.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}

export default HttpMethodSelect
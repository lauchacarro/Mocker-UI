import React from 'react';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Close from '@material-ui/icons/Close';
import useStyles from './styles'
import { statusCodes } from '../../assets/statusCodes'
import PropTypes from 'prop-types';

const StatusCodeSelect = props => {
    const { disable, handleChangeStatusCode, value } = props
    const classes = useStyles();
    const [state, setState] = React.useState({ customCode: false, statusCode: value });

    const handleChange = event => {
        if (state.customCode) {
            setState({ ...state, statusCode: event.target.value })
            handleChangeStatusCode && handleChangeStatusCode(event)
        }
        else if (event.target.value === 0)
            setState({ ...state, customCode: true })
        else {
            setState({ ...state, statusCode: event.target.value })
            handleChangeStatusCode && handleChangeStatusCode(event)
        }
    }

    const handleClickDeleteIcon = () =>
        setState({ statusCode: 200, customCode: false })

    const handleMouseDownDeleteIcon = event =>
        event.preventDefault();

    return (
        <FormControl className={clsx(classes.formControl, classes.paddingBottom50)} disabled={disable}>
            {!state.customCode && <InputLabel htmlFor="code-simple">Status Code</InputLabel>}
            {state.customCode ?
                <TextField
                    id="filled-adornment-password"
                    className={clsx(classes.margin, classes.textField)}
                    type='number'
                    label="Custom Status Code"
                    value={state.statusCode}
                    onChange={handleChange}
                    name="StatusCode"
                    autoComplete= "off"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={handleClickDeleteIcon}
                                    onMouseDown={handleMouseDownDeleteIcon}
                                >
                                    <Close />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                :
                <Select
                    value={state.statusCode}
                    onChange={handleChange}
                    className={classes.textField}
                    inputProps={{
                        name: 'StatusCode',
                        id: 'code-simple'
                    }}
                >
                    <MenuItem value={0}>Custom</MenuItem>
                    {statusCodes.map((statusCode) => {
                        return <MenuItem value={statusCode.code}>{statusCode.text}</MenuItem>
                    })}
                </Select>
            }
        </FormControl>
    )
}

StatusCodeSelect.propTypes = {
    disable: PropTypes.bool,
    handleChangeStatusCode: PropTypes.func,
    value: PropTypes.number.isRequired
}

export default StatusCodeSelect
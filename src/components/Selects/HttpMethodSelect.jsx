import React, { useState } from 'react';
import clsx from 'clsx';
import { InputLabel, MenuItem, FormControl, Select, TextField, IconButton, InputAdornment } from '@material-ui/core';
import useStyles from './styles'
import Close from '@material-ui/icons/Close';
import Add from '@material-ui/icons/Add';
import { httpMethods } from '../../assets/httpmethods'

const HttpMethodSelect = props => {
    const { disable = false, mini = false, handleMethodChange, value, currentMethods, handleSelectClose, title } = props
    const classes = useStyles();
    const [state, setState] = useState({ customMethod: false, httpMethod: value });

    const handleChange = event => {
        if (state.customMethod) {
            setState({ ...state, httpMethod: event.target.value.toUpperCase() })
            if (mini)
                handleMethodChange && handleMethodChange(event)
        }
        else if (event.target.value === 0)
            setState({ ...state, customMethod: true })
        else {
            setState({ ...state, httpMethod: event.target.value.toUpperCase() })
            handleMethodChange && handleMethodChange(event)
        }
    }

    const onAddIconClick = event => {
        setState({ ...state, customMethod: false })
        event.target.value = state.httpMethod
        handleMethodChange && handleMethodChange(event)
    }

    const onCloseIconClick = event => {
        if (mini)
            setState({ ...state, customMethod: false })
        else
            handleSelectClose && handleSelectClose(event)
    }
    const handleMethodSelectClose = event => {
        if (event.target.value !== 0) {
            handleSelectClose && handleSelectClose(event)
        }
    }
    const handleMouseDownIcon = event =>
        event.preventDefault();

    const onPressEnter = event => {
        let keyCode = event.keyCode || event.which;
        if (keyCode == '13') {
            onAddIconClick(event)
            return false;
        }
    }
    return (
        <FormControl className={clsx(classes.formControl, classes.paddingBottom20)} disabled={disable} >

            {state.customMethod ?
                <TextField
                    className={clsx(classes.margin, classes.textField)}
                    type='text'
                    label="Custom Mock"
                    value={state.httpMethod}
                    onChange={handleChange}
                    name="HttpMethod"
                    onKeyPress={onPressEnter}
                    autoComplete="off"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={onCloseIconClick}
                                    onMouseDown={handleMouseDownIcon}
                                >
                                    <Close />
                                </IconButton>
                                {!mini && <IconButton
                                    edge="end"
                                    onClick={onAddIconClick}
                                    onMouseDown={handleMouseDownIcon}
                                >
                                    <Add />
                                </IconButton>}
                            </InputAdornment>
                        ),
                    }}
                />
                :
                <>
                    <InputLabel htmlFor="type-simple">{title}</InputLabel>
                    <Select
                        value={state.httpMethod}
                        open={mini ? undefined : true}
                        label="Method"
                        onClose={handleMethodSelectClose}
                        onChange={handleChange}
                        inputProps={{
                            name: 'HttpMethod',
                            id: 'type-simple'
                        }}
                    >
                        <MenuItem value={0}>Custom</MenuItem>
                        {httpMethods.filter((httpMethod) => {
                            return !currentMethods.includes(httpMethod.name)
                        }).map((httpMethod) => {
                            return <MenuItem value={httpMethod.name}>{httpMethod.name}</MenuItem>
                        })}
                    </Select>
                </>
            }
        </FormControl>
    )
}

export default HttpMethodSelect
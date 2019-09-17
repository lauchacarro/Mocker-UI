import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        paddingBottom: "50px"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textField: {
        width: 200,
    },
}));

const StatusCodeSelect = props => {
    const { disable, handleChangeStatusCode, value } = props
    const classes = useStyles();
    const [customState, setCustomState] = React.useState(false);

    function handleChange(event) {
        if (customState) {
            handleChangeStatusCode(event)
        }
        else {
            if (event.target.value == 0) {
                setCustomState(true)
            }
            else {
                handleChangeStatusCode(event)
            }
        }
    }

    const handleClickShowPassword = () => {
        setCustomState(false)
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    return (
        <FormControl className={classes.formControl} disabled={disable}>
            {!customState ? <InputLabel htmlFor="code-simple">Status Code</InputLabel> : null}
            {customState ?
                <TextField
                    id="filled-adornment-password"
                    className={clsx(classes.margin, classes.textField)}
                    type='number'
                    label="Custom Status Code"
                    value={value}
                    onChange={handleChange}
                    name="StatusCode"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    <Close />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                :
                <Select
                    value={value}
                    onChange={handleChange}
                    className={classes.textField}
                    inputProps={{
                        name: 'StatusCode',
                        id: 'code-simple'
                    }}
                >
                    <MenuItem value={0}>Custom</MenuItem>
                    <MenuItem value={100}>100 Continue</MenuItem>
                    <MenuItem value={101}>101 Switching Protocol</MenuItem>
                    <MenuItem value={200}>200 OK</MenuItem>
                    <MenuItem value={201}>201 Created</MenuItem>
                    <MenuItem value={202}>202 Accepted</MenuItem>
                    <MenuItem value={203}>203 Non-Authoritative Information</MenuItem>
                    <MenuItem value={204}>204 No Content</MenuItem>
                    <MenuItem value={205}>205 Reset Content</MenuItem>
                    <MenuItem value={206}>206 Partial Content</MenuItem>
                    <MenuItem value={300}>300 Multiple Choice</MenuItem>
                    <MenuItem value={301}>301 Moved Permanently</MenuItem>
                    <MenuItem value={302}>302 Found</MenuItem>
                    <MenuItem value={303}>303 See Other</MenuItem>
                    <MenuItem value={304}>304 Not Modified</MenuItem>
                    <MenuItem value={307}>307 Temporary Redirect</MenuItem>
                    <MenuItem value={308}>308 Permanent Redirect</MenuItem>
                    <MenuItem value={400}>400 Bad Request</MenuItem>
                    <MenuItem value={401}>401 Unauthorized</MenuItem>
                    <MenuItem value={403}>403 Forbidden</MenuItem>
                    <MenuItem value={404}>404 Not Found</MenuItem>
                    <MenuItem value={406}>406 Not Acceptable</MenuItem>
                    <MenuItem value={408}>408 Request Timeout</MenuItem>
                    <MenuItem value={409}>409 Conflict</MenuItem>
                    <MenuItem value={410}>410 Gone</MenuItem>
                    <MenuItem value={500}>500 Internal Server Error</MenuItem>
                    <MenuItem value={501}>501 Not Implemented</MenuItem>
                    <MenuItem value={502}>502 Bad Gateway</MenuItem>
                    <MenuItem value={503}>503 Service Unavailable</MenuItem>
                </Select>
            }
        </FormControl>
    )
}

export default StatusCodeSelect
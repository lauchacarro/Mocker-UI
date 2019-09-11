import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

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
    }
}));

const StatusCodeSelect = props => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        type: 200,
        name: 'hai',
    });
    const [customState, setCustomState] = React.useState(false);

    function handleChange(event) {
        if (customState) {
            console.log(event.type)
            if (event.type != "change") {
                setCustomState(false)
            }
        }
        else {
            if (event.target.value == 0) {
                setCustomState(true)
            }
            else {
                setValues(oldValues => ({
                    ...oldValues,
                    [event.target.name]: event.target.value,
                }));
            }
        }



    }
    return (
        <FormControl className={classes.formControl}>
            {!customState ? <InputLabel htmlFor="type-simple">Status Code</InputLabel> : null}
            {customState ?
                <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    className={classes.textField}
                    
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                      }}
                  />
                :
                <Select
                    value={values.type}
                    onChange={handleChange}
                    inputProps={{
                        name: 'type',
                        id: 'type-simple',
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
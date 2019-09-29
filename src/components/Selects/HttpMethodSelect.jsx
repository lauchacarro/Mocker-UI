import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        paddingBottom: "50px"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const HttpMethodSelect = props => {
    const { disable, handleChangeContentType, value } = props
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl} disabled={disable}>
            <InputLabel htmlFor="type-simple">Method</InputLabel>
            <Select
                value={value}
                label="Http Method"

                onChange={handleChangeContentType}
                inputProps={{
                    name: 'ContentType',
                    id: 'type-simple',
                }}
            >
                <MenuItem value={"GET"}>GET</MenuItem>
                <MenuItem value={"POST"}>POST</MenuItem>
                <MenuItem value={"PUT"}>PUT</MenuItem>
                <MenuItem value={"PATCH"}>PATCH</MenuItem>
                <MenuItem value={"DELETE"}>DELETE</MenuItem>
                <MenuItem value={"COPY"}>COPY</MenuItem>
                <MenuItem value={"HEAD"}>HEAD</MenuItem>
                <MenuItem value={"OPTIONS"}>OPTIONS</MenuItem>
                <MenuItem value={"LINK"}>LINK</MenuItem>
                <MenuItem value={"UNLINK"}>UNLINK</MenuItem>
                <MenuItem value={"PURGE"}>PURGE</MenuItem>
                <MenuItem value={"LOCK"}>LOCK</MenuItem>
                <MenuItem value={"UNLOCK"}>UNLOCK</MenuItem>
                <MenuItem value={"PROPFIND"}>PROPFIND</MenuItem>
                <MenuItem value={"VIEW"}>VIEW</MenuItem>
            </Select>
        </FormControl>
    )
}

export default HttpMethodSelect
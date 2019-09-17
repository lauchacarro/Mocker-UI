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

const ContentTypeSelect = props => {
    const { disable, handleChangeContentType, value } = props
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl} disabled={disable}>
            <InputLabel htmlFor="type-simple">Content Type</InputLabel>
            <Select
                value={value}
                onChange={handleChangeContentType}
                inputProps={{
                    name: 'ContentType',
                    id: 'type-simple',
                }}
            >
                <MenuItem value={"application/json"}>JSON</MenuItem>
                <MenuItem value={"text/html"}>HTML</MenuItem>
                <MenuItem value={"application/xhtml+xml"}>XHTML</MenuItem>
                <MenuItem value={"application/xml"}>XML</MenuItem>
                <MenuItem value={"application/javascript"}>Javascript</MenuItem>
                <MenuItem value={"multipart/form-data"}>Form Data</MenuItem>
                <MenuItem value={"text/css"}>CSS</MenuItem>
                <MenuItem value={"text/csv"}>CSV</MenuItem>
                <MenuItem value={"text/plain"}>Text Plain</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ContentTypeSelect
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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
    const classes = useStyles();
    const [values, setValues] = React.useState({
        type: 'application/json',
        name: 'hai',
    });

    // const inputLabel = React.useRef(null);
    // const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);

    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="type-simple">Content Type</InputLabel>
            <Select
                value={values.type}
                onChange={handleChange}
                inputProps={{
                    name: 'type',
                    id: 'type-simple',
                }}
            >
                <MenuItem value={"application/json"}>application/json</MenuItem>
                <MenuItem value={"application/x-www-form-urlencoded"}>application/x-www-form-urlencoded</MenuItem>
                <MenuItem value={"application/xhtml+xml"}>application/xhtml+xml</MenuItem>
                <MenuItem value={"application/xml"}>application/xml</MenuItem>
                <MenuItem value={"application/javascript"}>application/javascript</MenuItem>
                <MenuItem value={"multipart/form-data"}>multipart/form-data</MenuItem>
                <MenuItem value={"text/css"}>text/css</MenuItem>
                <MenuItem value={"text/csv"}>text/csv</MenuItem>
                <MenuItem value={"text/html"}>text/html</MenuItem>
                <MenuItem value={"text/json"}>text/json</MenuItem>
                <MenuItem value={"text/plain"}>application/xhtml+xml</MenuItem>
                <MenuItem value={"text/xml"}>application/xhtml+xml</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ContentTypeSelect
import React from 'react';
import { Grid, InputAdornment, IconButton, TextField, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Add from '@material-ui/icons/Add';
import clsx from 'clsx';
import useStyles from './styles'
import HeadersFields from './HeadersFields'

const HeaderPanel = props => {
    const { disabled, handleChangeHeaders, headers } = props
    const [header, setheader] = React.useState({ key: '', value: '' })
    const [headersState, setHeadersState] = React.useState(headers)
    const classes = useStyles();

    const handleAddHeader = event => {
        if (header.key.toString().replace(/\s/g, '').length > 0) {
            setHeadersState([...headersState, header])
            handleChangeHeaders && handleChangeHeaders([...headersState, header])
            setheader({ key: '', value: '' })
        }
    }
    const handleHeaderOnChange = event => {
        setheader({ ...header, [event.target.name]: event.target.value })
    }
    const handleRemoveHeader = index => event => {
        setHeadersState(headersState.filter((value, indexHeader) => indexHeader !== index))
        handleChangeHeaders && handleChangeHeaders(headersState)
    }
    const onPressEnter = event => {
        var keyCode = event.keyCode || event.which;
        if (keyCode == '13') {
            handleAddHeader(event)
            return false;
        }
    }
    return (
        <div className={classes.root} >
            <ExpansionPanel TransitionProps={{ unmountOnExit: true }} disabled={disabled}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                >
                    <Typography className={classes.heading}>Custom Headers</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    className={clsx(classes.margin, classes.textField)}
                                    value={header.key}
                                    onChange={handleHeaderOnChange}
                                    name="key"
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={clsx(classes.margin, classes.textField)}
                                    value={header.value}
                                    onChange={handleHeaderOnChange}
                                    name="value"
                                    onKeyPress={onPressEnter}
                                    autoComplete="off"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position = "end" >
                                                <IconButton
                                                    edge="end"
                                                    onClick={handleAddHeader}
                                                >
                                                    <Add />
                                                </IconButton>
                                            </InputAdornment>
                            ),
                        }}
                    />
                            </Grid>
                        </Grid>
                        <HeadersFields handleRemoveHeader={handleRemoveHeader} headers={headersState} />
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

export default HeaderPanel;
import React, { useState } from 'react'
import SandBox from '../../SandBox'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ContentTypeSelect from '../../Selects/ContentTypeSelect'
import StatusCodeSelect from '../../Selects/StatusCodeSelect'


const useStyles = makeStyles(theme => ({
    gridContainer: {
        textAlign: "center"
    },
    gridSandbox: {
        height: "50%"
    },
    moduleBorderWrap: {
        maxWidth: "250px",
        padding: "1rem",
        position: "relative",
        background: "linear-gradient(to right, red, purple)",
        padding: "3px"
    },
    hidden: {
        visibility: "hidden"
    }
}));


const MockTab = () => {
    const classes = useStyles();

    const [mock, setMock] = useState('')
    const handleClick = () => {
        console.log(mock)

    }
    const handleChangeSandBox = (editorName, value) => {
        setMock(value)
    }

    return (
        <Grid container className={classes.gridContainer}>
            <Grid item xs={12}>
                <ContentTypeSelect />
                <StatusCodeSelect />
            </Grid>
            <Grid container>
                <Grid item md>
                    <Paper className={classes.hidden}></Paper>
                </Grid>
                <Grid item md={6} className={classes.gridSandbox}>
                    <SandBox handleChangeSandBox={handleChangeSandBox} className={classes.moduleBorderWrap} />
                    <Button onClick={handleClick} color="primary" variant="contained" size="large">Create Mock</Button>
                </Grid>
                <Grid item md>
                    <Paper className={classes.hidden} ></Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MockTab;
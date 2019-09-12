import React, { useState } from 'react'
import SandBox from '../../SandBox'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ContentTypeSelect from '../../Selects/ContentTypeSelect'
import StatusCodeSelect from '../../Selects/StatusCodeSelect'


const useStyles = makeStyles(theme => ({
    gridContainer: {
        textAlign: "center"
    },
    gridSandbox:{
        paddingLeft:"25% !important", 
        paddingRight:"25% !important",

    },
    moduleBorderWrap :{
        maxWidth: "250px",
        padding: "1rem",
        position: "relative",
        background: "linear-gradient(to right, red, purple)",
        padding: "3px"
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
        <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item xs={12}>
                <ContentTypeSelect />
                <StatusCodeSelect />
            </Grid>

            <Grid item xs={12} className={ classes.gridSandbox }>
                <SandBox handleChangeSandBox={handleChangeSandBox} className={classes.moduleBorderWrap}/>

                <Button onClick={handleClick} color="primary" variant="contained" size="large">
                    Create Mock
                    </Button>
            </Grid>


        </Grid>
    )
}

export default MockTab;
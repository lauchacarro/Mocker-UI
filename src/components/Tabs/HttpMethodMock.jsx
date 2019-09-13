import React, { useState } from 'react'
import SandBox from '../SandBox'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ContentTypeSelect from '../Selects/ContentTypeSelect'
import StatusCodeSelect from '../Selects/StatusCodeSelect'

const HttpMethodMock = props => {
    const { classes, handleChangeSandBox, needCheck = true } = props;
    const [checked, setCheck] = useState(false)
    return (
        <Grid container className={classes.gridContainer}>
            <Grid item xs={12}>
                {needCheck ?
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event, value) => setCheck(value)}
                                // value="checkedB"
                                color="primary"
                            />
                        }
                        label="Use"
                    /> : null}
                <ContentTypeSelect disable={needCheck && !checked}/>
                <StatusCodeSelect disable={needCheck && !checked}/>
            </Grid>
            <Grid container>
                <Grid item md>
                    <Paper className={classes.hidden}></Paper>
                </Grid>
                <Grid item md={6} className={classes.gridSandbox}>
                    <SandBox handleChangeSandBox={handleChangeSandBox} className={classes.moduleBorderWrap} disable={needCheck && !checked}/>
                </Grid>
                <Grid item md>
                    <Paper className={classes.hidden} ></Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HttpMethodMock;
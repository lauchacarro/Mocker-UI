import React, { useState } from 'react'
import SandBox from '../SandBox'
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ContentTypeSelect from '../Selects/ContentTypeSelect'
import StatusCodeSelect from '../Selects/StatusCodeSelect'
import HeaderPanel from '../HeaderPanel'

const HttpMethodMock = props => {
    const { classes, handleChangeSandBox, handleChangeSelect, handleChangeSwitch, handleChangeHeaders, mock, needCheck } = props;

    const [checked, setChecked] = useState(mock.Active)

    const handleChangeActive = (event, value) => {
        setChecked(value)
        handleChangeSwitch && handleChangeSwitch(event, value)
    }

    return (
        <Grid container className={classes.gridContainer}>
            <Grid item xs={12}>
                {needCheck &&
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checked}
                                onChange={handleChangeActive}
                                inputProps={{
                                    name: 'Active'
                                }}
                                color="primary"
                            />
                        }
                        label="Enable"
                    />}
                <ContentTypeSelect disable={needCheck && !checked} value={mock.ContentType} handleChangeContentType={handleChangeSelect} />
                <StatusCodeSelect disable={needCheck && !checked} value={mock.StatusCode} handleChangeStatusCode={handleChangeSelect} />
            </Grid>
            <Grid container>
                <Grid item md={6} className={classes.gridSandbox}>
                    <SandBox handleChangeSandBox={handleChangeSandBox} content={mock.Body} className={classes.moduleBorderWrap} disable={needCheck && !checked} />
                </Grid>
                <Grid item md>
                    <HeaderPanel disabled={needCheck && !checked} headers={mock.Headers} handleChangeHeaders={handleChangeHeaders} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HttpMethodMock;
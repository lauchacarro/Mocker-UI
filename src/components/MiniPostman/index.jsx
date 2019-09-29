import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../Tabs/TabPanel';
import HeaderPanel from '../HeaderPanel'
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HttpMethodSelect from '../Selects/HttpMethodSelect'
import EditableTable from './EditableTable'
import SandBox from '../SandBox'
import clsx from 'clsx';

import AllTabProps from '../Tabs/AllTabProps'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    center: {
        textAlign: "center"
    },
    orange: {
        color: "#ff8614"
    },
    button: {
        margin: theme.spacing(2),
    },

}));
const MiniPostman = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [tabRequestValue, setTabRequestValue] = useState(0)
    const [requestHeader, setRequestHeader] = useState([])

    function handleTabRequestChange(event, newValue) {
        setTabRequestValue(newValue);
    }

    function handleTabRequestChangeIndex(index) {
        setTabRequestValue(index);
    }

    const handleChangeHeaders = (headers) => {
        setRequestHeader(headers)
    }
    return (
        <div>

            <h1 className={`${classes.center} ${classes.orange}`} >Mini Postman</h1>
            <Paper className={classes.root}>

                <Grid container>


                    <Grid item xs={12}>
                        <HttpMethodSelect />
                        <TextField
                            id="standard-full-width"
                            label="Request"
                            style={{ margin: 8, width: "70vw" }}
                            placeholder="Enter request URL"
                            // helperText="Full width!"

                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button variant="contained" style={{
                            backgroundColor: "#147eff",
                            color: "white"
                        }} className={classes.button}> Send </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Tabs
                            value={tabRequestValue}
                            onChange={handleTabRequestChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Body" {...AllTabProps(0)} />
                            <Tab label="Headers" {...AllTabProps(1)} />
                        </Tabs>

                    </Grid>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={tabRequestValue}
                        onChangeIndex={handleTabRequestChangeIndex}
                    >
                        <TabPanel value={tabRequestValue} index={0} dir={theme.direction}>
                            <SandBox/>
                        </TabPanel>
                        <TabPanel value={tabRequestValue} index={1} dir={theme.direction} style={{ width: "90vw" }}>
                            <EditableTable />
                        </TabPanel>

                    </SwipeableViews>
                </Grid>

            </Paper>
        </div>
    )
}

export default MiniPostman
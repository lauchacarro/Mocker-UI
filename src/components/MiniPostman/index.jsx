import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../Tabs/TabPanel';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HttpMethodSelect from '../Selects/HttpMethodSelect'
import EditableTable from './EditableTable'
import SandBox from '../SandBox'
import DropzoneArea from '../DropzoneArea';
import ContentTypeSelect from '../Selects/ContentTypeSelect'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    title: {
        padding: "30px"
    },
    button: {
        margin: theme.spacing(2),
    },
    paperFullWidth: {
        width: "60vw",
    },
    expansionFullWidth: {
        width: "90vw",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },

}));
const MiniPostman = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [tabRequestValue, setTabRequestValue] = useState(0)
    const [tabRequestBodyValue, setTabRequestBodyValue] = useState(0)
    const [requestHeader, setRequestHeader] = useState([])
    const [requestMethod, setRequestMethod] = useState('GET')
    const [requestBodyContentType, setRequestBodyContentType] = useState('application/json')

    const handleMethodChange = event => {
        setRequestMethod(event.target.value)
    }
    const handleBodyContentTypeChange = event => {
        setRequestBodyContentType(event.target.value)
    }
    function handleTabRequestChange(event, newValue) {
        setTabRequestValue(newValue);
    }

    function handleTabRequestChangeIndex(index) {
        setTabRequestValue(index);
    }
    function handleChangeIndex(index) {
        setTabRequestValue(index);
    }

    const handleTableUpdateData = name => newData => {
       
        if (name === "headers") {
            console.log(name)
            console.log(newData)
            const data = requestHeader;
            data.push(newData);

            setRequestHeader(data)
        }

    }


    const handleChangeHeaders = (headers) => {
        setRequestHeader(headers)
    }
    return (

        <Paper className={classes.root}>
            <h1 className={`${classes.center} ${classes.orange} ${classes.title}`} >Mini Postman</h1>
            <Grid container>
                <Grid item xs={12}>
                    <HttpMethodSelect handleMethodChange={handleMethodChange} value={requestMethod} />
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
                <ExpansionPanel className={classes.expansionFullWidth}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ background: "#ff8614", color: "white" }}
                    >
                        <Typography className={classes.heading}>Settings</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails >
                        <Grid container>

                            <Grid item xs={12}>

                                <Tabs
                                    value={tabRequestValue}
                                    onChange={handleTabRequestChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                    centered
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

                                <TabPanel value={tabRequestValue} index={0} dir={theme.direction} style={{ width: "80vw" }}>
                                    <Tabs

                                        value={tabRequestBodyValue}
                                        onChange={(event, newValue) =>
                                            setTabRequestBodyValue(newValue)
                                        }
                                        aria-label="Vertical tabs example"
                                        className={classes.tabs}
                                        centered
                                    >
                                        <Tab label="None" {...AllTabProps(0)} />
                                        <Tab label="Form Data" {...AllTabProps(1)} />
                                        <Tab label="X-WWW-Form-Urlencoded" {...AllTabProps(2)} />
                                        <Tab label="Raw" {...AllTabProps(3)} />
                                        <Tab label="Binary" {...AllTabProps(4)} />
                                    </Tabs>
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={tabRequestBodyValue}
                                        onChangeIndex={handleChangeIndex}
                                    >
                                        <TabPanel value={tabRequestBodyValue} index={0}>
                                        </TabPanel>
                                        <TabPanel value={tabRequestBodyValue} index={1}>
                                            <EditableTable title={"Form Data"} />
                                        </TabPanel>
                                        <TabPanel value={tabRequestBodyValue} index={2}>
                                            <EditableTable title={"X WWW Form Urlencoded"} />
                                        </TabPanel>
                                        <TabPanel value={tabRequestBodyValue} index={3}>
                                            <Paper className={classes.paperFullWidth}>
                                                <Grid item xs={2} style={{ maxWidth: "100%" }}>
                                                    <ContentTypeSelect value={requestBodyContentType} handleChangeContentType={handleBodyContentTypeChange} />
                                                </Grid>
                                                <Grid item xs={8} style={{ maxWidth: "100%" }}>
                                                    <SandBox />
                                                </Grid>
                                            </Paper>
                                        </TabPanel>
                                        <TabPanel value={tabRequestBodyValue} index={4}>
                                            <DropzoneArea />
                                        </TabPanel>
                                    </SwipeableViews>
                                </TabPanel>
                                <TabPanel value={tabRequestValue} index={1} dir={theme.direction} style={{ width: "90vw" }}>
                                    <EditableTable title={"Headers"} handleTableUpdateData={handleTableUpdateData("headers")} />
                                </TabPanel>

                            </SwipeableViews>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>

        </Paper>

    )
}

export default MiniPostman
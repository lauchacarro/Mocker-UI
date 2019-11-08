import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../Tabs/TabPanel';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './styles'
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
import TabBodyHeader from '../Tabs/TabBodyHeader'
import Loading from '../Loading'
import ExpansionPanelResponse from './ExpansionPanelResponse'
import SnackbarContent from '../CustomSnackbarContent'
import { config } from '../Api/config'

const MiniPostman = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [tabRequestValue, setTabRequestValue] = useState(0)
    const [tabRequestBodyValue, setTabRequestBodyValue] = useState(0)
    const [requestHeader, setRequestHeader] = useState([])
    const [requestFormData, setRequestFormData] = useState([])
    const [requestFormUrlEncoded, setRequestFormUrlEncoded] = useState([])
    const [requestMethod, setRequestMethod] = useState('GET')
    const [requestUrl, setRequestUrl] = useState('')
    const [requestRaw, setRequestRaw] = useState('')
    const [requestBinaryFile, setRequestBinaryFile] = useState()
    const [requestBodyContentType, setRequestBodyContentType] = useState('application/json')
    const [response, setResponse] = useState({ body: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)

    const handleMethodChange = event => setRequestMethod(event.target.value.toUpperCase())

    const handleURLChange = event => setRequestUrl(event.target.value)

    const handleBodyContentTypeChange = event => setRequestBodyContentType(event.target.value)

    const handleTabChange = callbackState => (event, newValue) => callbackState(newValue);

    const handleTabChangeIndex = callbackState => (index) => callbackState(index);

    const handleChangeIndex = callbackState => (index) => callbackState(index);

    const handleChangeSandBox = (editorName, value) => {
        setRequestRaw(value)
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenAlert(false)
    }

    const returnDiffToText = timeDiff => {
        timeDiff = timeDiff / 1000;

        let result = "";
        if (timeDiff < 60) {
            result = timeDiff + " segundos";
        } else {
            let seconds = Math.round(timeDiff % 60);
            timeDiff = Math.floor(timeDiff / 60);
            let minutes = Math.round(timeDiff % 60);
            timeDiff = Math.floor(timeDiff / 60);
            let hours = Math.round(timeDiff % 24);
            timeDiff = Math.floor(timeDiff / 24);
            let days = timeDiff;

            if (days > 0) {
                result = days + " días, " + hours + " horas, " + minutes + " minutos y " + seconds + " segundos";
            } else if (hours > 0) {
                result = hours + " horas, " + minutes + " minutos y " + seconds + " segundos";
            } else {
                result = minutes + " minutos y " + seconds + " segundos";
            }
        }
        return result;
    }
    const handleTableUpdateData = name => newData => {

        if (name === "headers") {
            setRequestHeader(newData)
        }
        if (name === "formdata") {
            setRequestFormData(newData)
        }
        if (name === "formurlencoded") {
            setRequestFormUrlEncoded(newData)
        }

    }
    const onUploadFile = file => {
        setRequestBinaryFile(file)
    }

    const makeRequestBody = () => {
        let body = undefined;

        switch (tabRequestBodyValue) {
            case 1:
                body = new FormData();
                for (let i = 0; i < requestFormData.length; i++) {
                    if (!isNaN(requestFormData[i].value)) {
                        body.append(requestFormData[i].key, parseInt(requestFormData[i].value))
                    }
                    else {
                        body.append(requestFormData[i].key, requestFormData[i].value)
                    }
                }
                break;
            case 2:
                let formdata = new URLSearchParams();
                for (let i = 0; i < requestFormUrlEncoded.length; i++) {
                    formdata.append(requestFormUrlEncoded[i].key, requestFormUrlEncoded[i].value)
                }
                body = formdata
                break;
            case 3:
                body = requestRaw
                break
            case 4:
                body = requestBinaryFile
                break;
        }

        return body;

    }

    const sendRequest = (e) => {
        if (!requestUrl || requestUrl.replace(/ /g, '').length <= 0) {
            setOpenAlert(true)
            return
        }
        setIsLoading(true)
        let response = {}
        let headers = new Headers();
        if (requestHeader.length > 0) {
            requestHeader.map((item) => {
                headers.append(item.key, item.value)
            })
        }

        if (tabRequestBodyValue == 2)
            headers.append("Content-Type", 'application/x-www-form-urlencoded')
        if (tabRequestBodyValue == 3)
            headers.append("Content-Type", requestBodyContentType)
        if (tabRequestBodyValue == 4)
            headers.append("Content-Type", 'text/plain')

        headers.append("Mocker-Url", requestUrl)




        let body = makeRequestBody()
        let request = { method: requestMethod, headers: headers, body: body }
        console.log(request)
        let startTime = new Date();
        fetch(config.Url + "api/postman", request)
            .then(responsefetch => {
                response.statusCode = responsefetch.status
                response.statusText = responsefetch.statusText
                response.headers = responsefetch.headers
                return responsefetch.text()
            })
            .then(data => {
                if (data && data != null) {
                    response.body = data
                    response.bodySize = encodeURI(data).split(/%..|./).length - 1
                    let endTime = new Date();
                    response.time = returnDiffToText(endTime - startTime)
                    setResponse(response)
                }
                setIsLoading(false)
            })
    }
    return (
        <>
            {isLoading ? <Loading /> :
                <Paper className={classes.root}>
                    <h1 className={`${classes.center} ${classes.orange} ${classes.title}`} >Mini Postman</h1>
                    <Grid container>
                        <Grid item xs={12}>
                            <HttpMethodSelect handleMethodChange={handleMethodChange} currentMethods={[]} value={requestMethod} mini={true} title="Method" />
                            <TextField
                                id="standard-full-width"
                                label="Request"
                                style={{ margin: 8, width: "70vw" }}
                                placeholder="Enter request URL"
                                onChange={handleURLChange}
                                autoComplete="off"
                                value={requestUrl}
                                margin="normal"
                                InputLabelProps={{
                                    autoComplete: "off",
                                    shrink: true,
                                }}
                            />
                            <Button variant="contained" style={{
                                backgroundColor: "#147eff",
                                color: "white"
                            }} className={classes.button} onClick={sendRequest}> Send </Button>
                        </Grid>
                        <ExpansionPanel className={classes.expansionFullWidth}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"

                            >
                                <Typography className={classes.heading}>Settings</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
                                <Grid container>
                                    <TabBodyHeader color="primary" onChange={handleTabChange(setTabRequestValue)} value={tabRequestValue} />
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={tabRequestValue}
                                        onChangeIndex={handleTabChangeIndex(setTabRequestValue)}
                                    >

                                        <TabPanel value={tabRequestValue} index={0} dir={theme.direction} className={classes.tabPanel}>
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
                                                    <EditableTable title={"Form Data"} handleTableUpdateData={handleTableUpdateData("formdata")} editable={true} data={requestFormData} />
                                                </TabPanel>
                                                <TabPanel value={tabRequestBodyValue} index={2}>
                                                    <EditableTable title={"X WWW Form Urlencoded"} handleTableUpdateData={handleTableUpdateData("formurlencoded")} editable={true} />
                                                </TabPanel>
                                                <TabPanel value={tabRequestBodyValue} index={3}>
                                                    <Paper className={classes.paperFullWidth}>
                                                        <Grid item xs={2} style={{ maxWidth: "100%" }}>
                                                            <ContentTypeSelect value={requestBodyContentType} handleChangeContentType={handleBodyContentTypeChange} />
                                                        </Grid>
                                                        <Grid item xs={8} style={{ maxWidth: "100%" }}>
                                                            <SandBox handleChangeSandBox={handleChangeSandBox} />
                                                        </Grid>
                                                    </Paper>
                                                </TabPanel>
                                                <TabPanel value={tabRequestBodyValue} index={4}>
                                                    {requestBinaryFile &&
                                                        <Paper className={classes.root}>
                                                            <Typography component="p">
                                                                File: {requestBinaryFile.name}
                                                            </Typography>
                                                        </Paper>}
                                                    <DropzoneArea onUploadFile={onUploadFile} />
                                                </TabPanel>
                                            </SwipeableViews>
                                        </TabPanel>
                                        <TabPanel value={tabRequestValue} index={1} dir={theme.direction} className={classes.tabPanel}>
                                            <EditableTable title={"Headers"} handleTableUpdateData={handleTableUpdateData("headers")} editable={true} />
                                        </TabPanel>
                                    </SwipeableViews>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {response.headers &&
                            <ExpansionPanelResponse response={response} />}
                    </Grid>
                </Paper>}
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
            >
                <SnackbarContent
                    onClose={handleCloseAlert}
                    variant="error"
                    message="Request URL is empty"
                />
            </Snackbar>
        </>

    )
}

export default MiniPostman
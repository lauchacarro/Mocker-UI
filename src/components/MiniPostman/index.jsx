import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

const MiniPostman = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [tabRequestValue, setTabRequestValue] = useState(0)
    const [tabResponseValue, setTabResponseValue] = useState(0)
    const [tabRequestBodyValue, setTabRequestBodyValue] = useState(0)
    const [requestHeader, setRequestHeader] = useState([])
    const [requestFormData, setRequestFormData] = useState([])
    const [requestFormUrlEncoded, setRequestFormUrlEncoded] = useState([])
    const [requestMethod, setRequestMethod] = useState('GET')
    const [requestUrl, setRequestUrl] = useState('')
    const [requestBodyContentType, setRequestBodyContentType] = useState('application/json')
    const [response, setResponse] = useState({ body: '' })
    const [isLoading, setIsLoading] = useState(false)

    const handleMethodChange = event => setRequestMethod(event.target.value.toUpperCase())

    const handleURLChange = event => setRequestUrl(event.target.value)

    const handleBodyContentTypeChange = event => setRequestBodyContentType(event.target.value)

    const handleTabChange = callbackState => (event, newValue) => callbackState(newValue);

    const handleTabChangeIndex = callbackState => (index) => callbackState(index);

    const handleChangeIndex = callbackState => (index) => callbackState(index);


    const handleTableUpdateData = name => newData => {

        if (name === "headers") {
            const data = requestHeader;
            data.push(newData);
            setRequestHeader(data)
        }
        if (name === "formdata") {
            const data = requestFormData;
            data.push(newData);
            setRequestFormData(data)
        }
        if (name === "formurlencoded") {
            const data = requestFormUrlEncoded;
            data.push(newData);
            setRequestFormUrlEncoded(data)
        }

    }

    const headersToObject = headers => {
        let headersObj = []
        for (const pair of headers.entries()) {
            headersObj.push({ key: pair[0], value: pair[1] })
        }
        return headersObj
    }

    const sendRequest = (e) => {
        setIsLoading(true)
        let response = {}
        let headers = new Headers();
        if (requestHeader.length > 0) {
            requestHeader.map((item) => {
                headers.append(item.key, item.value)
            })
        }
        let request = { method: requestMethod, headers: headers }

        fetch(requestUrl, request)
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
                            <HttpMethodSelect handleMethodChange={handleMethodChange} currentMethods={[]} value={requestMethod} mini={true} />
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
                                                    <EditableTable title={"Form Data"} handleTableUpdateData={handleTableUpdateData("formdata")} editable={true} />
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
                                                            <SandBox />
                                                        </Grid>
                                                    </Paper>
                                                </TabPanel>
                                                <TabPanel value={tabRequestBodyValue} index={4}>
                                                    <DropzoneArea />
                                                </TabPanel>
                                            </SwipeableViews>
                                        </TabPanel>
                                        <TabPanel value={tabRequestValue} index={1} dir={theme.direction} style={{ width: "80vw" }}>
                                            <EditableTable title={"Headers"} handleTableUpdateData={handleTableUpdateData("headers")} editable={true} />
                                        </TabPanel>

                                    </SwipeableViews>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {response.headers &&
                            <ExpansionPanel className={classes.expansionFullWidth}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"

                                >
                                    <div style={{ width: "100%" }}>
                                        <Typography className={classes.heading}>Response</Typography>

                                    </div>
                                    <div style={{ width: "100%", textAlign: "right" }}>
                                        <label style={{ color: "green" }}>{response.statusCode + " " + response.statusText}</label>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails >
                                    <Grid container>
                                        <TabBodyHeader color="secondary" onChange={handleTabChange(setTabResponseValue)} value={tabResponseValue} />
                                        <SwipeableViews
                                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                            index={tabResponseValue}
                                            onChangeIndex={handleTabChangeIndex(setTabResponseValue)}
                                        >

                                            <TabPanel value={tabResponseValue} index={0} dir={theme.direction} style={{ width: "80vw" }}>
                                                <textarea style={{ width: "100%", height: "20vh" }} value={response.body}></textarea>
                                            </TabPanel>
                                            <TabPanel value={tabResponseValue} index={1} dir={theme.direction} style={{ width: "80vw" }}>
                                                <EditableTable data={headersToObject(response.headers)} title={"Headers"} handleTableUpdateData={handleTableUpdateData("headers")} />
                                            </TabPanel>
                                        </SwipeableViews>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>}
                    </Grid>
                </Paper>}
        </>

    )
}

export default MiniPostman
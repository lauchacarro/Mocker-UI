import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from '../Tabs/TabPanel';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './styles'
import EditableTable from './EditableTable'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TabBodyHeader from '../Tabs/TabBodyHeader'

const ExpansionPanelResponse = props => {
    const { response } = props
    const [tabResponseValue, setTabResponseValue] = useState(0)
    const classes = useStyles();
    const theme = useTheme();
    const handleTabChangeIndex = (index) => {
        setTabResponseValue(index)
    }
    const handleTabChange = (event, newValue) => {
        setTabResponseValue(newValue)
    }

    const headersToObject = headers => {
        let headersObj = []
        for (const pair of headers.entries()) {
            headersObj.push({ key: pair[0], value: pair[1] })
        }
        return headersObj
    }
    return (
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
                    <label style={{ color: "green", paddingRight: "20px" }}>{response.statusCode + " " + response.statusText}</label>
                    <label style={{ color: "green" }}>{response.time}</label>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails >
                <Grid container>
                    <TabBodyHeader color="secondary" onChange={handleTabChange} value={tabResponseValue} />
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={tabResponseValue}
                        onChangeIndex={handleTabChangeIndex}
                    >

                        <TabPanel value={tabResponseValue} index={0} dir={theme.direction} className={classes.tabPanel}>
                            <textarea className={classes.responseTextArea} value={response.body}></textarea>
                        </TabPanel>
                        <TabPanel value={tabResponseValue} index={1} dir={theme.direction} className={classes.tabPanel}>
                            <EditableTable data={headersToObject(response.headers)} title={"Headers"} />
                        </TabPanel>
                    </SwipeableViews>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default ExpansionPanelResponse;
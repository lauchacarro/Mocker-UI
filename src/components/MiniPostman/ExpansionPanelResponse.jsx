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

const ExpansionPanelResponse = props => {
    const { handleTabChange, handleTabChangeIndex, handleTableUpdateData, response, tabResponseValue } = props

    const classes = useStyles();
    const theme = useTheme();
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
                    <label style={{ color: "green" }}>{response.statusCode + " " + response.statusText}</label>
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
                            <EditableTable data={headersToObject(response.headers)} title={"Headers"} handleTableUpdateData={handleTableUpdateData("headers")} />
                        </TabPanel>
                    </SwipeableViews>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default ExpansionPanelResponse;
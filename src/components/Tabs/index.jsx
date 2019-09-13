import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import DropzoneArea from '../DropzoneArea';
import MockTab from './MockTab';
import TabPanel from './TabPanel'
import AllTabProps from './AllTabProps'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}));

export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function handleChangeIndex(index) {
        setValue(index);
    }

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="Mock" {...AllTabProps(0)} />
                <Tab label="File Cloud" {...AllTabProps(1)} />
            </Tabs>

            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <MockTab/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <DropzoneArea/>
                </TabPanel>
            </SwipeableViews>
        </Paper>
    );
}
import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'
import AllTabProps from './AllTabProps'
import HttpMethodMock from './HttpMethodMock'

const useStyles = makeStyles(theme => ({
    gridContainer: {
        textAlign: "center"
    },
    gridSandbox: {
        height: "50%"
    },
    moduleBorderWrap: {
        maxWidth: "250px",
        padding: "1rem",
        position: "relative",
        background: "linear-gradient(to right, red, purple)",
        padding: "3px"
    },
    hidden: {
        visibility: "hidden"
    }
}));

const MockTab = () => {
    const classes = useStyles();

    const [mock, setMock] = useState('')
    const [tabindex, setTabindex] = React.useState(0);
    const theme = useTheme();
    const handleClick = () => {
        console.log(mock)

    }
    const handleChangeSandBox = (editorName, value) => {
        setMock(value)
    }
    function handleChangeTab(event, newValue) {
        setTabindex(newValue);
    }

    function handleChangeTabIndex(index) {
        setTabindex(index);
    }
    return (
        <div>
            <Tabs
                value={tabindex}
                onChange={handleChangeTab}
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="full width tabs example"
                centered
            >
                <Tab label="GET" {...AllTabProps(0)} />
                <Tab label="POST" {...AllTabProps(1)} />
                <Tab label="PUT" {...AllTabProps(2)} />
                <Tab label="PATCH" {...AllTabProps(3)} />
                <Tab label="DELETE" {...AllTabProps(4)} />
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={tabindex}
                onChangeIndex={handleChangeTabIndex}
            >
                <TabPanel value={tabindex} index={0} dir={theme.direction}>
                    <HttpMethodMock classes={classes} handleChangeSandBox={handleChangeSandBox} needCheck={false}/>
                </TabPanel>

                <TabPanel value={tabindex} index={1} dir={theme.direction}>
                    <HttpMethodMock classes={classes} handleChangeSandBox={handleChangeSandBox} />
                </TabPanel>

                <TabPanel value={tabindex} index={2} dir={theme.direction}>
                    <HttpMethodMock classes={classes} handleChangeSandBox={handleChangeSandBox} />
                </TabPanel>

                <TabPanel value={tabindex} index={3} dir={theme.direction}>
                    <HttpMethodMock classes={classes} handleChangeSandBox={handleChangeSandBox} />
                </TabPanel>

                <TabPanel value={tabindex} index={4} dir={theme.direction}>
                    <HttpMethodMock classes={classes} handleChangeSandBox={handleChangeSandBox} />
                </TabPanel>
            </SwipeableViews>
            <Button onClick={handleClick} color="primary" variant="contained" size="large">Create Mock</Button>
        </div>
    )
}

export default MockTab;
import React, { useState } from 'react'
import SandBox from '../../SandBox'
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import ContentTypeSelect from '../../Selects/ContentTypeSelect'
import StatusCodeSelect from '../../Selects/StatusCodeSelect'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}
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
                <Tab label="GET" {...a11yProps(0)} />
                <Tab label="POST" {...a11yProps(1)} />
                <Tab label="PUT" {...a11yProps(2)} />
                <Tab label="PATCH" {...a11yProps(3)} />
                <Tab label="DELETE" {...a11yProps(4)} />
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={tabindex}
                onChangeIndex={handleChangeTabIndex}
            >
                <TabPanel value={tabindex} index={0} dir={theme.direction}>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12}>
                            <ContentTypeSelect />
                            <StatusCodeSelect />
                        </Grid>
                        <Grid container>
                            <Grid item md>
                                <Paper className={classes.hidden}></Paper>
                            </Grid>
                            <Grid item md={6} className={classes.gridSandbox}>
                                <SandBox handleChangeSandBox={handleChangeSandBox} className={classes.moduleBorderWrap} />
                                <Button onClick={handleClick} color="primary" variant="contained" size="large">Create Mock</Button>
                            </Grid>
                            <Grid item md>
                                <Paper className={classes.hidden} ></Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabindex} index={1} dir={theme.direction}>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12}>
                            <ContentTypeSelect />
                            <StatusCodeSelect />
                        </Grid>
                        <Grid container>
                            <Grid item md>
                                <Paper className={classes.hidden}></Paper>
                            </Grid>
                            <Grid item md={6} className={classes.gridSandbox}>
                                <SandBox handleChangeSandBox={handleChangeSandBox} className={classes.moduleBorderWrap} />
                                <Button onClick={handleClick} color="primary" variant="contained" size="large">Create Mock</Button>
                            </Grid>
                            <Grid item md>
                                <Paper className={classes.hidden} ></Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabindex} index={2} dir={theme.direction}>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12}>
                            <ContentTypeSelect />
                            <StatusCodeSelect />
                        </Grid>
                        <Grid container>
                            <Grid item md>
                                <Paper className={classes.hidden}></Paper>
                            </Grid>
                            <Grid item md={6} className={classes.gridSandbox}>
                                <SandBox handleChangeSandBox={handleChangeSandBox} className={classes.moduleBorderWrap} />
                                <Button onClick={handleClick} color="primary" variant="contained" size="large">Create Mock</Button>
                            </Grid>
                            <Grid item md>
                                <Paper className={classes.hidden} ></Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabindex} index={3} dir={theme.direction}>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12}>
                            <ContentTypeSelect />
                            <StatusCodeSelect />
                        </Grid>
                        <Grid container>
                            <Grid item md>
                                <Paper className={classes.hidden}></Paper>
                            </Grid>
                            <Grid item md={6} className={classes.gridSandbox}>
                                <SandBox handleChangeSandBox={handleChangeSandBox} className={classes.moduleBorderWrap} />
                                <Button onClick={handleClick} color="primary" variant="contained" size="large">Create Mock</Button>
                            </Grid>
                            <Grid item md>
                                <Paper className={classes.hidden} ></Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabindex} index={4} dir={theme.direction}>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12}>
                            <ContentTypeSelect />
                            <StatusCodeSelect />
                        </Grid>
                        <Grid container>
                            <Grid item md>
                                <Paper className={classes.hidden}></Paper>
                            </Grid>
                            <Grid item md={6} className={classes.gridSandbox}>
                                <SandBox handleChangeSandBox={handleChangeSandBox} className={classes.moduleBorderWrap} />
                                <Button onClick={handleClick} color="primary" variant="contained" size="large">Create Mock</Button>
                            </Grid>
                            <Grid item md>
                                <Paper className={classes.hidden} ></Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>
            </SwipeableViews>

        </div>
    )
}

export default MockTab;
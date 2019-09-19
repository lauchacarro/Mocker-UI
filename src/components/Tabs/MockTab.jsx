import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'
import AllTabProps from './AllTabProps'
import HttpMethodMock from './HttpMethodMock'
import { validateJson, validateXML } from '../../helpers/Validations'
import { CreateMock } from '../Api'
import { config } from '../Api/config'
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loading from '../Loading'

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
    },
    buttonCreate: {
        textAlign: "center",
        width: "100%"
    }
}));

const MockTab = () => {
    const classes = useStyles();
    const mockDefault = {
        Active: false,
        Body: '{"Hello" : "World"}',
        ContentType: "application/json",
        StatusCode: 200,
        Headers: [],
        Charset: "UTF-8"
    }
    const [mockGet, setMockGet] = useState({ ...mockDefault, Active: true })
    const [mockPost, setMockPost] = useState(mockDefault)
    const [mockPut, setMockPut] = useState(mockDefault)
    const [mockPatch, setMockPatch] = useState(mockDefault)
    const [mockDelete, setMockDelete] = useState(mockDefault)
    const [tabindex, setTabindex] = React.useState(0);

    const [openDialog, setOpenDialog] = React.useState();
    const [downloadLink, setDownloadLink] = React.useState('');
    const [isLoading, setLoading] = React.useState(false)

    const theme = useTheme();
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const handleClick = () => {
        setLoading(true)
        CreateMock(mockGet, mockPost, mockPut, mockPatch, mockDelete)
            .then(response => response.json()).then(response => {
                setLoading(false)
                setOpenDialog(true);
                setDownloadLink(config.Url + "api/" + response.guid)
            });
    }
    const handleChangeHeaders = method => (headers) => {
        changeMock(method, "Headers", headers)
    }

    const handleChangeSandBox = method => (editorName, value) => {
        changeMock(method, "Body", value)
    }

    const handleChangeSelect = method => (event) => {
        changeMock(method, event.target.name, event.target.value)
    }

    const handleChangeSwitch = method => (event, value) => {
        changeMock(method, "Active", value)
    }
    const changeMock = (method, name, value) => {
        switch (method) {
            case "GET":
                setMockGet({ ...mockGet, [name]: value })
                break;
            case "POST":
                setMockPost({ ...mockPost, [name]: value })
                break;
            case "PUT":
                setMockPut({ ...mockPut, [name]: value })
                break;
            case "PATCH":
                setMockPatch({ ...mockPatch, [name]: value })
                break;
            case "DELETE":
                setMockDelete({ ...mockDelete, [name]: value })
                break;
        }
    }
    function handleChangeTab(event, newValue) {
        setTabindex(newValue);
    }

    function handleChangeTabIndex(index) {
        setTabindex(index);
    }
    const validateBody = () => {
        if (validateJson(mockGet.Body)) {
            alert("GET es JSON")
        }
        else {
            alert("GET no es Json")
        }
        if (validateXML(mockGet.Body)) {
            alert("GET es CSV")
        }
        else {
            alert("GET no es CSV")
        }
    }
    function handleCloseDialog() {
        setOpenDialog(false);
    }
    return (
        <div>
            {isLoading ? <Loading /> :
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
                            <HttpMethodMock classes={classes} mock={mockGet} handleChangeSandBox={handleChangeSandBox("GET")} handleChangeSelect={handleChangeSelect("GET")} handleChangeSwitch={handleChangeSwitch("GET")} handleChangeHeaders={handleChangeHeaders("GET")} needCheck={false} />
                        </TabPanel>

                        <TabPanel value={tabindex} index={1} dir={theme.direction}>
                            <HttpMethodMock classes={classes} mock={mockPost} handleChangeSandBox={handleChangeSandBox("POST")} handleChangeSelect={handleChangeSelect("POST")} handleChangeSwitch={handleChangeSwitch("POST")} handleChangeHeaders={handleChangeHeaders("POST")} />
                        </TabPanel>

                        <TabPanel value={tabindex} index={2} dir={theme.direction}>
                            <HttpMethodMock classes={classes} mock={mockPut} handleChangeSandBox={handleChangeSandBox("PUT")} handleChangeSelect={handleChangeSelect("PUT")} handleChangeSwitch={handleChangeSwitch("PUT")} handleChangeHeaders={handleChangeHeaders("PUT")} />
                        </TabPanel>

                        <TabPanel value={tabindex} index={3} dir={theme.direction}>
                            <HttpMethodMock classes={classes} mock={mockPatch} handleChangeSandBox={handleChangeSandBox("PATCH")} handleChangeSelect={handleChangeSelect("PATCH")} handleChangeSwitch={handleChangeSwitch("PATCH")} handleChangeHeaders={handleChangeHeaders("PATCH")} />
                        </TabPanel>

                        <TabPanel value={tabindex} index={4} dir={theme.direction}>
                            <HttpMethodMock classes={classes} mock={mockDelete} handleChangeSandBox={handleChangeSandBox("DELETE")} handleChangeSelect={handleChangeSelect("DELETE")} handleChangeSwitch={handleChangeSwitch("DELETE")} handleChangeHeaders={handleChangeHeaders("DELETE")} />
                        </TabPanel>
                    </SwipeableViews>
                    <Button onClick={handleClick} className={classes.buttonCreate} color="primary" variant="contained" size="large">Create Mock</Button>
                </div>
            }
            {openDialog ?
                <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <a href={downloadLink}>Descargar archivo</a>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Disagree
                    </Button>
                        <Button onClick={handleCloseDialog} color="primary">
                            Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                : null}
        </div>
    )
}

export default MockTab;
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useTheme } from '@material-ui/core/styles';
import { Button, Tabs, Tab, Slide, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Snackbar } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from './TabPanel'
import AllTabProps from './AllTabProps'
import HttpMethodMock from './HttpMethodMock'
import ValidateMock from '../../helpers/Validations'
import { CreateMock } from '../Api'
import { config } from '../Api/config'
import Loading from '../Loading'
import SnackbarContent from '../CustomSnackbarContent'
import useStyles from './mockTabStyles'
import { mockDefault } from '../../assets/mockDefault'
import Add from '@material-ui/icons/Add';
import HttpMethodSelect from '../Selects/HttpMethodSelect'

const MockTab = forwardRef((props, ref) => {
    const classes = useStyles();
    const [mocks, setMocks] = useState([
        { ...mockDefault, HttpMethod: 'GET', Active: true },
        { ...mockDefault, HttpMethod: 'POST' },
        { ...mockDefault, HttpMethod: 'PUT' },
        { ...mockDefault, HttpMethod: 'DELETE' }
    ])
    const [tabindex, setTabindex] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState();
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [downloadLink, setDownloadLink] = React.useState('');
    const [isLoading, setLoading] = React.useState(false)
    const [addingMock, setAddingMock] = React.useState(false)

    const theme = useTheme();
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    let currentMethods = []
    for (let i = 0; i < mocks.length; i++) {
        currentMethods.push(mocks[i].HttpMethod);
    }
    useEffect(() => { })

    const handleClick = () => {
        let isValidationSuccess = true;
        mocks.forEach((mock, index, array) => {
            const result = ValidateMock(mock)
            if (result.error) {
                isValidationSuccess = !result.error;
                setAlertMessage(result.message);
                setOpenAlert(result.error);
                return
            }
        })

        if (isValidationSuccess) {
            setLoading(true)
            CreateMock(mocks)
                .then(response => response.json()).then(response => {
                    setLoading(false)
                    setOpenDialog(true);
                    setDownloadLink(config.Url + "api/" + response.guid)
                });
        }
    }
    useImperativeHandle(ref, () => ({
        save() {
            handleClick()
        }
    }));
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenAlert(false)
    }
    const handleChangeHeaders = method => (headers) =>
        changeMock(method, "Headers", headers)

    const handleChangeSandBox = method => (editorName, value) =>
        changeMock(method, "Body", value)

    const handleChangeSelect = method => (event) =>
        changeMock(method, event.target.name, event.target.value)

    const handleChangeSwitch = method => (event, value) =>
        changeMock(method, "Active", value)

    const handleMethodSelectClose = event => {
        if (!event.target.value)
            setAddingMock(false)
    }
    const handleMethodChange = event => {
        addMock(event.target.value)
    }
    const addMock = (httpMethod) => {
        mocks.push({ ...mockDefault, HttpMethod: httpMethod })
        setMocks(mocks)
    }
    const changeMock = (method, name, value) => {
        const mockChangedIndex = mocks.findIndex(mock => {
            return mock.HttpMethod === method
        })
        value = typeof value === 'string' && name === 'StatusCode' ? parseInt(value) : value;
        mocks.splice(mockChangedIndex, 0, { ...mocks[mockChangedIndex], [name]: value })
        mocks.splice(mockChangedIndex + 1, 1)
        setMocks(mocks)
    }
    const handleChangeTab = (event, newValue) =>
        handleChangeTabIndex(newValue);

    const handleChangeTabIndex = (index) => {
        if (index === mocks.length) {
            if (index !== tabindex || (index === tabindex && !addingMock)) {
                setAddingMock(true)
            }
        }
        else if (addingMock) {
            setAddingMock(false)
        }
        setTabindex(index);
    }

    const handleCloseDialog = () =>
        setOpenDialog(false);

    return (
        <>
            {isLoading ? <Loading /> :
                <>
                    <Tabs
                        value={tabindex}
                        onChange={handleChangeTab}

                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="full width tabs example"
                        centered
                    >
                        {mocks.map((mock, index) => {
                            return <Tab label={mock.HttpMethod} {...AllTabProps(index)} />
                        })}
                        <Tab label={addingMock ? <HttpMethodSelect handleSelectClose={handleMethodSelectClose} handleMethodChange={handleMethodChange} currentMethods={currentMethods} title="Add Mock"/> : <Add />} {...AllTabProps(mocks.length)} />

                    </Tabs>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={tabindex}
                        onChangeIndex={handleChangeTabIndex}
                    >
                        {mocks.map((mock, index) => {
                            return <TabPanel value={tabindex} index={index} dir={theme.direction}>
                                <HttpMethodMock classes={classes} mock={mock} handleChangeSandBox={handleChangeSandBox(mock.HttpMethod)} handleChangeSelect={handleChangeSelect(mock.HttpMethod)} handleChangeSwitch={handleChangeSwitch(mock.HttpMethod)} handleChangeHeaders={handleChangeHeaders(mock.HttpMethod)} needCheck={mock.HttpMethod !== "GET"} />
                            </TabPanel>
                        })}

                    </SwipeableViews>
                </>
            }
            {openDialog &&
                <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Congratulations!!! Mock Created"}</DialogTitle>
                    <DialogContent>
                        <p>Share the link with whoever you want.</p>
                        <DialogContentText id="alert-dialog-slide-description">
                            <a href={downloadLink} target="_blank" rel="noopener noreferrer">{downloadLink} </a>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Close
                    </Button>
                    </DialogActions>
                </Dialog>}
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
                    message={alertMessage}
                />
            </Snackbar>

        </>
    )
})

export default MockTab;
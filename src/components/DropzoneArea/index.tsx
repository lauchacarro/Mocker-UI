import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Loading from '../Loading'
export default function DropzoneDialogExample() {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false)

    const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleSave = (files: File[]) => {
        if (files && files.length > 0) {
            sendRequest(files[0])
        }

    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    const sendRequest = (file: File) => {

        if (!openDialog) {

            const formData = new FormData();
            formData.append("file", file, file.name);


            setLoading(true)
            fetch("https://mocker-desa.herokuapp.com/api/files", {
                method: 'POST',
                body: formData
            }).then(response => response.text())
                .then(response => {

                    setLoading(false)

                    setOpenDialog(true);
                    console.log(response);
                });
        }

    }

    return (
        <div>
            {isLoading ? <Loading /> :
                <DropzoneArea
                    showPreviews={false}
                    maxFileSize={5000000}
                    filesLimit={1}
                    onChange={handleSave} />}
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <a href={"https://mocker-desa.herokuapp.com/api/files/" + "7744283a-668e-46c2-a144-df0bdb6a3aa6"}>Descargar archivo</a>
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
        </div>

    );

}
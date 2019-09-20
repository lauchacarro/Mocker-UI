import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { CreateFile } from '../Api'
import Loading from '../Loading'
import { config } from '../Api/config'
import ToyZone from "./ToyZone";
export default function DropzoneDialogExample() {
    const [openDialog, setOpenDialog] = React.useState();
    const [downloadLink, setDownloadLink] = React.useState('');
    const [isLoading, setLoading] = React.useState(false)

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleSave = (files) => {
        if (files && files.length > 0) {
            sendRequest(files[0])
        }
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    const sendRequest = (file) => {
        if (!openDialog) {
            setLoading(true)
            CreateFile(file).then(response => response.json())
                .then(response => {
                    setLoading(false)
                    setOpenDialog(true);
                    setDownloadLink(config.Url + "api/files/" + response.guid)
                });
        }
    }

    return (
        <div>
            {isLoading ? <Loading /> :
                <ToyZone onFilesAdded={handleSave} />
            }
            {openDialog ?
                <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Congratulations!!! File Uploaded"}</DialogTitle>
                    <DialogContent>
                        <p>Share the link with whoever you want.</p>
                        <DialogContentText id="alert-dialog-slide-description">
                            <a href={downloadLink} target="_blank">{downloadLink}</a>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Close
                    </Button>
                    </DialogActions>
                </Dialog>
                : null}

        </div>

    );

}
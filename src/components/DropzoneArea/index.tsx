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

interface OnFetchProp {
    onFetch: (files: any) => void;

}
export default function DropzoneDialogExample(props: OnFetchProp) {

    const [file, setfile] = useState<File>()
    const [openDialog, setOpenDialog] = React.useState(false);
    const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });


    React.useEffect(() => {
        if (file) {
            sendRequest(file)
        }
    });

    const handleSave = (files: File[]) => {
        if (files && files.length > 0)
            setfile(files[0])
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    const sendRequest = (file: File) => {

        if (!openDialog) {
            console.log(openDialog)
            const formData = new FormData();
            formData.append("file", file, file.name);
            props.onFetch(true)
            fetch("https://mocker-desa.herokuapp.com/api/files", {
                method: 'POST',
                body: formData
            }).then(response => response.text())
                .then(response => {
                    setOpenDialog(true);
                    props.onFetch(false);
                    setfile(undefined)
                    console.log(response);
                });
        }

    }

    return (
        <div>
            <DropzoneArea
                showPreviews={false}
                maxFileSize={5000000}
                filesLimit={1}
                onChange={handleSave} />
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
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
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
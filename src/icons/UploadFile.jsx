import React from 'react'
import Icon from '@material-ui/core/Icon';
import cloudUpload from './svg/cloud-upload.svg'

const UploadFile = props => {

    return (
        <Icon fontSize="large" color="primary" style={{ fontSize: "10rem" }}>
            <img src={cloudUpload} height="100vh" alt="File Cloud"/>
        </Icon>
    )
}
export default UploadFile
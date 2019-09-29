import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import cloudUpload from './svg/cloud-upload.svg'

const UploadFile = props => {

    return (
        <Icon fontSize="large" color="primary" style={{ fontSize: "10rem" }}>
            <img src={cloudUpload} height="100vh" />
        </Icon>
    )
}
export default UploadFile
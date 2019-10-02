import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import github from './svg/github.svg'

const GitHubIcon = props => {

    return (
        <Icon {...props}>
            <img src={github} height="24px" width="24px" />
        </Icon>
    )
}
export default GitHubIcon
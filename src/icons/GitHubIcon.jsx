import React from 'react'
import Icon from '@material-ui/core/Icon';
import github from './svg/github.svg'

const GitHubIcon = props => {

    return (
        <Icon {...props}>
            <img src={github} height="24px" width="24px" alt="Github Repository" />
        </Icon>
    )
}
export default GitHubIcon
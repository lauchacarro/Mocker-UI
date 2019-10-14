import React, { useState } from 'react';
import clsx from 'clsx';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import useStyles from './styles'
import { contentTypes } from '../../assets/contentTypes'

const ContentTypeSelect = props => {
    const { disable, handleChangeContentType, value } = props
    const [contentTypeState, setContentTypeState] = useState(value)
    const classes = useStyles();

    const handleChangeValue = (event) => {
        setContentTypeState(event.target.value)
        handleChangeContentType && handleChangeContentType(event);
    }

    return (
        <FormControl className={clsx(classes.formControl, classes.paddingBottom50)} disabled={disable}>
            <InputLabel htmlFor="type-simple">Content Type</InputLabel>
            <Select
                value={contentTypeState}
                onChange={handleChangeValue}
                inputProps={{
                    name: 'ContentType',
                    id: 'type-simple',
                }}
            >
                {contentTypes.map((contentType) => {
                    return <MenuItem value={contentType.fullname}>{contentType.alias}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}

export default ContentTypeSelect
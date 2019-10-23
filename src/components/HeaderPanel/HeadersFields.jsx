import { IconButton, TextField, InputAdornment, Grid } from '@material-ui/core';
import React from 'react';
import Remove from '@material-ui/icons/Remove';
import clsx from 'clsx';
import useStyles from './styles'
import PropTypes from 'prop-types';

const HeadersFields = props => {

    const { headers, handleRemoveHeader } = props
    const classes = useStyles();

    return (
        <>
            {
                headers.map(function (header, index) {
                    return <Grid container spacing={3} className={classes.gridHeaderAdded}>
                        <Grid item xs={6}>
                            <TextField
                                className={clsx(classes.margin, classes.textField)}
                                disabled
                                value={header.key}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={clsx(classes.margin, classes.textField)}
                                disabled
                                value={header.value}
                                InputProps={{
                                    endAdornment: (
                                        <>
                                            {handleRemoveHeader && <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={handleRemoveHeader(index)}
                                                >
                                                    <Remove />
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                        </>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                })
            }
        </>
    )
}

HeadersFields.propTypes = {
    headers: PropTypes.arrayOf(
        PropTypes.exact({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleRemoveHeader: PropTypes.func
}

export default HeadersFields
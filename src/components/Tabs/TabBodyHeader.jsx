import React from 'react'
import { Grid, Tabs, Tab } from '@material-ui/core'
import AllTabProps from './AllTabProps'

const TabBodyHeader = props => {
    const { color, onChange, value } = props
    return (
        <Grid item xs={12}>
            <Tabs
                value={value}
                onChange={onChange}
                indicatorColor={color}
                textColor={color}
                variant="fullWidth"
                aria-label="full width tabs example"
                centered
            >
                <Tab label="Body" {...AllTabProps(0)} />
                <Tab label="Headers" {...AllTabProps(1)} />
            </Tabs>
        </Grid>
    )
}

export default TabBodyHeader;
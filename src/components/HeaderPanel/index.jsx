import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        width: '75%',
        paddingLeft: "1vh",
        margin: "0 auto"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    gridHeaderAdded: {
        paddingTop: "12px",
        color: "grey"
    },
    textHeaderAdded: {
        color: "grey"
    }
}));

const HeaderPanel = props => {
    const [expanded, setExpanded] = React.useState('panel1');
    const [headers, setHeaders] = React.useState([])
    const [header, setheader] = React.useState({ key: "", value: "" })
    const classes = useStyles();
    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const handleAddHeader = event => {
        setHeaders([...headers, header])
    }
    const handleHeaderOnChange = event => {
        setheader({ ...header, [event.target.name]: [event.target.value] })
    }
    return (
        <div className={classes.root} >
            <ExpansionPanel TransitionProps={{ unmountOnExit: true }} >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Custom Headers</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={3}>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-adornment-password"
                                    className={clsx(classes.margin, classes.textField)}

                                    value={header.key}
                                    onChange={handleHeaderOnChange}
                                    name="key"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-adornment-password"
                                    className={clsx(classes.margin, classes.textField)}

                                    value={header.value}
                                    onChange={handleHeaderOnChange}
                                    name="value"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    aria-label="toggle password visibility"
                                                    onClick={handleAddHeader}
                                                // onMouseDown={handleMouseDownPassword}
                                                >
                                                    <Add />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {headers.map(function (header) {
                            return <Grid container spacing={3} className={classes.gridHeaderAdded}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="filled-adornment-password"
                                        className={clsx(classes.margin, classes.textField)}
                                        disable
                                        value={header.key}
                                        // onChange={handleChange}
                                        name="code"
                                    /></Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="filled-adornment-password"
                                        className={clsx(classes.margin, classes.textField)}
                                        disable
                                        value={header.value}
                                        // onChange={handleChange}
                                        name="code"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="toggle password visibility"
                                                     onClick={handleClickShowPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    >
                                                        <Remove />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        })}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )

}

export default HeaderPanel;
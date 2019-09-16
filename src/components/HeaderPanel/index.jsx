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
    const [header, setheader] = React.useState({ keyH: "", valueH: "" })
    const classes = useStyles();
    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const handleAddHeader = event => {
        if (header.keyH.toString().replace(/\s/g, '').length > 0) {
            setHeaders([...headers, header])
            setheader({ keyH: "", valueH: "" })
        }
    }
    const handleHeaderOnChange = event => {
        setheader({ ...header, [event.target.name]: [event.target.value] })
    }
    const handleRemoveHeader = index => event => {
        setHeaders(headers.filter((value, indexHeader) => indexHeader != index))
    }
    return (
        <div className={classes.root} >
            <ExpansionPanel TransitionProps={{ unmountOnExit: true }} >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                >
                    <Typography className={classes.heading}>Custom Headers</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    className={clsx(classes.margin, classes.textField)}
                                    value={header.keyH}
                                    onChange={handleHeaderOnChange}
                                    name="keyH"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={clsx(classes.margin, classes.textField)}
                                    value={header.valueH}
                                    onChange={handleHeaderOnChange}
                                    name="valueH"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={handleAddHeader}
                                                >
                                                    <Add />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {headers.map(function (header, index) {
                            return <Grid container spacing={3} className={classes.gridHeaderAdded}>
                                <Grid item xs={6}>
                                    <TextField
                                        className={clsx(classes.margin, classes.textField)}
                                        disabled
                                        value={header.keyH}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        className={clsx(classes.margin, classes.textField)}
                                        disabled
                                        value={header.valueH}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={handleRemoveHeader(index)}
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
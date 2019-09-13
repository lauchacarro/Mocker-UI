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
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        paddingLeft:"1vh"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const HeaderPanel = props => {
    const [expanded, setExpanded] = React.useState('panel1');
    const classes = useStyles();
    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
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
                <TextField
                    id="filled-adornment-password"
                    className={clsx(classes.margin, classes.textField)}
                    
                    // value={statusCode}
                    // onChange={handleChange}
                    name="code"
                />
                 <TextField
                    id="filled-adornment-password"
                    className={clsx(classes.margin, classes.textField)}
              
                    // value={statusCode}
                    // onChange={handleChange}
                    name="code"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    aria-label="toggle password visibility"
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                >
                                    <Add />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )

}

export default HeaderPanel;
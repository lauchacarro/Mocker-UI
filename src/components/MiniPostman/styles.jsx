import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    center: {
        textAlign: "center"
    },
    right: {
        textAlign: "right"
    },
    orange: {
        color: "#ff8614"
    },
    green: {
        color: "green"
    },
    title: {
        padding: "30px"
    },
    button: {
        margin: theme.spacing(2),
    },
    width100: {
        width: "100%",
    },
    paperFullWidth: {
        width: "60vw",
    },
    expansionFullWidth: {
        width: "90vw",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        borderLeft: `1px solid ${theme.palette.divider}`,
    },
    responseTextArea : {
        width: "100%", 
        height: "20vh" 
    },
    tabPanel: {
        width: "80vw"
    },
    paddingRigth20: {
        paddingRight: "20px"
    }

}));
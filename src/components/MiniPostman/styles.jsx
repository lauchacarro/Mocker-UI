import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    center: {
        textAlign: "center"
    },
    orange: {
        color: "#ff8614"
    },
    title: {
        padding: "30px"
    },
    button: {
        margin: theme.spacing(2),
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

}));
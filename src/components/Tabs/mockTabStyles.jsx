import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => createStyles({
    gridContainer: {
        textAlign: "center"
    },
    gridSandbox: {
        height: "50%"
    },
    moduleBorderWrap: {
        maxWidth: "250px",
        padding: "1rem",
        position: "relative",
        background: "linear-gradient(to right, red, purple)",
        padding: "3px"
    },
    hidden: {
        visibility: "hidden"
    },
    buttonCreate: {
        textAlign: "center",
        width: "100%",
    }
}));

export default useStyles;
import { createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => 
    createStyles({
    root: {
        width: '75%',
        paddingLeft: "1vh",
        margin: "0 auto",
        maxHeight:"100px"
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
export default useStyles;
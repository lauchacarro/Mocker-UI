import { createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => createStyles({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        paddingBottom: "50px"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textField: {
        width: 200,
    }
}));

export default useStyles;
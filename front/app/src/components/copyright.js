import Typography from '@mui/material/Typography';

//Reusable component shared to multiple pages
export function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © Kicker'}
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
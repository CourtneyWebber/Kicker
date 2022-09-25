import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

//Shared with multiple components, it keeps styling consistent regardless of value.
function Title(props) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};

export default Title;
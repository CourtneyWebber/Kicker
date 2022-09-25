import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { Link } from 'react-router-dom';

//Provides the menu items for the left-hand side menu. Differences based on user type.

export const studentListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to="/student">
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/mydetails">
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="My Details" />
        </ListItemButton>
        <ListItemButton component={Link} to="/mygoals">
            <ListItemIcon>
                <SportsScoreIcon />
            </ListItemIcon>
            <ListItemText primary="My Goals" />
        </ListItemButton>    
    </React.Fragment>
);

export const teacherListItems = (    
    <React.Fragment>
        <ListItemButton component={Link} to="/teacher">
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/studentgoals">
            <ListItemIcon>
                <SportsScoreIcon />
            </ListItemIcon>
            <ListItemText primary="Student Goals" />
        </ListItemButton>   
    </React.Fragment>
);
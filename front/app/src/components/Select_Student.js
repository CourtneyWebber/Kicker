import * as React from 'react';
import Title from './Title';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

const instruments = [
    "",
    "Flute",
    "Violin",
    "Cello",
    "Piano"
];

const teachers = [
    "",
    "Teacher A",
    "Teacher B",
    "Teacher C"
]

export default function StudentSelect() {
    const [anchorEl_instrument, setAnchorEl_instrument] = React.useState(null);
    const [anchorEl_teacher, setAnchorEl_teacher] = React.useState(null);
    const [instrumentIndex, setInstrumentIndex] = React.useState(0);
    const [teacherIndex, setTeacherIndex] = React.useState(0);
    const [name, setName] = React.useState("Firstname Surname");

    const open_instrument = Boolean(anchorEl_instrument)
    const open_teacher = Boolean(anchorEl_teacher);

    const handleClick_instrument = (event) => {
        setAnchorEl_instrument(event.currentTarget);
    };

    const handleClick_teacher = (event) => {
        setAnchorEl_teacher(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl_instrument(null);
        setAnchorEl_teacher(null);
    }

    const handleClickInstrument = (event, index) => {
        setInstrumentIndex(index);
        setAnchorEl_instrument(null);
    };

    const handleClickTeacher = (event, index) => {
        setTeacherIndex(index);
        setAnchorEl_teacher(null);
    };

    return (
        <React.Fragment>
            <Grid container spacing={2} align="center" alignItems="center">
                <Grid item xs={12}>
                    <Title>Welcome, {name}</Title>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        id="instrument-button"
                        aria-controls={open_instrument ? 'instrument-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open_instrument ? 'true' : undefined}
                        onClick={handleClick_instrument}
                    >
                        Instrument List
                    </Button>
                    <Menu
                        id="instrument-menu"
                        aria-labelledby="instrument-button"
                        anchorEl={anchorEl_instrument}
                        open={open_instrument}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {instruments.map((instrument, index) => (
                            <MenuItem
                                key={instrument}
                                disabled={index === 0}
                                selected={index === instrumentIndex}
                                onClick={(event) => handleClickInstrument(event, index)}>
                                {instrument}
                        </MenuItem>
                        ))}                        
                    </Menu>
                </Grid>
                <Grid item xs={3}>
                    {instruments[instrumentIndex]}
                </Grid>

                <Grid item xs={3}>
                    <Button
                        id="teacher-button"
                        aria-controls={open_teacher ? 'teacher-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open_teacher ? 'true' : undefined}
                        onClick={handleClick_teacher}
                    >
                        Teacher List
                    </Button>
                    <Menu
                        id="teacher-menu"
                        aria-labelledby="teacher-button"
                        anchorEl={anchorEl_teacher}
                        open={open_teacher}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {teachers.map((teacher, index) => (
                            <MenuItem
                                key={teacher}
                                disabled={index === 0}
                                selected={index === teacherIndex}
                                onClick={(event) => handleClickTeacher(event, index)}>
                                {teacher}
                            </MenuItem>
                        ))}    
                    </Menu>
                </Grid>
                <Grid item xs={3}>
                    {teachers[teacherIndex]}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

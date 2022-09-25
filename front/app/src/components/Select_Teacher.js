import React, { useState, useEffect } from 'react';
import Title from './Title';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import axios from 'axios';

export default function StudentSelect(props) {
    const [anchorEl_instrument, setAnchorEl_instrument] = useState(null);
    const [anchorEl_student, setAnchorEl_student] = useState(null);
    const [anchorEl_grade, setAnchorEl_grade] = useState(null);

    const [instrumentIndex, setInstrumentIndex] = useState(0);
    const [studentIndex, setStudentIndex] = useState(0);
    const [gradeIndex, setGradeIndex] = useState(0);

    const [students, setStudents] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [grades, setGrades] = useState([]);
    const [gradeId, setGradeId] = useState([]);

    const [isClicked, setIsClicked] = useState(false);

    let names = [""];
    for (let i = 0; i < students.length; i++) {
        names.push(students[i].student_name);
    }
    let nameArray = [...new Set(names)];    //removing duplicates

    useEffect(() => {
        axios.get('http://localhost:4000/api/users/studentlist?user_id=' + localStorage.getItem("userId"))
            .then(response => {
                let studentList = response.data;
                setStudents(studentList[0]);
            });
        axios.get('http://localhost:4000/api/grades/')
            .then(response => {
                let gradeList = response.data;
                setGrades(gradeList);
            });
        props.updateHandler(false);
    }, [props]);

    const name = localStorage.getItem("firstName") + ' ' + localStorage.getItem("surname");

    const open_instrument = Boolean(anchorEl_instrument);
    const open_student = Boolean(anchorEl_student);
    const open_grade = Boolean(anchorEl_grade);

    const handleClick_instrument = (event) => {
        setAnchorEl_instrument(event.currentTarget);
    };

    const handleClick_student = (event) => {
        setAnchorEl_student(event.currentTarget);
    };

    const handleClick_grade = (event) => {
        setAnchorEl_grade(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl_instrument(null);
        setAnchorEl_student(null);
        setAnchorEl_grade(null);
    }

    const handleClickInstrument = (event, index) => {
        setInstrumentIndex(index);
        setAnchorEl_instrument(null);
        setIsClicked(true);
    };

    const handleClickStudent = (event, index) => {
        setStudentIndex(index);
        setAnchorEl_student(null);
        axios.get('http://localhost:4000/api/users/studentinst?student_name=' + nameArray[index] + '&teacher_id=' + localStorage.getItem("userId"))
            .then(response => {
                let instList = response.data;
                setInstruments(instList[0]);
            });
        setIsClicked(false);
    };    

    const handleClickGrade = (event, index) => {
        setGradeIndex(index);
        setAnchorEl_grade(null);
        axios.get('http://localhost:4000/api/grades/id?grade_name=' + grades[index].grade_name)
            .then(response => {
                let id = response.data;
                setGradeId(id[0].grade_id);
            });
    };

    const handleSave = () => {
        axios.put('http://localhost:4000/api/grades/update?student_name=' + nameArray[studentIndex] + '&instrument_name=' + instruments[instrumentIndex].instrument_name + '&teacher_id=' + localStorage.getItem("userId") + '&grade_id=' + gradeId)
            .then(response => {
                console.log(response);
                props.updateHandler(true);
            })
            .catch((e) => {
                console.log(e);
            })
    };

    return (
        <React.Fragment>
            <Grid container spacing={2} align="center" alignItems="center">
                <Grid item xs={12}>
                    <Title>Welcome, {name}</Title>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        id="student-button"
                        aria-controls={open_student ? 'student-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open_student ? 'true' : undefined}
                        onClick={handleClick_student}
                    >
                        Select Student
                    </Button>
                    <Menu
                        id="student-menu"
                        aria-labelledby="student-button"
                        anchorEl={anchorEl_student}
                        open={open_student}
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
                        {nameArray.map((name, index) => (
                            <MenuItem
                                key={name}
                                disabled={index === 0}
                                selected={index === studentIndex}
                                onClick={(event) => handleClickStudent(event, index)}>
                                {name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
                <Grid item xs={3}>
                    {nameArray[studentIndex]}                    
                </Grid>
                <Grid item xs={6}>                    
                </Grid>
                <Grid item xs={3}>
                    <Button
                        id="instrument-button"
                        aria-controls={open_instrument ? 'instrument-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open_instrument ? 'true' : undefined}
                        onClick={handleClick_instrument}
                    >
                        Select Instrument
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
                                key={instrument.instrument_name}
                                selected={index === instrumentIndex}
                                onClick={(event) => handleClickInstrument(event, index)}>
                                {instrument.instrument_name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>     
                <Grid item xs={3}>
                    {isClicked ? instruments[instrumentIndex].instrument_name : null}      
                </Grid>
                <Grid item xs={6}>                    
                </Grid>                
                <Grid item xs={3}>
                    <Button
                        id="grade-button"
                        aria-controls={open_grade ? 'grade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open_grade ? 'true' : undefined}
                        onClick={handleClick_grade}
                    >
                        Select New Grade
                    </Button>
                    <Menu
                        id="grade-menu"
                        aria-labelledby="igrade-button"
                        anchorEl={anchorEl_grade}
                        open={open_grade}
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
                        {grades.map((grade, index) => (
                            <MenuItem
                                key={grade.grade_name}
                                disabled={index === 0}
                                selected={index === gradeIndex}
                                onClick={(event) => handleClickGrade(event, index)}>
                                {grade.grade_name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
                <Grid item xs={3}>
                    {grades[gradeIndex] ? grades[gradeIndex].grade_name : null}
                </Grid>          
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={handleSave}>Save</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
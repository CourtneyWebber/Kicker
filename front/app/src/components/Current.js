import React, { useState, useContext } from 'react';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import axios from 'axios';
import Moment from 'moment';
import { IdContext } from './Teacher_Goals';

export default function Current(props) {
    const rows = props.sendGoals;   //getting the goals from Teacher_Goals
    const [value, setValue] = useState(""); //Using this to set whether the Update and Delete buttons render
    const [description, setDescription] = useState(""); //is set onChange
    const date = Moment().format("YYYY-MM-DD");    
    const ids = useContext(IdContext);  //Getting context from Teacher_Goals with the student_id and instrument_id of the selected student and instrument names.

    let studentId;
    let instrumentId;

    if (ids != null) {
        studentId = ids[0].student_id
        instrumentId = ids[0].instrument_id;
    }

    //Data to be passed into 'add' route
    const newGoal = {
        goal_description: description,
        goal_startdate: date,
        goal_iscomplete: false,
        goal_finishdate: null,
        teacher_id: localStorage.getItem("userId"),
        student_id: studentId,
        instrument_id: instrumentId
    }

    //Post a new goal to the database
    const handleClick_add = () => {
        axios.post('http://localhost:4000/api/goals/add', newGoal)
            .then(response => {
                setDescription(""); //Sets to empty string to remove input in the UI
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    //Updates a goal in the database to "completed", thus removing it from the current goals list to the completed goals list.
    const handleComplete = () => {
        axios.put('http://localhost:4000/api/goals/update?goal_id=' + value + '&goal_iscomplete=true')
            .then((response) => {
                console.log(response);
                alert("Goal marked complete");
            })
            .catch((e) => {
                console.log(e);
            });
        setValue(0);
    };

    //Deletes the selected goal based on goal_id
    const handleDelete = () => {
        axios.delete('http://localhost:4000/api/goals/delete?goal_id=' + value)
            .then(() => {
                alert("Goal deleted");
            })
            .catch((e) => {
                console.log(e);
            });
        setValue(0);
    };

    const handleChange = (event) => {
        setValue(event.target.value);        //When the selection of radiobutton changes, 'value' becomes the selected value, and thus the goal_id is obtained for the above functionality.
    };

    return (
        <React.Fragment>
            <Grid container spacing={2} align="center" alignItems="center">
                <Grid item xs={9} align="left">
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="radio-goals-group"
                            name="radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            {rows.map((row) => (
                                <FormControlLabel key={row.goal_id} value={row.goal_id} name="goal" control={<Radio />} label={row.goal_description} />))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    {value ? <Button onClick={handleComplete}>Completed</Button>  : null}
                    {value ? <Button onClick={handleDelete}>Delete</Button> : null}
                    </Grid>
                    <Grid item xs={10}>
                        <Input value={description} type="text" fullWidth={true} placeholder="Type new goal here" onChange={(e) => setDescription(e.target.value)}></Input>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            id="save-button"
                            onClick={handleClick_add}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>            
        </React.Fragment >
    );
}
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
    const rows = props.sendGoals;
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const date = Moment().format("YYYY-MM-DD");    
    const ids = useContext(IdContext);

    let studentId;
    let instrumentId;

    if (ids != null) {
        studentId = ids[0].student_id
        instrumentId = ids[0].instrument_id;
    }

    const newGoal = {
        goal_description: description,
        goal_startdate: date,
        goal_iscomplete: false,
        goal_finishdate: null,
        teacher_id: localStorage.getItem("userId"),
        student_id: studentId,
        instrument_id: instrumentId
    }

    const handleClick_add = () => {
        axios.post('http://localhost:4000/api/goals/add', newGoal)
            .then(response => {
                setDescription("");
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
            });
    };

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
        setValue(event.target.value);
        
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
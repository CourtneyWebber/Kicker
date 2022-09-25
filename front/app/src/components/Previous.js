import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useEffect, useContext, useState } from 'react';
import { IdContext } from './Teacher_Goals';
import axios from 'axios';

export default function Previous() {
    const [goals, setGoals] = useState([]);
    const ids = useContext(IdContext);  //Getting student_id and instrument_id from Teacher_Goals.
    let studentId;
    let instrumentId;

    if (ids != null) {
        studentId = ids[0].student_id
        instrumentId = ids[0].instrument_id;
    }

    //Getting previously completed goals for a specific student/instrument/teacher combination.
    useEffect(() => {
        axios.get('http://localhost:4000/api/goals/completed?teacher_id=' + localStorage.getItem("userId") + '&student_id=' + studentId + '&instrument_id=' + instrumentId)
            .then(response => {
                let goalList = response.data;
                setGoals(goalList[0]);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [ids]);

    return (
        <React.Fragment>            
            <Table size="small">
                <TableBody>
                    {goals.map((goal) => (
                        <TableRow key={goal.goal_number}>
                            <TableCell className="strike">{goal.goal_description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
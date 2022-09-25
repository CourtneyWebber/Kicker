import React, { useState, useEffect } from 'react';
import Title from './Title';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
    { field: 'student_id', headerName: 'ID', width: 70 },
    { field: 'student_name', headerName: 'Student Name', width: 130 },
    { field: 'instrument_name', headerName: 'Instrument', width: 130 },
    { field: 'grade_name', headerName: 'Grade', width: 150 },
    { field: 'years_learning', headerName: 'Years Learning', width: 130 },
    { field: 'goal_total', headerName: 'Total Goals Kicked', width: 150 }
];

export default function StudentList(props) {
    const [students, setStudents] = useState([]);
    const rows = students;

    useEffect(() => {
        axios.get('http://localhost:4000/api/users/studentlist?user_id=' + localStorage.getItem("userId"))
            .then(response => {
                let studentList = response.data;
                setStudents(studentList[0]);                
            });
        props.updateHandler(false);
    }, [props.doUpdate]);

    return (
        
        <React.Fragment>
            <Title>My Students</Title>
            <div style={{ height: 423, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row.student_id + row.instrument_name} 
                    rows={rows}
                    columns={columns}
                    pageSize={6}                    
                />
            </div>
        </React.Fragment>
    );
}
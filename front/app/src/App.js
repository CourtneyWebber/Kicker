import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentDetails from './components/Student_Details';
import StudentGoals from './components/Student_Goals';
import TeacherGoals from './components/Teacher_Goals';
import SignIn from './components/SignIn';
import TeacherHome from './components/Dashboard_Teacher';
import StudentHome from './components/Dashboard_Student';

function App() {   
    return (
        <>            
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/student" element={ <StudentHome /> } />
                <Route path="/teacher" element={< TeacherHome /> } />
                <Route path="/details" element={ <StudentDetails />} />
                <Route path="/goals" element={ <StudentGoals />} />
                <Route path="/studentgoals" element={<TeacherGoals />} />
                <Route path={"*"} element={<Navigate replace to={"/"} />} />
            </Routes>
        </>
    );
}

export default App;
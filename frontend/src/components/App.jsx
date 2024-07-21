import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Navbar from './Layout/Navbar';
import AnimalList from './Animals/AnimalList';
import Login from './Auth/Login';
import PrivateRoute from '../utils/PrivateRoute';
import AdminDashboard from './Dashboard/AdminDashboard';
import '../App.css'
import Footer from "./Layout/Footer.jsx";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<AnimalList />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<AdminDashboard />} />
                    </Route>
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
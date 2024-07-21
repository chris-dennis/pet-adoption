import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login: setAuth } = useContext(AuthContext);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const data = await login(formData);
            const { token } = data;
            localStorage.setItem('token', token);
            setAuth(data);
            navigate('/');
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div id="top" className="login">
            <form onSubmit={onSubmit}>
                <input type="email" name="email" value={formData.email} onChange={onChange} required/>
                <input type="password" name="password" value={formData.password} onChange={onChange} required/>
                <button type="submit">Login</button>
            </form>
            <a href="">Forgot Password</a>
            <h3>Warning: This page is for administration purposes. If you need an administrator account, contact the web
                admin.</h3>

        </div>
    );
};

export default Login;
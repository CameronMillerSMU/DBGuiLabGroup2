import * as React from 'react';
import { useState, useContext } from 'react';
import { User } from '../common/User';
import { ApiCalls } from '../common/ApiCalls';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const api = new ApiCalls();

  const handleLogin = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
    }
    else {
      let newUser = new User(username, password);
      api.login(newUser).then(res => {
        props.setToken(res.data.data.jwt);
        localStorage.setItem('token', res.data.data.jwt);
        navigate("/home");
        console.log(res.data.data)
        console.log('logged in');
      }).catch(err => {
        console.log(err)
        alert(err);
      });
    }



  };

  return (
    <div className="w-75 mx-auto">
            <div className="border mb-2 mt-5">
                <h1 className="text-white bg-primary p-3 mb-0">Login</h1>
                <Form noValidate validated={validated} id="login-form" onSubmit={handleLogin} className="bg-white py-2 mt-0">
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Username" value={username} onChange={(event) => setUsername(event.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a username.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Your Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a password.</Form.Control.Feedback>
                    </Form.Group>
                    <p className="ms-3">Need an account? <Link to="/Signup">Sign Up</Link></p>
                </Form>
                
            </div>
            <Link to="/" className="btn btn-danger me-3">Cancel</Link>
            <button className="btn btn-success" id="loginButton" type="submit" form="login-form">Submit</button>
            
        </div>
  );
  
}
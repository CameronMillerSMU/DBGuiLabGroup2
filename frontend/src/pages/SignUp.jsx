import { useContext, useState } from 'react';
import { Card } from "../common/Card";
import { TextField } from '../common/TextField';
import { AppContext } from "../AppContext";
import { useNavigate, useLocation } from 'react-router-dom';
import { Password } from '@mui/icons-material';
import { User } from '../common/User';
import { Navigate } from 'react-router-dom';
import { apiEndpoint, apiConfig } from '../common/ApiConfig';
import { addUser } from '../common/ApiCalls';

  
export const SignUp = (props) => {

  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // let newUser = new User({username: username, password: password});
    //let userArray = [username, password];
    const json = JSON.stringify({ username: username, password: password });
    addUser(json).then(res => {
      console.log("Bruh1");
      props.setToken(res.data.data.jwt);
      console.log("Bruh2");
      localStorage.setItem('token', res.data.data.jwt);
      console.log("Bruh3");
      Navigate("/");
    })
  };
  


  return <>
      <Card title="Sign Up">
          <TextField label="User Name"
              value={username}
              setValue={x => setUsername(x)} />
          <TextField label="Password"
              value={password}
              setValue={x => setPassword(x)} />
          <button type="button"
              className="btn btn-success btn-lg col-12 mt-4"
              onClick={() => handleSignUp()}>
              Sign Up
          </button>
      </Card>
  </>;
};
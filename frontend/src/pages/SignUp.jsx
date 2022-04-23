import { useContext, useState } from 'react';
import { Card } from "../Card";
import { TextField } from '../TextField';
import { AppContext } from "../AppContext";
import { useNavigate, useLocation } from 'react-router-dom';
import { Password } from '@mui/icons-material';
import { ApiCalls } from '../common/ApiCalls';
import { User } from '../common/User';
import { Navigate } from 'react-router-dom';

  
export const SignUp = (props) => {
  const api = new ApiCalls();

  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AppContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    let newUser = new User(userName, password);
    api.signup(newUser).then(res => {
      props.setToken(res.data.data.jwt);
      localStorage.setItem('token', res.data.data.jwt);
      Navigate("/");
    })
  };


  return <>
      <Card title="Sign Up">
          <TextField label="User Name"
              value={userName}
              setValue={x => setUserName(x)} />
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
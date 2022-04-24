import { useContext, useState } from 'react';
import { Card } from "../Card";
import { TextField } from '../TextField';
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
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // let newUser = new User({username: userName, password: password});
    let userArray = [userName, password];
    addUser(userArray).then(res => {
      console.log("bruh");
      console.log(res);
      console.log(res.body.body);
      console.log(res[0]);
      props.setToken(res);
      localStorage.setItem('token', res.data);
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
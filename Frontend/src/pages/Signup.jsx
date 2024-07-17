import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate} from 'react-router-dom';

function Signup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const navigate = useNavigate()
  const checkFormCompleteness = () => {
    if (firstname && lastname && email && password && confirmPassword) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  };
  const handleSignup = async () => {

    if (password !== confirmPassword) {
      alert("Passwords don't match. Please re-enter.");
      return;
    }

    const data = JSON.stringify({
      "firstname":firstname,
      "lastname":lastname,  
      "email":email,
      "password":password,
    })
    const res = await fetch('http://127.0.0.1:8000/accounts/signup/',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: data
    })
    const response_result = await res.json();
    console.log(response_result)
  };
  React.useEffect(() => {
    checkFormCompleteness();
  }, [firstname, lastname, email, password, confirmPassword]);
  return (
    <div className="container">
      <h2 className="text-center">Signup</h2>
      {isRegistered ? (
        <div className="text-center">
          <p>Registration successful for {firstname} {lastname}!</p>
        </div>
      ) : (
        <div>
          <label>First Name(Username):</label>
          <input
            type="text"
            name='First Name'
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="input-field"
          />
          <br />
          <label>Last Name:</label>
          <input
            type="text"
            name='Last Name'
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="input-field"
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            name='Email'
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <br />
          <label>Password: </label>
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <br />
          <div style={{color: 'white' }}>Confirm Password:</div>
          <input
            type="password"
            name="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
          <br />
          <button
            onClick={handleSignup}
            className="button"
            disabled={!isFormComplete}
          >
            <p style={{ textDecoration: 'none', color: 'white' }}>Sign Up</p>
          </button>
          <p>
            already have an account ?<Link to="/Login"  style={{ textDecoration: 'none', color: 'black' }}> Login </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Signup;

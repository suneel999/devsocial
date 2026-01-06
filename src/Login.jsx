import React, { useState } from 'react'


import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from './UserSlice';
import { useNavigate } from 'react-router-dom';
import BASE_URL from './constants';

const Login = () => {

  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handlelogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      const errorMessage = err?.response?.data?.message || "Login failed";
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup",
        { email, password, firstName, lastName },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.error("Registration Error:", err);
      const errorMessage = err?.response?.data?.message || "Registration failed";
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    }
  };

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-100 w-96 shadow-sm ">
        <figure className="px-10 pt-10">
          <img
            src="/logo.png"
            alt="logo"
            className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title mx-20">{isLogin ? "Login" : "Register"}</h2>
          <div>
            {!isLogin && <> <fieldset className="fieldset mx-5">
              <legend className="fieldset-legend">firstName</legend>
              <input type="text" value={firstName} className="input" placeholder="firstName"
                onChange={(e) => { setFirstName(e.target.value) }} />
            </fieldset>
              <fieldset className="fieldset mx-5 ">
                <legend className="fieldset-legend">lastName</legend>
                <input type="text" value={lastName} className="input" placeholder="lastName"
                  onChange={(e) => { setLastName(e.target.value) }} />
              </fieldset></>}
            <fieldset className="fieldset mx-5">
              <legend className="fieldset-legend">Email Id</legend>
              <input type="text" value={email} className="input" placeholder="Type here"
                onChange={(e) => { setEmailId(e.target.value) }} />
            </fieldset>
            <fieldset className="fieldset mx-5 ">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" value={password} className="input" placeholder="Type here"
                onChange={(e) => { setPassword(e.target.value) }} />
            </fieldset>

          </div>
          {error && <p className='text-red-500'> Error: {error}</p>}
          <div className="card-actions">
            <button className="btn btn-primary " onClick={isLogin ? handlelogin : handleRegister}>{isLogin ? "Login" : "Register"}</button>
          </div>
          <p className="text-center cursor-pointer" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login
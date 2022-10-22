import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import FlashMessage from "react-flash-message";
import Message from "../UI/Message";
import LoadingSpinner from "../UI/LoadingSpinner";


import classes from "./AuthForm.module.css";

const AuthForm = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const closeHandler =()=>{
    setIsOpen(false);
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className={`${`items-center  
    w-11/12 sm:w-full minmd:w-3/4`}`}>
    {isOpen && <section className={classes.auth}>
      <span className={classes.cancel} onClick={closeHandler}><Link to="/">&times;</Link></span>
      <h2>Login</h2>
      {error && <FlashMessage duration={4000}><Message className={classes.errorMessage}>{error}</Message></FlashMessage>}
      {loading && <LoadingSpinner />}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Sign In </button>
        </div>
        <div className={classes.actions}>
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <button type="button">Sign Up </button>
          </Link>
        </div>
      </form>
    </section>}
    </div>)
};

export default AuthForm;
/**
 * 
  const closeResultsHandler =()=>{
    setIsOpen(false);
  }

  return (
    <div className="result-display">
      {!isOpen && <button onClick={showResultsHandler}>All Saved Results</button>}
      {isOpen && <ResultList resultArray={props.resultArray} onCancel={closeResultsHandler}/>}
 */
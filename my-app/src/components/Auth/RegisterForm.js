import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import FlashMessage from "react-flash-message";
import Message from "../UI/Message";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForm.module.css";

const RegisterForm = ({ history, location }) => {
  

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      console.log(email);
    } else {
      dispatch(register(name, email, password));
    }
  };
  
  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <section className={classes.auth}>
          <span className={classes.cancel} onClick={closeHandler}><Link to="/">&times;</Link></span>
          <h2>Sign Up</h2>

          {message && <Message className={classes.errorMessage}>{message}</Message>}
          {error && <FlashMessage duration={4000}><Message className={classes.errorMessage}>{error}</Message></FlashMessage>}
          {loading && <LoadingSpinner/>}

          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="name">Name</label>
              <input
                type="name"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
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
            <div className={classes.control}>
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                id="passwordConfirm"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
            <div className={classes.actions}>
              <button type="submit">Register </button>
            </div>
            <div className={classes.actions}>
              Have an account ?
              <Link to={redirect ? `/login?redirect=${redirect}` : "/auth"}>
                <button type="button">Sign In </button>
              </Link>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default RegisterForm;

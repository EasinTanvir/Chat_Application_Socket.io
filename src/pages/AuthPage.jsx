import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import RegisterModal from "../components/RegisterModal";
import { Sign_In } from "../store/actions";

const AuthPage = () => {
  const [loginMode, setIsLogin] = useState(false);
  const { error } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [input, setInput] = useState({
    userName: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const recData = {
      userName: input.userName,
      password: input.password,
    };
    dispatch(Sign_In(recData));
    setIsLogin(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="auth">
        <Container>
          <div className="main">
            <div className="left">
              <div className="ms-3 text">
                <h2>Messenger</h2>
                <p>
                  Messenger helps you connect and share with the people in your
                  life.
                </p>
              </div>
            </div>
            <div className="right">
              <div className="box p-3">
                <Form onSubmit={onSubmitHandler}>
                  <Form.Control
                    onChange={onChangeHandler}
                    className="mt-3 p-2 input"
                    type="text"
                    required
                    name="userName"
                    placeholder="Email Address or userName"
                  />
                  <Form.Control
                    onChange={onChangeHandler}
                    className="mt-3 p-2"
                    type="password"
                    required
                    name="password"
                    placeholder="password"
                  />
                  {error && loginMode && (
                    <p className="text-danger small mt-1">{error}</p>
                  )}
                  <Button
                    type="submit"
                    className="w-100 mt-4 p-2"
                    variant="primary"
                  >
                    Log In
                  </Button>
                  <Button
                    type="button"
                    onClick={handleShow}
                    className="w-75 ms-5 mt-5 p-3"
                    variant="success"
                  >
                    Create an account
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <RegisterModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
};

export default AuthPage;

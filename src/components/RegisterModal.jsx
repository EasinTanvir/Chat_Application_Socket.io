import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Sign_Up } from "../store/actions";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const RegisterModal = ({ show, handleClose, handleShow }) => {
  const { status, error } = useSelector((state) => state.error);

  const toast = useToast();
  const dispatch = useDispatch();
  const [input, setInput] = useState({ userName: "", email: "", password: "" });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const recData = {
      userName: input.userName,
      email: input.email,
      password: input.password,
    };
    dispatch(Sign_Up(recData));
  };

  useEffect(() => {
    if (status === 200) {
      toast({
        title: "Account created successfully",
        description: "please login",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (status === 500) {
      toast({
        title: " Warning!",
        description: error,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [status, toast, error]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text1">Register here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                name="userName"
                required
                type="text"
                placeholder="type your username"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                name="email"
                required
                type="email"
                placeholder="type your email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                name="password"
                required
                type="password"
                placeholder="type your password"
                autoFocus
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Register
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterModal;

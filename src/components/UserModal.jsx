import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  Create_Conversation,
  Fetch_Conversation,
  Fetch_Users,
} from "../store/actions";

const UserModal = ({ show, handleClose, handleShow }) => {
  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onCreataConversation = (user) => {
    const recData = {
      id: user._id,
      userName: user.userName,
    };

    dispatch(Create_Conversation(recData));

    setTimeout(() => {
      dispatch(Fetch_Conversation());
    }, 1000);
  };

  useEffect(() => {
    dispatch(Fetch_Users());
  }, [dispatch]);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              {users.map((item) => (
                <div className="d-flex justify-content-between" key={item._id}>
                  <div className="carts mt-3 d-flex gap-2 align-items-center ">
                    <img src="/user1.png" alt="" />
                    <div className="">
                      <h4>{item.userName}</h4>
                      <p>{item.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onCreataConversation(item)}
                    className="btnss"
                  >
                    Add user
                  </button>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserModal;

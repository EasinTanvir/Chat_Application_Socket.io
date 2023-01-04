import React, { useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import openSocket from "socket.io-client";
import {
  Create_Message,
  Fetch_Conversation,
  Fetch_Message,
} from "../store/actions";
import moment from "moment";
import { useState } from "react";
import UserModal from "../components/UserModal";
import axios from "axios";

const HomePage = () => {
  const [test, setTest] = useState([]);
  const [participant, setParticipant] = useState({});
  const [creator, setCreator] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [conId, setConId] = useState();
  const [open, setOpen] = useState(false);

  const scrollRef = useRef();
  const dispatch = useDispatch();

  const onClikHandler = () => {
    setOpen(true);
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [test]);

  const {
    user: { token },
  } = useSelector((state) => state.auth);

  const {
    user: { id },
  } = useSelector((state) => state.auth);
  const { con } = useSelector((state) => state.cons);
  // const {
  //   message: { fetchMsg, participant },
  // } = useSelector((state) => state.message);

  // const updateMessage = { ...fetchMsg };

  const socket = openSocket("http://localhost:5000");
  socket.on("message", (data) => {
    if (data.action === "create") {
      const { message } = data;

      setTest([...test, message]);
      //setInput([...input, post]);
    }
  });

  useEffect(() => {
    dispatch(Fetch_Conversation());
  }, [dispatch]);

  const onConverHandler = async (conId) => {
    setConId(conId);

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/message/${conId}`,
        {
          headers: {
            Authorization: "bearer " + token,
          },
        }
      );
      setTest(data.fetchMsg);
      setParticipant(data.participant);
      setCreator(data.creator);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const recData = {
      conId: conId,
      userName: participant.userName,
      text: message,
      id: participant.id,
    };
    //console.log(recData);

    dispatch(Create_Message(recData));
    setMessage("");
    // setTimeout(() => {
    //   dispatch(Fetch_Message(conId));
    // }, 300);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="menuwrapper">
          <Form.Control placeholder="Search here" />
          <hr className="mt-2" />
          <>
            {con.length === 0 ? (
              <div className="mt-5">
                <span
                  style={{ fontWeight: "bolder", fontStyle: "italic" }}
                  className="ms-5 mt-5"
                >
                  Please Add a user
                </span>
              </div>
            ) : (
              <>
                {" "}
                {con.map((item) => (
                  <div onClick={onClikHandler} key={item._id}>
                    {item.creator.id !== id ? (
                      <>
                        <div
                          onClick={() => onConverHandler(item._id)}
                          key={item._id}
                          className="carts mt-3 d-flex gap-2 align-items-center "
                        >
                          <img src="/user1.png" alt="" />
                          <div>
                            <h4 style={{ fontWeight: "bolder" }}>
                              {item.creator.userName}
                            </h4>
                            <p className="small">open conversation</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div
                          onClick={() => onConverHandler(item._id)}
                          key={item._id}
                          className="carts mt-3 d-flex gap-2 align-items-center "
                        >
                          <img src="/user1.png" alt="" />
                          <div>
                            <h4 style={{ fontWeight: "bolder" }}>
                              {item.participant.userName}
                            </h4>
                            <p className="small">open conversation</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </>

          <div onClick={handleShow} className="c-menu">
            <Button>Add User</Button>
          </div>
        </div>
      </div>
      <div className="chatBox">
        <div className="boxwrapper">
          {open === false ? (
            <div className="d-flex mt-5 justify-content-center align-items-center">
              <span
                style={{
                  fontWeight: "bolder",
                  fontStyle: "italic",
                  fontSize: "24px",
                }}
              >
                Select a Conversation to start Chat{" "}
              </span>
            </div>
          ) : (
            <>
              <div className="chatTop">
                <div className="bg-danger navs sticky-top p-2 rounded">
                  {con.length > 0 && (
                    <span className="bolder text-white  ">
                      You currently chat With
                      <span className="ms-1 fw-bold">
                        {participant?.id !== id
                          ? participant?.userName
                          : creator?.userName}
                      </span>
                    </span>
                  )}
                </div>
                {/* start */}
                {test.map((item) => (
                  <div ref={scrollRef} key={item._id}>
                    {item.sender.id === id ? (
                      <>
                        {" "}
                        <div className="message own">
                          <div className="messageTop">
                            <img src="/user1.png" alt="" />
                            <p>{item.text}</p>
                          </div>
                          <div className="messageBottom">
                            {" "}
                            {moment(item.createdAt).fromNow()}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="message">
                          <div className="messageTop">
                            <img src="/user1.png" alt="" />
                            <p>{item.text}</p>
                          </div>
                          <div className="messageBottom">
                            {" "}
                            {moment(item.createdAt).fromNow()}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                {/* end */}
              </div>
              <div className="chatBottom">
                <Form
                  onSubmit={onSubmitHandler}
                  className="d-flex justify-content-around"
                >
                  <Form.Control
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="inputs"
                    placeholder="type here to message"
                    required
                  />
                  <Button type="submit" className="ps-4 pe-4" variant="primary">
                    Send
                  </Button>
                </Form>
              </div>
            </>
          )}
        </div>
      </div>
      <UserModal
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
    </div>
  );
};

export default HomePage;

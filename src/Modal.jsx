import React, { useEffect, useState } from "react";
import "./Modal.css";
import { updateUser } from "./store/actions";
import { useStore } from "./store/store";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ModalBox = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;

const Close = styled(FontAwesomeIcon)`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  :hover,
  :focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

const CloseSpan = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  :hover,
  :focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 33%;
  position: relative;
  margin: auto;
`;

const Input = styled.input`
  padding: 1rem;
  margin: 1rem;
`;
const Button = styled.button`
  background-color: #0080ff;
  color: #fff;
  border-radius: 4px;
  border: none;
  padding: 1rem;
  margin: 1rem;
  cursor: pointer;
`;

export const Modal = ({ show, close }) => {
  const { state, dispatch } = useStore();
  const [selectedUser, setSelectedUser] = useState({});
  const [firstName, setfirstName] = useState("");
  const [lasttName, setlasttName] = useState("");
  const [email, setemail] = useState("");

  const handleFirstName = (e) => {
    setfirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setlasttName(e.target.value);
  };
  const handleEmail = (e) => {
    setemail(e.target.value);
  };

  useEffect(() => {
    setSelectedUser(state.selectedUser);
  }, [state]);
  useEffect(() => {
    if (selectedUser) {
      setfirstName(selectedUser.first_name);
      setlasttName(selectedUser.last_name);
      setemail(selectedUser.email);
    }
  }, [selectedUser]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      id: selectedUser.id,
      first_name: firstName,
      last_name: lasttName,
      email: email,
    };
    dispatch(updateUser(user));
    close();
  };
  if (!state.selectedUser || !selectedUser || state.loading) {
    return <></>;
  }
  return (
    <ModalBox style={{ display: show ? "block" : "none" }}>
      <ModalContent class="modal-content">
        <CloseSpan onClick={close}>
          &times;
          {/* <Close icon={faTimes} onClick={close} /> */}
        </CloseSpan>

        {/* {selectedUser} */}
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="first_name"
            value={firstName}
            required
            onChange={handleFirstName}
          />
          <Input
            type="text"
            name="last_name"
            value={lasttName}
            required
            onChange={handleLastName}
          />
          <Input
            type="text"
            name="email"
            value={email}
            required
            onChange={handleEmail}
          />
          <Button type="submit" value="Submit">
            Submit
          </Button>
        </Form>
      </ModalContent>
    </ModalBox>
  );
};

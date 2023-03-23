import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.log(error);
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      label="Register"
    />
  );
};
export default Register;

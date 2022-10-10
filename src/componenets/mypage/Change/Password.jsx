import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../../shared/Api";

const Password = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  console.log(password);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      password.password === "" ||
      password.newPassword === "" ||
      password.newPasswordConfirm === ""
    ) {
      alert("모든 항목을 입력해주세요.");
      e.preventDefault();
    } else {
      const res = await instance.put(
        "/api/auth/member/updatepassword",
        password
      );
      console.log(res);
      navigate("/mypage");
    }
  };

  return (
    <StPassword>
      <div>
        <h2>비밀번호 변경</h2>
      </div>
      <div>
        <input
          type="password"
          placeholder="기존 비밀번호를 입력해주세요"
          name="password"
          value={password.password}
          onChange={(e) =>
            setPassword({ ...password, password: e.target.value })
          }
        />
        <input
          type="password"
          style={{ marginTop: "20px" }}
          placeholder="새로운 비밀번호를 입력해주세요"
          name="newPassword"
          value={password.newPassword}
          onChange={(e) =>
            setPassword({ ...password, newPassword: e.target.value })
          }
        />
        <input
          type="password"
          style={{ marginTop: "20px" }}
          placeholder="새로운 비밀번호를 다시 입력해주세요."
          name="newPasswordConfirm"
          value={password.newPasswordConfirm}
          onChange={(e) =>
            setPassword({ ...password, newPasswordConfirm: e.target.value })
          }
        />
      </div>
      <div>
        <button onClick={onSubmitHandler}>변경하기</button>
      </div>
    </StPassword>
  );
};

export default Password;

const StPassword = styled.div`
  margin: 0 auto;
  width: 380px;
  padding-top: 30px;

  & input {
    width: 350px;
    height: 52px;
    border: none;
    border-radius: 15px;
    padding-left: 15px;
  }

  & p {
    font-weight: 900;
    font-size: 23px;
    margin-left: 15px;
    margin-top: 10px;
  }

  & button {
    display: flex;
    width: 127px;
    height: 43px;
    font-weight: 700;
    font-size: 23px;
    color: white;
    background: #ffc0c0;
    border: none;
    border-radius: 15px;
    margin: 30px auto;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
    }
  }
`;

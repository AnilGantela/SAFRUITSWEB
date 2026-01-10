import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #9c0101;
  @media (max-width: 450px) {
    align-items: center;
    pading: 10px;
  }
`;

export const LoginBox = styled.div`
  display: flex;
  width: 60%;
  height: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  @media (max-width: 1024px) {
    width: 95%;
  }
  @media (max-width: 450px) {
    flex-direction: column;
    width: 90%;
    height: 90vh;
    align-items: center;
    justify-content: space-around;
  }
`;

export const LoginImageBox = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 450px) {
    width: 100%;
    box-sizing: border-box;
    height: 45%;
    margin-top: 10px;
    margin-bottom: -100px;
  }
`;

export const LoginImage = styled.img`
  width: 100%;
  height: auto;
  @media (max-width: 1024px) {
    width: 80%;
  }
  @media (max-width: 450px) {
    width: 80%;
    height: auto;
  }
`;

export const LoginFormBox = styled.div`
  padding: 40px;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  @media (max-width: 1024px) {
    width: 50%;
    padding: 20px;
  }
  @media (max-width: 450px) {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
`;
export const LoginCompanyName = styled.h2`
  margin-bottom: 30px;
  font-family: "Rubik Maps", system-ui;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  color: #9c0101;
  font-size: 7.5vh;
  font-weight: bold;
  @media (max-width: 450px) {
    font-size: clamp(36px, 10vw, 60px);
    margin-bottom: 10px;
  }
`;
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  @media (max-width: 450px) {
    margin-top: 10px;
    padding: 10px;
  }
`;
export const ErrorMsg = styled.p`
  color: red;
  margin-bottom: 15px;
`;
export const LoginFormUserName = styled.h1`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: clamp(13px, 4vw, 16px);
  @media (max-width: 450px) {
    font-size: clamp(11px, 6vw, 13px);
  }
`;
export const LoginFormPassword = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const LoginFormButton = styled.button`
  padding: 10px;
  background-color: #9c0101;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

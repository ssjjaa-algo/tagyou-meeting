import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  margin-top: 10vh;
  margin-left: 10%;
  justify-items: center;
`;

export const Title = styled.text<{ theme: themeProps }>`
  color: ${props => props.theme.fontSubColor};
  font-size: 30px;  
  font-weight: bold;
  display: inline-block;
`

export const miniTitle = styled.div`
  color: #5a5a5a;
  /* opacity: 0.74; */
  width: 200px;
  font-size: 17px;
  font-weight: bold;
  vertical-align: middle;
  text-align: center; 
`
// export const Select
export const InputArea = styled.div`
  margin-left: 5%;
  margin-top: 1vh;
  display: flex; 
  flex-wrap: wrap;
  align-items: center;
` 

export const Input = styled.input`
  background-image: linear-gradient(#f43f5e, #f43f5e), linear-gradient(#5a5a5a, #5a5a5a);
  border: 0 none;
  /* border-radius: 0; */
  float: none;
  background-color: transparent;
  /* border-radius: 10%; */
  background-position: center bottom, center calc(100% - 1px);
  background-repeat: no-repeat;
  background-size: 0 2px, 100% 1px;
  padding: 15px 15px;
  transition: background 0s ease-out 0s;
  color: #5a5a5a;
  min-height: 20px;
  display: inline-block;
  width: 30%;
  outline: none;
  font-size: 15px;
  margin-left: 20px;
  &:focus {
      background-size: 100% 2px, 100% 1px;
      outline: 0 none;
      transition-duration: 0.3s;
      color: #525252;
    }
`

export const Button = styled.button`
  background: #fb7185;
  color: #fff1f2;
  font-size: 17px;
  margin: 10px;
  font-weight: bold;
  padding: 0.6em 1em;
  border-radius: 10px;
  border-color: #fb7185;
  display: inline-block;
`;

export const SaveButton = styled.button`
  background: #fb7185;
  color: #FFF8F8;
  font-size: 17px;
  margin: 10px;
  padding: 0.6em 1em;
  border-radius: 10px;
  font-weight: bold;
  border-color: #fb7185;
  display: inline-block;
  float: right;
  margin-right: 20vw;
`;

export const Notice = styled.p`
  vertical-align: middle;
  font-size: 20px;
`

export const getOptionListStyle = ({ active = true, zIndex = 1 }) => {
  return `
  max-height: ${active ? '300px' : '0'};
  z-index: ${zIndex};
  `;
};

export const Styled = {
  selectbox: styled.div`
    position: relative;
    width: 8rem;
    border-radius: 10px;
    cursor: pointer;
    &&& {
      font-family: inherit !important;
    }
  `,
};


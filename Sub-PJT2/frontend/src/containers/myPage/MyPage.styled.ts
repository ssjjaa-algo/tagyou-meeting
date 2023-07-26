import styled from "@emotion/styled";

export const Container = styled.div`
  margin-top: 10vh;
  margin-left: 10%;
  justify-items: center;
`;

export const Title = styled.text`
  color: #3C3939;
  opacity: 0.74;
  font-size: 45px; 
  font-weight: bold;
  display: inline-block;
`

export const miniTitle = styled.div`
  color: #3C3939;
  opacity: 0.74;
  width: 200px;
  font-size: 25px;
  font-weight: bold;
  vertical-align: middle;
  text-align: center; 
`
// export const Select
export const InputArea = styled.div`
  margin-left: 10%;
  margin-top: 5vh;
  display: flex; 
  flex-wrap: wrap;
  align-items: center;
` 

export const Input = styled.input`
  background-image: linear-gradient(#20aee3, #20aee3), linear-gradient(#bfbfbf, #bfbfbf);
  border: 0 none;
  border-radius: 0;
  box-shadow: none;
  float: none;
  background-color: transparent;
  background-position: center bottom, center calc(100% - 1px);
  background-repeat: no-repeat;
  background-size: 0 2px, 100% 1px;
  padding: 15px 15px;
  transition: background 0s ease-out 0s;
  color: #bfbfbf;
  min-height: 35px;
  display: inline-block;
  width: 30%;
  outline: none;
  font-size: 20px;
  margin-left: 20px;
  &:focus {
      background-size: 100% 2px, 100% 1px;
      outline: 0 none;
      transition-duration: 0.3s;
      color: #525252;
    }
`

export const Button = styled.button`
  background: #FF7480;
  color: #FFF8F8;
  font-size: 18px;
  margin: 20px;
  font-weight: bold;
  padding: 0.8em 1.2em;
  border-radius: 10px;
  border-color: #FF7480;
  display: inline-block;
`;

export const SaveButton = styled.button`
  background: #FF7480;
  color: #FFF8F8;
  font-size: 18px;
  margin: 10px;
  padding: 0.8em 1.2em;
  border-radius: 10px;
  font-weight: bold;
  border-color: #FF7480;
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


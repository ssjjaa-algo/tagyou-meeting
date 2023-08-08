import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const Label = styled.label<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.deep};
  vertical-align: middle;
  padding-top: 13px;
`

export const Select = styled.select`
`

export const Input = styled.input<{ theme: themeProps }>`
  background-color: rgb(233, 233, 233);
  border-radius: 2rem;
  padding-left: 20px;
  padding-right: 20px;
  height: 3rem;
  border: none;
  &:focus {
    background-size: 100% 2px, 100% 1px;
    background-color: ${(props) => props.theme.point.light} ;
    outline: 0 none;
    transition-duration: 0.3s;
    color: ${(props) => props.theme.font.light};
  }
  width: 30rem
`

export const Add = styled.button<{ theme: themeProps }>`
  background: ${(props) => props.theme.point.deep};
  color: ${(props) => props.theme.font.light};
  font-size: 15px;
  margin: 10px;
  font-weight: bold;
  width: 2cm;
  height: 1cm;
  border-radius: 10px;
  display: inline-block;
  /* position: absolute; */
  bottom: 10px;
  right: 10px;
  margin-top: auto;
`

export const StickyCard = styled.div<{ theme: themeProps }>`
  /* .sticky-card */
  display: block;
  list-style: none;
  z-index: 1;
  float: left;
  margin: 30px;
  padding: 15px 15px 50px 15px;
  width: 200px;
  height: 200px;
  border: 1px solid #bfbfbf;
  /* background-color:  LightGoldenRodYellow; 색상명 값이 맞지 않을 땐 #fafad2 */
  color: black;
  text-decoration: none;
  -webkit-box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  -o-box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  -webkit-transition: all 0.5s ease-in;
  -moz-transition: all 0.5s ease-in;
  -o-transition: all 0.5s ease-in;
  -ms-transition: all 0.5s ease-in;
  transition: all 0.5s ease-in;
  overflow: hidden;
`

// export const Save = styled.button<{ theme: themeProps }>`
//   background: ${(props) => props.theme.point.deep};
//   color: ${(props) => props.theme.font.light};
//   font-size: 15px;
//   margin: 10px;
//   font-weight: bold;
//   width: 2cm;
//   height: 1cm;
//   border-radius: 10px;
//   display: inline-block;
//   position: absolute;
//   bottom: 10px;
//   right: 10px;
//   margin-top: auto;
// `;
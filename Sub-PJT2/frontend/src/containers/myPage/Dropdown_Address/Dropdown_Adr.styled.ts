import styled from "@emotion/styled";

export const DropdownContainer = styled.div`
  padding-left: 25px;
`;

export const DropdownSelect = styled.select`
  outline: none;
  padding: 13px 17px; 
  border: 1px solid #dadce0;
  border-radius: 10px;
  font-size: 20px; 
  transition: border-color 0.3s;
  margin-right: 20px;
  &:focus {
    border-color: royalblue;
  }
`;

// export const DropdownOption = styled.option`
// `;
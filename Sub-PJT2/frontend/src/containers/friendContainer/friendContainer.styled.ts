import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  padding: 20px 16px 20px 16px;
`;

export const Title = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.light};
  font-size: 18px;
  font-weight: 500;
`;

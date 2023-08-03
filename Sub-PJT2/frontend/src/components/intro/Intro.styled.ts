import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";

export const FavoriteIconStyled = styled(EditIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.point.deep};
`;

export const Content = styled.div`

`
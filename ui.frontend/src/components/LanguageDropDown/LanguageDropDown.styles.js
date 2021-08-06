import styled from "styled-components";
import mediaquery from "../../mediaquery";
import Select from "../Select/Select";

export const SelectWrapper = styled(Select)`
  height: 32px !important;
  ${mediaquery.mobile`
    height:49px;
  `}
`;

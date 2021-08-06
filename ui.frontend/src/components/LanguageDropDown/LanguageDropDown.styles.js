import styled from "styled-components";
import mediaquery from "../../mediaquery";
import Select from "../Select/Select";

export const SelectWrapper = styled(Select)`
  height: 2em;
  ${mediaquery.mobile`
    height:49px;
  `}
`;

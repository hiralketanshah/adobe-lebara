import React from "react";
import SingleFormContainer from "../../layouts/SingleFormContainer";
import { UserDetailsProps } from "./types";
import UserDetails from "./UserDetails";

const LayoutWrapper: React.FC<UserDetailsProps> = ({ ...rest }) => {
  return (
    <SingleFormContainer hideButton noPadding>
        <UserDetails {...rest} />
    </SingleFormContainer>
  );
};
export default LayoutWrapper;

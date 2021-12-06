import React from "react";
import { Box } from "@chakra-ui/react";
import NewPostpaidNumber from "./NewPostpaidNumber";
import NewPostpaidNumberLayout from "../../layouts/NewPostpaidNumberLayout";
import { NewPostPaidNumberProps } from "./types";

const NewPostpaidNumberRoute: React.FC<NewPostPaidNumberProps> = ({...props}) => (
  <NewPostpaidNumberLayout>
    <Box width="100%" display={{ md: "flex" }} justifyContent="center">
      <NewPostpaidNumber {...props}/>
    </Box>
  </NewPostpaidNumberLayout>
);
export default NewPostpaidNumberRoute;

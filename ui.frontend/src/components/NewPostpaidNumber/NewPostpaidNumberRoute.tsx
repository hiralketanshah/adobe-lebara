import React from "react";
import { Box } from "@chakra-ui/react";
import NewPostpaidNumber from "./NewPostpaidNumber";
import NewPostpaidNumberLayout from "../../layouts/NewPostpaidNumberLayout";

const NewPostpaidNumberRoute: React.FC = () => (
  <NewPostpaidNumberLayout>
    <Box width="100%" display={{ md: "flex" }} justifyContent="center">
      <NewPostpaidNumber />
    </Box>
  </NewPostpaidNumberLayout>
);
export default NewPostpaidNumberRoute;

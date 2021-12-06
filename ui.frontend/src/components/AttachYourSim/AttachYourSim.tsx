import React, { useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/all";
import Button from "../Button/Button";
import AttachSimIcon from "../../assets/images/attachSim.png";
import DelinkSim from "../DLinkSim/DelinkSim";
import DelinkConfirmation from "../DLinkSim/DelinkConfirmation";
import { AttachYourSimProps } from "./types";
import { useSelector } from "react-redux";
import { selectMsisdn } from "../../redux/selectors/userSelectors";
import AttachYourSimDialog from "./AttachYourSimDialog";
import getDynamicValues from "../../utils/get-aem-dynamic-values";
const AttachYourSim: React.FC<AttachYourSimProps> = ({ 
  ...props
 }) => {
   const { title,linkedSimDesc,noLabel,attachNewSim,activeMonthPlanLabel,delinkLabel} = props;
  const msisdn = useSelector(selectMsisdn);
  const sims: string[] = !msisdn ? [] : [msisdn];
  const [expandedSim, setExpandedSim] = useState([""]);
  const [dLinkSim, setDLinkSim] = useState("");
  const [isDlinkModalOpen, setDLinkModalClose] = useState(false);
  const [isDLinkEmailConfirmModal, setDlinkEmailConfirmModal] = useState(false);
  const [isAttachNewSimDialogShown, setIsAttachNewSimDialogShown] =
    useState(false);
  const handleAttachNewSim = () => {
    setIsAttachNewSimDialogShown(true);
  };
  const simStyle = {
    color: "primary.800",
    fontSize: "20px",
    lineHeight: "22px",
    letterSpacing: "0.15px",
    fontWeight: "500",
    fontFamily: "Roboto",
    ml: "13px",
  };
  const handleExpand = (sim: string) => {
    if (expandedSim.includes(sim)) {
      setExpandedSim(expandedSim.filter((simVal) => simVal !== sim));
    } else {
      setExpandedSim([...expandedSim, sim]);
    }
  };
  return (
    <>      
    <Flex
    flexDir="column"
    alignItems="center"
    justifyContent="center"
  >
    <Box width={{ base: "100%", lg: "631px" }}>
      <AttachYourSimDialog
        open={isAttachNewSimDialogShown}
        close={() => setIsAttachNewSimDialogShown(false)}
        {...props}
      />
      <Box width="100%" textAlign="center" px="20px" py="17px">
        <Text
          color="primary.800"
          fontSize="24px"
          lineHeight="30px"
          letterSpacing="0.25px"
          fontWeight="500"
          fontFamily="Roboto"
        >
          {title}
        </Text>
        <Text
          color="primary.800"
          fontSize="14px"
          lineHeight="20px"
          letterSpacing="0.25px"
          fontFamily="Roboto"
        >
           <span dangerouslySetInnerHTML={{ __html: getDynamicValues(linkedSimDesc, [`<strong>${msisdn ? "1" : noLabel}</strong>`]) }} />
        </Text>
        {!msisdn && (
          <Button
            mt="20px"
            width={{ base: "100%", md: "335px" }}
            mb="5px"
            onClick={handleAttachNewSim}
          >
           {attachNewSim}
          </Button>
        )}
        {sims?.map((sim) => (
          <Box
            backgroundColor="#FFFFFF"
            pl="23px"
            pr="17px"
            py="23px"
            borderRadius="12px"
            mt="15px"
            key={sim}
          >
            <Flex alignItems={{ base: "center", sm: "end" }}>
              <img src={AttachSimIcon} alt="Attach Sim" />
              <Text {...simStyle}>{`SIM, ${sim}`}</Text>
              <Box
                marginLeft="auto"
                cursor="pointer"
                onClick={() => handleExpand(sim)}
              >
                {expandedSim.includes(sim) ? (
                  <IoIosArrowUp size="24" fill="#FF3182" />
                ) : (
                  <IoIosArrowDown size="24" fill="#FF3182" />
                )}
              </Box>
            </Flex>
            {expandedSim.includes(sim) && (
              <Flex mt="15px" flexDir="column">
                <Text
                  textAlign="left"
                  fontSize="14px"
                  lineHeight="20px"
                  letterSpacing="0.25px"
                  color="primary.800"
                >
                  {activeMonthPlanLabel}
                </Text>
                <Button
                  mt="25px"
                  onClick={() => {
                    setDLinkSim(sim);
                    setDLinkModalClose(true);
                  }}
                >
                  {delinkLabel}
                </Button>
              </Flex>
            )}
          </Box>
        ))}
        <DelinkSim
          isOpen={isDlinkModalOpen}
          onClose={(isConfirm) => {
            setDLinkModalClose(false);
            if (isConfirm) setDlinkEmailConfirmModal(true);
          }}
          sim={dLinkSim}
          {...props}
        />
        <DelinkConfirmation
          isOpen={isDLinkEmailConfirmModal}
          onClose={() => setDlinkEmailConfirmModal(false)}
          sim={dLinkSim}
          {...props}
        />
      </Box>
      </Box>
      </Flex>
    </>
  );
};

export default AttachYourSim;

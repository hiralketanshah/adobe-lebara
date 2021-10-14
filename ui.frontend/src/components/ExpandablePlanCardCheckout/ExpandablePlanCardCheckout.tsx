import React from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Switch,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import { ExpandablePlanCardCheckoutProps } from "./types";
import Button from "../Button/Button";
import DeleteIcon from "../../icons/DeleteIcon";
import ThreeDots from "../../assets/images/three-dots.png";
import PlanDetailsDialog from "../PlanDetailsDialog/PlanDetailsDialog";
//import countries from "../../static/countries";
import TickInCircle from "../../icons/TickInCircle";

const DataExpandablePlanCardCheckout: React.FC<ExpandablePlanCardCheckoutProps> =
  ({
    magentoId,
    isAddon,
    isFreeSim,
    title,
    price,
    showAutoRenew,
    onRemove,
    hideViewDetails,
    attributes,
    viewPlansLabel,
    showDetailsLabel,
    removeLabel,
    autoRenewDesc,
    autoRenewLabel,
    description
  }) => {
    // const [isExpanded, setIsExpanded] = React.useState(initialIsExpanded);
    const [isAutoRenew, setIsAutoRenew] = React.useState(false);

    const handleRemoveClick = () => {
      if (onRemove) {
        onRemove(magentoId);
      }
    };
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    return (
      <>
        <PlanDetailsDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          planName="Komplett S"
          price={price}
          duration={isAddon ? "" : `${attributes?.[4]} Days`}
          countries={[]}
          dataValue={attributes?.[1]}
          previewIcon={<TickInCircle fill="#13357A" tickFill="#EA4984" />}
          // should be replaced by CF data from AEM
          previewItems={[]}
          hideButton
        />
        <Box
          px={27}
          py={15}
          paddingInline={4}
          bg="white"
          border="1px"
          borderRadius="8px"
          borderColor="greySuccess"
        >
          <Flex alignItems="center" justifyContent="center">
            <Flex flexDirection="column">
              <Heading
                as="h3"
                fontSize="16px"
                fontWeight="bold"
                color="bodyCopy"
              >
                {title}
              </Heading>
              {!isFreeSim && (
                //needs to be replaced with CF data
                <Text pt="11px" color="grey.300" fontSize="12px" word>
                  {isAddon
                    ? `Includes ${JSON.parse(description)[0]?.name}`
                    : `Includes ${attributes?.[1]} + ${attributes?.[2]} national minutes + ${attributes?.[3]} International minutes`}
                </Text>
              )}
            </Flex>
            <Spacer />
            <Box display="contents">
              <Text fontSize="30px" fontWeight="bold" color="bodyCopy" px={5}>
                €{price}
              </Text>
              {!hideViewDetails && (
                <Menu>
                  <MenuButton>
                    <Image src={ThreeDots} cursor="pointer" />
                  </MenuButton>
                  <MenuList minW={150} px="10px">
                    <MenuItem
                      onClick={() => setIsDialogOpen(true)}
                      borderBottom="1px"
                      borderBottomColor="borderNwColor"
                    >
                     {showDetailsLabel}
                    </MenuItem>
                    <MenuItem
                      borderBottom="1px"
                      borderBottomColor="borderNwColor"
                    >
                     {viewPlansLabel}
                    </MenuItem>
                    <MenuItem>
                      <Button
                        rightIcon={<DeleteIcon />}
                        variant="ghost"
                        color="black"
                        onClick={handleRemoveClick}
                        padding="0"
                        height={30}
                        fontWeight="normal"
                        textTransform="none"
                      >
                        {removeLabel}
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Box>
          </Flex>
          {showAutoRenew && (
            <Box>
              <Flex
                alignItems="space-between"
                justifyContent="space-between"
                mt="22px"
                mb="8px"
              >
                <Heading
                  as="h3"
                  fontSize="16px"
                  fontWeight="bold"
                  color="bodyCopy"
                >
                  {autoRenewLabel}
                </Heading>
                <Switch
                  size="md"
                  colorScheme="secondary"
                  variant="outline"
                  px={3}
                  isChecked={isAutoRenew}
                  onChange={(e) => setIsAutoRenew(e.target.checked)}
                />
              </Flex>
              {isAutoRenew && (
                <Text color="grey.300" fontSize="12px">
                  {autoRenewDesc}
                </Text>
              )}
            </Box>
          )}

          {hideViewDetails && (
            <Box>
              <Divider mt="21px" mb="8px" />
              <Button
                leftIcon={<DeleteIcon />}
                variant="ghost"
                color="secondary.500"
                onClick={() => {
                  if (onRemove) {
                    onRemove(magentoId, true);
                  }
                }}
              >
               {removeLabel}
              </Button>
            </Box>
          )}
        </Box>
      </>
    );
  };

export default DataExpandablePlanCardCheckout;

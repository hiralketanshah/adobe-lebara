import React, { useState } from "react";
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
import TickInCircle from "../../icons/TickInCircle";
import {globalConfigs} from  '../../GlobalConfigs.js';
import { ExpandableSimPlanCardProps } from "../ExpandableSimPlanCard/types";
import { allowanceListProps } from "../ExpandablePlanCard/types";
import ChangePlanDialog from "../ChangePlanDialog/ChangePlanDialog";
import getCfOfferDataUrl from "../../utils/aem-utils";
import { Icon } from "../Icon/Icon";
import { FiChevronRight, HiOutlineExclamation } from "react-icons/all";
import useMissingDetails from "../../hooks/useMissingDetails";
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
    description,
    id,
    selectPlanLabel,
    plansTitle,
    addonsTitle,
    isPrepaid,
    isPostPaid,
    missingInfoLabel
  }) => {
    const [isAutoRenew, setIsAutoRenew] = React.useState(false);
    const { isMissingDetails } = useMissingDetails();
    const [data, setData] = useState<Partial<ExpandableSimPlanCardProps>>({});
    async function fetchData() {
      const response = await fetch(getCfOfferDataUrl(id));
      const json = await response.json();
      setData(json[0]);
    }
    const handleRemoveClick = () => {
      if (onRemove) {
        onRemove(magentoId);
      }
    };
    const onClickDialogOpen = () => {
      setIsDialogOpen(true);
      fetchData();
    };
    const IsJsonString = (str:string) => {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [isChangePlanDialogOpen, setIsChangePlanDialogOpen] =
    React.useState(false);
    const filteredAllowanceList: allowanceListProps = (data.allowanceList && data.allowanceList.find((list) => list.name && list.name.includes('Data'))) || {};
    return (
      <>
        <ChangePlanDialog
          title={isAddon ? (addonsTitle || "") : (plansTitle || "")}
          isOpen={isChangePlanDialogOpen}
          onClose={() => setIsChangePlanDialogOpen(false)}
          magentoId={magentoId}
          sku={id.toString()}
          selectPlanLabel={selectPlanLabel}
          showDetailsLabel={showDetailsLabel}
        />
        <PlanDetailsDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          planName={data?.planName || ""}
          price={price}
          duration={isAddon ? "" : (data.validity || "")}
          title={data.planInfo?.title}
          countryTitle={data.planInfo?.countryTitle}
          countries={(data.planInfo?.countryList) || []}
          dataValue={filteredAllowanceList.formatedValue}
          previewIcon={<TickInCircle fill="#13357A" tickFill="#EA4984" />}
          previewItems={data.planInfo?.listPlanItem || []}
          hideButton
          isLoading={Object.keys(data).length === 0}
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
                <Text pt="11px" color="grey.300" fontSize="12px" word>
                  {IsJsonString(description) ? JSON.parse(description) : description}
                </Text>
              )}
            </Flex>
            <Spacer />
            <Box display="contents">
              <Text fontSize="30px" fontWeight="bold" color="bodyCopy" px={5}>
                {globalConfigs.currencySymbol}{price}
              </Text>
              {!hideViewDetails && (
                <Menu>
                  <MenuButton>
                    <Image src={ThreeDots} cursor="pointer" />
                  </MenuButton>
                  <MenuList minW={150} px="10px">
                    <MenuItem
                      onClick={onClickDialogOpen}
                      borderBottom="1px"
                      borderBottomColor="borderNwColor"
                    >
                     {showDetailsLabel}
                    </MenuItem>
                    <MenuItem
                      borderBottom="1px"
                      borderBottomColor="borderNwColor"
                      onClick={() => {
                        setIsChangePlanDialogOpen(true);
                      }}
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
          {(isPrepaid || isPostPaid) && isMissingDetails && (
            <Flex
              borderWidth={1}
              borderColor="warning"
              py="12px"
              px="14px"
              borderRadius="12px"
              boxShadow="0px 1px 4px rgba(0, 0, 0, 0.21)"
              alignItems="center"
              my="14px"
            >
              <Icon
                icon={HiOutlineExclamation}
                color="warning"
                w="20px"
                h="20px"
              />
              <Text
                pl="11px"
                fontSize="14px"
                fontWeight="400"
                lineHeight="20px"
                letterSpacing="0.25px"
                color="primary.800"
              >
                {missingInfoLabel}
              </Text>
              <Spacer />
              <Icon icon={FiChevronRight} color="warning" w="20px" h="20px" />
            </Flex>
          )}
        </Box>
      </>
    );
  };

export default DataExpandablePlanCardCheckout;

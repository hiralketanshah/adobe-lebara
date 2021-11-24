import React, { useState } from "react";
import {
  Center,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { ChangePlanDialogProps } from "./types";
import GET_RELATED_OFFERS from "../../graphql/GET_RELATED_OFFERS";
import ExpandableSimPlanCard from "../ExpandableSimPlanCard/ExpandableSimPlanCard";
import { globalConfigs } from "../../GlobalConfigs";
import { ExpandableSimPlanCardProps } from "../ExpandableSimPlanCard/types";
import getCfOfferDataUrl from "../../utils/get-cf-offer-data-url";
import TickInCircle from "../../icons/TickInCircle";
const ChangePlanDialog: React.FC<ChangePlanDialogProps> = ({
  title,
  isOpen,
  onClose,
  sku,
  showDetailsLabel,
  selectPlanLabel
}) => {
  const { data: getRelatedOffers } = useQuery(GET_RELATED_OFFERS, {
    variables: {
      country: globalConfigs.country,
      channel: "Web",
      currentOfferId: sku,
      noOfOffers: 3,
    },
  });
  const [loadData, setLoadData] = React.useState(true);
  const relatedOfferIds: string[] = [];
  getRelatedOffers?.getRelatedOffers?.forEach((item: any) => relatedOfferIds.push(item.offerId));
  const [data, setData] = useState<ExpandableSimPlanCardProps[]>([]);
  async function fetchData() {
    const response = await fetch(getCfOfferDataUrl(relatedOfferIds.join(',')));
    const json = await response.json();
    setData(json);
  }
  if (relatedOfferIds.length && loadData) {
    fetchData();
    setLoadData(false);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pb={0}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={0}>
          {Object.keys(data).length === 0 ? <Center><Spinner /></Center> : ''}
          {data &&
            data.map((plan: ExpandableSimPlanCardProps, index: number) => (
              <React.Fragment key={plan?.planName}>
                <ExpandableSimPlanCard {...plan} isRelatedPlan isRemoveFromCart
                  showLabel={showDetailsLabel}
                  buttonLabel={selectPlanLabel}
                  previewIcon={<TickInCircle fill="#13357A" tickFill="#EA4984" />}
                  onClose={onClose} />
                {index !== data?.length - 1 && <Divider />}
              </React.Fragment>
            ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChangePlanDialog;

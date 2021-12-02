import { OrderSummaryProps } from "../PostpaidPersonalDetails/types";

export interface PostpaidPersonalDetailsPreviewProps extends OrderSummaryProps{
    heading?: string;
    fNameLabel?: string;
    lNameLabel?: string;
    emailLabel?: string;
    dobLabel?: string;
    address?: string;
    portingSectionHeading?: string;
    customerSupportText?: string;
    productAndServiceDescription?: string;
    productAndServicePreviewText?: string; //
    privacyPolicyTextDescription?: string;
    ctaContinueLabel?: string;
    orderTotalLabel?: string; //
    paymentMethodLabel?: string; //
}

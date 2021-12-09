import { SelectOptionTypeString } from "@lebara/ui/src/components/Select/types";


interface OptionsFieldProps {
  label?: string;
  value?: string;
}
export interface BaseFormFields {
    emailLabel?: string;
    emailPlaceholder?: string;
    passwordLabel?: string;
    passwordPlaceholder?: string;
    mobileLabel?: string;
    mobilePlaceHolder?: string;
    alternativeNumberPlaceholder?: string;
    alternativeContactLabel?: string;
    fNameLabel?: string;
    fnamePlaceholder?: string;
    lNameLabel?: string;
    lNamePlaceholder?: string;
    dobLabel?: string;
    dayLabel?: string;
    dayPalceholder?: string;
    monthLabel?: string;
    monthPlaceholder?: string;
    yearLabel?: string;
    yearPlaceholder?: string;
    shippingLabel?: string;
    shippingPlaceholder?: string;

    oldPasswordLabel?: string;
    oldPasswordPlacehodler?: string;
    newPasswordLabel?: string;
    newPasswordPlacehodler?: string;
    confirmNewPasswordLabel?: string;
    confirmPasswordPlacehodler?: string;

    streetLabel?: string;
    streetPlaceholder?:string;
    houseNumberLabel?:string;
    houseNumberPlaceholder?:string;
    zipCodeLabel?:string;
    zipCodePlaceholder?:string;
    cityLabel?:string;
    postalcodePlaceholder?:string;
    cityPlaceholder?:string;
    cities?: SelectOptionTypeString[];
    addressErrorRequired?:string;
    streetLabelErrorMax?:string;
    streetLabelErrorRequired?:string;
    streetLabelErrorPattern?:string;
    houseNumberErrorMax?:string;
    houseNumberErrorRequired?:string;
    houseNumberErrorPattern?:string;
    zipCodeErrorMax?:string;
    zipCodeErrorRequired?:string;
    zipCodeErrorPattern?:string;
    zipCodeErrorMin?:string;
    cityErrorMax?:string;
    cityErrorRequired?:string;
    enterAddressManually?: string;
    keyInAddress?: string;
    saveAddress?: string;
    addressKeyInText?:string;
    emailAddressAlreadyExistMsg?: string;

    linkCTALabel?: string;
    buttonCTALabel?: string;
    ctaContinueLabel?: string;
    ctaSkipLabel?: string;
    orTextLabel?: string;

    subscribeOptions?: OptionsFieldProps[];
    ctaButtonLabel?: string;
    ctaCancelLabel?: string;
  }
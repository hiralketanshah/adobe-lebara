import { SelectOptionTypeString } from '../Select/types';
export interface BaseFormFields {
    emailLabel?: string;
    emailPlaceholder?: string;
    mobileLabel?: string;
    mobilePlaceHolder?: string;
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
  }
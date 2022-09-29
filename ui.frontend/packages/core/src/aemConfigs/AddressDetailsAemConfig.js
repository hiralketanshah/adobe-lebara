import { MapTo } from "@adobe/aem-react-editable-components";
import Address from "@lebara/netherlands/components/Address/Address";

const AddressDetailsConfig = {
  emptyLabel: "Address Details Component",
  isEmpty: function (props) {
    return !props.houseNumberLabel;
  },
};

MapTo("lebara/components/nl/addressdetails")(Address, AddressDetailsConfig);
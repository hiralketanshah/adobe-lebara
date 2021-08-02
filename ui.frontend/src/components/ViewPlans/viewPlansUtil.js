export const getAllowanceDetails = (allowances, allowanceType) => {
  let value;
  let allowancesArray = JSON.parse(allowances);
  allowancesArray.forEach((allowance) => {
    if (allowanceType == "Data" && allowance.account.name == "Data") {
      value =
        allowance?.allowanceValue >= 1024
          ? allowance?.allowanceValue / 1024 + "GB"
          : allowance?.allowanceValue + "MB";
    } else if (
      allowanceType == "UK_L2L_Mins" &&
      allowance.account.name == '"UK_L2L_Mins"'
    )
      value =
        allowance?.allowanceValue +
        " " +
        allowance?.account?.unit?.abbreviation;
    else if (allowanceType == "L2L SMS" && allowance.account.name == "L2L SMS")
      value =
        allowance?.allowanceValue +
        " " +
        allowance?.account?.unit?.abbreviation;
    else if (
      "UKSIM_International_15" &&
      allowance.account.name == "UKSIM_International_15"
    )
      value =
        allowance?.allowanceValue +
        " " +
        allowance?.account?.unit?.abbreviation;
    else if ("UK_Plan_National" && allowance.account.name == "UK_Plan_National")
      value =
        allowance?.allowanceValue +
        " " +
        allowance?.account?.unit?.abbreviation;
    else if (
      "UK_UNL_National_SMS" &&
      allowance.account.name == "UK_UNL_National_SMS"
    )
      value =
        allowance?.allowanceValue +
        " " +
        allowance?.account?.unit?.abbreviation;
  });
  return value;
};

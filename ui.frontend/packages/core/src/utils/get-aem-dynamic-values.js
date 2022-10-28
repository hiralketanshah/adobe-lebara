const getDynamicValues = (str, valArr) => {
  let resultStr = str;
  if (str && valArr.length) {
    for (var i = 0; i < valArr.length; i++) {
      resultStr = resultStr.replace("{" + i + "}", valArr[i]);
    }
  }
  return resultStr;
};

export default getDynamicValues;

exports.kelvinChecker = (tempToCheck) => {
  const newArray = [];

  newArray.push(tempToCheck);

  let updatedTemp = 0;

  if (newArray[0] > 50) {
    updatedTemp = Math.round(newArray[0] - 273.15);
  } else {
    updatedTemp = Math.round(newArray[0]);
  }
  return updatedTemp;
};

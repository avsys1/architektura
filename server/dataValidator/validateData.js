function checkData(params) {
  let isValid = true;
  params.forEach((element) => {
    console.log(element);
    if (
      element == undefined ||
      element == null ||
      element == "" ||
      element === "null"
    )
      isValid = false;
  });
  return isValid;
}

module.exports = { checkData };

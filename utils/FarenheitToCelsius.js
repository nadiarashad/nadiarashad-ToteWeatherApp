export const changeFarenheitToCelsius = (tempToChange) => {
  const celsius = (tempToChange - 32) / 1.8;

  return celsius;
};

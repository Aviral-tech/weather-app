export const convertToCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const convertToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

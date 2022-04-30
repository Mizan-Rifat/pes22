export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const snakeCaseToTitleCase = string =>
  capitalizeFirstLetter(string.split('_').join(' ').toLowerCase());

export const capitalizeFirstLetter = (input: string):string => {
    if (input.length === 0) return "";
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }
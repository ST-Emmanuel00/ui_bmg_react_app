import { formatDate } from "./Format.date";

export const formatValue = (key: string, value: string | boolean): string => {
  if (key === "birthday" && typeof value === "string") {
    return formatDate(value);
  }
  if (key === "status" && typeof value === "boolean") {
    return value ? "Active" : "Inactive";
  }
  if (typeof value === "string") {
    // Verifica si el valor es una fecha en formato ISO
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    if (dateRegex.test(value)) {
      return formatDate(value);
    }
    return value;
  }
  return JSON.stringify(value);
};

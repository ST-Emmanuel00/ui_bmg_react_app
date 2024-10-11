import {
  API_URL,
  status,
  OptionsProps,
  documentTypes,
  documentTypes2,
  genders,
  genders2,

} from "./Users/Const";
import { formatValue } from "./Common/Format.value";
import { formatDate, inputFormatDate } from "./Common/Format.date";
import { useAppLocation } from "./Common/useAppLocation";
import { capitalizeFirstLetter } from "./Common/Capitalize";
import { Alerts, AlertOptions } from "./Common/toast";
import { RoleOptions } from "./Roles/RoleOptions";
import { userCreateInputsInfo } from './Users/UserCreateInputs';
import { userEditInputsInfo } from './Users/UserEditInputs';
import { usersHeaderTitles } from './Users/UserHeadersTitles';

export {
  RoleOptions,
  API_URL,
  formatValue,
  inputFormatDate,
  formatDate,
  useAppLocation,
  capitalizeFirstLetter,
  Alerts,
  status,
  genders,
  genders2,
  documentTypes,
  documentTypes2,
  userCreateInputsInfo,
  userEditInputsInfo,
  usersHeaderTitles,
};
export type { AlertOptions, OptionsProps };

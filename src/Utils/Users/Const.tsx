export const API_URL = "http://localhost:8000/api/";

export interface OptionsProps {
  label: string;
  value: string;
}
export const status: OptionsProps[] = [
  // "true",
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" },
];

export const genders: OptionsProps[] = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];




// export const documentTypes: OptionsProps[] = [
//   { label: "P", value: "P" },
//   { label: "CC", value: "CC" },
//   { label: "TI", value: "TI" },
//   { label: "CE", value: "CE" },
//   { label: "PEP", value: "PEP" },
//   { label: "SP", value: "SP" },

// ];

export const documentTypes2 = ['P', 'CC', 'TI', 'CE', 'PEP', 'SP'];


export const documentTypes: OptionsProps[] = []

documentTypes2.map((value) => {
  documentTypes.push({ label: value, value: value })
})


export const genders2 = ['Male', 'Female', 'Other'];

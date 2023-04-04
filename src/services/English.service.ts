export type Unit = {
  label: string;
  description?: string;
  value: number | string;
}


export const getListOfUnit = (): Unit[] => {
  return [
    {
      label: "All",
      description: "All unit on this application",
      value: 0,
    },
    {
      label: "",
      description: "",
      value: 26,
    },
    {
      label: "",
      description: "",
      value: 27,
    },
    {
      label: "",
      description: "",
      value: 28,
    },
    {
      label: "",
      description: "",
      value: 29,
    },
    {
      label: "",
      description: "",
      value: 30,
    }
  ]
}
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
      label: "01. Daily Activities",
      description: "",
      value: 1,
    },
    {
      label: "02. Daily Activities",
      description: "",
      value: 2,
    },
    {
      label: "03. A Productive Day",
      description: "",
      value: 3,
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
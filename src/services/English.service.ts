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
      label: "04. Personal Information",
      description: "",
      value: 4,
    },
    {
      label: "05. Career Orientation",
      description: "",
      value: 5,
    },
    {
      label: "06. Job Interview",
      description: "",
      value: 6,
    },
    {
      label: "07. Jobs And Workplace",
      description: "",
      value: 7,
    },
    {
      label: "08. School And Education",
      description: "",
      value: 8,
    },
    {
      label: "09. School And Education",
      description: "",
      value: 9,
    },
    {
      label: "10. Friendship",
      description: "",
      value: 10,
    },
    {
      label: "26. Movies",
      description: "",
      value: 26,
    },
    {
      label: "27. Fame And Celebrity",
      description: "",
      value: 27,
    },
    {
      label: "28. Hobbies",
      description: "",
      value: 28,
    },
    {
      label: "29. Sports",
      description: "",
      value: 29,
    },
    {
      label: "30. Beauty",
      description: "",
      value: 30,
    }
  ]
}

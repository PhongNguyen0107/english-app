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
      label: "11. Making an appointment",
      description: "",
      value: 11,
    },
    {
      label: "12. Family",
      description: "",
      value: 12,
    },
    {
      label: "13. Sharing & Feelings",
      description: "",
      value: 13,
    },
    {
      label: "14. Sharing & Feelings",
      description: "",
      value: 14,
    },
    {
      label: "15. Describing & People",
      description: "",
      value: 15,
    },
    {
      label: "16. Food & Drinks",
      description: "",
      value: 16,
    },
    {
      label: "17. Food & Drinks",
      description: "",
      value: 17,
    },
    {
      label: "18. Healthy Diet",
      description: "",
      value: 18,
    },
    {
      label: "19. Body Health",
      description: "",
      value: 19,
    },
    {
      label: "20. Body Health",
      description: "",
      value: 20,
    },
    // {
    //   label: "21. ",
    //   description: "",
    //   value: 21,
    // },
    // {
    //   label: "22. ",
    //   description: "",
    //   value: 22,
    // },
    // {
    //   label: "23. ",
    //   description: "",
    //   value: 23,
    // },
    // {
    //   label: "24. ",
    //   description: "",
    //   value: 24,
    // },
    // {
    //   label: "25. ",
    //   description: "",
    //   value: 25,
    // },
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
const newBusinessQuestions = [
  {
    description:
      "What will you sell? How much will you sell it for? How many of your products do you think you will sell this year?",
    type: null,
    required: false,
    product: true,
    placeholder: "Online services",
  },
  {
    description:
      "What will you sell? How much will you sell it for? How many of your products do you think you will sell this year?s",
    type: "text",
    required: false,
    placeholder: "10 million",
  },
  {
    description: "How do you plan to get there? Check all that apply.",
    type: null,
    checkbox: true,
    required: true,
  },
  {
    description:
      "Do you need extra hands to run your business next year? What’s the role, salary and when do you plan to hire?",
    type: null,
    employee: true,
    required: false,
  },
  {
    description:
      "What are the big purchases that will help you grow next year? For example, a sewing machine or a cutting machine. How much do you think it will be, when do you plan to buy it, and how many years do you think you can use it for?",
    type: null,
    purchase: true,
    required: false,
  },
  {
    description:
      "How much money can you get from different sources to start the business?",
    type: null,
    fundingSource: true,
    required: false,
  },
];

export default newBusinessQuestions;

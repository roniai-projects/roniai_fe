const existingBusinessQuestions = [
  {
    description:
      "Upload your latest Financial Statements, including income statement, balance sheet, and cash flows.",
    required: true,
    financialStatement: true,
  },
  {
    description: "Upload your monthly revenues for the past year.",
    required: false,
    monthlyRevenues: true,
  },
  {
    description: "Upload your current employees’ roles and salary per month.",
    required: false,
    employeeFile: true,
  },
  {
    description: "What do you sell? How much do you sell it for?",
    type: null,
    product: true,
    required: true,
  },
  {
    description:
      "How much more do you want to sell next year compared to what you're selling this year? Usual answer is 10%-20%, if you're growing normally, and 100%, if you want to grow very quickly.",
    type: null,
    select: true,
    required: true,
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
];

export default existingBusinessQuestions;

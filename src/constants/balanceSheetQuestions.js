const balanceSheetQuestions = [
  {
    description: "Which company are you creating the balance sheet for?",
    type: null,
    company: true,
    required: true,
  },
  {
    description: "What date would you like to display for your balance sheet?",
    type: null,
    date: true,
    required: true,
  },
  {
    description: "How much is your cash on hand?",
    type: null,
    cashOnHand: true,
    required: true,
  },
  {
    description: "How much is your cash in bank?",
    type: null,
    cashInBank: true,
    required: true,
  },
  {
    description: "Who are your clients that still have to pay you?",
    type: null,
    clientsToPay: true,
    required: false,
  },
  {
    description:
      "Inventory or things that you have to sell and how much did you pay for them",
    type: null,
    inventory: true,
    required: false,
  },
  {
    description: "Rental deposits or advances that you have made, if any",
    type: null,
    cashAdvances: true,
    required: false,
  },
  {
    description:
      "Loans that your business gave to any party, aside from the ones to your clients",
    type: null,
    loans: true,
    required: false,
  },
  {
    description:
      "What other assets do you have in the business?",
    type: null,
    otherAssets: true,
    required: false,
  },
  {
    description:
      "Any existing equipment, land or building that you use in your business and how much did you pay for them, and how many years do you think you will use them",
    type: null,
    buildings: true,
    required: false,
  },
  {
    description: "Suppliers and how much owe them",
    type: null,
    suppliers: true,
    required: false,
  },
  {
    description: "Any bank loans or other loans",
    type: null,
    otherLoans: true,
    required: false,
  },
  {
    description:
      "You and your partners’ initial investment. This could be in Cash or Other equipment used in the business.",
    type: null,
    initialInvestment: true,
    required: false,
  },
];

export default balanceSheetQuestions;

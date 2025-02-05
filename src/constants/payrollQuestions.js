const payrollQuestions = [
  {
    description:
      "Upload your employee list (skip if you don't have an existing file)",
    type: null,
    employeeList1: true,
    required: true,
  },
  {
    description:
      "Employee list (only answer if you don't have an existing file)",
    type: null,
    employeeList2: true,
    required: true,
  },
  {
    description: "Every when do you pay salaries?",
    type: null,
    payday: true,
    required: true,
  },
];

export default payrollQuestions;

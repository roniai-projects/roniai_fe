const onboardingquestions = [
  {
    header:
      "To get the most benefits from RONI’s services, tell us a bit more about you.",
    // img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
    description: "",
    btn: "okay",
    required: false,
    start: true,
  },
  {
    name: true,
    description: "Enter your First Name and Last Name",
    // placeholder: ["First Name", "Last Name"],
    type: true,
    next: true,
    back: true,
    required: false,
  },
  {
    description: "Preferred Language and Country?",
    select: true,
    next: true,
    back: true,
    required: true,
  },
  {
    description: "Profile (check all that applies)",
    checkbox: true,
    next: true,
    back: true,
    required: true,
  },

  {
    description: "What will you use Roni AI for? (check all that applies)",
    checkbox2: true,
    next: true,
    back: true,
    required: true,
  },

  {
    description: "Which best describes you? (check all that applies)",
    checkbox3: true,
    next: true,
    back: true,
    required: true,
  },

  {
    description: "How did you hear about Roni AI?",
    select2: true,
    next: true,
    back: true,
    required: false,
  },

  {
    description: "Company Name",
    companyName: true,
    next: true,
    back: true,
    required: false,
  },

  {
    description: "What industry do you belong?",
    industry: true,
    next: true,
    back: true,
    required: false,
  },

  {
    description: "Where is your business located?",
    businessAddress: true,
    next: true,
    back: true,
    required: false,
  },

  {
    description: "What is your business' website?",
    website: true,
    next: true,
    back: true,
    required: false,
  },

  {
    description: "Are you a tech startup?",
    techStartup: true,
    next: true,
    back: true,
    required: false,
  },

  {
    header: "Thank you for your response!",
    // type: "text",
    btn: "Submit",
    submit: true,
  },
];

export default onboardingquestions;

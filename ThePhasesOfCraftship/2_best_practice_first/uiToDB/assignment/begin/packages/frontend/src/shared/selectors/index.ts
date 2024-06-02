export const appSelectors = {
  registration: {
    registrationForm: {
      email: { selector: ".registration.email", type: "input" },
      username: { selector: ".registration.username", type: "input" },
      firstname: { selector: ".registration.first-name", type: "input" },
      lastname: { selector: ".registration.last-name", type: "input" },
      marketingCheckbox: {
        selector: ".registration.marketing-emails",
        type: "checkbox",
      },
      submit: { selector: ".registration.submit-button", type: "button" },
    },
  },
  header: { selector: ".header.username", type: "div" },
  notifications: {
    failure: "#failure-toast",
    success: "#success-toast",
  },
};

export function toClass(input: string): string {
  // Remove the leading dot and replace all remaining dots with spaces
  return input.slice(1).replace(/\./g, " ");
}

export function toId(input: string): string {
  if (!input.startsWith("#")) {
    throw new Error("Input string must start with a hash symbol (#).");
  }

  // Remove the leading hash symbol
  return input.slice(1);
}

export function validateText(value) {
  if (typeof value !== "string" || value.trim().length < 2) {
    return "Must be at least 2 characters";
  }
}

export function validateEmail(email) {
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid.";
  }
}

export function validateMessage() {
  if (!message) errors.message = "Message cannot be empty.";
}

export function validatePassword(password) {
  if (password.length < 6) {
    return "password must be atleast 10 char";
  }
}

// ../.server/validation.js
export function validatePhone(phone) {
  // must start with 07 or 01 and be exactly 10 digits
  const phoneRegex = /^(07|01)\d{8}$/;
  if (!phone) return "Phone number is required";
  if (!phoneRegex.test(phone)) {
    return "Phone number must start with 07 or 01 and be 10 digits long";
  }
  return null;
}

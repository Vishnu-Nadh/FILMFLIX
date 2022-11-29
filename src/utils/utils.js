import * as Yup from "yup";

export const truncateText = (text, numChars) => {
  return text.length > numChars
    ? text.substring(0, numChars - 1) + "..."
    : text;
};

export const getGenres = (array) => {
  if (array) {
    if (array.length >= 2) {
      return array[0].name + ", " + array[1].name;
    } else {
      return array[0].name;
    }
  }
};

export const getYear = (movie) => {
  return movie?.release_date?.split("-")[0] + " .";
};

export const minutesToHours = (minutes) => {
  if (minutes) {
    const hours = Math.floor(minutes / 60);
    const remMinutes = minutes % 60;
    return `${hours} hr ${remMinutes} min`;
  } else {
    return "";
  }
};

export const debounce = (callback, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

// authentication
export const signInValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email cannot be empty!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password cannot be empty!"),
});

export const signUpValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email cannot be empty!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password cannot be empty!"),

  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords does not match!"),
});

export const signUpFromWelcomeValidation = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password cannot be empty!"),

  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords does not match!"),
});

export const signInInitialValues = {
  email: "",
  password: "",
};

export const signUpInitialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const signUpFromWelcomeInitialValues = {
  password: "",
  confirmPassword: "",
};

export const createErrorMessage = (firebaseError) => {
  if (firebaseError === "Firebase: Error (auth/wrong-password).") {
    return "Your password is incorrect!";
  }
  if (firebaseError === "Firebase: Error (auth/user-not-found).") {
    return "No user found with the specified email!";
  }
  if (firebaseError === "Firebase: Error (auth/email-already-in-use).") {
    return "User account already exists!";
  }
  console.log(firebaseError);
  return "Something went wrong!!";
};

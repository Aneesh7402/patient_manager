import * as Yup from "yup";

export const personalInfoValidationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "First name can only contain letters") // Only letters
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name can't exceed 50 characters")
    .required("First Name is required"),

  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Last name can only contain letters") // Only letters
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name can't exceed 50 characters")
    .required("Last Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email address is not valid"
    ), // Added regex for extra validation

  dob: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future") // Ensure DOB is not in the future
    .test("age", "You must be at least 18 years old", (value:any) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      return age >= 18;
    })
    .required("Date of Birth is required"),

  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Gender must be selected") // Ensure valid gender options
    .required("Gender is required"),

  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid Indian phone number")
    .required("Phone is required"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters long")
    .max(255, "Address can't exceed 255 characters")
    .required("Address is required"),
});

export const insuranceInfoValidationSchema = Yup.object({
  providerName: Yup.string().required("Provider Name is required"),
  policyNumber: Yup.string().required("Policy Number is required"),
  expiryDate: Yup.date().required("Expiry Date is required").nullable(),
});


export const medicalHistoryValidationSchema = Yup.object().shape({
  medicalHistory: Yup.array().of(
    Yup.object().shape({
      conditionName: Yup.string().required("Condition name is required"),
      conditionDetails: Yup.string().required("Condition details are required"),
    })
  ).min(1, "At least one medication is required"),
});



export const medicationsValidationSchema = Yup.object({
  medications: Yup.array()
    .of(
      Yup.object({
        medicationName: Yup.string().required("Medication name is required"),
        dosage: Yup.string().required("Dosage is required"),
        frequency: Yup.string().required("Frequency is required"),
      })
    )
    .min(1, "At least one medication is required"),
});

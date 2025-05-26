import { FormikProps } from "formik";


export const validate = (query: string) => {
  const disallowedPatterns = [
    /\b(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|CREATE|GRANT|REVOKE)\b/i, // block modifying commands
    /--/, // SQL comment
    /;/g, // multiple statements (which can chain malicious queries)
  ];

  // Allow only SELECT queries (optional if you're being strict)
  const isSelect = /^\s*SELECT\b/i.test(query);

  if (!isSelect || disallowedPatterns.some((pattern) => pattern.test(query))) {
    alert("Invalid input detected. Only read-only SELECT queries are allowed.");
    return false;
  }

  return true;
};

export const validateFormik = async (formikObject: FormikProps<any> | null) => {
  

  // Ensure formikObject is defined and has the necessary methods
  if (formikObject && formikObject.validateForm) {
    const errors = await formikObject.validateForm();
    return errors
  }
  return false;
};

import React, { useEffect } from "react";
import { useFormik } from "formik";
import TextInput from "../(components)/textInput"; 
import DateInput from "../(components)/dateInput";
import { useStepperStore } from "../(utils)/store";
import { insuranceInfoValidationSchema } from "./validations/createValidations";

// Yup validation schema for insurance info


const InsuranceInfoComponent = () => {
  const { setFormik } = useStepperStore();

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      providerName: "",
      policyNumber: "",
      expiryDate: "",
    },
    validationSchema: insuranceInfoValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
    },
  });

  // Store formik object (optional - if you need it elsewhere)
  useEffect(() => {
    setFormik(formik);
  }, [formik.values]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Insurance Information</h2>

      {/* Provider Name Input */}
      <TextInput
        label="Provider Name"
        value={formik.values.providerName}
        onChange={formik.handleChange}
        name="providerName"
        placeholder="Enter insurance provider name"
      />
      {formik.touched.providerName && formik.errors.providerName && (
        <div className="text-red-500">{formik.errors.providerName}</div>
      )}

      {/* Policy Number Input */}
      <TextInput
        label="Policy Number"
        value={formik.values.policyNumber}
        onChange={formik.handleChange}
        name="policyNumber"
        placeholder="Enter policy number"
      />
      {formik.touched.policyNumber && formik.errors.policyNumber && (
        <div className="text-red-500">{formik.errors.policyNumber}</div>
      )}

      {/* Expiry Date Input */}
      <DateInput
        label="Expiry Date"
        value={formik.values.expiryDate}
        onChange={(e) => formik.setFieldValue("expiryDate", e.target.value)}
        name="expiryDate"
        placeholder="Select expiry date"
      />
      {formik.touched.expiryDate && formik.errors.expiryDate && (
        <div className="text-red-500">{formik.errors.expiryDate}</div>
      )}

      
    </div>
  );
};

export default InsuranceInfoComponent;

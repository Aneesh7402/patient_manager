import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../(components)/textInput"; 
import SingleSelectDropdown from "../(components)/singleSelectDropdown";
import DateInput from "../(components)/dateInput";
import { useStepperStore } from "../(utils)/store";
import {personalInfoValidationSchema} from "./validations/createValidations";

const PersonalInfoComponent = () => {
  const { setFormik} = useStepperStore();

  // Formik + Yup config
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
    },
    validationSchema: personalInfoValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {

    },
  });

  // Store formik object (optional - if you need it elsewhere)
  useEffect(() => {
    
    setFormik(formik);
  }, [formik.values]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

      {/* First Name Input */}
      <TextInput
        label="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        name="firstName"
        placeholder="Enter your first name"
      />
      {formik.touched.firstName && formik.errors.firstName && (
        <div className="text-red-500">{formik.errors.firstName}</div>
      )}

      {/* Last Name Input */}
      <TextInput
        label="Last Name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        name="lastName"
        placeholder="Enter your last name"
      />
      {formik.touched.lastName && formik.errors.lastName && (
        <div className="text-red-500">{formik.errors.lastName}</div>
      )}

      {/* Email Input */}
      <TextInput
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        name="email"
        placeholder="Enter your email"
        type="email"
      />
      {formik.touched.email && formik.errors.email && (
        <div className="text-red-500">{formik.errors.email}</div>
      )}

      {/* Phone Input */}
      <TextInput
        label="Phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        name="phone"
        placeholder="Enter your phone number"
        type="tel"
      />
      {formik.touched.phone && formik.errors.phone && (
        <div className="text-red-500">{formik.errors.phone}</div>
      )}

      {/* Address Input */}
      <TextInput
        label="Address"
        value={formik.values.address}
        onChange={formik.handleChange}
        name="address"
        placeholder="Enter your address"
      />
      {formik.touched.address && formik.errors.address && (
        <div className="text-red-500">{formik.errors.address}</div>
      )}

      {/* Date of Birth Input */}
      <DateInput
        label="Date of Birth"
        value={formik.values.dob}
        onChange={(e) => formik.setFieldValue("dob", e.target.value)}
        name="dob"
        placeholder="Enter your Date of Birth"
      />
      {formik.touched.dob && formik.errors.dob && (
        <div className="text-red-500">{formik.errors.dob}</div>
      )}

      {/* Gender Dropdown */}
      <SingleSelectDropdown
        label="Gender"
        selected={formik.values.gender}
        setSelected={(value) => formik.setFieldValue("gender", value)}
        options={["Select Gender", "Male", "Female", "Other"]}
        placeholder="Select your Gender"
      />
      {formik.touched.gender && formik.errors.gender && (
        <div className="text-red-500">{formik.errors.gender}</div>
      )}
    </div>
  );
};

export default PersonalInfoComponent;

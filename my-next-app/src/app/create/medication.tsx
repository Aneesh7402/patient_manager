import React, { useEffect } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import TextInput from "../(components)/textInput";
import { useStepperStore } from "../(utils)/store";
import { medicationsValidationSchema } from "./validations/createValidations";

const MedicationsComponent = () => {
  const { setFormik } = useStepperStore();

  const formik = useFormik({
    initialValues: {
      medications: [
        {
          medicationName: "",
          dosage: "",
          frequency: "",
        },
      ],
    },
    validationSchema: medicationsValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    setFormik(formik);
  }, [formik.values]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Medication Details</h2>
      <FormikProvider value={formik}>
        <FieldArray name="medications">
          {({ push, remove }) => (
            <>
              {formik.values.medications.map((medication, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm relative"
                >
                  {/* Medication Name */}
                  <TextInput
                    label="Medication Name"
                    name={`medications[${index}].medicationName`}
                    value={medication.medicationName}
                    onChange={formik.handleChange}
                    placeholder="Enter medication name"
                  />
                  {formik.touched.medications?.[index]?.medicationName &&
                    typeof formik.errors.medications?.[index] === "object" &&
                    formik.errors.medications?.[index]?.medicationName && (
                      <div className="text-red-500">
                        {formik.errors.medications[index]?.medicationName}
                      </div>
                    )}

                  {/* Dosage */}
                  <TextInput
                    label="Dosage"
                    name={`medications[${index}].dosage`}
                    value={medication.dosage}
                    onChange={formik.handleChange}
                    placeholder="Enter dosage"
                  />
                  {formik.touched.medications?.[index]?.dosage &&
                    typeof formik.errors.medications?.[index] === "object" &&
                    formik.errors.medications?.[index]?.dosage && (
                      <div className="text-red-500">
                        {formik.errors.medications[index]?.dosage}
                      </div>
                    )}

                  {/* Frequency */}
                  <TextInput
                    label="Frequency"
                    name={`medications[${index}].frequency`}
                    value={medication.frequency}
                    onChange={formik.handleChange}
                    placeholder="Enter frequency"
                  />
                  {formik.touched.medications?.[index]?.frequency &&
                    typeof formik.errors.medications?.[index] === "object" &&
                    formik.errors.medications?.[index]?.frequency && (
                      <div className="text-red-500">
                        {formik.errors.medications[index]?.frequency}
                      </div>
                    )}

                  {/* Remove Medication */}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              {/* Add Medication Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    push({ medicationName: "", dosage: "", frequency: "" })
                  }
                  className="w-10 h-10 rounded-full bg-blue-500 text-white text-xl flex items-center justify-center hover:bg-blue-600 transition"
                >
                  +
                </button>
              </div>
            </>
          )}
        </FieldArray>
      </FormikProvider>
    </div>
  );
};

export default MedicationsComponent;

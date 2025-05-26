import React, { useEffect } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import TextInput from "../(components)/textInput";
import { useStepperStore } from "../(utils)/store";
import { medicalHistoryValidationSchema } from "./validations/createValidations";

const MedicalHistoryComponent = () => {
  const { setFormik } = useStepperStore();

  const formik = useFormik({
    initialValues: {
      medicalHistory: [
        {
          conditionName: "",
          conditionDetails: "",
        },
      ],
    },
    validationSchema: medicalHistoryValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      // Handle form submission
    },
  });

  useEffect(() => {
    setFormik(formik);
  }, [formik.values]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 ">Medical History</h2>

      <FormikProvider value={formik}>
        <FieldArray
          name="medicalHistory"
          render={(arrayHelpers) => (
            <div className="space-y-6">
              {formik.values.medicalHistory.map((_, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4"
                >
                  <TextInput
                    label="Condition Name"
                    value={formik.values.medicalHistory[index].conditionName}
                    onChange={formik.handleChange}
                    name={`medicalHistory[${index}].conditionName`}
                    placeholder="Enter medical condition name"
                  />
                  {formik.touched.medicalHistory?.[index]?.conditionName &&
                    typeof formik.errors.medicalHistory?.[index] === "object" &&
                    formik.errors.medicalHistory?.[index]?.conditionName && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.medicalHistory[index]?.conditionName}
                      </div>
                    )}

                  <TextInput
                    label="Condition Details"
                    value={formik.values.medicalHistory[index].conditionDetails}
                    onChange={formik.handleChange}
                    name={`medicalHistory[${index}].conditionDetails`}
                    placeholder="Describe the condition"
                  />
                  {formik.touched.medicalHistory?.[index]?.conditionDetails &&
                    typeof formik.errors.medicalHistory?.[index] === "object" &&
                    formik.errors.medicalHistory?.[index]?.conditionDetails && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.medicalHistory[index]?.conditionDetails}
                      </div>
                    )}
                </div>
              ))}

              {/* Add More Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({
                      conditionName: "",
                      conditionDetails: "",
                    })
                  }
                  className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 shadow"
                  title="Add more"
                >
                  +
                </button>
              </div>
            </div>
          )}
        />
      </FormikProvider>
    </div>
  );
};

export default MedicalHistoryComponent;

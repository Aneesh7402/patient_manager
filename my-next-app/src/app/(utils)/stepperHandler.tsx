// app/utils/stepHandlers.ts
import { FormikProps } from "formik";
import {
  insertInsuranceInfo,
  insertMedicalHistory,
  insertMedications,
  insertPatient,
} from "../(db)/db";
import { useStepperStore } from "./store";
import { validateFormik } from "./functions";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for toast notifications

export const handleBack = () => {
  const { activeStep, setActiveStep } = useStepperStore();

  if (activeStep > 0) {
    // Global logic here

    setActiveStep(activeStep - 1);
  }
};

export const handleContinue = async (
  activeStep: number,
  setActiveStep: (step: number) => void,
  steps: { title: string; isCompleted: boolean }[],
  setStepData: (stepIndex: number, data: any) => void,
  stepData: Record<number, any>,
  formikObject: FormikProps<any> | null,
  setStepProgress: (index: number, isCompleted: boolean) => void,
  router: any,
  setIsLoading: (loading: boolean) => void
) => {
  // Set loading state to true
  try {
    const res = await validateFormik(formikObject);

    if (Object.keys(res).length) {
      Object.keys(res).forEach((key) => {
        const errorDetail = res[key];
        // Check if the error detail is an object and stringify it for better readability
        const errorMessage =
          typeof errorDetail === "object"
            ? JSON.stringify(errorDetail)
            : errorDetail;
        alert(`Error in ${key}: ${errorMessage}`);
      });
      return;
    }

    setIsLoading(true);
    const currActiveStep = activeStep;

    const result = await handleStepLogic(activeStep, formikObject, stepData);

    // Check if result is available
    if (result) {
      // Show success toast
      toast.success("Step completed successfully!");
      if (currActiveStep === steps.length - 1) {
        router.push("/");
        return; // Redirect to listing page if it's the last step
      }
      // Now, proceed with setting the step data and progress
      setStepData(currActiveStep, {
        ...formikObject?.values,
        id: result.data?.uuid,
      });
      setStepProgress(currActiveStep, true); // Mark current step as completed

      // Move to the next step
      setActiveStep(currActiveStep + 1);
    } else {
      throw new Error("Result is empty or invalid");
    }
  } catch (error: any) {
    // Show error toast
    toast.error(`Error: ${error.message || "An unexpected error occurred"}`);

    // Optionally log the error for debugging
    console.error("Error during step transition:", error);
  } finally {
    setIsLoading(false); // Set loading state to false after processing
  }
};

// Separate function to handle logic for each step
const handleStepLogic = async (
  step: number,
  formikObject: any,
  stepData: Record<number, any>
) => {
  switch (step) {
    case 0:
      return await handlePersonalInfo(formikObject);

    case 1:
      return await handleInsuranceInfo(formikObject, stepData[0]?.id);
    case 2:
      return await handleMedicalHistory(formikObject, stepData[0]?.id);
    case 3:
      return await handleMedicationInfo(formikObject, stepData[0]?.id);
    // Add more steps as needed
    default:
      break;
  }
};

const handlePersonalInfo = async (formikObject: any) => {
  // Extract the form data from formikObject (which is from the store)
  const formData = formikObject.values;
  console.log("Form Data for Personal Info:", formData);

  // Prepare the data object for insertPatient
  const patientData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    dob: formData.dob,
    gender: formData.gender,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
  };

  try {
    // Call insertPatient asynchronously
    const uuid = await insertPatient(patientData);

    console.log("Patient inserted successfully");

    // Return structured response body
    return {
      statusCode: 200, // HTTP status code for success
      message: "Patient inserted successfully",
      data: { uuid }, // Include the uuid in the response body
    };
  } catch (error: any) {
    console.error("Error inserting patient:", error);

    // Return structured response body for error
    return {
      statusCode: 500, // HTTP status code for server error
      message: "Error inserting patient",
      error: error.message, // Include the error message in the response body
    };
  }
};

const handleInsuranceInfo = async (formikObject: any, patientId: any) => {
  // Extract the form data from formikObject (which is from the store)
  const formData = formikObject.values;
  console.log("Form Data for Insurance Info:", formData);

  // Prepare the data object for insertInsuranceInfo
  const insuranceData = {
    patientId: patientId,
    providerName: formData.providerName,
    policyNumber: formData.policyNumber,
    expiryDate: formData.expiryDate,
  };

  try {
    // Call insertInsuranceInfo asynchronously
    const uuid = await insertInsuranceInfo(
      insuranceData.patientId,
      insuranceData.providerName,
      insuranceData.policyNumber,
      insuranceData.expiryDate
    );

    console.log("Insurance information inserted successfully");

    // Return structured response body
    return {
      statusCode: 200, // HTTP status code for success
      message: "Insurance information inserted successfully",
      data: { uuid }, // Include the uuid or any other relevant data from the insertion
    };
  } catch (error: any) {
    console.error("Error inserting insurance information:", error);

    // Return structured response body for error
    return {
      statusCode: 500, // HTTP status code for server error
      message: "Error inserting insurance information",
      error: error.message, // Include the error message in the response body
    };
  }
};

const handleMedicalHistory = async (formikObject: any, patientId: any) => {
  const formData = formikObject.values;
  console.log("Form Data for Medical History:", formData);

  // Assume formData.medicalHistory is an array of entries
  const medicalHistoryEntries = formData.medicalHistory || [];

  if (
    !Array.isArray(medicalHistoryEntries) ||
    medicalHistoryEntries.length === 0
  ) {
    return {
      statusCode: 400,
      message: "No medical history entries to insert",
    };
  }

  try {
    const uuids = await insertMedicalHistory(patientId, medicalHistoryEntries);

    console.log("Medical history entries inserted successfully");

    return {
      statusCode: 200,
      message: "Medical history entries inserted successfully",
      data: { uuids },
    };
  } catch (error: any) {
    console.error("Error inserting medical history:", error);

    return {
      statusCode: 500,
      message: "Error inserting medical history",
      error: error.message,
    };
  }
};

export const handleMedicationInfo = async (
  formikObject: any,
  patientId: any
) => {
  const formData = formikObject.values;
  console.log("Form Data for Medication Info:", formData);

  // Ensure formData.medications is an array
  const medications = formData.medications || [];

  // Format the data
  const medicationArray = medications.map((med: any) => ({
    medicationName: med.medicationName,
    dosage: med.dosage,
    frequency: med.frequency,
  }));

  try {
    const uuids = await insertMedications(patientId, medicationArray);

    console.log("Medication information inserted successfully");

    return {
      statusCode: 200,
      message: "Medication information inserted successfully",
      data: { uuids },
    };
  } catch (error: any) {
    console.error("Error inserting medication information:", error);

    return {
      statusCode: 500,
      message: "Error inserting medication information",
      error: error.message,
    };
  }
};

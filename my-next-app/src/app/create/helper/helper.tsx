import {
  getInsuranceInfoForPatient,
  getMedicalHistoryForPatient,
  getMedicationsForPatient,
  getPatientById,
} from "@/app/(db)/db";
import { STEPS_TO_NAMES } from "@/app/(utils)/constants";

type StepData = Record<number, any>;

export const populateStepData = async (
  id: string, // Changed to UUID (string)
  setStepData: (step: number, data: any) => void,
  setActiveStep: (step: number) => void,
  markStepCompleted: (step: number, isCompleted: boolean) => void,
  setIsLoading: (loading: boolean) => void
) => {
  setIsLoading(true); // Set loading state to true
  try {
    const stepDataMap: StepData = {};
    const completedSteps = new Set<number>();
    let firstIncompleteStep: number | null = null;

    for (let step = 0; step < Object.keys(STEPS_TO_NAMES).length; step++) {
      try {
        let data: any = null;

        switch (step) {
          case 0:
            const patientResult = await getPatientById(id); // ID is a UUID (string)
            data = patientResult?.rows?.[0] || null;
            break;
          case 1:
            const insuranceResult = await getInsuranceInfoForPatient(id);
            data = insuranceResult?.rows?.[0] || null;
            break;
          case 2:
            const historyResult = await getMedicalHistoryForPatient(id);
            data = historyResult?.rows?.[0] || null;
            break;
          case 3:
            const medicationsResult = await getMedicationsForPatient(id);
            data = medicationsResult?.rows?.[0] || null;
            break;
          default:
            break;
        }

        if (data && Object.keys(data).length > 0) {
          stepDataMap[step] = data;
          completedSteps.add(step);
        } else if (firstIncompleteStep === null) {
          firstIncompleteStep = step;
        }
      } catch (err) {
        console.error(`Failed to load step ${step}:`, err);
        if (firstIncompleteStep === null) firstIncompleteStep = step;
        break;
      }
    }
    console.log("Step data collected:", stepDataMap);
    // Apply collected data after loop
    Object.entries(stepDataMap).forEach(([stepStr, data]) => {
      const step = parseInt(stepStr, 10);
      setStepData(step, data);
    });

    completedSteps.forEach((step) => {
      markStepCompleted(step, true);
    });

    if (firstIncompleteStep !== null) {
      setActiveStep(firstIncompleteStep);
    } else {
      setActiveStep(0); // fallback
    }
  } catch (error) {
    console.error("Error populating step data:", error);
    setActiveStep(0); // Reset to first step on error
  } finally {
    setIsLoading(false); // Set loading state to false after processing
  }
};

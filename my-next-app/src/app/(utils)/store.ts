// store.ts
import { create } from "zustand";
import { STEPS_TO_NAMES } from "./constants";
import { FormikProps } from "formik";

type StepperStore = {
  activeStep: number;
  steps: { title: string; isCompleted: boolean }[];
  setActiveStep: (step: number) => void;
  setStepProgress: (index: number, isCompleted: boolean) => void;
  stepData: Record<number, any>; // Store step data by index
  setStepData: (stepIndex: number, data: any) => void;
  setStepDataBulk: (stepData: any) => void;
  // Formik-related state and methods
  formikObject: FormikProps<any> | null;
  setFormik: (formik: FormikProps<any>) => void;
  initStepperStore: () => void;
};

// Define the structure of the store
export const useStepperStore = create<StepperStore>((set, get) => ({
  // Stepper-related state
  activeStep: 0,
  steps: Object.values(STEPS_TO_NAMES).map((title) => ({
    title,
    isCompleted: false,
  })),
  setActiveStep: (step) => set({ activeStep: step }),
  setStepProgress: (index, isCompleted) =>
    set((state) => {
      const steps = [...state.steps];
      steps[index].isCompleted = isCompleted;
      return { steps };
    }),

  // General state for storing all information as a single JSON object
  stepData: Object.keys(STEPS_TO_NAMES).reduce((acc, key) => {
    const numericKey = parseInt(key); // Convert key to numeric index
    acc[numericKey] = {}; // Initialize each step with an empty object using the numeric key
    return acc;
  }, {} as Record<number, any>), // Type the accumulator as Record<number, any>

  // Generic setter for updating step data
  setStepData: (stepIndex, data) =>
    set((state) => {
      const stepData = { ...state.stepData, [stepIndex]: data };
      return { stepData };
    }),
  setStepDataBulk: (stepData) => set({ stepData: stepData }),

  formikObject: null,
  setFormik: (formik) => set({ formikObject: formik }),
  initStepperStore: () =>
    set(() => ({
      activeStep: 0,
      steps: Object.values(STEPS_TO_NAMES).map((title) => ({
        title,
        isCompleted: false,
      })),
      stepData: Object.keys(STEPS_TO_NAMES).reduce((acc, key) => {
        const numericKey = parseInt(key); // Convert key to numeric index
        acc[numericKey] = {}; // Initialize each step with an empty object using the numeric key
        return acc;
      }, {} as Record<number, any>),
    })),
}));

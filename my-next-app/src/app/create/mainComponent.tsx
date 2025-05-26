"use client"

import { handleBack, handleContinue } from "../(utils)/stepperHandler"
import { useStepperStore } from "../(utils)/store"
import PersonalInfoComponent from "./personalInfo"
import InsuranceInfoComponent from "./insuranceInfo"
import MedicalHistoryComponent from "./medicalHistory"
import MedicationsComponent from "./medication"
import { useRouter, useSearchParams } from "next/navigation"

import { useEffect, useState } from "react"
import { populateStepData } from "./helper/helper"
import Loader from "../(components)/loader"


const App = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const id = useSearchParams().get("id")
  const {
    activeStep,
    setActiveStep,
    steps,
    setStepData,
    formikObject,
    setStepProgress,
    stepData,
    initStepperStore,
  } = useStepperStore()
  useEffect(() => {
    if (id) {
      populateStepData(
        id,
        setStepData,
        setActiveStep,
        setStepProgress,
        setIsLoading
      )
    } else {
      initStepperStore()
    }
  }, [])

  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Loader />
    </div>
  ) : (
    <div className="relative flex flex-col min-h-[75vh] max-h-[80vh] overflow-auto">
      {" "}
      {/* Flex container for the whole page */}
      <div className="px-8 py-6 bg-white border border-gray-200 rounded-tl-2xl rounded-tr-2xl shadow-sm text-gray-800 flex-1 overflow-auto">
        {" "}
        <div className="mb-6">
          {/* Add your content here */}

          {/* Conditional rendering based on activeStep */}
          <div>
            {(() => {
              switch (activeStep) {
                case 0:
                  return <PersonalInfoComponent />

                case 1:
                  return <InsuranceInfoComponent />
                case 2:
                  return <MedicalHistoryComponent />
                case 3:
                  return <MedicationsComponent />
                default:
                  return <div>Step not found</div>
              }
            })()}
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="flex justify-between items-center border border-gray-200 rounded-bl-2xl rounded-br-2xl shadow-sm pt-3 px-8 py-4 bg-white">
        <button
          className="px-4 py-1.5 rounded-md bg-gray-500 text-white text-sm font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 disabled:opacity-50"
          onClick={() => handleBack()}
          disabled={true}
        >
          Back
        </button>
        <button
          className="px-4 py-1.5 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50"
          onClick={() =>
            handleContinue(
              activeStep,
              setActiveStep,
              steps,
              setStepData,
              stepData,
              formikObject,
              setStepProgress,
              router,
              setIsLoading
            )
          }
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default App

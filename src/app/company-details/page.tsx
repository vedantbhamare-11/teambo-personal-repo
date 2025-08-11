"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompanyAddressStep } from "@/components/company-details/ CompanyAddressStep";
import { BasicCompanyInfoStep } from "@/components/company-details/BasicCompanyInfoStep";
import { DocumentsAndPlaceStep } from "@/components/company-details/DocumentsAndPlaceStep";


export default function CompanyDetailsPage() {
  const [step, setStep] = useState(1);

  // Step 1 state
  const [companyName, setCompanyName] = useState("");
  const [companyStrength, setCompanyStrength] = useState("");
  const [foundedYear, setFoundedYear] = useState("");

  // Step 2 state
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");

  // Step 3 state
  const [documents, setDocuments] = useState<File[]>([]);

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments([...documents, ...Array.from(e.target.files)]);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
      return;
    }
    // Final submission logic here
    alert("Submitted company details!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicCompanyInfoStep
            companyName={companyName}
            setCompanyName={setCompanyName}
            companyStrength={companyStrength}
            setCompanyStrength={setCompanyStrength}
            foundedYear={foundedYear}
            setFoundedYear={setFoundedYear}
          />
        );
      case 2:
        return (
          <CompanyAddressStep
            addressLine1={addressLine1}
            setAddressLine1={setAddressLine1}
            addressLine2={addressLine2}
            setAddressLine2={setAddressLine2}
            city={city}
            setCity={setCity}
            pincode={pincode}
            setPincode={setPincode}
            state={state}
            setState={setState}
          />
        );
      case 3:
        return (
          <DocumentsAndPlaceStep
            documents={documents}
            onDocumentsChange={setDocuments}
            handleDocumentsChange={handleDocumentsChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 sm:p-20">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-8">Company Details</h1>

        <Card className="shadow-lg">
          <CardHeader className="text-center text-2xl font-semibold">
            Enter your company information
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {renderStep()}

              <div className="flex justify-between mt-4">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}

                <Button type="submit" className="ml-auto">
                  {step < 3 ? "Next" : "Submit Company Details"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

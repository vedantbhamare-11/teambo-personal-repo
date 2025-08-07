"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CompanyDetailsPage() {
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [companyName, setCompanyName] = useState("");
  const [companyStrength, setCompanyStrength] = useState("");
  const [foundedYear, setFoundedYear] = useState("");

  // Step 2 fields
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");

  // Step 3 fields
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
    // Final submission logic goes here
    alert("Submitted company details!");
  };

  // Render inputs based on current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                type="text"
                required
                placeholder="Your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="companyStrength">Company Strength *</Label>
              <Input
                id="companyStrength"
                type="number"
                min={1}
                required
                placeholder="Number of employees"
                value={companyStrength}
                onChange={(e) => setCompanyStrength(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="foundedYear">Years Founded *</Label>
              <Input
                id="foundedYear"
                type="number"
                min={1800}
                max={new Date().getFullYear()}
                required
                placeholder="Year founded"
                value={foundedYear}
                onChange={(e) => setFoundedYear(e.target.value)}
              />
            </div>
          </>
        );

      case 2:
        return (
          <fieldset className="border border-gray-300 rounded p-4 flex flex-col gap-4">
            <legend className="text-lg font-semibold">Company Address *</legend>

            <div className="flex flex-col gap-2">
              <Label htmlFor="addressLine1">Address Line 1 *</Label>
              <Input
                id="addressLine1"
                type="text"
                required
                placeholder="Street address, P.O. box, etc."
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input
                id="addressLine2"
                type="text"
                placeholder="Apartment, suite, unit, building, floor, etc."
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                type="text"
                required
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                type="text"
                required
                placeholder="Postal code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                type="text"
                required
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </fieldset>
        );

      case 3:
        return (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="companyDocuments">
                Company Documents (Upload one or more files)
              </Label>
              <input
                id="companyDocuments"
                type="file"
                multiple
                onChange={handleDocumentsChange}
                className="mt-2"
              />
              {documents.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                  {documents.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Company Place (Map) *</Label>
              {/* Map UI placeholder - replace with real map integration later */}
              <div className="border rounded h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                Map UI placeholder here
              </div>
            </div>
          </>
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

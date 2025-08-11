import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompanyAddressStepProps {
  addressLine1: string;
  setAddressLine1: (value: string) => void;
  addressLine2: string;
  setAddressLine2: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  pincode: string;
  setPincode: (value: string) => void;
  state: string;
  setState: (value: string) => void;
}

export function CompanyAddressStep({
  addressLine1,
  setAddressLine1,
  addressLine2,
  setAddressLine2,
  city,
  setCity,
  pincode,
  setPincode,
  state,
  setState,
}: CompanyAddressStepProps) {
  useEffect(() => {
    if (pincode.length === 6) {
      // Call Indian postal pincode API to get city and state
      fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status === "Success" && data[0].PostOffice?.length) {
            const postOffice = data[0].PostOffice[0];
            setCity(postOffice.District);
            setState(postOffice.State);
          } else {
            // Clear if not found or invalid pincode
            setCity("");
            setState("");
          }
        })
        .catch(() => {
          // On error clear or show fallback
          setCity("");
          setState("");
        });
    } else {
      // Clear if pincode is less than 6 length
      setCity("");
      setState("");
    }
  }, [pincode, setCity, setState]);

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
          readOnly // Make readOnly if you want to prevent manual override
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
          maxLength={6}
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
          readOnly // Optional, if you want to prevent manual editing
        />
      </div>
    </fieldset>
  );
}

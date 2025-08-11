import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicCompanyInfoStepProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  companyStrength: string;
  setCompanyStrength: (value: string) => void;
  foundedYear: string;
  setFoundedYear: (value: string) => void;
}

export function BasicCompanyInfoStep({
  companyName,
  setCompanyName,
  companyStrength,
  setCompanyStrength,
  foundedYear,
  setFoundedYear,
}: BasicCompanyInfoStepProps) {
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
}

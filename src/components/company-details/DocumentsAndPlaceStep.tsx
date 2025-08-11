import { useState } from "react";
import { Label } from "@/components/ui/label";

interface DocumentsAndPlaceStepProps {
  documents: File[];
  onDocumentsChange: (files: File[]) => void;
  handleDocumentsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DocumentsAndPlaceStep({
  documents,
  onDocumentsChange,
  handleDocumentsChange,
}: DocumentsAndPlaceStepProps) {
  const [locality, setLocality] = useState("");

  // Replace YOUR_GOOGLE_MAPS_API_KEY with your actual API key
  const apiKey = "AIzaSyD-8gIPVMPnYFSgizFSxMHCyWzbpuhk4xE";

  // Construct the Google Maps embed URL based on locality input
  const mapSrc = locality
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
        locality
      )}`
    : "";

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

      <div className="flex flex-col gap-4 mt-4">
        <Label htmlFor="localityInput">Locality / City Name *</Label>
        <input
          id="localityInput"
          type="text"
          placeholder="Enter locality or city name"
          className="border border-muted rounded px-3 py-2"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
        />

        <Label>Company Place (Map) *</Label>
        <div className="border rounded h-64 bg-gray-100 flex items-center justify-center text-gray-400">
          {mapSrc ? (
            <iframe
              key={locality} // refresh iframe on locality change
              title="Location Map"
              src={mapSrc}
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded"
            />
          ) : (
            "Map UI placeholder here"
          )}
        </div>
      </div>
    </>
  );
}

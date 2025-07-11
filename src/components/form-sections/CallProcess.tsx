import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FormData } from "@/pages/Index";
import FileUpload from "@/components/FileUpload";

interface CallProcessProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const requiredInfoOptions = [
  { value: "name", label: "Name" },
  { value: "phone", label: "Phone number" },
  { value: "email", label: "Email address" },
  { value: "address", label: "Address/location" },
  { value: "need", label: "Specific need/problem" },
  { value: "budget", label: "Budget/timeline" },
  { value: "other", label: "Other" },
];

const CallProcess = ({ formData, updateFormData }: CallProcessProps) => {
  const handleRequiredInfoChange = (value: string, checked: boolean) => {
    const updatedInfo = checked
      ? [...formData.requiredInformation, value]
      : formData.requiredInformation.filter((info) => info !== value);
    updateFormData({ requiredInformation: updatedInfo });
  };

  return (
    <div className="space-y-8">
      {/* Current Call Process */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          Describe your ideal call process in 3-5 steps
        </Label>
        <Textarea
          value={formData.currentCallProcess}
          onChange={(e) =>
            updateFormData({ currentCallProcess: e.target.value })
          }
          placeholder="Example:
1. Greet caller and ask how we can help
2. Identify their specific need or problem
3. Gather contact information and location
4. Qualify their timeline and budget
5. Schedule appointment or transfer to specialist"
          className="min-h-32 bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
          rows={8}
        />
        <div className="text-sm text-soft-lavender font-manrope">
          {formData.currentCallProcess.length}/1000 characters
        </div>
      </div>

      {/* Sales/Call Scripts Upload */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          Sales/Call Scripts Upload (Optional)
        </Label>
        <FileUpload
          files={formData.salesScripts}
          onFilesChange={(files) => updateFormData({ salesScripts: files })}
          acceptedTypes={[".pdf", ".doc", ".docx", ".txt"]}
          maxFiles={5}
          description="Upload any existing sales scripts, call scripts, or conversation guides for this role"
          companyName={formData.companyName}
        />
      </div>

      {/* Required Information */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          What information should the AI agent collect from callers? (Select all
          that apply)
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {requiredInfoOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <Checkbox
                id={`info-${option.value}`}
                checked={formData.requiredInformation.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleRequiredInfoChange(option.value, checked as boolean)
                }
              />
              <Label
                htmlFor={`info-${option.value}`}
                className="text-sm text-soft-lavender font-manrope"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>

        {formData.requiredInformation.includes("other") && (
          <div className="mt-3">
            <Input
              value={formData.requiredInformationOther}
              onChange={(e) =>
                updateFormData({ requiredInformationOther: e.target.value })
              }
              placeholder="Please specify other required information"
              className="w-full max-w-md bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            />
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-deep-violet to-purple-grape p-4 rounded-lg border border-neon-aqua neon-glow">
        <h4 className="font-audiowide text-cyber-yellow mb-2">
          🔧 Process Design Tips
        </h4>
        <ul className="text-sm text-soft-lavender space-y-1 font-manrope">
          <li>• Keep your process simple and logical</li>
          <li>• Prioritize the most important information first</li>
          <li>
            • Consider what happens if a caller refuses to provide certain
            details
          </li>
          <li>
            • Think about natural conversation flow, not just data collection
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CallProcess;

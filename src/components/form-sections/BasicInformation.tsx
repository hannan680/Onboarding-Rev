import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '@/pages/Index';

interface BasicInformationProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const BasicInformation = ({ formData, updateFormData }: BasicInformationProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-lg font-audiowide text-bright-white">
            Company Name *
          </Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => updateFormData({ companyName: e.target.value })}
            placeholder="Enter your company name"
            className="w-full bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specificBusinessType" className="text-lg font-audiowide text-bright-white">
            Specific Business Type *
          </Label>
          <Input
            id="specificBusinessType"
            value={formData.specificBusinessType}
            onChange={(e) => updateFormData({ specificBusinessType: e.target.value })}
            placeholder="e.g., Residential Roofing, Personal Injury Law, HVAC Repair, etc."
            className="w-full bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            required
          />
          <p className="text-xs text-soft-lavender font-manrope">
            Be specific - this helps us create a targeted agent vs. generic
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyWebsite" className="text-lg font-audiowide text-bright-white">
          Company Website *
        </Label>
        <Input
          id="companyWebsite"
          type="url"
          value={formData.companyWebsite}
          onChange={(e) => updateFormData({ companyWebsite: e.target.value })}
          placeholder="https://yourcompany.com"
          className="w-full bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
          required
        />
        <p className="text-xs text-soft-lavender font-manrope">
          We'll scrape this for knowledge base content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contactName" className="text-lg font-audiowide text-bright-white">
            Contact Name *
          </Label>
          <Input
            id="contactName"
            value={formData.contactName}
            onChange={(e) => updateFormData({ contactName: e.target.value })}
            placeholder="Enter primary contact name"
            className="w-full bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-lg font-audiowide text-bright-white">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="Enter email address"
            className="w-full bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            required
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-deep-violet to-purple-grape p-4 rounded-lg border border-neon-aqua neon-glow">
        <h4 className="font-audiowide text-cyber-yellow mb-2">ℹ️ Why we collect this information</h4>
        <p className="text-sm text-soft-lavender font-manrope">
          This basic information helps us understand your business context and ensures we can follow up 
          with the right person about your voice AI requirements.
        </p>
      </div>
    </div>
  );
};

export default BasicInformation;

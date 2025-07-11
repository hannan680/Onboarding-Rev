
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '@/pages/Index';

interface SuccessMetricsProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const crmOptions = [
  'None',
  'HubSpot',
  'Salesforce',
  'Pipedrive',
  'Zoho CRM',
  'Monday.com',
  'GoHighLevel',
  'ActiveCampaign',
  'Other'
];

const schedulingOptions = [
  'None',
  'Calendly',
  'Acuity Scheduling',
  'Cal.com',
  'ScheduleOnce',
  'TimeTrade',
  'Appointy',
  'Other'
];

const emailOptions = [
  'None',
  'Mailchimp',
  'Constant Contact',
  'ConvertKit',
  'ActiveCampaign',
  'SendGrid',
  'Other'
];

const SuccessMetrics = ({ formData, updateFormData }: SuccessMetricsProps) => {
  return (
    <div className="space-y-8">
      {/* Success Definition */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          How do you define success for your voice AI agent?
        </Label>
        <Textarea
          value={formData.successDefinition}
          onChange={(e) => updateFormData({ successDefinition: e.target.value })}
          placeholder="Example: High appointment booking rate, positive caller experience, efficient qualification process..."
          className="min-h-24 bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
          rows={4}
        />
      </div>

      {/* Target Call Length */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          Target Call Length (minutes)
        </Label>
        <Input
          type="number"
          value={formData.targetCallLength || ''}
          onChange={(e) => updateFormData({ targetCallLength: parseInt(e.target.value) || 0 })}
          placeholder="5"
          className="w-32 bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
          min="1"
          max="30"
        />
        <p className="text-sm text-soft-lavender font-manrope">
          How long should a typical successful call last?
        </p>
      </div>

      {/* Integration Systems */}
      <div className="space-y-6">
        <Label className="text-lg font-audiowide text-bright-white">
          Integration Systems
        </Label>
        
        {/* CRM System */}
        <div className="space-y-3">
          <Label className="text-sm font-audiowide text-neon-aqua">
            CRM System
          </Label>
          <Select value={formData.crmSystem} onValueChange={(value) => updateFormData({ crmSystem: value })}>
            <SelectTrigger className="w-full bg-deep-violet border-purple-grape text-bright-white font-manrope focus:border-neon-aqua focus:ring-neon-aqua">
              <SelectValue placeholder="Select CRM system" />
            </SelectTrigger>
            <SelectContent className="bg-charcoal-black border-purple-grape">
              {crmOptions.map((option) => (
                <SelectItem key={option} value={option} className="text-bright-white hover:bg-deep-violet focus:bg-deep-violet">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {formData.crmSystem === 'Other' && (
            <Input
              value={formData.crmSystemOther}
              onChange={(e) => updateFormData({ crmSystemOther: e.target.value })}
              placeholder="Please specify CRM system"
              className="w-full max-w-md bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            />
          )}
        </div>

        {/* Scheduling Software */}
        <div className="space-y-3">
          <Label className="text-sm font-audiowide text-neon-aqua">
            Scheduling Software
          </Label>
          <Select value={formData.schedulingSoftware} onValueChange={(value) => updateFormData({ schedulingSoftware: value })}>
            <SelectTrigger className="w-full bg-deep-violet border-purple-grape text-bright-white font-manrope focus:border-neon-aqua focus:ring-neon-aqua">
              <SelectValue placeholder="Select scheduling software" />
            </SelectTrigger>
            <SelectContent className="bg-charcoal-black border-purple-grape">
              {schedulingOptions.map((option) => (
                <SelectItem key={option} value={option} className="text-bright-white hover:bg-deep-violet focus:bg-deep-violet">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {formData.schedulingSoftware === 'Other' && (
            <Input
              value={formData.schedulingSoftwareOther}
              onChange={(e) => updateFormData({ schedulingSoftwareOther: e.target.value })}
              placeholder="Please specify scheduling software"
              className="w-full max-w-md bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            />
          )}
        </div>

        {/* Email System */}
        <div className="space-y-3">
          <Label className="text-sm font-audiowide text-neon-aqua">
            Email System
          </Label>
          <Select value={formData.emailSystem} onValueChange={(value) => updateFormData({ emailSystem: value })}>
            <SelectTrigger className="w-full bg-deep-violet border-purple-grape text-bright-white font-manrope focus:border-neon-aqua focus:ring-neon-aqua">
              <SelectValue placeholder="Select email system" />
            </SelectTrigger>
            <SelectContent className="bg-charcoal-black border-purple-grape">
              {emailOptions.map((option) => (
                <SelectItem key={option} value={option} className="text-bright-white hover:bg-deep-violet focus:bg-deep-violet">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {formData.emailSystem === 'Other' && (
            <Input
              value={formData.emailSystemOther}
              onChange={(e) => updateFormData({ emailSystemOther: e.target.value })}
              placeholder="Please specify email system"
              className="w-full max-w-md bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            />
          )}
        </div>
      </div>

      {/* Compliance Requirements */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          Compliance Requirements
        </Label>
        <Textarea
          value={formData.complianceRequirements}
          onChange={(e) => updateFormData({ complianceRequirements: e.target.value })}
          placeholder="Any industry-specific compliance requirements, privacy policies, or regulations to follow..."
          className="min-h-24 bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
          rows={4}
        />
      </div>
    </div>
  );
};

export default SuccessMetrics;

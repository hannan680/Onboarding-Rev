
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { FormData } from '@/pages/Index';

interface VoiceAIPurposeProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const agentTypeOptions = [
  { value: 'inbound', label: 'Inbound Agent (receives calls from customers)' },
  { value: 'outbound', label: 'Outbound Agent (makes calls to prospects/customers)' }
];

const leadSourceOptions = [
  { value: 'facebook-ads', label: 'Facebook Ads' },
  { value: 'google-ads', label: 'Google Ads' },
  { value: 'organic-search', label: 'Organic Search (SEO)' },
  { value: 'website-forms', label: 'Website Contact Forms' },
  { value: 'referrals', label: 'Customer Referrals' },
  { value: 'direct-calls', label: 'Direct Phone Calls' },
  { value: 'social-media', label: 'Social Media (Instagram, LinkedIn, etc.)' },
  { value: 'email-marketing', label: 'Email Marketing' },
  { value: 'trade-shows', label: 'Trade Shows/Events' },
  { value: 'other', label: 'Other' }
];

const purposeOptions = [
  { value: 'lead-qualification', label: 'Lead qualification and appointment setting' },
  { value: 'customer-support', label: 'Customer support and troubleshooting' },
  { value: 'sales-consultation', label: 'Sales consultation and product recommendations' },
  { value: 'information-gathering', label: 'Information gathering and surveys' },
  { value: 'other', label: 'Other' }
];

const personalityOptions = [
  { value: 'professional', label: 'Professional & Corporate' },
  { value: 'friendly', label: 'Friendly & Approachable' },
  { value: 'warm', label: 'Warm & Caring' },
  { value: 'technical', label: 'Technical & Expert' },
  { value: 'casual', label: 'Casual & Conversational' },
  { value: 'other', label: 'Other' }
];

const VoiceAIPurpose = ({ formData, updateFormData }: VoiceAIPurposeProps) => {
  const handlePersonalityChange = (value: string, checked: boolean) => {
    const updatedPersonality = checked
      ? [...formData.brandPersonality, value]
      : formData.brandPersonality.filter(p => p !== value);
    updateFormData({ brandPersonality: updatedPersonality });
  };

  const handleLeadSourceChange = (value: string, checked: boolean) => {
    const updatedSources = checked
      ? [...formData.leadSources, value]
      : formData.leadSources.filter(source => source !== value);
    updateFormData({ leadSources: updatedSources });
  };

  return (
    <div className="space-y-8">
      {/* Agent Type */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          Is this an inbound or outbound agent? *
        </Label>
        <RadioGroup
          value={formData.agentType}
          onValueChange={(value) => updateFormData({ agentType: value })}
          className="space-y-3"
        >
          {agentTypeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="text-sm text-soft-lavender font-manrope">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Lead Sources */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          How do your leads typically come in? (Select all that apply) *
        </Label>
        <p className="text-sm text-soft-lavender font-manrope mb-4">
          This helps us create the proper intro message for your AI agent
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {leadSourceOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <Checkbox
                id={`lead-source-${option.value}`}
                checked={formData.leadSources.includes(option.value)}
                onCheckedChange={(checked) => 
                  handleLeadSourceChange(option.value, checked as boolean)
                }
              />
              <Label 
                htmlFor={`lead-source-${option.value}`} 
                className="text-sm text-soft-lavender font-manrope"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        
        {formData.leadSources.includes('other') && (
          <div className="mt-3">
            <Input
              value={formData.leadSourcesOther}
              onChange={(e) => updateFormData({ leadSourcesOther: e.target.value })}
              placeholder="Please specify other lead sources"
              className="w-full max-w-md bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            />
          </div>
        )}
      </div>

      {/* Main Purpose */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          What is the main purpose of your voice AI agent? *
        </Label>
        <RadioGroup
          value={formData.mainPurpose}
          onValueChange={(value) => updateFormData({ mainPurpose: value })}
          className="space-y-3"
        >
          {purposeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="text-sm text-soft-lavender font-manrope">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {formData.mainPurpose === 'other' && (
          <div className="ml-6 mt-3">
            <Input
              value={formData.mainPurposeOther}
              onChange={(e) => updateFormData({ mainPurposeOther: e.target.value })}
              placeholder="Please specify the main purpose"
              className="w-full max-w-md bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            />
          </div>
        )}
      </div>

      {/* Brand Personality */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          What brand personality should your AI agent have? (Select all that apply)
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {personalityOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <Checkbox
                id={`personality-${option.value}`}
                checked={formData.brandPersonality.includes(option.value)}
                onCheckedChange={(checked) => 
                  handlePersonalityChange(option.value, checked as boolean)
                }
              />
              <Label 
                htmlFor={`personality-${option.value}`} 
                className="text-sm text-soft-lavender font-manrope"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        
        {formData.brandPersonality.includes('other') && (
          <div className="mt-3">
            <Input
              value={formData.brandPersonalityOther}
              onChange={(e) => updateFormData({ brandPersonalityOther: e.target.value })}
              placeholder="Please describe your preferred personality"
              className="w-full max-w-md bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            />
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-deep-violet to-purple-grape p-4 rounded-lg border border-cyber-yellow neon-glow">
        <h4 className="font-audiowide text-cyber-yellow mb-2">💡 Pro Tip</h4>
        <p className="text-sm text-soft-lavender font-manrope">
          The more specific you are about your AI's purpose, lead sources, and personality, the better we can 
          customize its responses to match your brand and achieve your goals.
        </p>
      </div>
    </div>
  );
};

export default VoiceAIPurpose;

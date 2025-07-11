
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { FormData } from '@/pages/Index';

interface AgentKnowledgeProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const avoidanceOptions = [
  { value: 'pricing', label: 'Specific pricing' },
  { value: 'technical', label: 'Technical details' },
  { value: 'competitors', label: 'Competitor comparisons' },
  { value: 'other', label: 'Other' }
];

const AgentKnowledge = ({ formData, updateFormData }: AgentKnowledgeProps) => {
  const handleAvoidanceChange = (value: string, checked: boolean) => {
    const updatedTopics = checked
      ? [...formData.topicsToAvoid, value]
      : formData.topicsToAvoid.filter(topic => topic !== value);
    updateFormData({ topicsToAvoid: updatedTopics });
  };

  return (
    <div className="space-y-8">
      {/* Company Services */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          Services Offered
        </Label>
        <Textarea
          value={formData.companyServices}
          onChange={(e) => updateFormData({ companyServices: e.target.value })}
          placeholder="List all services your company provides..."
          className="min-h-24 bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
          rows={4}
        />
      </div>

      {/* Service Areas */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          Service Areas
        </Label>
        <Textarea
          value={formData.serviceAreas}
          onChange={(e) => updateFormData({ serviceAreas: e.target.value })}
          placeholder="Geographic areas you serve (cities, counties, radius, etc.)..."
          className="min-h-24 bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
          rows={4}
        />
      </div>

      {/* Key Differentiators */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          Key Differentiators
        </Label>
        <Textarea
          value={formData.keyDifferentiators}
          onChange={(e) => updateFormData({ keyDifferentiators: e.target.value })}
          placeholder="What sets you apart from competitors? Unique selling points..."
          className="min-h-24 bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
          rows={4}
        />
      </div>

      {/* Topics to Avoid */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          What topics should the AI agent avoid discussing?
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {avoidanceOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <Checkbox
                id={`avoid-${option.value}`}
                checked={formData.topicsToAvoid.includes(option.value)}
                onCheckedChange={(checked) => 
                  handleAvoidanceChange(option.value, checked as boolean)
                }
              />
              <Label 
                htmlFor={`avoid-${option.value}`} 
                className="text-sm text-soft-lavender font-manrope"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        
        {formData.topicsToAvoid.includes('other') && (
          <div className="mt-3">
            <Input
              value={formData.topicsToAvoidOther}
              onChange={(e) => updateFormData({ topicsToAvoidOther: e.target.value })}
              placeholder="Please specify other topics to avoid"
              className="w-full max-w-md bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentKnowledge;

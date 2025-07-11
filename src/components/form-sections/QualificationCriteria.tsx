
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormData } from '@/pages/Index';

interface QualificationCriteriaProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const QualificationCriteria = ({ formData, updateFormData }: QualificationCriteriaProps) => {
  return (
    <div className="space-y-8">
      {/* Success Criteria */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-neon-aqua neon-text">
          What makes a caller qualified or successful?
        </Label>
        <Textarea
          value={formData.successCriteria}
          onChange={(e) => updateFormData({ successCriteria: e.target.value })}
          placeholder="Example:
- Has a genuine need for our services
- Lives in our service area
- Has realistic timeline (within 30 days)
- Shows interest in scheduling consultation
- Responds positively to questions"
          className="min-h-32 bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
          rows={6}
        />
        <div className="text-sm text-soft-lavender font-manrope">
          {formData.successCriteria.length}/800 characters
        </div>
      </div>

      {/* Disqualification Criteria */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-hot-magenta">
          What disqualifies a caller or should end the conversation?
        </Label>
        <Textarea
          value={formData.disqualificationCriteria}
          onChange={(e) => updateFormData({ disqualificationCriteria: e.target.value })}
          placeholder="Example:
- Outside our service area
- Looking for DIY solutions only
- Price shopping without genuine interest
- Abusive or hostile behavior
- No timeline or indefinite project"
          className="min-h-32 bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-hot-magenta focus:ring-hot-magenta"
          rows={6}
        />
        <div className="text-sm text-soft-lavender font-manrope">
          {formData.disqualificationCriteria.length}/800 characters
        </div>
      </div>

      <div className="bg-gradient-to-r from-deep-violet to-purple-grape p-4 rounded-lg border border-neon-aqua neon-glow">
        <h4 className="font-audiowide text-cyber-yellow mb-2">⚡ Qualification Best Practices</h4>
        <ul className="text-sm text-soft-lavender space-y-1 font-manrope">
          <li>• Be specific about geographic boundaries</li>
          <li>• Include both positive indicators and red flags</li>
          <li>• Consider budget ranges rather than exact amounts</li>
          <li>• Think about urgency levels that work for your business</li>
          <li>• Include behavioral cues that indicate genuine interest</li>
        </ul>
      </div>
    </div>
  );
};

export default QualificationCriteria;

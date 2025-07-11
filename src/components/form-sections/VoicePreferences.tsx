
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { FormData } from '@/pages/Index';

interface VoicePreferencesProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const voiceGenderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'no-preference', label: 'No preference' }
];

const VoicePreferences = ({ formData, updateFormData }: VoicePreferencesProps) => {
  return (
    <div className="space-y-8">
      {/* AI Name */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          AI Agent Name *
        </Label>
        <Input
          value={formData.aiName}
          onChange={(e) => updateFormData({ aiName: e.target.value })}
          placeholder="Enter a name for your AI agent (e.g., Sarah, Alex, etc.)"
          className="w-full bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
        />
        <p className="text-sm text-soft-lavender font-manrope">
          This name will be used in conversations and helps personalize the AI agent
        </p>
      </div>

      {/* Voice Gender */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          Voice Gender
        </Label>
        <RadioGroup
          value={formData.voiceGender}
          onValueChange={(value) => updateFormData({ voiceGender: value })}
          className="space-y-3"
        >
          {voiceGenderOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="text-sm text-soft-lavender font-manrope">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* ElevenLabs Voice ID */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          ElevenLabs Voice ID (Optional)
        </Label>
        <Input
          value={formData.elevenLabsVoiceId}
          onChange={(e) => updateFormData({ elevenLabsVoiceId: e.target.value })}
          placeholder="Enter your ElevenLabs voice ID if you have a specific voice"
          className="w-full bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
        />
        <p className="text-sm text-soft-lavender font-manrope">
          If you have a custom ElevenLabs voice, paste the voice ID here
        </p>
      </div>

      {/* Additional Voice Requirements */}
      <div className="space-y-4">
        <Label className="text-lg font-audiowide text-bright-white">
          Additional Voice Requirements
        </Label>
        <Textarea
          value={formData.additionalVoiceRequirements}
          onChange={(e) => updateFormData({ additionalVoiceRequirements: e.target.value })}
          placeholder="Describe any specific voice characteristics, accent, pace, or other requirements..."
          className="min-h-24 bg-deep-violet border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope focus:border-neon-aqua focus:ring-neon-aqua"
          rows={4}
        />
        <p className="text-sm text-soft-lavender font-manrope">
          e.g., Southern accent, slower pace for elderly customers, energetic tone, etc.
        </p>
      </div>

      <div className="bg-gradient-to-r from-deep-violet to-purple-grape p-4 rounded-lg border border-cyber-yellow neon-glow">
        <h4 className="font-audiowide text-cyber-yellow mb-2">🎉 Almost Done!</h4>
        <p className="text-sm text-soft-lavender font-manrope">
          You've completed the Voice AI Discovery Form. Review your responses and click "Submit Form" 
          to send us your requirements. We'll be in touch within 24 hours to discuss next steps.
        </p>
      </div>
    </div>
  );
};

export default VoicePreferences;

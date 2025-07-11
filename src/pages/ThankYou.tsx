
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowLeft, Mail, MessageSquare, Cog } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-black via-deep-violet to-purple-grape">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/2a49b2d2-c9c4-4677-b30a-a089a34e4431.png"
            alt="RevSquared AI Logo" 
            className="mx-auto w-32 h-auto md:w-48 mb-4 max-w-full"
          />
          <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-neon-aqua to-hot-magenta mx-auto mb-4"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-charcoal-black/80 border-2 border-purple-grape backdrop-blur-sm text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-cyber-yellow mx-auto mb-4 animate-scale-in" />
            </div>

            {/* Thank You Message */}
            <h1 className="text-3xl md:text-4xl font-audiowide text-neon-aqua mb-4 neon-text">
              Thank You!
            </h1>
            
            <p className="text-xl text-bright-white mb-6 font-manrope">
              Your Voice AI Discovery Form has been successfully submitted.
            </p>

            <div className="bg-gradient-to-r from-deep-violet to-purple-grape p-6 rounded-lg border border-neon-aqua mb-8">
              <h2 className="text-lg font-audiowide text-cyber-yellow mb-4">What Happens Next?</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-neon-aqua mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-bright-white font-medium font-manrope">Email Confirmation</p>
                    <p className="text-soft-lavender text-sm font-manrope">You will receive an email confirmation that this has been completed.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-neon-aqua mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-bright-white font-medium font-manrope">Review & Follow-up</p>
                    <p className="text-soft-lavender text-sm font-manrope">We will review your submission and drop any follow-up questions in Slack.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Cog className="w-5 h-5 text-neon-aqua mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-bright-white font-medium font-manrope">AI Prototype Development</p>
                    <p className="text-soft-lavender text-sm font-manrope">We will start working on your AI prototype.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-neon-aqua/20 to-hot-magenta/20 p-4 rounded-lg border border-cyber-yellow mb-8">
              <p className="text-cyber-yellow font-audiowide font-medium">
                ⚡ Expected Response Time: Within 24 Hours
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="outline"
                className="bg-deep-violet border-2 border-soft-lavender text-soft-lavender hover:bg-soft-lavender hover:text-charcoal-black font-manrope font-medium transition-all duration-300"
              >
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Form
                </Link>
              </Button>
              
              <Button
                asChild
                className="bg-gradient-to-r from-neon-aqua to-hot-magenta text-charcoal-black hover:from-hot-magenta hover:to-cyber-yellow font-audiowide font-medium transition-all duration-300 shadow-lg"
              >
                <a href="https://revsquared.ai" target="_blank" rel="noopener noreferrer">
                  Visit Our Website
                </a>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-purple-grape">
              <p className="text-soft-lavender text-sm font-manrope">
                Questions? Contact us at{' '}
                <a 
                  href="mailto:support@revsquared.ai" 
                  className="text-neon-aqua hover:text-hot-magenta transition-colors font-medium underline"
                >
                  support@revsquared.ai
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

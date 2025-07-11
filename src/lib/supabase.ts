import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for TypeScript
export interface AIAgentFormSubmission {
  id?: string;
  created_at?: string;

  // Service Selection
  purchased_services: string[];

  // SMS AI Specific
  sms_operation_type: string[];
  sms_additional_context: string;
  sms_intro_messages: string[];
  sms_qualification_flow: string;
  sms_objective: string;
  sms_persona: string;
  sms_faqs: string;
  sms_website_url: string;

  // Basic Information
  company_name: string;
  specific_business_type: string;
  company_website: string;
  contact_name: string;
  email: string;

  // Voice AI Purpose
  agent_type: string;
  lead_sources: string[];
  lead_sources_other: string;
  main_purpose: string;
  main_purpose_other: string;
  brand_personality: string[];
  brand_personality_other: string;

  // Call Process
  current_call_process: string;
  sales_scripts: string[]; // File URLs
  required_information: string[];
  required_information_other: string;

  // Qualification Criteria
  success_criteria: string;
  disqualification_criteria: string;

  // Customer Experience
  emotional_states: string[];
  emotional_states_other: string;
  common_problems: string[];
  common_objections: string;

  // Agent Knowledge
  company_services: string;
  service_areas: string;
  key_differentiators: string;
  topics_to_avoid: string[];
  topics_to_avoid_other: string;

  // Success Metrics
  success_definition: string;
  target_call_length: number;
  crm_system: string;
  crm_system_other: string;
  scheduling_software: string;
  scheduling_software_other: string;
  email_system: string;
  email_system_other: string;
  compliance_requirements: string;

  // Voice Preferences
  ai_name: string;
  voice_gender: string;
  eleven_labs_voice_id: string;
  additional_voice_requirements: string;

  // Metadata
  status?: "pending" | "reviewed" | "in_progress" | "completed" | "draft";
  notes?: string;
  completed_sections?: number[];
  last_section?: number;
}

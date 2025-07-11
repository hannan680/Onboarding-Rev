import { supabase, AIAgentFormSubmission } from "./supabase";
import { FormData } from "@/pages/Index";

// Convert FormData to AIAgentFormSubmission format
export const convertFormDataToSubmission = (
  formData: FormData
): Omit<AIAgentFormSubmission, "id" | "created_at" | "status" | "notes"> => {
  return {
    // Service Selection
    purchased_services: formData.purchasedServices,

    // SMS AI Specific
    sms_operation_type: formData.smsOperationType,
    sms_additional_context: formData.smsAdditionalContext,
    sms_intro_messages: formData.smsIntroMessages,
    sms_qualification_flow: formData.smsQualificationFlow,
    sms_objective: formData.smsObjective,
    sms_persona: formData.smsPersona,
    sms_faqs: formData.smsFAQs,
    sms_website_url: formData.smsWebsiteUrl,

    // Basic Information
    company_name: formData.companyName,
    specific_business_type: formData.specificBusinessType,
    company_website: formData.companyWebsite,
    contact_name: formData.contactName,
    email: formData.email,

    // Voice AI Purpose
    agent_type: formData.agentType,
    lead_sources: formData.leadSources,
    lead_sources_other: formData.leadSourcesOther,
    main_purpose: formData.mainPurpose,
    main_purpose_other: formData.mainPurposeOther,
    brand_personality: formData.brandPersonality,
    brand_personality_other: formData.brandPersonalityOther,

    // Call Process
    current_call_process: formData.currentCallProcess,
    sales_scripts: [], // Will be populated after file upload
    required_information: formData.requiredInformation,
    required_information_other: formData.requiredInformationOther,

    // Qualification Criteria
    success_criteria: formData.successCriteria,
    disqualification_criteria: formData.disqualificationCriteria,

    // Customer Experience
    emotional_states: formData.emotionalStates,
    emotional_states_other: formData.emotionalStatesOther,
    common_problems: formData.commonProblems,
    common_objections: formData.commonObjections,

    // Agent Knowledge
    company_services: formData.companyServices,
    service_areas: formData.serviceAreas,
    key_differentiators: formData.keyDifferentiators,
    topics_to_avoid: formData.topicsToAvoid,
    topics_to_avoid_other: formData.topicsToAvoidOther,

    // Success Metrics
    success_definition: formData.successDefinition,
    target_call_length: formData.targetCallLength,
    crm_system: formData.crmSystem,
    crm_system_other: formData.crmSystemOther,
    scheduling_software: formData.schedulingSoftware,
    scheduling_software_other: formData.schedulingSoftwareOther,
    email_system: formData.emailSystem,
    email_system_other: formData.emailSystemOther,
    compliance_requirements: formData.complianceRequirements,

    // Voice Preferences
    ai_name: formData.aiName,
    voice_gender: formData.voiceGender,
    eleven_labs_voice_id: formData.elevenLabsVoiceId,
    additional_voice_requirements: formData.additionalVoiceRequirements,
  };
};

// Upload files to Supabase Storage
export const uploadFiles = async (
  files: File[],
  companyName: string
): Promise<string[]> => {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `sales-scripts/${companyName.replace(
      /[^a-zA-Z0-9]/g,
      "-"
    )}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("ai-agent-files")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading file:", error);
      throw new Error(`Failed to upload ${file.name}: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("ai-agent-files")
      .getPublicUrl(filePath);

    uploadedUrls.push(urlData.publicUrl);
  }

  return uploadedUrls;
};

// Submit form data to Supabase
export const submitFormData = async (
  formData: FormData
): Promise<AIAgentFormSubmission> => {
  try {
    // Upload files first if any
    let salesScriptUrls: string[] = [];
    if (formData.salesScripts.length > 0) {
      // Separate already uploaded URLs and new files
      const urls = formData.salesScripts.filter(
        (f): f is string => typeof f === "string"
      );
      const files = formData.salesScripts.filter(
        (f): f is File => f instanceof File
      );
      salesScriptUrls = urls;
      if (files.length > 0) {
        const uploaded = await uploadFiles(files, formData.companyName);
        salesScriptUrls = [...salesScriptUrls, ...uploaded];
      }
    }

    // Convert form data to submission format
    const submissionData = convertFormDataToSubmission(formData);
    submissionData.sales_scripts = salesScriptUrls;
    (submissionData as any).status = "completed";

    // Check if a draft or completed record exists for this email
    const { data: existingRecords } = await supabase
      .from("ai_agent_submissions")
      .select("id, status")
      .eq("email", formData.email)
      .in("status", ["draft", "completed"])
      .order("updated_at", { ascending: false })
      .limit(1);
    const existing =
      existingRecords && existingRecords.length > 0 ? existingRecords[0] : null;

    let result;
    if (existing) {
      // Update the existing record to final submission
      const { data, error } = await supabase
        .from("ai_agent_submissions")
        .update(submissionData)
        .eq("id", existing.id)
        .select()
        .single();
      if (error) {
        console.error("Error updating record to completed:", error);
        throw new Error(`Failed to submit form: ${error.message}`);
      }
      result = data;
    } else {
      // Insert new record as completed
      const { data, error } = await supabase
        .from("ai_agent_submissions")
        .insert([submissionData])
        .select()
        .single();
      if (error) {
        console.error("Error submitting form:", error);
        throw new Error(`Failed to submit form: ${error.message}`);
      }
      result = data;
    }

    // POST to webhook (do not block or throw if it fails)
    try {
      await fetch(
        "https://automationrev.com/webhook/b18ac662-96cc-4d17-84ab-3bb5a9cb0039",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        }
      );
    } catch (webhookError) {
      console.error("Failed to POST to webhook:", webhookError);
    }

    return result;
  } catch (error) {
    console.error("Error in submitFormData:", error);
    throw error;
  }
};

// Save form progress to Supabase
export const saveFormProgress = async (
  formData: FormData,
  currentSection?: number
): Promise<void> => {
  try {
    // Upload files if any (only those that are File objects, not URLs)
    let salesScriptUrls: string[] = [];
    if (formData.salesScripts && formData.salesScripts.length > 0) {
      // Separate already uploaded URLs and new files
      const urls = formData.salesScripts.filter(
        (f): f is string => typeof f === "string"
      );
      const files = formData.salesScripts.filter(
        (f): f is File => f instanceof File
      );
      salesScriptUrls = urls;
      if (files.length > 0) {
        const uploaded = await uploadFiles(files, formData.companyName);
        salesScriptUrls = [...salesScriptUrls, ...uploaded];
      }
    }

    const submissionData = convertFormDataToSubmission(formData);
    submissionData.sales_scripts = salesScriptUrls;

    // Add section tracking data
    const sectionData = {
      ...submissionData,
      last_section: currentSection || 0,
      completed_sections:
        currentSection !== undefined
          ? Array.from({ length: currentSection + 1 }, (_, i) => i)
          : [],
    };

    // Check if a draft or completed record already exists for this email
    const { data: existingRecords, error: fetchError } = await supabase
      .from("ai_agent_submissions")
      .select("id, completed_sections, status")
      .eq("email", formData.email)
      .in("status", ["draft", "completed"])
      .order("updated_at", { ascending: false })
      .limit(1);

    const existing =
      existingRecords && existingRecords.length > 0 ? existingRecords[0] : null;

    if (existing) {
      // Update existing record with section progress
      const updatedCompletedSections =
        currentSection !== undefined
          ? [
              ...new Set([
                ...(existing.completed_sections || []),
                currentSection,
              ]),
            ]
          : existing.completed_sections;

      const { error } = await supabase
        .from("ai_agent_submissions")
        .update({
          ...sectionData,
          completed_sections: updatedCompletedSections,
          status: existing.status, // preserve status (draft or completed)
        })
        .eq("id", existing.id);

      if (error) {
        console.error("Error updating record:", error);
        throw new Error(`Failed to update record: ${error.message}`);
      }
    } else {
      // Create new draft
      const { error } = await supabase
        .from("ai_agent_submissions")
        .insert([{ ...sectionData, status: "draft" }]);

      if (error) {
        console.error("Error creating draft:", error);
        throw new Error(`Failed to create draft: ${error.message}`);
      }
    }
  } catch (error) {
    console.error("Error in saveFormProgress:", error);
    throw error;
  }
};

// Load saved form progress from Supabase
export const loadFormProgress = async (
  email: string
): Promise<FormData | null> => {
  try {
    const { data, error } = await supabase
      .from("ai_agent_submissions")
      .select("*")
      .eq("email", email)
      .in("status", ["draft", "completed"])
      .order("updated_at", { ascending: false })
      .limit(1);

    const draft = data && data.length > 0 ? data[0] : null;

    if (error) {
      if (error.code === "PGRST116") {
        // No draft found
        return null;
      }
      console.error("Error loading form progress:", error);
      throw new Error(`Failed to load form progress: ${error.message}`);
    }

    // Convert back to FormData format
    return {
      // Service Selection
      purchasedServices: draft.purchased_services || [],

      // SMS AI Specific
      smsOperationType: draft.sms_operation_type || [],
      smsAdditionalContext: draft.sms_additional_context || "",
      smsIntroMessages: draft.sms_intro_messages || [],
      smsQualificationFlow: draft.sms_qualification_flow || "",
      smsObjective: draft.sms_objective || "",
      smsPersona: draft.sms_persona || "",
      smsFAQs: draft.sms_faqs || "",
      smsWebsiteUrl: draft.sms_website_url || "",

      // Basic Information
      companyName: draft.company_name,
      specificBusinessType: draft.specific_business_type,
      companyWebsite: draft.company_website,
      contactName: draft.contact_name,
      email: draft.email,

      // Voice AI Purpose
      agentType: draft.agent_type,
      leadSources: draft.lead_sources,
      leadSourcesOther: draft.lead_sources_other,
      mainPurpose: draft.main_purpose,
      mainPurposeOther: draft.main_purpose_other,
      brandPersonality: draft.brand_personality,
      brandPersonalityOther: draft.brand_personality_other,

      // Call Process
      currentCallProcess: draft.current_call_process,
      salesScripts: draft.sales_scripts || [],
      requiredInformation: draft.required_information,
      requiredInformationOther: draft.required_information_other,

      // Qualification Criteria
      successCriteria: draft.success_criteria,
      disqualificationCriteria: draft.disqualification_criteria,

      // Customer Experience
      emotionalStates: draft.emotional_states,
      emotionalStatesOther: draft.emotional_states_other,
      commonProblems: draft.common_problems,
      commonObjections: draft.common_objections,

      // Agent Knowledge
      companyServices: draft.company_services,
      serviceAreas: draft.service_areas,
      keyDifferentiators: draft.key_differentiators,
      topicsToAvoid: draft.topics_to_avoid,
      topicsToAvoidOther: draft.topics_to_avoid_other,

      // Success Metrics
      successDefinition: draft.success_definition,
      targetCallLength: draft.target_call_length,
      crmSystem: draft.crm_system,
      crmSystemOther: draft.crm_system_other,
      schedulingSoftware: draft.scheduling_software,
      schedulingSoftwareOther: draft.scheduling_software_other,
      emailSystem: draft.email_system,
      emailSystemOther: draft.email_system_other,
      complianceRequirements: draft.compliance_requirements,

      // Voice Preferences
      aiName: draft.ai_name,
      voiceGender: draft.voice_gender,
      elevenLabsVoiceId: draft.eleven_labs_voice_id,
      additionalVoiceRequirements: draft.additional_voice_requirements,

      // Progress tracking fields
      completedSections: draft.completed_sections || [],
      lastSection: draft.last_section ?? 0,
    };
  } catch (error) {
    console.error("Error in loadFormProgress:", error);
    throw error;
  }
};

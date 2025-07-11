# Supabase Setup Guide

This guide will help you set up Supabase for the AI Agent Onboarding Form application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. The project dependencies installed (`npm install`)

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `ai-agent-onboarding-form` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the region closest to your users
5. Click "Create new project"
6. Wait for the project to be set up (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the project root (if it doesn't exist)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Replace the placeholder values with your actual Supabase project URL and anon key

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Click "Run" to execute the SQL

This will create:

- The `ai_agent_submissions` table with all multi-service fields
- Indexes for better performance
- Row Level Security (RLS) policies
- A storage bucket for file uploads
- A summary view for easier querying

## Step 5: Configure Storage (Optional)

If you want to customize the storage settings:

1. Go to **Storage** in your Supabase dashboard
2. You should see an `ai-agent-files` bucket created by the schema
3. You can adjust the bucket settings if needed:
   - **Public bucket**: Allows public access to uploaded files
   - **File size limit**: Set maximum file size (default is 50MB)
   - **Allowed MIME types**: Restrict file types if needed

## Step 6: Test the Integration

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Fill out the form and test:

   - Service selection (SMS AI, Voice AI)
   - Form submission
   - File uploads
   - Auto-save functionality
   - Progress loading

3. Check your Supabase dashboard:
   - Go to **Table Editor** → **ai_agent_submissions** to see submitted forms
   - Go to **Storage** → **ai-agent-files** to see uploaded files

## Step 7: Production Deployment

### For Vercel/Netlify:

1. Add the environment variables in your deployment platform's settings
2. Deploy your application

### For Lovable:

1. Add the environment variables in your Lovable project settings
2. Deploy through Lovable

## Environment Variables Reference

| Variable                 | Description                   | Required |
| ------------------------ | ----------------------------- | -------- |
| `VITE_SUPABASE_URL`      | Your Supabase project URL     | Yes      |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes      |

## Database Schema Overview

### Main Table: `ai_agent_submissions`

The table stores all form submissions with the following structure:

- **Service Selection**: Which services were purchased (SMS AI, Voice AI)
- **SMS AI Specific**: All SMS AI configuration fields
- **Basic Information**: Company details, contact info
- **Voice AI Purpose**: Agent type, lead sources, purpose, personality
- **Call Process**: Call flow, scripts, required information
- **Qualification Criteria**: Success/disqualification criteria
- **Customer Experience**: Emotional states, problems, objections
- **Agent Knowledge**: Services, differentiators, topics to avoid
- **Success Metrics**: KPIs, integrations, compliance
- **Voice Preferences**: AI name, voice settings, ElevenLabs integration
- **Metadata**: Status, notes, timestamps

### Storage Bucket: `ai-agent-files`

- Stores uploaded sales scripts and other files
- Public access for easy file sharing
- Organized by company name and timestamp

## Security Features

- **Row Level Security (RLS)**: Enabled on the main table
- **Public Policies**: Currently allows public read/write (can be restricted later)
- **File Upload Validation**: Client-side file type and size validation
- **Error Handling**: Graceful fallback to localStorage if Supabase is unavailable

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**

   - Check that your `.env` file exists and has the correct variables
   - Ensure the variable names start with `VITE_`

2. **"Failed to submit form"**

   - Check your Supabase project is active
   - Verify the database schema was created correctly
   - Check the browser console for detailed error messages

3. **"File upload failed"**

   - Ensure the storage bucket was created
   - Check storage policies are set correctly
   - Verify file size is within limits

4. **"Permission denied"**
   - Check RLS policies in Supabase dashboard
   - Ensure the anon key has the correct permissions

### Getting Help:

1. Check the browser console for error messages
2. Review the Supabase logs in your dashboard
3. Verify your environment variables are correct
4. Test with a simple form submission first

## Next Steps

After setup, you can:

1. **Customize the schema**: Add additional fields or modify existing ones
2. **Add authentication**: Implement user accounts and private submissions
3. **Create admin dashboard**: Build a dashboard to review submissions
4. **Add email notifications**: Set up webhooks to notify when forms are submitted
5. **Implement analytics**: Track form completion rates and user behavior

## Support

If you encounter issues:

1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review the error messages in your browser console
3. Check the Supabase dashboard logs
4. Ensure all environment variables are set correctly

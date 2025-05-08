
-- Create a unified profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles_unified (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  avatar_url TEXT,
  bio TEXT,
  agency_name TEXT,
  carte_gestion TEXT,
  first_name TEXT,
  income TEXT,
  last_name TEXT,
  phone TEXT,
  profession TEXT,
  property_count TEXT,
  property_type TEXT,
  searching_for TEXT,
  siret TEXT,
  tenant_score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles_unified ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view any profile
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles_unified
  FOR SELECT USING (true);

-- Create policy for users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.profiles_unified
  FOR UPDATE USING (auth.uid() = id);

-- Set up trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_unified_updated_at
BEFORE UPDATE ON public.profiles_unified
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Create trigger to create profile after signup
CREATE OR REPLACE FUNCTION public.create_profile_after_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles_unified (id, full_name, email, role, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.email,
    'student',
    'https://ui-avatars.com/api/?name=' || (NEW.raw_user_meta_data->>'name') || '&background=0D9488&color=fff'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Uncomment this if you want to automatically create profiles on signup
-- CREATE TRIGGER create_profile_after_signup
-- AFTER INSERT ON auth.users
-- FOR EACH ROW EXECUTE PROCEDURE public.create_profile_after_signup();


-- Table for courses
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    instructor_id UUID NOT NULL REFERENCES auth.users(id),
    category TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('débutant', 'intermédiaire', 'avancé')),
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    thumbnail_url TEXT,
    duration TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table for course sections
CREATE TABLE IF NOT EXISTS public.course_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    position INTEGER NOT NULL,
    duration TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table for course lessons
CREATE TABLE IF NOT EXISTS public.course_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID NOT NULL REFERENCES public.course_sections(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('video', 'quiz', 'document', 'practice')),
    content_url TEXT,
    duration TEXT,
    position INTEGER NOT NULL,
    is_preview BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table for course enrollments and progress tracking
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    progress INTEGER NOT NULL DEFAULT 0,
    completed_lessons JSONB NOT NULL DEFAULT '[]'::jsonb,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_accessed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, course_id)
);

-- Table for course reviews
CREATE TABLE IF NOT EXISTS public.course_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, course_id)
);

-- Row Level Security (RLS) policies
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_reviews ENABLE ROW LEVEL SECURITY;

-- Policies for courses table
CREATE POLICY "Courses are viewable by everyone" ON public.courses
  FOR SELECT USING (true);

CREATE POLICY "Instructors can insert their courses" ON public.courses
  FOR INSERT WITH CHECK (auth.uid() = instructor_id);

CREATE POLICY "Instructors can update their courses" ON public.courses
  FOR UPDATE USING (auth.uid() = instructor_id);

CREATE POLICY "Instructors can delete their courses" ON public.courses
  FOR DELETE USING (auth.uid() = instructor_id);

-- Policies for course_sections table
CREATE POLICY "Course sections are viewable by everyone" ON public.course_sections
  FOR SELECT USING (true);

CREATE POLICY "Instructors can manage their course sections" ON public.course_sections
  USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = course_sections.course_id 
      AND courses.instructor_id = auth.uid()
    )
  );

-- Similar policies for course_lessons table
CREATE POLICY "Course lessons are viewable by everyone" ON public.course_lessons
  FOR SELECT USING (true);

CREATE POLICY "Instructors can manage their course lessons" ON public.course_lessons
  USING (
    EXISTS (
      SELECT 1 FROM public.course_sections 
      JOIN public.courses ON course_sections.course_id = courses.id
      WHERE course_sections.id = course_lessons.section_id 
      AND courses.instructor_id = auth.uid()
    )
  );

-- Policies for course_enrollments table
CREATE POLICY "Students can view their own enrollments" ON public.course_enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Instructors can view enrollments for their courses" ON public.course_enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = course_enrollments.course_id 
      AND courses.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Students can enroll in courses" ON public.course_enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update their own progress" ON public.course_enrollments
  FOR UPDATE USING (auth.uid() = user_id);

-- Policies for course_reviews table
CREATE POLICY "Reviews are viewable by everyone" ON public.course_reviews
  FOR SELECT USING (true);

CREATE POLICY "Students can create reviews for enrolled courses" ON public.course_reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.course_enrollments 
      WHERE course_enrollments.user_id = auth.uid() 
      AND course_enrollments.course_id = course_reviews.course_id
    )
  );

CREATE POLICY "Students can update their own reviews" ON public.course_reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Students can delete their own reviews" ON public.course_reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER course_sections_updated_at
BEFORE UPDATE ON public.course_sections
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER course_lessons_updated_at
BEFORE UPDATE ON public.course_lessons
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER course_enrollments_updated_at
BEFORE UPDATE ON public.course_enrollments
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER course_reviews_updated_at
BEFORE UPDATE ON public.course_reviews
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

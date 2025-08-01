export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      assessment_questions: {
        Row: {
          assessment_id: string
          correct_answer: string | null
          created_at: string
          id: string
          options: Json | null
          points: number | null
          position: number
          question_text: string
          question_type: string
        }
        Insert: {
          assessment_id: string
          correct_answer?: string | null
          created_at?: string
          id?: string
          options?: Json | null
          points?: number | null
          position: number
          question_text: string
          question_type: string
        }
        Update: {
          assessment_id?: string
          correct_answer?: string | null
          created_at?: string
          id?: string
          options?: Json | null
          points?: number | null
          position?: number
          question_text?: string
          question_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "employee_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_responses: {
        Row: {
          id: string
          is_correct: boolean | null
          points_earned: number | null
          question_id: string
          response: string | null
          response_time: number | null
          submission_id: string
        }
        Insert: {
          id?: string
          is_correct?: boolean | null
          points_earned?: number | null
          question_id: string
          response?: string | null
          response_time?: number | null
          submission_id: string
        }
        Update: {
          id?: string
          is_correct?: boolean | null
          points_earned?: number | null
          question_id?: string
          response?: string | null
          response_time?: number | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "assessment_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_responses_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "assessment_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_submissions: {
        Row: {
          assessment_id: string
          completion_time: number | null
          employee_id: string
          id: string
          passed: boolean | null
          score: number | null
          status: string | null
          submitted_at: string
        }
        Insert: {
          assessment_id: string
          completion_time?: number | null
          employee_id: string
          id?: string
          passed?: boolean | null
          score?: number | null
          status?: string | null
          submitted_at?: string
        }
        Update: {
          assessment_id?: string
          completion_time?: number | null
          employee_id?: string
          id?: string
          passed?: boolean | null
          score?: number | null
          status?: string | null
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_submissions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "employee_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_submissions_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_types: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_mandatory: boolean | null
          name: string
          passing_score: number | null
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_mandatory?: boolean | null
          name: string
          passing_score?: number | null
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_mandatory?: boolean | null
          name?: string
          passing_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_types_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_types_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          admin_id: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      company_courses: {
        Row: {
          category: string | null
          company_id: string
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          is_required: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          company_id: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_required?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          company_id?: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_required?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_courses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_departments: {
        Row: {
          company_id: string
          created_at: string | null
          description: string | null
          id: string
          manager_id: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          manager_id?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          manager_id?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_departments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_departments_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employees: {
        Row: {
          company_id: string
          department_id: string | null
          employee_id: string
          id: string
          job_title: string | null
          joined_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          company_id: string
          department_id?: string | null
          employee_id: string
          id?: string
          job_title?: string | null
          joined_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          department_id?: string | null
          employee_id?: string
          id?: string
          job_title?: string | null
          joined_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_employees_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "company_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_employees_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      company_subscriptions: {
        Row: {
          company_id: string | null
          ended_at: string | null
          id: string
          is_active: boolean | null
          started_at: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
        }
        Insert: {
          company_id?: string | null
          ended_at?: string | null
          id?: string
          is_active?: boolean | null
          started_at?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
        }
        Update: {
          company_id?: string | null
          ended_at?: string | null
          id?: string
          is_active?: boolean | null
          started_at?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_subscriptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      course_assignments: {
        Row: {
          assigned_by: string | null
          company_id: string
          completed: boolean | null
          completed_at: string | null
          course_id: string
          created_at: string | null
          department_id: string | null
          due_date: string | null
          employee_id: string
          id: string
          updated_at: string | null
        }
        Insert: {
          assigned_by?: string | null
          company_id: string
          completed?: boolean | null
          completed_at?: string | null
          course_id: string
          created_at?: string | null
          department_id?: string | null
          due_date?: string | null
          employee_id: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          assigned_by?: string | null
          company_id?: string
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string
          created_at?: string | null
          department_id?: string | null
          due_date?: string | null
          employee_id?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_assignments_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_assignments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_assignments_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "company_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          completed_lessons: Json | null
          course_id: string | null
          enrolled_at: string | null
          id: string
          last_accessed_at: string | null
          progress: number | null
          student_id: string | null
        }
        Insert: {
          completed_lessons?: Json | null
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          last_accessed_at?: string | null
          progress?: number | null
          student_id?: string | null
        }
        Update: {
          completed_lessons?: Json | null
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          last_accessed_at?: string | null
          progress?: number | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      course_lessons: {
        Row: {
          content_url: string | null
          created_at: string | null
          duration: string | null
          id: string
          is_preview: boolean | null
          position: number
          section_id: string | null
          title: string
          type: string | null
        }
        Insert: {
          content_url?: string | null
          created_at?: string | null
          duration?: string | null
          id?: string
          is_preview?: boolean | null
          position: number
          section_id?: string | null
          title: string
          type?: string | null
        }
        Update: {
          content_url?: string | null
          created_at?: string | null
          duration?: string | null
          id?: string
          is_preview?: boolean | null
          position?: number
          section_id?: string | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "course_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      course_reviews: {
        Row: {
          comment: string | null
          course_id: string | null
          created_at: string | null
          id: string
          rating: number | null
          student_id: string | null
        }
        Insert: {
          comment?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          student_id?: string | null
        }
        Update: {
          comment?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_reviews_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      course_sections: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string
          position: number
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          position: number
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          position?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          instructor_id: string | null
          is_published: boolean | null
          level: string | null
          price: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          instructor_id?: string | null
          is_published?: boolean | null
          level?: string | null
          price?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          instructor_id?: string | null
          is_published?: boolean | null
          level?: string | null
          price?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_assessments: {
        Row: {
          assessment_type_id: string
          company_id: string
          created_at: string
          created_by: string | null
          department_id: string | null
          description: string | null
          due_date: string | null
          id: string
          is_active: boolean | null
          title: string
        }
        Insert: {
          assessment_type_id: string
          company_id: string
          created_at?: string
          created_by?: string | null
          department_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_active?: boolean | null
          title: string
        }
        Update: {
          assessment_type_id?: string
          company_id?: string
          created_at?: string
          created_by?: string | null
          department_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_assessments_assessment_type_id_fkey"
            columns: ["assessment_type_id"]
            isOneToOne: false
            referencedRelation: "assessment_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assessments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assessments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assessments_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "company_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_certifications: {
        Row: {
          certification_data: Json | null
          company_id: string
          description: string | null
          employee_id: string
          expiry_date: string | null
          id: string
          issue_date: string
          issued_by: string | null
          name: string
          related_courses: Json | null
          status: string | null
        }
        Insert: {
          certification_data?: Json | null
          company_id: string
          description?: string | null
          employee_id: string
          expiry_date?: string | null
          id?: string
          issue_date?: string
          issued_by?: string | null
          name: string
          related_courses?: Json | null
          status?: string | null
        }
        Update: {
          certification_data?: Json | null
          company_id?: string
          description?: string | null
          employee_id?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string
          issued_by?: string | null
          name?: string
          related_courses?: Json | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_certifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_certifications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_certifications_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_skills: {
        Row: {
          acquired_date: string
          employee_id: string
          id: string
          proficiency_level: number | null
          skill_id: string
          source: string | null
          source_id: string | null
          verified: boolean | null
          verified_by: string | null
        }
        Insert: {
          acquired_date?: string
          employee_id: string
          id?: string
          proficiency_level?: number | null
          skill_id: string
          source?: string | null
          source_id?: string | null
          verified?: boolean | null
          verified_by?: string | null
        }
        Update: {
          acquired_date?: string
          employee_id?: string
          id?: string
          proficiency_level?: number | null
          skill_id?: string
          source?: string | null
          source_id?: string | null
          verified?: boolean | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_skills_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_skills_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_unified: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company_id: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_demo: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company_id?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_demo?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company_id?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_demo?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_unified_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      progress_tracking: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_id: string | null
          id: string
          lesson_id: string | null
          student_id: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          id?: string
          lesson_id?: string | null
          student_id?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          id?: string
          lesson_id?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_tracking_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_tracking_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_tracking_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          course_id: string | null
          id: string
          purchased_at: string | null
          student_id: string | null
        }
        Insert: {
          course_id?: string | null
          id?: string
          purchased_at?: string | null
          student_id?: string | null
        }
        Update: {
          course_id?: string | null
          id?: string
          purchased_at?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchases_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_categories: {
        Row: {
          company_id: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          company_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category_id: string | null
          company_id: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category_id?: string | null
          company_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category_id?: string | null
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skills_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string | null
          id: string
          unlocked_at: string | null
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          id?: string
          unlocked_at?: string | null
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          id?: string
          unlocked_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          id: string
          ip_address: string | null
          login_at: string | null
          logout_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          ip_address?: string | null
          login_at?: string | null
          logout_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          ip_address?: string | null
          login_at?: string | null
          logout_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          student_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          student_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles_unified"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "business_admin"
        | "instructor"
        | "student"
        | "employee"
      user_role:
        | "super_admin"
        | "business_admin"
        | "student"
        | "instructor"
        | "demo"
        | "admin"
        | "employee"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "business_admin",
        "instructor",
        "student",
        "employee",
      ],
      user_role: [
        "super_admin",
        "business_admin",
        "student",
        "instructor",
        "demo",
        "admin",
        "employee",
      ],
    },
  },
} as const


import { supabase } from '@/integrations/supabase/client';
import {
  AssessmentType,
  EmployeeAssessment,
  AssessmentQuestion,
  AssessmentSubmission,
  AssessmentResponse
} from '@/types/database';
import { toast } from '@/hooks/use-toast';

/**
 * Service for managing employee assessments
 */
export const assessmentService = {
  /**
   * Get assessment types for a company
   */
  getAssessmentTypes: async (companyId: string): Promise<AssessmentType[]> => {
    try {
      const { data, error } = await supabase
        .from('assessment_types')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching assessment types:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in getAssessmentTypes:", error);
      return [];
    }
  },

  /**
   * Create a new assessment type
   */
  createAssessmentType: async (assessmentType: Partial<AssessmentType>): Promise<AssessmentType | null> => {
    try {
      // Ensure required fields are present
      if (!assessmentType.company_id || !assessmentType.name) {
        console.error("Missing required fields for assessment type");
        return null;
      }
      
      const { data, error } = await supabase
        .from('assessment_types')
        .insert({
          company_id: assessmentType.company_id,
          name: assessmentType.name,
          description: assessmentType.description,
          is_mandatory: assessmentType.is_mandatory,
          passing_score: assessmentType.passing_score,
          created_by: assessmentType.created_by
        })
        .select()
        .single();
        
      if (error) {
        console.error("Error creating assessment type:", error);
        toast({
          title: "Erreur",
          description: "Impossible de créer le type d'évaluation.",
          variant: "destructive",
        });
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in createAssessmentType:", error);
      return null;
    }
  },

  /**
   * Get assessments for a company
   */
  getAssessments: async (companyId: string): Promise<EmployeeAssessment[]> => {
    try {
      const { data, error } = await supabase
        .from('employee_assessments')
        .select(`
          *,
          assessment_types(name, description, is_mandatory, passing_score),
          company_departments(name),
          profiles_unified(full_name)
        `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching assessments:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in getAssessments:", error);
      return [];
    }
  },

  /**
   * Get assessments for an employee
   */
  getEmployeeAssessments: async (employeeId: string): Promise<any[]> => {
    try {
      // First, get the employee's company and department
      const { data: employeeData, error: employeeError } = await supabase
        .from('company_employees')
        .select('company_id, department_id')
        .eq('employee_id', employeeId)
        .single();
        
      if (employeeError) {
        console.error("Error fetching employee data:", employeeError);
        return [];
      }
      
      if (!employeeData) {
        return [];
      }
      
      // Then, get all assessments for that company that are either for all employees or for this employee's department
      const { data, error } = await supabase
        .from('employee_assessments')
        .select(`
          *,
          assessment_types(name, description, is_mandatory, passing_score),
          company_departments(name)
        `)
        .eq('company_id', employeeData.company_id)
        .or(`department_id.is.null,department_id.eq.${employeeData.department_id}`)
        .eq('is_active', true)
        .order('due_date', { ascending: true });
        
      if (error) {
        console.error("Error fetching employee assessments:", error);
        return [];
      }
      
      // Now check which assessments the employee has already submitted
      const { data: submissions, error: submissionsError } = await supabase
        .from('assessment_submissions')
        .select('assessment_id, status, passed, score')
        .eq('employee_id', employeeId);
        
      if (submissionsError) {
        console.error("Error fetching employee submissions:", submissionsError);
      }
      
      // Combine the assessment data with submission status
      const enrichedAssessments = data?.map(assessment => {
        const submission = submissions?.find(s => s.assessment_id === assessment.id);
        return {
          ...assessment,
          submission_status: submission?.status || null,
          passed: submission?.passed || null,
          score: submission?.score || null,
          has_submitted: !!submission
        };
      });
      
      return enrichedAssessments || [];
    } catch (error) {
      console.error("Error in getEmployeeAssessments:", error);
      return [];
    }
  },

  /**
   * Create a new assessment with questions
   */
  createAssessment: async (assessment: Partial<EmployeeAssessment>, questions: Partial<AssessmentQuestion>[]): Promise<EmployeeAssessment | null> => {
    try {
      // Ensure required fields are present
      if (!assessment.assessment_type_id || !assessment.company_id || !assessment.title) {
        console.error("Missing required fields for assessment");
        return null;
      }
      
      // First, create the assessment
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('employee_assessments')
        .insert({
          assessment_type_id: assessment.assessment_type_id,
          title: assessment.title,
          description: assessment.description,
          company_id: assessment.company_id,
          department_id: assessment.department_id,
          due_date: assessment.due_date,
          is_active: assessment.is_active,
          created_by: assessment.created_by
        })
        .select()
        .single();
        
      if (assessmentError) {
        console.error("Error creating assessment:", assessmentError);
        toast({
          title: "Erreur",
          description: "Impossible de créer l'évaluation.",
          variant: "destructive",
        });
        return null;
      }
      
      // Then, create the questions with positions
      if (assessmentData && questions.length > 0) {
        // Make sure all questions have the required fields
        const validQuestions = questions.filter(q => q.question_text && q.question_type);
        
        if (validQuestions.length !== questions.length) {
          console.error("Some questions are missing required fields");
        }
        
        const questionsToInsert = validQuestions.map((q, index) => ({
          assessment_id: assessmentData.id,
          question_text: q.question_text!,
          question_type: q.question_type!,
          options: q.options,
          correct_answer: q.correct_answer,
          points: q.points,
          position: index + 1
        }));
        
        if (questionsToInsert.length > 0) {
          const { error: questionsError } = await supabase
            .from('assessment_questions')
            .insert(questionsToInsert);
            
          if (questionsError) {
            console.error("Error creating assessment questions:", questionsError);
            toast({
              title: "Attention",
              description: "L'évaluation a été créée mais certaines questions n'ont pas pu être ajoutées.",
              variant: "warning",
            });
          }
        }
      }
      
      return assessmentData;
    } catch (error) {
      console.error("Error in createAssessment:", error);
      return null;
    }
  },

  /**
   * Get assessment details with questions
   */
  getAssessmentDetails: async (assessmentId: string): Promise<any | null> => {
    try {
      // Get assessment basic info
      const { data: assessment, error: assessmentError } = await supabase
        .from('employee_assessments')
        .select(`
          *,
          assessment_types(*),
          company_departments(name),
          profiles_unified(full_name)
        `)
        .eq('id', assessmentId)
        .single();
        
      if (assessmentError) {
        console.error("Error fetching assessment:", assessmentError);
        return null;
      }
      
      // Get assessment questions
      const { data: questions, error: questionsError } = await supabase
        .from('assessment_questions')
        .select('*')
        .eq('assessment_id', assessmentId)
        .order('position', { ascending: true });
        
      if (questionsError) {
        console.error("Error fetching assessment questions:", questionsError);
      }
      
      return {
        ...assessment,
        questions: questions || []
      };
    } catch (error) {
      console.error("Error in getAssessmentDetails:", error);
      return null;
    }
  },

  /**
   * Submit an assessment
   */
  submitAssessment: async (
    assessmentId: string,
    employeeId: string,
    responses: { questionId: string, response: string, timeSpent: number }[]
  ): Promise<boolean> => {
    try {
      // First, create the submission
      const { data: submission, error: submissionError } = await supabase
        .from('assessment_submissions')
        .insert({
          assessment_id: assessmentId,
          employee_id: employeeId,
          status: 'submitted',
          completion_time: responses.reduce((total, r) => total + (r.timeSpent || 0), 0)
        })
        .select()
        .single();
        
      if (submissionError) {
        console.error("Error creating assessment submission:", submissionError);
        toast({
          title: "Erreur",
          description: "Impossible de soumettre l'évaluation.",
          variant: "destructive",
        });
        return false;
      }
      
      // Get the assessment questions to check answers
      const { data: questions, error: questionsError } = await supabase
        .from('assessment_questions')
        .select('*')
        .eq('assessment_id', assessmentId);
        
      if (questionsError) {
        console.error("Error fetching assessment questions:", questionsError);
        return false;
      }
      
      // Create the responses
      if (submission && responses.length > 0) {
        const formattedResponses = responses.map(r => {
          const question = questions?.find(q => q.id === r.questionId);
          const isCorrect = question ? 
            (question.question_type !== 'text' && question.correct_answer === r.response) : 
            null;
          const pointsEarned = isCorrect ? (question?.points || 0) : 0;
          
          return {
            submission_id: submission.id,
            question_id: r.questionId,
            response: r.response,
            is_correct: isCorrect,
            points_earned: pointsEarned,
            response_time: r.timeSpent
          };
        });
        
        const { error: responsesError } = await supabase
          .from('assessment_responses')
          .insert(formattedResponses);
          
        if (responsesError) {
          console.error("Error recording assessment responses:", responsesError);
          return false;
        }
        
        // Calculate score for auto-graded questions
        const totalPoints = questions?.reduce((total, q) => total + (q.points || 1), 0) || 0;
        const earnedPoints = formattedResponses.reduce((total, r) => total + r.points_earned, 0);
        
        // Only count non-text questions for scoring
        const gradableQuestions = questions?.filter(q => q.question_type !== 'text') || [];
        const gradablePoints = gradableQuestions.reduce((total, q) => total + (q.points || 1), 0) || 0;
        
        // Get the passing score threshold
        const { data: assessmentType, error: typeError } = await supabase
          .from('employee_assessments')
          .select('assessment_types(passing_score)')
          .eq('id', assessmentId)
          .single();
        
        if (!typeError && assessmentType) {
          const passingScore = assessmentType.assessment_types?.passing_score || 70;
          const scorePercentage = gradablePoints > 0 ? Math.round((earnedPoints / gradablePoints) * 100) : 0;
          const passed = scorePercentage >= passingScore;
          
          // Update the submission with the score and pass status
          await supabase
            .from('assessment_submissions')
            .update({
              score: scorePercentage,
              passed: passed,
              status: gradableQuestions.length === questions?.length ? 'evaluated' : 'submitted'
            })
            .eq('id', submission.id);
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error in submitAssessment:", error);
      return false;
    }
  },

  /**
   * Get assessment statistics for a company
   */
  getAssessmentStatistics: async (companyId: string): Promise<any> => {
    try {
      // Get all assessments
      const { data: assessments, error: assessmentsError } = await supabase
        .from('employee_assessments')
        .select(`
          id, 
          title, 
          assessment_type_id,
          assessment_types(name, is_mandatory),
          due_date,
          department_id,
          company_departments(name)
        `)
        .eq('company_id', companyId)
        .eq('is_active', true);
        
      if (assessmentsError) {
        console.error("Error fetching assessments:", assessmentsError);
        return null;
      }
      
      // Get all submissions
      const { data: submissions, error: submissionsError } = await supabase
        .from('assessment_submissions')
        .select(`
          id,
          assessment_id,
          employee_id,
          status,
          score,
          passed,
          submitted_at
        `)
        .in('assessment_id', assessments?.map(a => a.id) || []);
        
      if (submissionsError) {
        console.error("Error fetching submissions:", submissionsError);
        return null;
      }
      
      // Get employees
      const { data: employees, error: employeesError } = await supabase
        .from('company_employees')
        .select('employee_id, department_id')
        .eq('company_id', companyId)
        .eq('status', 'active');
        
      if (employeesError) {
        console.error("Error fetching employees:", employeesError);
        return null;
      }
      
      // Calculate statistics
      const assessmentStats = assessments?.map(assessment => {
        // Filter employees by department if assessment has a department
        const targetEmployees = assessment.department_id 
          ? employees?.filter(e => e.department_id === assessment.department_id) 
          : employees;
          
        const assessmentSubmissions = submissions?.filter(s => s.assessment_id === assessment.id) || [];
        const submittedCount = new Set(assessmentSubmissions.map(s => s.employee_id)).size;
        const passedCount = assessmentSubmissions.filter(s => s.passed).length;
        const averageScore = assessmentSubmissions.length > 0 
          ? Math.round(assessmentSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / assessmentSubmissions.length) 
          : 0;
          
        return {
          id: assessment.id,
          title: assessment.title,
          type: assessment.assessment_types?.name,
          department: assessment.company_departments?.name || 'Tous les départements',
          is_mandatory: assessment.assessment_types?.is_mandatory || false,
          due_date: assessment.due_date,
          target_count: targetEmployees?.length || 0,
          submitted_count: submittedCount,
          completion_rate: targetEmployees?.length ? Math.round((submittedCount / targetEmployees.length) * 100) : 0,
          passed_count: passedCount,
          pass_rate: submittedCount ? Math.round((passedCount / submittedCount) * 100) : 0,
          average_score: averageScore
        };
      });
      
      // Overall statistics
      const mandatoryAssessments = assessmentStats?.filter(a => a.is_mandatory) || [];
      const mandatoryCompletions = mandatoryAssessments.reduce((total, a) => total + a.submitted_count, 0);
      const mandatoryTargets = mandatoryAssessments.reduce((total, a) => total + a.target_count, 0);
      
      const overallStats = {
        total_assessments: assessments?.length || 0,
        total_mandatory: mandatoryAssessments.length,
        overall_completion_rate: mandatoryTargets ? Math.round((mandatoryCompletions / mandatoryTargets) * 100) : 0,
        assessments: assessmentStats
      };
      
      return overallStats;
    } catch (error) {
      console.error("Error in getAssessmentStatistics:", error);
      return null;
    }
  }
};

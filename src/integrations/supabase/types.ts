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
      activity_logs: {
        Row: {
          action: string | null
          created_at: string
          id: number
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string
          id?: number
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string
          id?: number
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      failed_logins: {
        Row: {
          attempt_time: string | null
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          attempt_time?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          attempt_time?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      maintenance_comments: {
        Row: {
          author_name: string | null
          comment: string
          created_at: string
          id: string
          request_id: string | null
          user_id: string | null
        }
        Insert: {
          author_name?: string | null
          comment: string
          created_at?: string
          id?: string
          request_id?: string | null
          user_id?: string | null
        }
        Update: {
          author_name?: string | null
          comment?: string
          created_at?: string
          id?: string
          request_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_comments_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_images: {
        Row: {
          created_at: string
          id: string
          image_path: string
          request_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_path: string
          request_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_path?: string
          request_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_images_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string
          description: string
          id: string
          priority: string | null
          property_id: string | null
          resolved_at: string | null
          response: string | null
          scheduled_date: string | null
          status: string | null
          tenant_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          description: string
          id?: string
          priority?: string | null
          property_id?: string | null
          resolved_at?: string | null
          response?: string | null
          scheduled_date?: string | null
          status?: string | null
          tenant_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          description?: string
          id?: string
          priority?: string | null
          property_id?: string | null
          resolved_at?: string | null
          response?: string | null
          scheduled_date?: string | null
          status?: string | null
          tenant_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      manager_profiles: {
        Row: {
          agency_name: string | null
          carte_gestion: string | null
          created_at: string
          siret: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          agency_name?: string | null
          carte_gestion?: string | null
          created_at?: string
          siret?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          agency_name?: string | null
          carte_gestion?: string | null
          created_at?: string
          siret?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "manager_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manager_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "safe_login_attempts"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      metrics: {
        Row: {
          created_at: string
          id: number
          period: string | null
          type: string | null
          user_id: string | null
          value: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          period?: string | null
          type?: string | null
          user_id?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          period?: string | null
          type?: string | null
          user_id?: string | null
          value?: number | null
        }
        Relationships: []
      }
      owner_profiles: {
        Row: {
          created_at: string
          property_count: string | null
          property_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          property_count?: string | null
          property_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          property_count?: string | null
          property_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "owner_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "owner_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "safe_login_attempts"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          contract_id: string
          created_at: string
          due_date: string
          id: string
          notes: string | null
          payment_date: string
          payment_method: string | null
          status: string
        }
        Insert: {
          amount: number
          contract_id: string
          created_at?: string
          due_date: string
          id?: string
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          status?: string
        }
        Update: {
          amount?: number
          contract_id?: string
          created_at?: string
          due_date?: string
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "rental_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          is_demo: boolean | null
          last_name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          is_demo?: boolean | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          is_demo?: boolean | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles_unified: {
        Row: {
          agency_name: string | null
          carte_gestion: string | null
          created_at: string
          first_name: string | null
          full_name: string | null
          id: string
          income: string | null
          last_name: string | null
          phone: string | null
          profession: string | null
          property_count: string | null
          property_type: string | null
          role: string | null
          searching_for: string | null
          siret: string | null
          tenant_score: number | null
          updated_at: string
        }
        Insert: {
          agency_name?: string | null
          carte_gestion?: string | null
          created_at?: string
          first_name?: string | null
          full_name?: string | null
          id: string
          income?: string | null
          last_name?: string | null
          phone?: string | null
          profession?: string | null
          property_count?: string | null
          property_type?: string | null
          role?: string | null
          searching_for?: string | null
          siret?: string | null
          tenant_score?: number | null
          updated_at?: string
        }
        Update: {
          agency_name?: string | null
          carte_gestion?: string | null
          created_at?: string
          first_name?: string | null
          full_name?: string | null
          id?: string
          income?: string | null
          last_name?: string | null
          phone?: string | null
          profession?: string | null
          property_count?: string | null
          property_type?: string | null
          role?: string | null
          searching_for?: string | null
          siret?: string | null
          tenant_score?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          bathrooms: number | null
          bedrooms: number | null
          created_at: string
          description: string | null
          id: string
          owner_id: string
          rent_amount: number
          size: string
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          address: string
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          description?: string | null
          id?: string
          owner_id: string
          rent_amount: number
          size: string
          status?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          address?: string
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          description?: string | null
          id?: string
          owner_id?: string
          rent_amount?: number
          size?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      rental_applications: {
        Row: {
          applicant_id: string | null
          applicant_name: string
          application_date: string
          contact_email: string
          contact_phone: string | null
          created_at: string
          id: string
          notes: string | null
          property_id: string
          status: string
          tenant_score: number | null
        }
        Insert: {
          applicant_id?: string | null
          applicant_name: string
          application_date?: string
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          property_id: string
          status?: string
          tenant_score?: number | null
        }
        Update: {
          applicant_id?: string | null
          applicant_name?: string
          application_date?: string
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          property_id?: string
          status?: string
          tenant_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_applications_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_contracts: {
        Row: {
          created_at: string
          deposit_amount: number
          end_date: string
          id: string
          monthly_rent: number
          property_id: string
          start_date: string
          status: string
          tenant_id: string | null
          tenant_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deposit_amount: number
          end_date: string
          id?: string
          monthly_rent: number
          property_id: string
          start_date: string
          status?: string
          tenant_id?: string | null
          tenant_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deposit_amount?: number
          end_date?: string
          id?: string
          monthly_rent?: number
          property_id?: string
          start_date?: string
          status?: string
          tenant_id?: string | null
          tenant_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_contracts_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_documents: {
        Row: {
          expires_at: string | null
          file_path: string | null
          file_size: number | null
          id: string
          metadata: Json | null
          name: string
          rejection_reason: string | null
          status: Database["public"]["Enums"]["document_status"]
          type: Database["public"]["Enums"]["document_type"]
          uploaded_at: string
          user_id: string
          validated_at: string | null
          validated_by: string | null
        }
        Insert: {
          expires_at?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          metadata?: Json | null
          name: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          type: Database["public"]["Enums"]["document_type"]
          uploaded_at?: string
          user_id: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Update: {
          expires_at?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          metadata?: Json | null
          name?: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          type?: Database["public"]["Enums"]["document_type"]
          uploaded_at?: string
          user_id?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Relationships: []
      }
      tenant_profiles: {
        Row: {
          created_at: string
          income: string | null
          profession: string | null
          searching_for: string | null
          tenant_score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          income?: string | null
          profession?: string | null
          searching_for?: string | null
          tenant_score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          income?: string | null
          profession?: string | null
          searching_for?: string | null
          tenant_score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "safe_login_attempts"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_roles_improved: {
        Row: {
          created_at: string
          id: string
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      safe_login_attempts: {
        Row: {
          attempt_time: string | null
          id: string | null
          ip_address: unknown | null
          profile_id: string | null
          user_agent: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      admin_create_user: {
        Args: {
          admin_user_id: string
          new_email: string
          new_password: string
          new_first_name: string
          new_last_name: string
          new_role: string
        }
        Returns: Json
      }
      create_verified_user: {
        Args: {
          new_email: string
          new_password: string
          new_first_name: string
          new_last_name: string
          new_role: string
        }
        Returns: Json
      }
      get_user_mfa_status: {
        Args: { user_id: string }
        Returns: Json
      }
      has_role: {
        Args:
          | { _role: Database["public"]["Enums"]["user_role"] }
          | { role_name: string }
        Returns: boolean
      }
      has_role_v2: {
        Args: { role_name: string }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_v2: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_current_user_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_login_blocked: {
        Args: {
          user_email: string
          block_duration?: unknown
          max_attempts?: number
        }
        Returns: boolean
      }
      log_activity: {
        Args: { user_id: string; action: string; metadata: Json }
        Returns: undefined
      }
      log_failed_login: {
        Args: { user_email: string; user_agent?: string }
        Returns: undefined
      }
      log_security_event: {
        Args: { event_type: string; event_details?: Json }
        Returns: undefined
      }
      update_user_mfa: {
        Args: {
          user_id: string
          is_enabled: boolean
          is_verified: boolean
          secret_key: string
        }
        Returns: undefined
      }
    }
    Enums: {
      document_status: "pending" | "approved" | "rejected" | "missing"
      document_type:
        | "ID"
        | "EMPLOYMENT"
        | "INCOME"
        | "RESIDENCE"
        | "BANK"
        | "TAX"
        | "CAF"
        | "INSURANCE"
        | "OTHER"
      user_role: "tenant" | "owner" | "manager" | "admin" | "super_admin"
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
      document_status: ["pending", "approved", "rejected", "missing"],
      document_type: [
        "ID",
        "EMPLOYMENT",
        "INCOME",
        "RESIDENCE",
        "BANK",
        "TAX",
        "CAF",
        "INSURANCE",
        "OTHER",
      ],
      user_role: ["tenant", "owner", "manager", "admin", "super_admin"],
    },
  },
} as const

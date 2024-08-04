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
      contact: {
        Row: {
          friendship_id: string
          id: string
          is_blocked: boolean | null
          is_in_veiwport: boolean | null
          name: string | null
          owner_id: string
          unseen_messages: number | null
        }
        Insert: {
          friendship_id: string
          id?: string
          is_blocked?: boolean | null
          is_in_veiwport?: boolean | null
          name?: string | null
          owner_id: string
          unseen_messages?: number | null
        }
        Update: {
          friendship_id?: string
          id?: string
          is_blocked?: boolean | null
          is_in_veiwport?: boolean | null
          name?: string | null
          owner_id?: string
          unseen_messages?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_contact_friend"
            columns: ["friendship_id"]
            isOneToOne: false
            referencedRelation: "contact_view"
            referencedColumns: ["friendship_id"]
          },
          {
            foreignKeyName: "fk_contact_friend"
            columns: ["friendship_id"]
            isOneToOne: false
            referencedRelation: "friend"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_contact_user"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "contact_view"
            referencedColumns: ["friend_id"]
          },
          {
            foreignKeyName: "fk_contact_user"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      friend: {
        Row: {
          friend_1: string
          friend_2: string
          id: string
        }
        Insert: {
          friend_1: string
          friend_2: string
          id?: string
        }
        Update: {
          friend_1?: string
          friend_2?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_friend_1"
            columns: ["friend_1"]
            isOneToOne: false
            referencedRelation: "contact_view"
            referencedColumns: ["friend_id"]
          },
          {
            foreignKeyName: "fk_friend_1"
            columns: ["friend_1"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_friend_2"
            columns: ["friend_2"]
            isOneToOne: false
            referencedRelation: "contact_view"
            referencedColumns: ["friend_id"]
          },
          {
            foreignKeyName: "fk_friend_2"
            columns: ["friend_2"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      message: {
        Row: {
          content: string
          created_at: string
          friendship_id: string
          id: string
          media_type: string | null
          owner_id: string
          viewer_id: string
        }
        Insert: {
          content: string
          created_at?: string
          friendship_id: string
          id?: string
          media_type?: string | null
          owner_id: string
          viewer_id: string
        }
        Update: {
          content?: string
          created_at?: string
          friendship_id?: string
          id?: string
          media_type?: string | null
          owner_id?: string
          viewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_friendship"
            columns: ["friendship_id"]
            isOneToOne: false
            referencedRelation: "contact_view"
            referencedColumns: ["friendship_id"]
          },
          {
            foreignKeyName: "fk_friendship"
            columns: ["friendship_id"]
            isOneToOne: false
            referencedRelation: "friend"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_owner"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "contact_view"
            referencedColumns: ["friend_id"]
          },
          {
            foreignKeyName: "fk_owner"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_viewer"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "contact_view"
            referencedColumns: ["friend_id"]
          },
          {
            foreignKeyName: "fk_viewer"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          id: string
          picture_url: string | null
          privacy_level: number
          username: string
        }
        Insert: {
          id?: string
          picture_url?: string | null
          privacy_level?: number
          username: string
        }
        Update: {
          id?: string
          picture_url?: string | null
          privacy_level?: number
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_supabase_id"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      contact_view: {
        Row: {
          contact_id: string | null
          friend_id: string | null
          friendship_id: string | null
          name: string | null
          owner_id: string | null
          picture_url: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_contact_user"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_contact_user"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "contact_view"
            referencedColumns: ["friend_id"]
          },
          {
            foreignKeyName: "fk_supabase_id"
            columns: ["friend_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_contact_friendship: {
        Args: {
          p_friend_user_id: string
          p_name: string
        }
        Returns: {
          friendship_id: string
          id: string
          is_blocked: boolean | null
          is_in_veiwport: boolean | null
          name: string | null
          owner_id: string
          unseen_messages: number | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

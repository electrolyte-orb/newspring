export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact: {
        Row: {
          friendship_id: string
          id: string
          is_blocked: boolean | null
          name: string | null
          owner_id: string
          unseen_messages: number | null
        }
        Insert: {
          friendship_id: string
          id?: string
          is_blocked?: boolean | null
          name?: string | null
          owner_id: string
          unseen_messages?: number | null
        }
        Update: {
          friendship_id?: string
          id?: string
          is_blocked?: boolean | null
          name?: string | null
          owner_id?: string
          unseen_messages?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_contact_friend"
            columns: ["friendship_id"]
            isOneToOne: true
            referencedRelation: "friend"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_contact_user"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_friend_2"
            columns: ["friend_2"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "friend"
            referencedColumns: ["id"]
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
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
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
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

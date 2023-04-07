export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          body: string
          comment_id: number | null
          id: number
          inserted_at: string
          is_removed: boolean | null
          post_id: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          body: string
          comment_id?: number | null
          id?: number
          inserted_at?: string
          is_removed?: boolean | null
          post_id?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          body?: string
          comment_id?: number | null
          id?: number
          inserted_at?: string
          is_removed?: boolean | null
          post_id?: number | null
          updated_at?: string | null
          user_id?: string
        }
      }
      communities: {
        Row: {
          description: string | null
          id: number
          inserted_at: string
          is_private: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          inserted_at?: string
          is_private?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          inserted_at?: string
          is_private?: boolean | null
          name?: string
          updated_at?: string | null
        }
      }
      community_users: {
        Row: {
          community_id: number | null
          id: number
          is_moderator: boolean | null
          user_id: string | null
        }
        Insert: {
          community_id?: number | null
          id?: number
          is_moderator?: boolean | null
          user_id?: string | null
        }
        Update: {
          community_id?: number | null
          id?: number
          is_moderator?: boolean | null
          user_id?: string | null
        }
      }
      posts: {
        Row: {
          author: string
          body: string
          community: number
          id: number
          inserted_at: string
          is_removed: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          body: string
          community: number
          id?: number
          inserted_at?: string
          is_removed?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          body?: string
          community?: number
          id?: number
          inserted_at?: string
          is_removed?: boolean | null
          title?: string
          updated_at?: string | null
        }
      }
      users: {
        Row: {
          avatar: string | null
          bio: string | null
          id: string
          inserted_at: string
          name: string
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          id: string
          inserted_at?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          id?: string
          inserted_at?: string
          name?: string
          updated_at?: string | null
        }
      }
      votes: {
        Row: {
          comment_id: number | null
          id: number
          post_id: number | null
          up_or_down: number | null
          user_id: string
        }
        Insert: {
          comment_id?: number | null
          id?: number
          post_id?: number | null
          up_or_down?: number | null
          user_id: string
        }
        Update: {
          comment_id?: number | null
          id?: number
          post_id?: number | null
          up_or_down?: number | null
          user_id?: string
        }
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

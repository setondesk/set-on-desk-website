import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ogqvvognhzubopbnskbb.supabase.co'
const supabasePublishableKey = 'sb_publishable_7feCOg_jcvUPkYf4XOO1gw_Kr-KzgNJ'

export const supabase = createClient(supabaseUrl, supabasePublishableKey)

// Database types
export interface Profile {
  id: string
  email: string
  full_name: string | null
  business_name: string | null
  country: string | null
  phone: string | null
  created_at: string
}

export interface License {
  id: string
  user_id: string
  license_key: string
  plan: string
  status: 'active' | 'trial' | 'expired' | 'revoked'
  activated_at: string | null
  expires_at: string | null
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_method: string | null
  created_at: string
}

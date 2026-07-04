import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'dirty';
export type RoomType = 'standard' | 'luxo' | 'super_luxo' | 'presidencial';
export type BookingMode = 'hotel' | 'motel';

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  status: RoomStatus;
  price_per_day: number;
  price_per_hour: number;
  unit_id: string;
}

export interface Review {
  id: string;
  booking_id: string;
  guest_id: string;
  rating: number; // 1-5
  comment: string;
  created_at: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_percentage: number;
  items: string[]; // e.g., ["hospedagem", "cafe-da-manha", "champanhe"]
  active: boolean;
}

export interface ReportData {
  occupancy_rate: number;
  total_revenue: number;
  revenue_by_type: { hourly: number; pernoite: number; consumption: number };
  cash_flow: { date: string; income: number; expense: number }[];
  consumption_performance: { item: string; quantity: number; revenue: number }[];
}

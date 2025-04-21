import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gaououtwpadqzglqlirk.supabase.co';
const supabaseAnonKey = 'your-anon-key-here'; // Replace with your actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
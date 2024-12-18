// supabase.js
const supabaseUrl = 'YOUR_SUPABASE_URL'; // Replace with your URL
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your Anon Key
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

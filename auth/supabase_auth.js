// Supabase configuration
const SUPABASE_URL = "https://tqxsznmgcalkweyzieyn.supabase.co";

// Paste YOUR publishable key between the quotes
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_abZgWq4OrgEv90Tz9zLoeA_K_tns4PR";

// Create Supabase client
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

console.log("Supabase client initialized");
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  // During Next.js build the environment variables may not be available
  // (for example when collecting page data). Avoid throwing at module
  // import time — log a warning so the build can continue. Runtime
  // operations will still fail if these values are missing.
  // Set placeholder values so `createClient` can be imported safely.
  // Make sure to set the variables in Vercel dashboard for production.
  // eslint-disable-next-line no-console
  console.warn("Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder"
);
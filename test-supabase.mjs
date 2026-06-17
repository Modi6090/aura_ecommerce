import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error("Error fetching categories:", error);
  } else {
    console.log("Categories:", data);
  }
}
test();

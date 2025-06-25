import { supabase } from '@/utils/supabase';

export default async function Notes() {
  const { data: notes, error } = await supabase.from('notes').select();
  if (error) return <div>Error: {error.message}</div>;
  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
} 
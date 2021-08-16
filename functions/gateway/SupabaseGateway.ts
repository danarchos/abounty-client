import { supabase } from "../../config/SupabaseInit";
import { definitions } from "../../types/supabase";

/* ***
 --- USER ROUTES ---
*** */

export const fetchCurrentUser = async () => {
  const currentUser = supabase.auth.user();
  const { id } = currentUser ?? {};

  const { data: user, error } = await supabase
    .from<definitions["users"]>("users")
    .select(
      `organizations (
      name
      ), belongs_to_organization, id, email, name`
    )
    .eq("id", id);

  if (error) return null;

  return user?.[0];
};

// TODO: Add other fields that can be updated on a user to this method
export const updateCurrentUser = async (name: string | null = null) => {
  console.log("--- SupabaseGateway: Performing updateCurrentUser ---");
  const user = supabase.auth.user();
  const { id } = user ?? {};

  if (!name) return;

  const { data, error } = await supabase
    .from("users")
    .update({ name })
    .eq("id", id);

  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  console.log("--- SupabaseGateway: Performing Sign Up ---");
  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { user, session, error };
};

export const signIn = async (email: string, password: string) => {
  console.log("--- SupabaseGateway: Performing Sign In ---");

  const { user, session, error } = await supabase.auth.signIn({
    provider: "twitter",
  });

  return { user, session, error };
};

export const signOut = async () => {
  console.log("--- SupabaseGateway: Performing Sign Out ---");
  const { error } = await supabase.auth.signOut();

  return error;
};

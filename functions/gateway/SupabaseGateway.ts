import { supabase } from "../../config/SupabaseInit";
import { definitions } from "../../types/supabase";

export const fetchCurrentUser = async () => {
  const currentUser = supabase.auth.user();
  const { id } = currentUser ?? {};

  try {
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
  } catch (error) {
    console.log({ error });
  }
};

export const updateCurrentUser = async (name: string | null = null) => {
  const user = supabase.auth.user();
  const { id } = user ?? {};

  if (!name) return;

  try {
    const { data, error } = await supabase
      .from("users")
      .update({ name })
      .eq("id", id);

    return { data, error };
  } catch (error) {
    console.log({ error });
  }
};

export const signIn = async () => {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "twitter",
    });
    return { user, session, error };
  } catch (error) {
    console.log({ error });
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return error;
  } catch (error) {
    console.log({ error });
  }
};

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function GetPatients(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("patients")
      .select(`*, user_id(email)`)
      .order("created_at", { ascending: false })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("name", `%${searchQuery}%`)
      : await query;

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function DeletePatient(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("patients").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/patients");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalPatients() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return 0;
    }

    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

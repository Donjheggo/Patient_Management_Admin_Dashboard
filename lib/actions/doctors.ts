"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function GetDoctors(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("doctors")
      .select("*")
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

export async function CreateDoctor(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("doctors")
      .insert({
        name: formData.get("name"),
        specialization: formData.get("specialization"),
      })
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/doctors");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetDoctorById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return false;
    }
    return data;
  } catch (error) {
    return false;
  }
}

export async function UpdateDoctor(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("doctors")
      .update({
        name: formData.get("name"),
        specialization: formData.get("specialization"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/doctors");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteDoctor(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("doctors").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/doctors");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalDoctors() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("doctors")
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

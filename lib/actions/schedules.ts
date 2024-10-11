"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function GetSchedules(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("doctor_schedules")
      .select(`*, doctor_id(name)`)
      .order("created_at", { ascending: false })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("doctor_id.name", `%${searchQuery}%`)
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

export async function CreateSchedule(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("doctor_schedules")
      .insert({
        doctor_id: formData.get("doctor_id"),
        start_time: formData.get("start_time"),
        end_time: formData.get("end_time"),
        available: formData.get("available"),
      })
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/schedules");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetScheduleById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("doctor_schedules")
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

export async function UpdateSchedule(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("doctor_schedules")
      .update({
        doctor_id: formData.get("doctor_id"),
        start_time: formData.get("start_time"),
        end_time: formData.get("end_time"),
        available: formData.get("available"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/schedules");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteSchedule(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("doctor_schedules")
      .delete()
      .eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/schedules");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalSchedules() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("doctor_schedules")
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

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function GetAppointments(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("appointments")
      .select(
        `*, patient_id(name), doctor_id(name), schedule_id(start_time,end_time)`
      )
      .order("created_at", { ascending: false })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("patient_id.name", `%${searchQuery}%`)
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

export async function GetAppointmentById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("appointments")
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

export async function UpdateAppointment(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("appointments")
      .update({
        status: formData.get("status"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteAppointment(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("appointments").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalAppointment() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("appointments")
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

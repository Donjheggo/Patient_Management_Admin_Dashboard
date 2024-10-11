"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { UpdateSchedule } from "@/lib/actions/schedules";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";
import { GetAllDoctors } from "@/lib/actions/doctors";

export default function UpdateScheduleForm({ item }: { item: SchedulesT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<DoctorsT[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await GetAllDoctors();
      if (data) setDoctors(data);
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("doctor_id") ||
      !formData.get("start_time") ||
      !formData.get("end_time") ||
      !formData.get("available")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await UpdateSchedule(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/schedules");
    } catch (error) {
      toast.error("There was an unexpected error updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mt-5 container max-w-screen-sm mx-auto">
        <div className="grid gap-2">
          <Label htmlFor="name">Doctor</Label>
          <input
            name="id"
            id="id"
            type="text"
            placeholder=""
            required
            defaultValue={item.id}
            hidden
          />
          <Select name="doctor_id" defaultValue={item.doctor_id}>
            <SelectTrigger>
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {doctors.map((item, index) => (
                  <SelectItem key={index} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="start_time">Start time</Label>
          <Input
            name="start_time"
            id="start_time"
            type="datetime-local"
            placeholder=""
            defaultValue={new Date(item.start_time).toISOString().slice(0, 16)}
            className="col-span-3"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="end_time">End time</Label>
          <Input
            name="end_time"
            id="end_time"
            type="datetime-local"
            placeholder=""
            defaultValue={new Date(item.end_time).toISOString().slice(0, 16)}
            className="col-span-3"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="available">Availability</Label>
          <Select name="available" defaultValue={String(item.available)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="true">Available</SelectItem>
                <SelectItem value="false">Unavailable</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export type DoctorsT = Tables<"doctors">;
export type SchedulesT = Tables<"doctor_schedules">;

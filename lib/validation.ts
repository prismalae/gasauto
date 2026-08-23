import { z } from "zod";

/** Shared between the client form and the server action. */
export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(24)
    .regex(/^[+0-9()\-\s]+$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(120).or(z.literal("")),
  brand: z.string().trim().min(1, "Please choose your car brand").max(60),
  model: z.string().trim().max(60).optional().default(""),
  year: z.string().trim().max(10).optional().default(""),
  service: z.string().trim().min(1, "Please choose a service").max(80),
  area: z.string().trim().min(1, "Please tell us your pickup area").max(80),
  date: z.string().trim().max(30).optional().default(""),
  message: z.string().trim().max(1200).optional().default(""),
  /** Honeypot — must stay empty. Real users never see this field. */
  website: z.string().max(0).optional().default(""),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export type BookingState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> }
  | { status: "unconfigured"; message: string };

"use server";

import { Resend } from "resend";

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string;
    email?: string;
    messageField?: string;
  };
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const message = formData.get("message") as string | null;

  // Validation
  const errors: ContactFormState["errors"] = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message || message.trim().length < 10) {
    errors.messageField = "Message must be at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below.", errors };
  }

  try {
    await resend.emails.send({
      from: "The Bot Company <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "official@thebotcompany.in",
      subject: `New contact from ${name!.trim()}`,
      replyTo: email!.trim(),
      text: `Name: ${name!.trim()}\nEmail: ${email!.trim()}\n\nMessage:\n${message!.trim()}`,
    });

    return {
      success: true,
      message: "Message sent! We'll get back to you soon.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again or email us directly.",
    };
  }
}

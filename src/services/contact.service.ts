export interface ContactMessage {
  name: string;
  email?: string;
  phone: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(data: ContactMessage): Promise<ContactResponse> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Contact form submission failed");
  }

  return response.json();
}

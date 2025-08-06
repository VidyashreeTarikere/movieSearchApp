import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

console.log(`Function "email" up and running!`);

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
console.log("RESEND_API_KEY loaded:", !!RESEND_API_KEY);

serve(async (request: Request): Promise<Response> => {
  console.log("Request received");

  try {
    const { email, message }: { email: string; message: string } = await request.json();
    console.log("Payload:", { email, message });

    if (!email?.length) {
      console.error("No email provided");
      return new Response(JSON.stringify({ error: "No email provided" }), { status: 400 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Vidyashree <tvvidyashree@gmail.com>",
        to: email,
        subject: "Thank you for contacting us!!",
        html: `
          <div>
            <p>Hi ${email},</p>
            <p>We received your message: ${message}</p>
            <p>We will get back to you shortly</p>
          </div>
        `,
      }),
    });

    console.log("Resend API response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend API error:", errorText);
      return new Response(JSON.stringify({ error: "An error occurred sending email", details: errorText }), { status: 500 });
    }

    const data = await res.json();
    console.log("Resend API response data:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Error caught in function:", error);
    return new Response(JSON.stringify({ error: error?.message }), { status: 500 });
  }
});

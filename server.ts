import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending emails
  app.post("/api/contact", async (req, res) => {
    const { name, email, type, message } = req.body;
    console.log(`Received contact request from ${email}`);

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing from environment variables");
      return res.status(500).json({ 
        error: "Email service not configured. Please add RESEND_API_KEY to the project settings." 
      });
    }

    try {
      const resend = new Resend(apiKey);
      console.log("Attempting to send email via Resend...");
      
      const { data, error } = await resend.emails.send({
        from: 'Lead Builder <onboarding@resend.dev>',
        to: [process.env.CONTACT_RECEIVER_EMAIL || 'mathefael@gmail.com'],
        subject: `New Project: ${type} from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
            <div style="background: #000; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #fff; margin: 0; font-style: italic;">New Project Inquiry</h2>
            </div>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project Type:</strong> ${type}</p>
            <div style="margin: 20px 0; padding: 20px; background: #f9f9f9; border-left: 4px solid #000; border-radius: 4px;">
              <p style="margin-top: 0;"><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; color: #555;">${message}</p>
            </div>
            <p style="font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-top: 40px;">Received via Lead Builder Website</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend API Error:", error);
        return res.status(error.statusCode || 400).json({ error: error.message || "Failed to send email via Resend" });
      }

      console.log("Email sent successfully:", data?.id);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error("Internal Server Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred on the server" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

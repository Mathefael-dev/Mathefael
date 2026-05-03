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
        reply_to: email,
        subject: `New Project: ${type} from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 40px; color: #1a1a1a; line-height: 1.6; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="background: #000000; padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-style: italic; letter-spacing: 1px;">Lead Builder</h1>
              </div>
              <div style="padding: 40px;">
                <h2 style="margin-top: 0; color: #000; font-size: 20px;">New Project Inquiry</h2>
                <p style="color: #666; margin-bottom: 30px;">You've received a new message through your website contact form.</p>
                
                <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
                  <p style="margin: 0 0 10px 0;"><strong>Client:</strong> ${name}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #000; text-decoration: underline;">${email}</a></p>
                  <p style="margin: 0;"><strong>Project Type:</strong> ${type}</p>
                </div>

                <div style="border-left: 4px solid #000; padding: 20px; background-color: #fff; margin-bottom: 30px;">
                  <p style="margin-top: 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #999;">Message</p>
                  <p style="white-space: pre-wrap; margin: 0; font-size: 16px;">${message}</p>
                </div>

                <a href="mailto:${email}" style="display: inline-block; background-color: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply to Client</a>
              </div>
              <div style="background-color: #000; padding: 20px; text-align: center;">
                <p style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 2px; margin: 0;">System Notification • Lead Builder Portfolio</p>
              </div>
            </div>
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

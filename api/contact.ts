import { Resend } from 'resend';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, type, message } = req.body;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
      error: "RESEND_API_KEY is missing. Please add it to your Vercel Environment Variables." 
    });
  }

  try {
    const resend = new Resend(apiKey);
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
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

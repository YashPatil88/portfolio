import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

async function sendSendGridMail(apiKey: string, payload: any) {
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SendGrid error ${res.status}: ${text}`);
  }
  return res;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const sender = process.env.SENDGRID_SENDER || `no-reply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'example.com'}`;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || 'yashspatil4779@gmail.com';

    if (!SENDGRID_API_KEY) {
      // Fallback: save submission locally to `data/contacts.json` so nothing is lost during development
      try {
        const dataDir = path.join(process.cwd(), 'data');
        await fs.mkdir(dataDir, { recursive: true });
        const filePath = path.join(dataDir, 'contacts.json');
        let arr: any[] = [];
        try {
          const existing = await fs.readFile(filePath, 'utf8');
          arr = JSON.parse(existing || '[]');
        } catch (e) {
          // file may not exist or be invalid; start fresh
          arr = [];
        }
        arr.push({ name, email, message, receivedAt: new Date().toISOString(), savedLocally: true });
        await fs.writeFile(filePath, JSON.stringify(arr, null, 2), 'utf8');
        console.warn('SENDGRID_API_KEY not configured — saved contact to data/contacts.json');
        return NextResponse.json({ ok: true, saved: 'local' });
      } catch (fsErr) {
        console.error('Failed to save contact locally', fsErr);
        return NextResponse.json({ error: 'Email provider not configured and local save failed' }, { status: 500 });
      }
    }

    const payload = {
      personalizations: [
        {
          to: [{ email: receiver }],
        },
      ],
      from: { email: sender },
      reply_to: { email },
      subject: `Portfolio contact from ${name}`,
      content: [
        { type: 'text/plain', value: `Name: ${name}\nEmail: ${email}\n\n${message}` },
        { type: 'text/html', value: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><div>${message}</div>` },
      ],
    };

    await sendSendGridMail(SENDGRID_API_KEY, payload);

    // Optional autoresponder
    if (process.env.SENDGRID_AUTOREPLY === '1') {
      try {
        const replyPayload = {
          personalizations: [
            {
              to: [{ email }],
            },
          ],
          from: { email: sender },
          subject: `Thanks for contacting ${process.env.NEXT_PUBLIC_OWNER_NAME || 'me'}`,
          content: [
            { type: 'text/plain', value: `Thanks ${name},\n\nI received your message and will get back to you shortly.\n\n— ${process.env.NEXT_PUBLIC_OWNER_NAME || ''}` },
          ],
        };
        await sendSendGridMail(SENDGRID_API_KEY, replyPayload);
      } catch (err) {
        console.warn('Autoreply failed', err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact API error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

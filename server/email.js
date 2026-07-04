import nodemailer from 'nodemailer';

let transporter;

function getSmtpUser() {
  return process.env.SMTP_USER;
}

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = getSmtpUser();
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    tls: {
      minVersion: 'TLSv1.2'
    }
  });

  return transporter;
}

async function sendViaResend({ to, subject, text, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'Portfolio Tracker <onboarding@resend.dev>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from, to: [to], subject, text, html })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || `Resend error (${response.status})`);
  }

  console.log(`Email sent via Resend to ${to} (id: ${payload.id})`);
  return { sent: true, provider: 'resend', id: payload.id };
}

async function sendViaSmtp({ to, subject, text, html, company }) {
  const smtpUser = getSmtpUser();
  const fromAddress = process.env.EMAIL_FROM || smtpUser;
  const transport = getTransporter();

  if (!transport) {
    console.warn('Email not configured — skipping notification for', company);
    return { sent: false, reason: 'Email not configured' };
  }

  const info = await transport.sendMail({
    from: `"Portfolio Tracker" <${fromAddress}>`,
    to,
    envelope: { from: smtpUser, to },
    subject,
    text,
    html
  });

  console.log(`Email sent via SMTP to ${to} (${info.messageId})`);
  return { sent: true, provider: 'smtp', messageId: info.messageId };
}

export async function sendPortfolioOpenEmail({ company, slug, clickedAt, userAgent }) {
  const to = process.env.NOTIFY_EMAIL;

  if (!to) {
    console.warn('NOTIFY_EMAIL not set — skipping notification for', company);
    return { sent: false, reason: 'NOTIFY_EMAIL not set' };
  }

  const time = clickedAt.toLocaleString('en-GB', { timeZone: 'Europe/Berlin' });
  const subject = `Portfolio opened by ${company}`;
  const text = [
    `Your portfolio was opened by ${company}.`,
    '',
    `Time: ${time}`,
    `Link ID: ${slug}`,
    userAgent ? `Device: ${userAgent}` : null
  ].filter(Boolean).join('\n');

  const html = `
    <p>Your portfolio was opened by <strong>${company}</strong>.</p>
    <p><strong>Time:</strong> ${time}</p>
    <p><strong>Link ID:</strong> ${slug}</p>
    ${userAgent ? `<p><strong>Device:</strong> ${userAgent}</p>` : ''}
  `;

  const payload = { to, subject, text, html, company };

  try {
    if (process.env.RESEND_API_KEY) {
      return await sendViaResend(payload);
    }
    return await sendViaSmtp(payload);
  } catch (error) {
    console.error('Email send failed:', error.message);
    if (error.code) console.error('SMTP code:', error.code);
    throw error;
  }
}

export function getEmailProvider() {
  if (process.env.RESEND_API_KEY) return 'resend';
  if (getTransporter()) return 'smtp';
  return 'none';
}

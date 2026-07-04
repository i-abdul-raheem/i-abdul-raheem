import nodemailer from 'nodemailer';

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  return transporter;
}

export async function sendPortfolioOpenEmail({ company, slug, clickedAt, userAgent }) {
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const transport = getTransporter();

  if (!to || !transport) {
    console.warn('Email not configured — skipping notification for', company);
    return { sent: false, reason: 'Email not configured' };
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

  await transport.sendMail({
    from,
    to,
    subject,
    text,
    html: `
      <p>Your portfolio was opened by <strong>${company}</strong>.</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Link ID:</strong> ${slug}</p>
      ${userAgent ? `<p><strong>Device:</strong> ${userAgent}</p>` : ''}
    `
  });

  return { sent: true };
}

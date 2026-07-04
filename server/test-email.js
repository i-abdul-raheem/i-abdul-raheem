import './loadEnv.js';
import { sendPortfolioOpenEmail, getEmailProvider } from './email.js';

const verbose = process.argv.includes('--verbose');

console.log('Email provider:', getEmailProvider());
console.log('NOTIFY_EMAIL:', process.env.NOTIFY_EMAIL || '(not set)');

if (getEmailProvider() === 'smtp') {
  console.log('SMTP host:', process.env.SMTP_HOST);
  console.log('');
  console.log('Note: SMTP "250 OK" only means your mail server accepted the message.');
  console.log('Gmail often blocks mail from custom domains without SPF/DKIM/DMARC.');
  console.log('If nothing arrives, check spam or use RESEND_API_KEY / Gmail SMTP.');
  console.log('Run with --verbose for full SMTP debug.\n');
}

if (getEmailProvider() === 'none') {
  console.error('No email provider configured.');
  console.error('Set RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS in .env');
  process.exit(1);
}

if (verbose && getEmailProvider() === 'smtp') {
  const nodemailer = await import('nodemailer');
  // Re-import with debug — test only
  process.env.NODEMAILER_DEBUG = '1';
}

try {
  const result = await sendPortfolioOpenEmail({
    company: 'Test Company',
    slug: 'test123',
    clickedAt: new Date(),
    userAgent: 'test-script'
  });
  console.log('Result:', result);
  console.log('\nCheck inbox AND spam for:', process.env.NOTIFY_EMAIL);
} catch (error) {
  console.error('Failed:', error.message);
  process.exit(1);
}

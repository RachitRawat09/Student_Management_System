const nodemailer = require('nodemailer');

function createTransport() {
  // Encapsulate nodemailer transport; prefers EMAIL_USER/EMAIL_PASS from env
  if (process.env.NODEMAILER_TRANSPORT === 'sendmail') {
    return nodemailer.createTransport({ sendmail: true, newline: 'unix', path: '/usr/sbin/sendmail' });
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendAdmissionApprovalEmail({ toEmail, firstName, password, portalUrl }) {
  const transporter = createTransport();
  const mailOptions = {
    from: `Admissions <${process.env.EMAIL_USER || 'no-reply@example.com'}>`,
    to: toEmail,
    subject: 'Your Admission is Approved - Portal Credentials',
    html: `
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
        <p>Dear ${firstName || 'Student'},</p>
        <p>Your admission has been approved. You can now log in to the student portal:</p>
        <ul>
          <li><b>Portal</b>: ${portalUrl || 'http://localhost:5173'}</li>
          <li><b>Email</b>: ${toEmail}</li>
          <li><b>Temporary Password</b>: <code>${password}</code></li>
        </ul>
        <p>Please change your password after first login.</p>
        <p>Regards,<br/>Admissions Office</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendAdmissionApprovalEmail,
};




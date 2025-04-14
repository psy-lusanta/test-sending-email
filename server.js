const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'litexpress.com.ph', // e.g. mail.example.com
    port: 465,
    secure: true,
    auth: {
      user: 'c_lusanta.partners@litexpress.com.ph',     // your cPanel email
      pass: 'Password123$$##'       // your cPanel email password
    }
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'infotech@litexpress.com.ph', // Your own email to receive the message
      subject: `New message from ${name}`,
      text: message
    });
    res.send('✅ Email sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('❌ Failed to send email.');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

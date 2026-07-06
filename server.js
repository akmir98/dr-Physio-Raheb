require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Improved transporter with timeout and debug
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    pool: true,
    maxConnections: 5,
    maxMessages: 100,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },

    logger: true,
    debug: true
});
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Improved contact endpoint
app.post("/contact-message", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
        return res.status(400).json({
            message: "Name, email and message are required"
        });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Contact Message",
        text: `
New Contact Request

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject || 'No subject'}
Message: ${message}
        `
    };

    const patientMail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for contacting Dr Physio Rehab",
        html: `
            <h2>Thank You!</h2>
            <p>Dear <strong>${name}</strong>,</p>
            <p>We have received your request successfully.</p>
            <p>Our physiotherapy team will contact you as soon as possible.</p>
            <br>
            <p>Regards,</p>
            <h3>Dr Physio Rehab</h3>
            <p>Islamabad, Pakistan</p>
        `
    };
try {
    console.time("Email Sending");

    await Promise.all([
        transporter.sendMail(mailOptions),
        transporter.sendMail(patientMail)
    ]);

    console.timeEnd("Email Sending");

    res.json({
        message: "Contact message sent successfully"
    });

} catch (error) {
    console.error(error);
}
});
transporter.verify((err, success) => {
    if (err) {
        console.log(err);
    } else {
        console.log("SMTP Ready");
    }
});
// Service endpoint (improved)
app.post("/service-request", async (req, res) => {
    const { name, email, phone, issues } = req.body;

    if (!name || !email || !issues) {
        return res.status(400).json({
            message: "Name, email and issues are required"
        });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Service Request",
        text: `
New Patient Request

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Problem: ${issues}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({
            message: "Request sent successfully"
        });
    } catch (error) {
        console.error("Service email error:", error);
        res.status(500).json({
            message: "Email failed: " + error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
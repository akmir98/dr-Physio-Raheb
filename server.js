require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP Error:", error);
    } else {
        console.log("SMTP Server is ready");
    }
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});



app.post("/contact-message", async (req, res) => {

    const { name, email, phone, subject, message } = req.body;
if (!name || !email || !message) {
    return res.status(400).json({
        message: "Please fill in all required fields."
    });
}
    try {

        // Email to clinic
        const clinic = await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: [
        process.env.CEO_EMAIL,
        process.env.RECEPTION_EMAIL
    ],

    subject: "New Contact Message",

    text: `
New Contact Request

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:

${message}
`

});// Auto reply
const patientResult = await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: email,

    subject: "Thank you for contacting Dr Physio Rehab",

    html: `
<h2>Thank You!</h2>

<p>Dear <strong>${name}</strong>,</p>

<p>We have received your request successfully.</p>

<p>Our team will contact you soon.</p>

<h3>Dr Physio Rehab</h3>
`

});
        res.json({

            message: "Message sent successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

});
app.post("/service-request", async (req, res) => {

 
const { name, email, phone, issues } = req.body;

if (!name || !email || !issues) {
    return res.status(400).json({
        message: "Please fill in all required fields."
    });
}
    try {

await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: [
        process.env.CEO_EMAIL,
        process.env.RECEPTION_EMAIL
    ],

    subject: "New Service Request",

    text: `
New Patient Request

Name: ${name}
Email: ${email}
Phone: ${phone}

Problem:

${issues}
`

});
        res.json({

            message: "Request sent successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

});
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
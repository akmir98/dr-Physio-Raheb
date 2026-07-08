require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

const resend = new Resend(process.env.RESEND_API_KEY);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));


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
        await resend.emails.send({

            from: "onboarding@resend.dev",

            to: process.env.EMAIL_USER,

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
        });

        // Auto reply
        await resend.emails.send({

            from: "onboarding@resend.dev",

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

        await resend.emails.send({

            from: "onboarding@resend.dev",

            to: process.env.EMAIL_USER,

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
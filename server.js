require("dotenv").config()
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors());

app.use(express.json());
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Serve your HTML, CSS, JS, images
app.use(express.static(__dirname));


// Test page
app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");

});

app.post("/contact-message", async(req,res)=>{

    const {
        name,
        email,
        phone,
        subject,
        message
    } = req.body;


    const mailOptions = {

        from: process.env.EMAIL_USER,

        to: process.env.EMAIL_USER,

        subject: "New Contact Message",

        text: `

New Contact Request


Name:
${name}


Email:
${email}


Phone:
${phone}


Subject:
${subject}


Message:
${message}

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

    console.log("Customer email:", email);

    await Promise.all([
        transporter.sendMail(mailOptions),
        transporter.sendMail(patientMail)
    ]);

    console.log("Emails sent successfully");

    res.json({
        message: "Contact message sent successfully"
    });

}
catch (error) {

    console.log(error);

    res.status(500).json({
        message: "Email failed"
    });

}


});
// Service form
app.post("/service-request", async(req,res)=>{


const {

name,
email,
phone,
issues

} = req.body;



const mailOptions = {

from:process.env.EMAIL_USER,

to:process.env.EMAIL_USER,

subject:"New Service Request",

text:`

New Patient Request


Name:
${name}


Email:
${email}


Phone:
${phone}


Problem:
${issues}

`

};



try{


await transporter.sendMail(mailOptions);



res.json({

message:"Request sent successfully"

});


}

catch(error){


console.log(error);


res.status(500).json({

message:"Email failed"

});


}



});
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com", // Replace with your SMTP server
        port: 465, // or 587
        secure: true, // true for 465, false for 587
        auth: {
            user: "registrations@ibacarnivalx.com", // Your email
            pass: "Saffaa12.", // Use an App Password
        },
    });

    const mailOptions = {
        from: "registrations@ibacarnivalx.com",
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Email sent successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "236camnguyen@gmail.com",
    pass: "ipyapfnblxujnonf",
  },
});

exports.sendEmail = (req, res) => {
  const mailOptions = {
    from: "236camnguyen@gmail.com",
    to: req.body.email,
    subject: req.body.subject,
    html: "<h1>Welcome</h1><p>That was easy!</p>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.sendStatus(200);
    }
  });
};

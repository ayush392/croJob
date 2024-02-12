const cron = require("node-cron");
const nodemailer = require("nodemailer");
const userModel = require("./models/userModel");
const messageModel = require("./models/messageModel");
const postModel = require("./models/postsModel");

const sendMailToAllUsers = async (emailArr) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: "nextChat",
    to: emailArr,
    subject: "Testing",
    text: "Hello there, how are you?",
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log("mail sent to", info.response);
  });
};

const tryJob = () => {
  cron.schedule("* * * * * *", function () {
    console.log("running");
  });
};

// send mail to users
const scheduleMail = () => {
  try {
    cron.schedule("*/10 * * * * *", async () => {
      const res = await userModel.find({}).select("email");
      // console.log(res);
      const mailArr = [];
      res.map((data) => mailArr.push(data.email));

      if (mailArr.length > 0) sendMailToAllUsers(mailArr);
    });
  } catch (error) {
    console.log(error);
  }
};

//databse cleanup
const scheduleDeleteChats = () => {
  try {
    cron.schedule("*/10 * * * * *", async () => {
      const res = await messageModel.deleteMany({
        createdAt: { $lte: "2024-02-02T08:38:14.012+00:00" },
      });
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

// Publish Updates
const schedulePosts = () => {
  try {
    cron.schedule("*/10 * * * * *", async () => {
      const res = await postModel.updateMany(
        { status: "pending" },
        { status: "published" }
      );
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { tryJob, scheduleMail, scheduleDeleteChats, schedulePosts };

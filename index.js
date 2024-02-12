require("dotenv").config();
const express = require("express");
const dbConnect = require("./db/dbConnect");
const {
  tryJob,
  scheduleMail,
  scheduleDeleteChats,
  schedulePosts,
} = require("./cron");

const app = express();

dbConnect();

app.use(express.json());

// tryJob();
// scheduleMail();
// scheduleDeleteChats();
schedulePosts();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, function () {
  console.log("Server started at " + port);
});

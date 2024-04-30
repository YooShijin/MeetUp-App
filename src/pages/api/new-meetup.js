// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// /api/new-meetup

const mongoose = require("mongoose");
const dbURL =
  "mongodb+srv://username:password@cluster0.qv1o2xw.mongodb.net/meetups";

mongoose.connect(dbURL);

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
export const Meetup =
  mongoose.models.meetups || mongoose.model("meetups", schema);

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const newMeetup = await Meetup.create(data);
    console.log(newMeetup);
    res.json("Meetup created successfully");
  }
}

export default handler;

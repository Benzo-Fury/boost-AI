import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  previousQAA:{
    type: String,
    required: false
  }
});

export default mongoose.model("Conversations", conversationSchema);

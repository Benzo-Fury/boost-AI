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
});

export default mongoose.model("Conversations", conversationSchema);

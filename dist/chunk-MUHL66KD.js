// src/schemas/conversationSchema.ts
import mongoose from "mongoose";
var conversationSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  }
});
var conversationSchema_default = mongoose.model("Conversations", conversationSchema);

export {
  conversationSchema_default
};

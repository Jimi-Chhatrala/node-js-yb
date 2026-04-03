import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    mobile: String,
    address: String,
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

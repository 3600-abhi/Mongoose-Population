/**
 * we are using the population while fetching the students
 */

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { PORT, MONGODB_URI } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, async function () {
  console.log(`Successfully started the server at PORT : ${PORT}`);
  await mongoose.connect(MONGODB_URI);
  console.log('Successfully connected with MongoDB');
});


const studentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  }
});

const Student = new mongoose.model('Student', studentSchema);

const branchSchema = new mongoose.Schema({
  name: {
    type: String
  },
  subjects: [{ type: String }]
});

const Branch = new mongoose.model('Branch', branchSchema);

// jis field ki poori documents chahiye us field ka name populate fn me paas kr denge
// for example :  popluate('branchId')
const student = await Student.findOne({ _id: '64a26af8c6fce02fb1617540' }).populate('branchId').exec();

console.log('student = ', student);

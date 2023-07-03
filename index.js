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

app.post('/students', async function (req, res) {
  try {
    const student = await Student.create({
      name: req.body.name,
      branchId: req.body.branchId
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully created a student',
      data: student,
      error: {}
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: {},
      error: error
    });
  }
});

app.get('/students/:id', async function (req, res) {
  try {
    const student = await Student.find({ _id: req.params.id }).populate('branchId').exec();

    return res.status(200).json({
      success: true,
      message: 'Successfully created a student',
      data: student,
      error: {}
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: {},
      error: {}
    });
  }
});




const branchSchema = new mongoose.Schema({
  name: {
    type: String
  },
  subjects: [{ type: String }]
});

const Branch = new mongoose.model('Branch', branchSchema);

app.post('/branches', async function (req, res) {
  try {
    const branch = await Branch.create({
      name: req.body.name,
      subjects: req.body.subjects
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully created a student',
      data: branch,
      error: {}
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: {},
      error: error
    });
  }
});

app.get('/branches/:id', async function (req, res) {
  try {
    const branch = await Branch.find({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: 'Successfully created a student',
      data: branch,
      error: {}
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: {},
      error: error
    });
  }
});

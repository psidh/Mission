import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
  missions: [
    {
      title: {
        type: String,
        required: [true, 'Please provide a title'],
        unique: true,
      },
      description: {
        type: String,
        required: [true, 'Please provide a description'],
      },
      deadline: {
        type: Date,
        required: [true, 'Please provide a deadline'],
      },
      isDone: {
        type: Boolean,
        default: false,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
});

const Mission = mongoose.models.mission || mongoose.model('missions', missionSchema);

export default Mission;

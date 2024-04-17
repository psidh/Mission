import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    deadline: {
        type: Date,
        required: [true, "Please provide a deadline"],
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Training = mongoose.models.trainings || mongoose.model("trainings", trainingSchema);

export default Training;

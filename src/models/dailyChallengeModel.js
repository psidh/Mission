import mongoose from "mongoose";

const dailyChallengeSchema = new mongoose.Schema({
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

const DailyChallenge = mongoose.models.dailychallenges || mongoose.model("dailychallenges", dailyChallengeSchema);

export default DailyChallenge;

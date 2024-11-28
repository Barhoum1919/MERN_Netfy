import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    thumbNail:{type: String, required: true},
    videoUrl: { type: String, required: true },

});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;

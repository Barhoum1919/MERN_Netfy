import express from 'express';
import Movie from '../models/movieModel.js';

const router = express.Router();

// Create a new Movie
router.post('/', async (req, res) => {
    try {
        const { title, description, genre, releaseYear,thumbNail, videoUrl } = req.body;

        if (!title || !description || !genre || !releaseYear ||!thumbNail || !videoUrl) {
            return res.status(400).json({
                message: 'Send all required fields: title, description, genre, releaseYear, videoUrl',
            });
        }

        const movie = await Movie.create({ title, description, genre, releaseYear,thumbNail, videoUrl });

        return res.status(201).json(movie);
    } catch (error) {
        console.error("Error creating movie:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Get all Movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({});

        return res.status(200).json({
            count: movies.length,
            data: movies,
        });
    } catch (error) {
        console.error("Error fetching movies:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Get a single Movie by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json(movie);
    } catch (error) {
        console.error("Error fetching movie:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Update a Movie
router.put('/:id', async (req, res) => {
    try {
        const { title, description, genre, releaseYear, videoUrl } = req.body;

        if (!title || !description || !genre || !releaseYear || !videoUrl) {
            return res.status(400).json({
                message: 'Send all required fields: title, description, genre, releaseYear, videoUrl',
            });
        }

        const { id } = req.params;

        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ message: 'Movie updated successfully', data: updatedMovie });
    } catch (error) {
        console.error("Error updating movie:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Delete a Movie
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMovie = await Movie.findByIdAndDelete(id);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error("Error deleting movie:", error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;

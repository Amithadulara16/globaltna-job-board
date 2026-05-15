const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// 1. සියලුම රැකියා ලබා ගැනීම (Filters සමඟ)
router.get('/', async (req, res) => {
    try {
        const { category, status } = req.query;
        let filter = {};
        if (category) filter.category = category;
        if (status) filter.status = status;

        const jobs = await JobRequest.find(filter).sort({ createdAt: -1 }); // අලුත්ම ඒවා උඩට එන ලෙස
        res.json(jobs);
    } catch (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).json({ error: "දත්ත ලබා ගැනීමේ දෝෂයක්!" });
    }
});

// 2. ID එක මගින් රැකියාවක විස්තර ලබා ගැනීම
router.get('/:id', async (req, res) => {
    try {
        console.log("Fetching Job ID:", req.params.id); // Debugging සඳහා
        const job = await JobRequest.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({ message: "එම ID එක සහිත රැකියාව සොයාගත නොහැක." });
        }
        res.json(job);
    } catch (err) {
        console.error("Error fetching job by ID:", err);
        res.status(500).json({ error: "ID එක පරීක්ෂා කිරීමේදී දෝෂයක් ඇති විය." });
    }
});

// 3. අලුත් රැකියාවක් ඇතුළත් කිරීම
router.post('/', async (req, res) => {
    try {
        const newJob = new JobRequest(req.body);
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. රැකියාවක තත්ත්වය (Status) වෙනස් කිරීම
router.patch('/:id', async (req, res) => {
    try {
        const updatedJob = await JobRequest.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. රැකියාවක් මකා දැමීම
router.delete('/:id', async (req, res) => {
    try {
        await JobRequest.findByIdAndDelete(req.params.id);
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
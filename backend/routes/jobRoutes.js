const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

//all job requests related routes
router.get('/', async (req, res) => {
    try {
        const { category, status } = req.query;
        let filter = {};
        if (category) filter.category = category;
        if (status) filter.status = status;

        const jobs = await JobRequest.find(filter).sort({ createdAt: -1 }); 
        res.json(jobs);
    } catch (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).json({ error: "Error fetching jobs" });
    }
});

//id update
router.get('/:id', async (req, res) => {
    try {
        console.log("Fetching Job ID:", req.params.id); // Debugging 
        const job = await JobRequest.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json(job);
    } catch (err) {
        console.error("Error fetching job by ID:", err);
        res.status(500).json({ error: "Error fetching job by ID" });
    }
});

//create job
router.post('/', async (req, res) => {
    try {
        const newJob = new JobRequest(req.body);
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//status update
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

//delete job
router.delete('/:id', async (req, res) => {
    try {
        await JobRequest.findByIdAndDelete(req.params.id);
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
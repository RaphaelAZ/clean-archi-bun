
import express from "express";

const router = express.Router();

router.post("/list", (req, res) => {
    res.status(200).json({ message: "List of members" });
})

router.post("/add", (req, res) => {
    res.status(200).json({ message: "Member added" });
})

export default router;
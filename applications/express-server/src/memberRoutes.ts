import { MemberController } from 'adapters';

import express from "express";

function generateMemberRoutes(memberController: MemberController) {
    const router = express.Router();
    router.get("/list", async (req, res) => {
        const members = await memberController.getAll();
        res.status(200).json({ message: "List of members", members: members });
    });
    router.post("/add", async (req, res) => {
        const { name, email } = req.body;
        await memberController.save(name, email);
        res.status(200).json({ message: "Member added" });
    });
    return router;
}

export default generateMemberRoutes;
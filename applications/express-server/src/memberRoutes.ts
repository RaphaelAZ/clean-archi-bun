import { MemberController } from 'adapters';

import express from "express";

function generateMemberRoutes(memberController: MemberController) {
    const router = express.Router();
    router.post("/list", (req, res) => {
        const members = memberController.getAll();
        res.status(200).json({ message: "List of members", members });
    });
    router.post("/add", (req, res) => {
        const { name, email } = req.body;
        memberController.save(name, email);
        res.status(200).json({ message: "Member added" });
    });
    return router;
}

export default generateMemberRoutes;
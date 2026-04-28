import express from "express";
import memberRoutes from "../src/memberRoutes";
import { MemberController } from "adapters";
import { MemberUseCase, type MemberRepository } from "core";

function generateServer(
	memberRepository: MemberRepository,
) {
	const memberUseCase = new MemberUseCase(memberRepository);
	const memberController = new MemberController(memberUseCase);
	const app = express();
	app.use(express.json());

	app.use("/members", memberRoutes(memberController));

	return app;
}


export { generateServer };
import express from "express";
import memberRoutes from "./src/memberRoutes";

const app = express();
const port = Number(Bun.env.PORT ?? 3000);

app.get("/", (_request, response) => {
	response.json({ message: "Hello from Express" });
});

app.use("/members", memberRoutes);

app.listen(port, () => {
	console.log(`Express server listening on http://localhost:${port}`);
});
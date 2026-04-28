import express from "express";

const app = express();
const port = Number(Bun.env.PORT ?? 3000);

app.get("/", (_request, response) => {
	response.json({ message: "Hello from Express" });
});

app.get("/health", (_request, response) => {
	response.json({ status: "ok" });
});

app.listen(port, () => {
	console.log(`Express server listening on http://localhost:${port}`);
});
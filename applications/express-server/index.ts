import { SQLiteMemberRepository } from "adapters";
import { generateServer } from "./src/server"

const port = 3000;

const memberRepository = new SQLiteMemberRepository();
const app = generateServer(memberRepository);

app.listen(port, () => {
	console.log(`Express server listening on http://localhost:${port}`);
});
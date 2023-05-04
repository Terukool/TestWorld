import { Backend } from "./Backend";

async function main(): Promise<void> {
    // BACKEND SERVER
    const backend: Backend = new Backend();
    await backend.open();
}

main();

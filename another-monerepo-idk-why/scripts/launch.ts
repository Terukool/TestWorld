import { exec } from 'child_process';
import debug from 'debug';
const projectDirectory = process.env.WORKSPACE_ROOT_PATH;

if (!projectDirectory?.includes('apps')) 
    throw Error('This script must be run from within an apps directory, ran from: ' + projectDirectory);

const restOfPath = projectDirectory.split('\\apps')[1];
const projectName = restOfPath.split('\\')[1];

console.log(`Running ${projectName}...`);

const nxProcess = exec(`yarn nx run ${projectName}:serve:webpack`, (err : unknown, stdout: unknown, stderr: unknown) => {
    if (err) {
        debug(err.toString());
        return;
    }

    stdout && debug(stdout.toString());
    stderr && debug(stderr.toString());
});

nxProcess.stdout?.on('data', (data : unknown) => {
    if (!data) {
        return;
    }

    debug(data.toString());
});

nxProcess.stdout?.on('error', (data : unknown) => {
    if (!data) {
        return;
    }

    debug(data.toString());
});

nxProcess.on('message', (code) => {
    console.log(`nx process exited with code ${code}`);
});
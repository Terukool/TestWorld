import { exec } from 'child_process';

const projectDirectory = process.env.WORKSPACE_ROOT_PATH;

if (!projectDirectory?.includes('apps')) 
    throw Error('This script must be run from within an apps directory, ran from: ' + projectDirectory);

const restOfPath = projectDirectory.split('\\apps')[1];
const projectName = restOfPath.split('\\')[1];

console.log(`Running ${projectName}...`);

// Replace the current process with the nx process


const nxProcess = exec(`yarn nx run ${projectName}:serve:webpack`, (err : unknown, stdout: unknown, stderr: unknown) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(stdout);
    console.log(stderr);
});

nxProcess.stdout?.on('data', (data : unknown) => {
    if (!data || typeof data !== 'string') {
        return;
    }

    console.log(data.trim());
});

nxProcess.stderr?.on('data', (data : unknown) => {
    if (!data || typeof data !== 'string') {
        return;
    }

    console.log(data.trim());
});

nxProcess.on('exit', (code) => {
    console.log(`nx process exited with code ${code}`);
});
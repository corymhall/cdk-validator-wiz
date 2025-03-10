import { spawnSync } from 'child_process';
/**
 * Our own execute function which doesn't use shells and strings.
 */
export function exec(commandLine: string[], options: { cwd?: string; json?: boolean; verbose?: boolean; env?: any } = { }): any {
  const proc = spawnSync(commandLine[0], commandLine.slice(1), {
    stdio: ['ignore', 'pipe', options.verbose ? 'inherit' : 'pipe'], // inherit STDERR in verbose mode
    maxBuffer: 10485760, // 10 MB. Default is 1MB
    env: {
      ...process.env,
      ...options.env,
    },
    cwd: options.cwd,
  });

  if (proc.error) { throw proc.error; }
  // cfn-guard uses 5 & 19 when there are policy validation failures
  if (proc.status !== 0 && proc.status !== 5 && proc.status !== 19) {
    if (process.stderr) { // will be 'null' in verbose mode
      process.stderr.write(proc.stderr);
    }
    throw new Error(`Command exited with ${proc.status ? `status ${proc.status}` : `signal ${proc.signal}`}`);
  }

  const output = proc.stdout.toString('utf-8').trim();

  try {
    if (options.json) {
      if (output.length === 0) { return {}; }

      return JSON.parse(output);
    }
    return output;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Not JSON: ' + output);
    throw new Error('Command output is not JSON');
  }
}

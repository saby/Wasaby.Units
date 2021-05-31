#!/usr/bin/env node

/**
 * This wrapper runs Jest in valid environment.
 */

const spawn = require('child_process').spawn;
const { parseArguments } = require('../lib/jest/command');

const logger = console;
const inputArguments = process.argv.slice(2);
const jestArguments = parseArguments(inputArguments, process.env);

logger.log(`[jest] Running: ${jestArguments.args.join(' ')}`);

const proc = spawn(
   process.execPath,
   jestArguments.args,
   jestArguments.options
);

proc.on('exit', (code, signal) => {
   process.on('exit', function() {
      if (signal) {
         process.kill(process.pid, signal);
      } else {
         process.exit(code);
      }
   });
});

// Terminate children
process.on('SIGINT', () => {
   proc.kill('SIGINT');
   proc.kill('SIGTERM');
   process.kill(process.pid, 'SIGINT');
});

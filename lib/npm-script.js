'use strict';

var spawn = require('child_process').spawn,
   path = require('path');

/**
 * Run an npm script
 * @param {String} name Script name
 * @param {Function} callback
 */
module.exports = function(name, callback) {
   var proc = spawn(
      /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
      ['run-script', name],
      {stdio: 'inherit', cwd: path.resolve(path.join(__dirname, '..'))}
   );

   proc.on('exit', function (code, signal) {
      callback && callback(code, signal);
   });

   process.on('SIGINT', function () {
      proc.kill('SIGINT');
      proc.kill('SIGTERM');
   });

   return proc;
};
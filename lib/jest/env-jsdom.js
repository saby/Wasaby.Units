const JSDOMEnvironment = require('jest-environment-jsdom');
const SabyEnvironment = require('./env-saby');

class Environment extends JSDOMEnvironment {
   constructor(config, context) {
      super(config);
      this.testPath = context.testPath;
   }

   async setup() {
      await super.setup();
      SabyEnvironment.initializeEnvironment(this, {
         projectRootPath: 'application',
         resourcePath: './',
         wsPath: '',
         loadCss: true
      });
   }
}

module.exports = Environment;
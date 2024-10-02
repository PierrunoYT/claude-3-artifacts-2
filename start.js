const concurrently = require('concurrently');
const path = require('path');

concurrently([
  {
    command: 'npm start',
    name: 'FRONTEND',
    cwd: path.resolve(__dirname, 'coder-renderer'),
    prefixColor: 'blue'
  },
  {
    command: 'npm start',
    name: 'BACKEND',
    cwd: path.resolve(__dirname, 'coder-renderer-backend'),
    prefixColor: 'green'
  }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3,
}).result.then(
  () => console.log('All processes exited successfully.'),
  (error) => console.error('One or more processes failed:', error)
);
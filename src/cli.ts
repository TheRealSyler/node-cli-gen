#!/usr/bin/env node
import { failure } from './messages';
import { writeFileSync } from 'fs';
import { exec } from 'child_process';

class Start {
  args: string[];
  constructor() {
    const [, , ...argumentArr] = process.argv;
    this.args = [];
    argumentArr.forEach((arg, i) => {
      this.args[i] = arg === undefined ? '' : arg.toLowerCase();
    });
    this.run();
  }
  private async run() {
    const name = this.args[0];
    if (this.args[0]) {
      exec(`mkdir ${name}`);
      exec(`mkdir ${name}/src`);
      writeFileSync(`./${name}/README.md`, `## ${name}`);
      writeFileSync(`./${name}/todo`, '');
      writeFileSync(
        `./${name}/.gitignore`,
        `node_modules
dist
.vscode
tsconfig.tsbuildinfo
`
      );
      writeFileSync(
        `./${name}/tsconfig.json`,
        `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "*": ["types/*"] },
    "target": "es5",
    "module": "commonjs" ,
    "watch": true,
    "outDir": "./dist" ,
    "rootDir": "./src" ,
    "strict": true,
    "esModuleInterop": true
  }
}`
      );
      writeFileSync(
        `./${name}/package.json`,
        `{
  "name": "${name}",
  "version": "0.0.1",
  "description": "",
  "main": "./dist/cli.js",
  "scripts": {
    "prepack": "tsc -b"
  },
  "author": "Syler",
  "license": "MIT",
  "bin": {
    "CLI_COMMAND": "./dist/cli.js"
  },
  "files": [
    "dist"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/TheRealSyler/${name}"
  },
  "dependencies": {
    "chalk": "^2.4.2",
    "typescript": "^3.6.3"
  },
  "devDependencies": {
    "@types/node": "^12.7.7"
  }
}
      
      `
      );
      writeFileSync(
        `./${name}/src/cli.ts`,
        `#!/usr/bin/env node

class Start {
  args: string[];
  constructor() {
    const [, , ...argumentArr] = process.argv;
    this.args = [];
    argumentArr.forEach((arg, i) => {
      this.args[i] = arg === undefined ? '' : arg.toLowerCase();
    });
    this.run();
  }
  private async run() {
    console.log('${name}, has been called.')
  }
}
new Start();`
      );
      writeFileSync(
        `./${name}/src/messages.ts`,
        `import chalk from 'chalk';

export const successFile = (filePath: string) => {
  console.log(chalk.green.bold(\`Done! File created at \${filePath}\`));
};
export const success = (message: any) => {
  console.log(chalk.green.bold(message));
};
export const failure = (message: string) => {
  console.log(chalk.red.bold(message));
};
export const info = (message: string) => {
  console.log(chalk.yellow.bold(message));
};
`
      );

      exec(`cd ${name} && git init`);
      exec(`cd ${name} && npm i`);
    } else {
      failure('argument NAME is needed.');
    }
  }
}
new Start();

#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from 'fs';
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
    const cliName = this.args[1] || name;

    if (this.args[0]) {
      if (existsSync(`./${name}`)) {
        console.log(`\x1b[1;38;2;255;0;0m> directory ${name} already exists.\x1b[m`);
        return;
      }
      const dir = (path: string) => `./${name}/${path}`;
      mkdirSync(`./${name}`);
      mkdirSync(dir('src'));

      writeFileSync(dir('README.md'), `## ${name}`);

      writeFileSync(
        dir('.gitignore'),
        `node_modules
dist
.vscode
tsconfig.tsbuildinfo
`
      );
      writeFileSync(
        dir('tsconfig.json'),
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
        dir('package.json'),
        `{
  "name": "${name}",
  "version": "0.0.1",
  "main": "./dist/cli.js",
  "scripts": {
    "prepack": "tsc -b",
    "start": "yarn && npm link && tsc -w",
    "build": "yarn && npm link && tsc -b"
  },
  "author": "Syler",
  "license": "MIT",
  "bin": {
    "${cliName}": "./dist/cli.js"
  },
  "files": [
    "dist"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/TheRealSyler/${name}"
  }
}
`
      );

      writeFileSync(
        dir('src/cli.ts'),
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

      const devPackages = ['typescript', '@types/node'];

      exec(`cd ${name} && git init`);
      exec(`cd ${name} && yarn add -D ${devPackages.join(' ')}`);

      console.log(`\x1b[1;38;2;0;255;0m> successfully created ${name}.\x1b[m`);
    } else {
      console.log('\x1b[1;38;2;255;0;0m> argument NAME is needed.\x1b[m');
    }
  }
}
new Start();

#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  require.resolve('chalk');
} catch (e) {
  console.log('Installing package dependencies...');
  execSync('npm install chalk');
}


(async () => {
  const chalk = (await import('chalk')).default; // Dynamically import the ES module


// Geting the project name from the command-line arguments
const projectName = process.argv[2] || 'my-package';

console.log(`\nRunning create-react-app for project: ${projectName} \n`);
console.log(`${chalk.magenta.bold("The full process might take 1-2 minutes. \n")} `)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Spinner animation function
const animate = async (isRunning) => {
    const spinner = ['-', '\\', '|', '/'];
    
    while (isRunning()) {
        for (let j = 0; j < spinner.length; j++) {
            process.stdout.write(`${chalk.greenBright.bold("\rProcessing..")}  ${spinner[j]}`);
            await sleep(250);
        }
    }
};

let running = true;
animate(() => running);

// Execute the npx create-react-app command
exec(`npx create-react-app ${projectName}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  running=false



  // Created the 'package' directory in the 'src' folder and the 'index.js' file
  const packageDir = path.join(process.cwd(), projectName, 'src', 'package');
  const indexFile = path.join(packageDir, 'index.js');

  

  fs.mkdir(packageDir, { recursive: true }, (mkdirError) => {
    if (mkdirError) {
      console.error(`Error creating directory: ${mkdirError.message}`);
      return;
    }
  

    // Created index.js file
    fs.writeFile(indexFile, `
      import Hello from "./Hello";
      export {Hello};
      `, (writeError) => {
      if (writeError) {
        console.error(`Error creating file: ${writeError.message}`);
        return;
      }
      console.log(`Created directory: ${packageDir}`);
      console.log(`Created file: ${indexFile}`);
        


const HelloFile = path.join(packageDir, 'Hello.jsx');

fs.writeFile(HelloFile, `
import React from 'react';

const Hello = () => {
  return (
    <div>
      <h1>Hello npm</h1>
      <h2>This is my first package</h2>
    </div>
  );
}

export default Hello;
`, (writeError) => {
  if (writeError) {
    console.error(`Error creating file: ${writeError.message}`);
    return;
  }
  console.log("Hello.jsx Created")
    


      const packageJsonPath = path.join(process.cwd(), projectName, 'package.json');

      fs.readFile(packageJsonPath, 'utf8', (readError, data) => {
        if (readError) {
          console.error(`Error reading package.json: ${readError.message}`);
          return;
        }

     
   

        // Parse the JSON
        const packageJson = JSON.parse(data);
        
        
        packageJson.scripts.build = "cross-env NODE_ENV=production rimraf dist && babel src/package --out-dir dist --copy-files";
        packageJson.main = 'dist/index.js'; 
        packageJson.files = ['dist']; 
        packageJson.description = "My first npm package";
        packageJson.author = "Your Name";
        packageJson.module = "dist/index.js";
        packageJson.private = false;

        // Writing the updated package.json back to the file
        fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), (writePackageError) => {
          if (writePackageError) {
            console.error(`Error writing package.json: ${writePackageError.message}`);
            return;
          }
          console.log('Updated package.json ');

        

    


          // Created babel.config.json file
          const babelConfigPath = path.join(process.cwd(), projectName, 'babel.config.json');
          const babelConfigContent = {
            "presets": [
              [
                "@babel/env",
                {
                  "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1"
                  },
                  "useBuiltIns": "usage",
                  "corejs": "3.6.5"
                }
              ],
              "@babel/preset-react"
            ]
          };

          fs.writeFile(babelConfigPath, JSON.stringify(babelConfigContent, null, 2), (writeBabelError) => {
            if (writeBabelError) {
              console.error(`Error creating babel.config.json: ${writeBabelError.message}`);
              return;
            }
            console.log(`Created babel.config.json in the root folder.`);


            const npmignorePath = path.join(process.cwd(), projectName, '.npmignore');


            fs.writeFile(npmignorePath, `
              # Ignore source files
              src/

              # Ignore configuration files
              .git/
              .env
             
              `, (writeError) => {
              if (writeError) {
                console.error(`Error creating .npmignore: ${writeError.message}`);
                return;
              }
              console.log(`Created .npmignore in the root folder.`);


          

            // Installing development dependencies
            console.log('Installing development dependencies...');
            const devDependencies = [
              '@babel/cli@^7.25.6',
              '@babel/core@^7.25.2',
              '@babel/preset-env@^7.25.4',
              'cross-env@^7.0.3',
              'rimraf@^6.0.1',
              '@babel/polyfill'
            ].join(' ');

            exec(`cd ${projectName} && npm install --save-dev ${devDependencies}`, (installError, installStdout, installStderr) => {
              if (installError) {
                console.error(`Error installing dependencies: ${installError.message}`);
                console.error(`stderr: ${installStderr}`);
                return;
              }
              console.log(chalk.green('\n\nDevelopment dependencies installed successfully.\n'));
              console.log(`${chalk.bgWhiteBright.greenBright.bold('Setup Done')}`);
              console.log(" ");
              console.log(`${chalk.magenta.bold(`cd`)} ${chalk.cyanBright.bold(`${projectName}`)}`);
              console.log(" ");
              console.log(`${chalk.magenta('Go to')} ${chalk.cyanBright.bold('/src/package/')} ${chalk.magenta('folder \n')}`);
              console.log(`${chalk.magenta('Do your changes in')} ${chalk.cyanBright.bold('Hello.jsx \n')}`);
              console.log(`${chalk.magenta('Test it in')} ${chalk.cyanBright.bold(' App.js \n')}`);
              console.log(" ");
              console.log(chalk.bgBlackBright.blueBright.underline('For publishing, follow these steps:\n'));
              console.log(chalk.green.bold.underline('Step 1: \n'));              console.log('First create your account on ' + chalk.cyan.underline('https://www.npmjs.com/'));
              console.log('Then login to your account in terminal using the command: \n');
              console.log(chalk.bold.yellowBright('npm login \n'));
              console.log(chalk.green.bold.underline('Step 2: \n'));
              console.log(chalk.bold.yellowBright('npm run build \n'));
              console.log(chalk.green.bold.underline('Step 3:\n'));
              console.log(chalk.bold.yellowBright('npm publish \n'));
              console.log(chalk.blueBright.bold('Good luck! \n'));

            });

          });
          });
        });
      });
    });
  });
  
});

});
})();
           
         
     
   


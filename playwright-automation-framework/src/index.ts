import { exec } from 'child_process';


//Define a common command string for running cucumber tests
const common = `./src/features/*.feature \
  --require-module ts-node/register \
  --require ./src/step-definitions/**/**/*.ts \
  --require ./src/utils/cucumber-timeout.ts \
  --tags "not @ignore"`;

  //Define an interface for the profile object
  //It defines an interface where each key is a string and its value is also a string.
    interface ProfileCommands {
      [key: string]: string;
    }

    //Define a command string for different test profiles
    const profiles: ProfileCommands = {

        smoke: `${common} --tags "@smoke"`,
        regression: `${common} --tags "@regression"`,
        login: `${common} --tags "@login"`,
        contactUs: `${common} --tags "@contact-us"`,
        exampleTag: `${common} --tags "@example-tag"`,
    }

    //Get the third command-line and assign it to the profile
    //i.e. smoke, regressio etc
    const profile = process.argv[2];

    //Construct the command string based on the selected profile
    //command is the full command to run the tests for the selected profile
    let command = `npx cucumber-js ${profiles[profile as 'smoke' | 'regression' | 'login' | 'contact-us'] || common }`;

    //Print the constructed command to the console
    //console.log(`Running command: ${command}`);

    //Execute the constructed command using exec
    exec(command, { encoding: 'utf-8' }, (error: Error | null, stdout: string) => {
        //log the outputs oc the command
        console.log(stdout);

        //check If there was an error during execution
        if (error) {
            //throw a new error with a simple message
            throw new Error('Some automation test(s) have failed!');
        }
    });

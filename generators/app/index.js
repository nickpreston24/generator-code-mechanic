"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { exec } = require("child_process");

module.exports = class extends Generator {
  initializing() {
    // Console.log("Initializing the thingie...");
    // console.log("this.appname :>> ", this.appname);
    // exec("dotnet new razor", (error, stdout, stderr) => {
    //   if (error) {
    //     console.log(`error: ${error.message}`);
    //     return;
    //   }
    //   if (stderr) {
    //     console.log(`stderr: ${stderr}`);
    //     return;
    //   }
    //   console.log(`stdout: ${stdout}`);
    // });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the good ${chalk.red("generator-code-mechanic")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
      {
        type: "confirm",
        name: "tailwind",
        message: "Would you like to install TailwindCSS?",
        store: true
      },
      {
        type: "confirm",
        name: "daisyui",
        message: "Would you like to install DaisyUI?",
        store: true
      }
    ];

    return this.prompt(prompts).then(answers => {
      // To access props later use this.props.someAnswer;
      this.answers = answers;
      this.log("Tailwind?", answers.tailwind);
      this.log("DaisyUI?", answers.daisyui);
    });
  }

  writing() {
    exec("dotnet new razor", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
    });

    console.log("this.props.name :>> ", this.answers.name);

    const files_to_copy = [
      { template: "tailwind.config.js" },
      { template: ".yarnrc" },
      { template: "postcss.config.js" },
      { template: "app.css", destination: "Styles/app.css" },
      { template: "_Layout.cshtml", destination: "Pages/Shared/_Layout.cshtml" }
    ];

    files_to_copy.forEach(filepath => {
      this.fs.copy(
        this.templatePath(filepath?.template),
        this.destinationPath(filepath?.destination || filepath?.template)
      );
    });
  }

  install() {
    this.yarnInstall(["alpinejs", "htmx.org", "daisyui"]);

    if (this.answers.tailwind)
      this.npmInstall(
        ["cross-env", "autoprefixer", "postcss", "postcss-cli", "tailwindcss"],
        { "save-dev": false }
      );

    // If (this.answers.daisyui) this.yarnInstall("daisyui");
  }
};

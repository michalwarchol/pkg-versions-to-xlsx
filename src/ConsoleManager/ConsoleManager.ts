import { Command } from 'commander';

import messages from './messages.json';
import { CommandOptions } from './ConsoleManager.types';

export class ConsoleManager {
  constructor() {}

  getProgramOptions(): CommandOptions {
    const program = new Command();

    program
      .name('pkg-versions-to-xlsx')
      .description('Export your package versions to xlsx file')
      .option(
        '-i, --input <input>',
        'The project directory from which the packages will be taken.',
        './',
      )
      .option(
        '-o, --output <output>',
        'Destination directory, where xlsx file will be generated.',
        './',
      );

    program.parse();
    return program.opts<CommandOptions>();
  }

  displayInputDirError(): void {
    console.log(messages.inputDirNotExists);
  }

  displayPackageJsonError(): void {
    console.log(messages.packageJsonNotExists);
  }

  displayOutputDirError(): void {
    console.log(messages.outputDirNotExists);
  }

  displayErrorOnCommand(error: string): void {
    console.error(messages.errorExecuningCommand, error);
  }

  displayErrorOnJsonParse(error: string): void {
    console.error(messages.jsonParseError, error);
  }
}

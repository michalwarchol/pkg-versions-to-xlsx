import readline from 'readline';

import messages from './messages.json';

export class ConsoleManager {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  getInputDir(): Promise<string> {
    return new Promise((resolve) => this.rl.question(messages.getInputDir, resolve));
  }

  getOutputDir(): Promise<string> {
    return new Promise((resolve) => this.rl.question(messages.getOutputDir, resolve));
  }
}

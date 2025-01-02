import child_process from 'child_process';

import { TIOData } from '../DataManager/DataManager.types';
import { ConsoleManager } from '../ConsoleManager';
import { OUTDATED_COMMAND } from './CommandManager.consts';

export class CommandManager {
  private ioData: TIOData;
  private consoleManager: ConsoleManager;

  constructor(ioData: TIOData) {
    this.ioData = ioData;
    this.consoleManager = new ConsoleManager();
  }

  public getRawPackagesData() {
    try {
      const output = child_process.execSync(OUTDATED_COMMAND, {
        cwd: this.ioData.inputDir,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      return JSON.parse(output);
    } catch (error: any) {
      if (error.stdout) {
        try {
          return JSON.parse(error.stdout);
        } catch (parseError: any) {
          this.consoleManager.displayErrorOnJsonParse(parseError.message);
          throw parseError;
        }
      }
      this.consoleManager.displayErrorOnCommand(error.message);
      throw error;
    }
  }
}

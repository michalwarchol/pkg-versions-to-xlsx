import fs from 'fs';
import child_process from 'child_process';

import { TIOData } from '../DataManager/DataManager.types';
import {
  PACKAGE_LOCK_JSON,
  PNPM_LOCK_YAML,
  YARN_LOCK,
} from '../FileSystemManager/FileSystemManager.consts';
import { TPackageManager } from './CommandManager.types';
import { EPackageManagers } from './CommandManager.consts';
import { ConsoleManager } from '../ConsoleManager';

export class CommandManager {
  private ioData: TIOData;
  private packageManager: TPackageManager | null;
  private consoleManager: ConsoleManager;

  constructor(ioData: TIOData) {
    this.ioData = ioData;
    this.packageManager = null;
    this.consoleManager = new ConsoleManager();
  }

  public setPackageManager() {
    const files = fs.readdirSync(this.ioData.inputDir);
    if (files.includes(PACKAGE_LOCK_JSON)) {
      this.packageManager = EPackageManagers.npm;
      return;
    }

    if (files.includes(PNPM_LOCK_YAML)) {
      this.packageManager = EPackageManagers.pnpm;
      return;
    }


    if (files.includes(YARN_LOCK)) {
      this.packageManager = EPackageManagers.yarn;
    }
  }

  public getPackageManager() {
    return this.packageManager;
  }

  public getRawPackagesData() {
    try {
      // TODO in E-7: Handle yarn and pnpm
      const output = child_process.execSync('npm outdated --json', {
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

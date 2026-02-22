import { ConsoleManager } from '../ConsoleManager';
import { FileSystemManager } from '../FileSystemManager';
import { TEMP_FILE_POSTFIX, TEMP_FILE_PREFIX } from './DataManager.consts';
import { EUpdateType, TIOData, TJsonData, TOutdatedPackageData } from './DataManager.types';

export class DataManager {
  private inputDir: string;
  private outputDir: string;
  private packagesData: TOutdatedPackageData[];
  private fileSystemManager: FileSystemManager;
  private consoleManager: ConsoleManager;

  constructor() {
    this.inputDir = '';
    this.outputDir = '';
    this.packagesData = [];
    this.fileSystemManager = new FileSystemManager();
    this.consoleManager = new ConsoleManager();
  }

  public getInputDir() {
    return this.inputDir;
  }

  public getOutputDir() {
    return this.outputDir;
  }

  public setInputDir(inputDir: string): void {
    if (!this.fileSystemManager.isDirExists(inputDir)) {
      this.consoleManager.displayInputDirError();
      process.exit(1);
    }

    if (!this.fileSystemManager.isPackageJsonExists(inputDir)) {
      this.consoleManager.displayPackageJsonError();

      process.exit(1);
    }

    this.inputDir = inputDir;
  }

  public setOutputDir(outputDir: string): void {
    if (!this.fileSystemManager.isDirExists(outputDir)) {
      this.consoleManager.displayOutputDirError();

      process.exit(1);
    }

    this.outputDir = outputDir;
  }

  public getIOData(): TIOData {
    return {
      inputDir: this.inputDir,
      outputDir: this.outputDir,
    };
  }

  private establishUpdateType(current: string, latest: string): EUpdateType {
    const currentParts = current.split('.');
    const latestParts = latest.split('.');

    if (currentParts[0] !== latestParts[0]) {
      return EUpdateType.major;
    }

    if (currentParts[1] !== latestParts[1]) {
      return EUpdateType.minor;
    }

    return EUpdateType.patch;
  }

  public persistJsonData(data: TJsonData): void {
    const keys = Object.keys(data);
    const packagesData: TOutdatedPackageData[] = [];
    keys.forEach((packageName) => {
      packagesData.push({
        name: packageName,
        current: data[packageName].current,
        latest: data[packageName].latest,
        updateType: this.establishUpdateType(data[packageName].current, data[packageName].latest),
      });
    });

    this.packagesData = packagesData;
  }

  public getXlsxData(): TOutdatedPackageData[] {
    return this.packagesData;
  }

  public createXlsxFileName(): string {
    return `${TEMP_FILE_PREFIX}${Date.now()}${TEMP_FILE_POSTFIX}`;
  }
}

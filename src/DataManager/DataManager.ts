import { EUpdateType, TIOData, TJsonData, TOutdatedPackageData } from "./DataManager.types";

export class DataManager {
  private inputDir: string;
  private outputDir: string;
  private packagesData: TOutdatedPackageData[];

  constructor() {
    this.inputDir = '';
    this.outputDir = '';
    this.packagesData = [];
  }

  public getInputDir() {
    return this.inputDir;
  }

  public getOutputDir() {
    return this.outputDir;
  }

  public setInputDir(value: string): void {
    this.inputDir = value;
  }

  public setOutputDir(value: string): void {
    this.outputDir = value;
  }

  public getIOData(): TIOData {
    return {
      inputDir: this.inputDir,
      outputDir: this.outputDir,
    }
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
}

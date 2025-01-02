import { TIOData, TJsonData, TOutdatedPackageData } from "./DataManager.types";

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

  public persistJsonData(data: TJsonData): void {
    const keys = Object.keys(data);
    const packagesData: TOutdatedPackageData[] = [];
    keys.forEach((packageName) => {
      packagesData.push({
        name: packageName,
        current: data[packageName].current,
        latest: data[packageName].latest,
      });
    });

    this.packagesData = packagesData;
  }
}

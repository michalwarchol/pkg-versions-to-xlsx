import { TIOData } from "./DataManager.types";

export class DataManager {
  private inputDir: string;
  private outputDir: string;

  constructor() {
    this.inputDir = '';
    this.outputDir = '';
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
}

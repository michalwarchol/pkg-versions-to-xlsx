import fs from 'fs';
import path from 'path';
import exceljs from 'exceljs';

import {
  PACKAGE_JSON,
  TEMP_DIR,
  TEMPALTE_XLSX,
  WORKSHEET_NAME,
  PROJECT_NAME_CELL,
  CURRENT_DATE_CELL,
  PACKAGE_COLUMN,
  CURRENT_VERSION_COLUMN,
  LATEST_VERSION_COLUMN,
  UPDATE_TYPE_COLUMN,
  START_ROW,
} from './FileSystemManager.consts';
import { TOutdatedPackageData } from '../DataManager/DataManager.types';

export class FileSystemManager {
  constructor() { }

  public isDirExists(dir: string): boolean {
    if (fs.existsSync(dir)) {
      return fs.lstatSync(dir).isDirectory();
    }

    return false;
  }

  public isPackageJsonExists(dir: string): boolean {
    return fs.existsSync(path.join(dir, PACKAGE_JSON));
  }

  public createWorkingXlsxFile(filename: string): void {
    if (!fs.existsSync(path.join(__dirname, TEMP_DIR))) {
      fs.mkdirSync(path.join(__dirname, TEMP_DIR));
    }

    fs.cpSync(
      path.join(__dirname, 'resources', TEMPALTE_XLSX), // source
      path.join(__dirname, TEMP_DIR, filename), // destination
    );
  }

  public async writeDataToXlsx(
    filename: string,
    projectName: string,
    data: TOutdatedPackageData[],
  ): Promise<void> {
    const pathToFile = path.join(__dirname, TEMP_DIR, filename);
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(pathToFile);
    const worksheet = workbook.getWorksheet(1) || workbook.addWorksheet(WORKSHEET_NAME);

    // write project name
    worksheet.getCell(PROJECT_NAME_CELL).value = projectName;

    // write current date
    worksheet.getCell(CURRENT_DATE_CELL).value = new Date();

    // write packages data
    let i = START_ROW;
    data.forEach((packageData) => {
      worksheet.getCell(`${PACKAGE_COLUMN}${i}`).value = packageData.name;
      worksheet.getCell(`${CURRENT_VERSION_COLUMN}${i}`).value = packageData.current;
      worksheet.getCell(`${LATEST_VERSION_COLUMN}${i}`).value = packageData.latest;
      worksheet.getCell(`${UPDATE_TYPE_COLUMN}${i}`).value = packageData.updateType;
      i += 1;
    });

    //save xlsx
    await workbook.xlsx.writeFile(pathToFile);
  }

  public readProjectNameFromPackageJson(dir: string): string {
    const isPackageJsonExists = this.isPackageJsonExists(dir);
    if (!isPackageJsonExists) {
      return '';
    }

    const file = fs.readFileSync(path.join(dir, PACKAGE_JSON));
    const parsedData = JSON.parse(file.toString());

    return parsedData.name;
  }

  public copyFileToOutputDir(filename: string, outputDir: string): void {
    fs.cpSync(
      path.join(__dirname, TEMP_DIR, filename), // destination
      path.join(outputDir, filename), // source
    );
  }

  public clear(): void {
    fs.rmSync(path.join(__dirname, TEMP_DIR), { recursive: true });
  }
}

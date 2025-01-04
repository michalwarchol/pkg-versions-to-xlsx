import fs from 'fs';
import path from 'path';

import { PACKAGE_JSON, TEMP_DIR, TEMPALTE_XLSX } from './FileSystemManager.consts';

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
      path.join(__dirname, TEMP_DIR, filename), // desctination
    );
  }
}

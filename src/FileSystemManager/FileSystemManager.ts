import fs from 'fs';
import path from 'path';

import { PACKAGE_JSON } from './FileSystemManager.consts';

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
}

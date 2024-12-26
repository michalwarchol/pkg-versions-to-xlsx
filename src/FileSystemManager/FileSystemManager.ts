import fs from 'fs';

export class FileSystemManager {
  constructor() { }

  public isDirExists(path: string): boolean {
    if (fs.existsSync(path)) {
      return fs.lstatSync(path).isDirectory();
    }

    return false;
  }
}

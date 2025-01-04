import { CommandManager } from './CommandManager';
import { ConsoleManager } from './ConsoleManager';
import { DataManager } from './DataManager';
import { FileSystemManager } from './FileSystemManager';

const consoleManager = new ConsoleManager();
const dataManager = new DataManager();
const fileSystemManager = new FileSystemManager();

async function getInputDir() {
  const inputDir = await consoleManager.getInputDir();
  const isInputDirExists = fileSystemManager.isDirExists(inputDir);
  if (!isInputDirExists) {
    consoleManager.displayInputDirError();
    await getInputDir();

    return;
  }

  const isPackageJsonExists = fileSystemManager.isPackageJsonExists(inputDir);
  if (!isPackageJsonExists) {
    consoleManager.displayPackageJsonError();
    await getInputDir();

    return;
  }

  dataManager.setInputDir(inputDir);
}

async function getOutputDir() {
  const outputDir = await consoleManager.getOutputDir();
  const isOutputDirExists = fileSystemManager.isDirExists(outputDir);
  if (!isOutputDirExists) {
    consoleManager.displayOutputDirError();
    await getOutputDir();

    return;
  }

  dataManager.setOutputDir(outputDir);
}

async function run() {
  await getInputDir();
  await getOutputDir();

  const commandManager = new CommandManager(dataManager.getIOData());
  const data = commandManager.getRawPackagesData();
  dataManager.persistJsonData(data);

  const projectName = fileSystemManager.readProjectNameFromPackageJson(dataManager.getInputDir());
  const xlsxFilename = dataManager.createXlsxFileName();
  fileSystemManager.createWorkingXlsxFile(xlsxFilename);
  await fileSystemManager.writeDataToXlsx(xlsxFilename, projectName, dataManager.getXlsxData());
  fileSystemManager.copyFileToOutputDir(xlsxFilename, dataManager.getOutputDir());
  fileSystemManager.clear();

  process.exit(0);
}

run();

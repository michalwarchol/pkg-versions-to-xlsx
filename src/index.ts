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

  dataManager.setInputDir(outputDir);
}

async function run() {
  await getInputDir();
  await getOutputDir();

  process.exit(0);
}

run();

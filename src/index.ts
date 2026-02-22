import { CommandManager } from './CommandManager';
import { DataManager } from './DataManager';
import { FileSystemManager } from './FileSystemManager';
import { ConsoleManager } from './ConsoleManager';

const fileSystemManager = new FileSystemManager();

async function run() {
  const dataManager = new DataManager();
  const consoleManager = new ConsoleManager();

  const options = consoleManager.getProgramOptions();
  dataManager.setInputDir(options.input);
  dataManager.setOutputDir(options.output);

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

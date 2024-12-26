import { ConsoleManager } from './ConsoleManager';
import { DataManager } from './DataManager';

async function run() {
  const consoleManager = new ConsoleManager();
  const dataManager = new DataManager();

  const inputDir = await consoleManager.getInputDir();
  const outputDir = await consoleManager.getOutputDir();
  dataManager.setInputDir(inputDir);
  dataManager.setOutputDir(outputDir);

  process.exit(0);
}

run();

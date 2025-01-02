export type TIOData = {
  inputDir: string;
  outputDir: string;
}

export type TJsonData = {
  [key: string]: {
    current: string;
    wanted: string;
    latest: string;
    dependent: string;
    location: string;
  }
};

export type TOutdatedPackageData = {
  name: string;
  current: string;
  latest: string;
};

import path from 'path';
import { mkdirSync, rmdirSync } from 'fs';

export default function createOutputDirectors() {
  const outputFolder = '../../../output';

  const dotfilesFolderPath = path.join(
    __dirname,
    outputFolder.concat('/dotfiles')
  );
  const imagesFilePath = path.join(__dirname, outputFolder.concat('/images'));
  const animationFilePath = path.join(
    __dirname,
    outputFolder.concat('/animation')
  );

  rmdirSync(dotfilesFolderPath, { recursive: true });
  mkdirSync(dotfilesFolderPath, { recursive: true });

  rmdirSync(imagesFilePath, { recursive: true });
  mkdirSync(imagesFilePath, { recursive: true });

  rmdirSync(animationFilePath, { recursive: true });
  mkdirSync(animationFilePath, { recursive: true });

  return {
    dotfilesFolderPath,
  };
}

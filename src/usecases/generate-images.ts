import { execSync } from 'child_process';
import { readdirSync } from 'fs';

export default function generateImages(outputFilePath: string): void {
  const dotFiles = readdirSync(outputFilePath);

  for (let i = 1; i <= dotFiles.length; i++) {
    execSync(`dot -Tjpeg output/output_${i}.dot -o images/output_${i}.jpg`);
  }
}

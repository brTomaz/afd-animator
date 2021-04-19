import { execSync } from 'child_process';
import { readdirSync } from 'fs';

import { CreateImage } from '../../domain/usecases';

export class CreateImages implements CreateImage {
  create(dotfilesFolderPath: string) {
    const dotFiles = readdirSync(dotfilesFolderPath);

    for (let i = 1; i <= dotFiles.length; i++) {
      execSync(
        `dot -Tjpeg output/dotfiles/output_${i}.dot -o output/images/output_${i}.jpg`
      );
    }
  }
}

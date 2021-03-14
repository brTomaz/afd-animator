import path from 'path';
import { writeFileSync } from 'fs';

export default function createDotFiles(
  filename: string,
  filepath: string,
  content: string
) {
  writeFileSync(path.join(filepath, `/${filename}.dot`), content);
}

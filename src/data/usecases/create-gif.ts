import { execSync } from 'child_process';
import { CreateAnimation } from '../../domain/usecases';

export class CreateGif implements CreateAnimation {
  create() {
    execSync(
      'convert -delay 80 -loop 0 output/images/*.jpg output/animation/afd_execution.gif'
    );
  }
}

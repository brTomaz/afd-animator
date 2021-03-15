import { execSync } from 'child_process';

export default function generateAnimation() {
  execSync(
    'convert -delay 80 -loop 0 images/*.jpg animation/afd_execution.gif'
  );
}

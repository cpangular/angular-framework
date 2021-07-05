import { watch } from 'gulp';
import { spawnSync } from 'child_process';

export async function watchThemes() {
  return watch('**/*.scss', {}, async () => {
    spawnSync('yarn build:baseTheme', { stdio: 'inherit', shell: true });
  });
}

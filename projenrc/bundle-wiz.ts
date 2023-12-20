import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Get the latest release of wiz from GitHub
 * and bundle it in the repo.
 */
export async function main() {
  const archs = ['amd64', 'arm64'];
  const platforms = ['linux', 'darwin'];
  for (const arch of archs) {
    for (const platform of platforms) {
      const name = getDownloadName(arch, platform);
      const binPath = path.join(__dirname, '../bin', platform, arch);
      if (!fs.existsSync(binPath)) {
        fs.mkdirSync(binPath, { recursive: true });
        const downloadUrl = `curl -Lo ${path.join(binPath, 'wizcli')} https://wizcli.app.wiz.io/latest/${name}`.split(' ');
        console.log(downloadUrl);
        spawnSync(downloadUrl[0], [...downloadUrl.slice(1)]);
        spawnSync('chmod', ['+x', path.join(binPath, 'wizcli')]);
      }
    }
  }
}

function getDownloadName(arch: string, platform: string): string {
  const name = ['wizcli'];
  name.push(platform);
  name.push(arch);
  return name.join('-');
}

main().catch(e => {
  console.log(e);
});

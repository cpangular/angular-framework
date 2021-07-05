import { mkdirSync, writeFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { renderSync } from 'sass';

const cwd = process.cwd();

const outPath = '../../dist/material-theming/prebuilt';
mkdirSync(outPath, { recursive: true });

const basePath = './theme';
const files = readdirSync(basePath);

for (const f of files) {
  if (f.endsWith('.scss')) {
    const file = join(basePath, f);
    const outFile = join(outPath, f.replace('.scss', '.css'));
    console.info(`Building theme '${file}'...`);
    const result = renderSync({
      file,
      outFile,
      outputStyle: 'compressed',
      sourceMap: true,
      omitSourceMapUrl: true,
      sourceMapContents: true,
      importer: function (url: string, prev: string) {
        if (url.startsWith('~')) {
          url = resolve(cwd + '/../../node_modules/' + url.substr(1));
        }
        return { file: url };
      },
    });

    writeFileSync(outFile, result.css, 'utf8');
    console.info(`Created '${resolve(outFile)}'.`);
    writeFileSync(
      outFile + '.map',
      result.map
        .toString('utf8')
        .replace(new RegExp(`file://${resolve(cwd, '../../')}`, 'g'), '.'),
      'utf8'
    );
    console.info(`Created '${resolve(outFile)}.map'.`);
    console.info(`Completed building theme '${file}'.`);
  }
}

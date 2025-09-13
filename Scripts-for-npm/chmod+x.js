/**
 * npm script で Win 環境以外の場合に chmod 755 する為のスクリプトです
 * 注: 未テスト
 * @example
 * node scripts/chmod+x.js dist/index.js
 */

import { chmodSync, existsSync } from 'node:fs';
import { platform } from 'node:os';
const isWin = process.platform === 'win32';
const file = process.argv[2];	// 'dist/cli.js';

if( ! file || ! existsSync(file) )
{
	console.error( `File "${file}" not found.` );
	process.exit(1);
}

if(　!isWin && existsSync(file)　)
{
	// Windows は無視、POSIX だけ 0755 を付与
	chmodSync(file, 0o755);
}

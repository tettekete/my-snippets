/**
 * npm script で rm -rf dist 相当の処理をマルチプラットフォーム
 * 対応させるためのスクリプトです。
 * 注: 未テスト
 * @example
 * node scripts/rm-rf.js dist
 */

import { rmSync } from 'node:fs';

const target = process.argv[2];

if( !target )
{
	console.error('Usage: node scripts/clean.mjs <directory>');
	process.exit(1);
}

try
{
	rmSync( target ,{ recursive: true ,force: true } );
	console.log(`Removed: ${target}`);
}
catch( err )
{
	console.error(`Failed to remove ${target}:`, err);
	process.exit(1);
}

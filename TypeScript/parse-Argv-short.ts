import { parseArgs } from 'node:util';

const { values: opts ,positionals: argv }  = parseArgs(
	{
		args: process.argv.slice(2),
		options:
		{
			'output-count':
			{
				type: 'string',
				short: 'x'
			},
			'all-included':
			{
				type: 'boolean',
				short: 'a',
				default: false
			},
		},
		allowPositionals: true,
		allowNegative: true
	}
);

// 位置引数から数値だけ引き取る
const numbers  = argv.filter( item => /^\d+$/).map( n => Number.parseInt( n ) );
// 整数値に正規化 || 1
const outputCount = /^\d+$/.test( opts['output-count'] ?? '' ) ?
						Number.parseInt( opts['output-count'] as string ):
						1; 
const allIncluded = opts['all-included'];	// boolean は boolean

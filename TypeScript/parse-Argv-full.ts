import { parseArgs ,ParseArgsConfig } from 'node:util';

// parseArgs の返り値型は export されていないので、ReturnType で作る
type ParseArgsResult = ReturnType<typeof parseArgs>;
// ↑の型の values に number などを正規化した自分で用意した型を使ったものに
// するために Omit とジェネリクスで型を差し替えられるようにしたユーティリティー型
type ParseArgsLike<V> =
	Omit<ParseArgsResult, 'values'> & { values: V };

// parseArgs のコンフィグ定義
const parseConfig: ParseArgsConfig =
{
	args: process.argv.slice(2),
	options:
	{
		lang:				{ type: "string" },
		limit:				{ type: "string" },
		skip:				{ type: "string" },
		'open-ai-model':	{ type: "string" ,default: 'gpt-4o-mini' },
		test:				{ type: "boolean" },
		id:					{ type: "string" },
		'edit-prompt':		{ type: "boolean"},
		editor:				{ type: "string" },
		help:				{ type: 'boolean'},
		verbose:			{ type: 'boolean' ,short: 'v' },
		'log-info':			{ type: 'boolean' ,default: true},
		're-translation':	{ type: 'boolean' ,short: 'R'},
		count:				{ type: 'boolean' },
		show:				{ type: 'boolean' },
	},
	allowNegative: true,
	allowPositionals: false
}


// 最終的な格納先変数のための型、 ParseArgsLike<argsOptions> として使える
type argsOptions =
{
	lang?: string;
	limit?: number;
	skip?: number;
	openAiModel: string;
	test?: boolean;
	id?: number;
	editPrompt?: boolean;
	editor?: string;
	help: boolean;
	verbose: boolean;
	logInfo: boolean;
	reTranslation: boolean;
	count: boolean;
	show: boolean;
}

// コマンドオプションとして一般的なケバブケースはコード内で
// 使いづらいのでキャメルケースにする。
// parsArgv によってパースされた parsed.values.xxxx の型は
// string | boolean | (string | boolean)[] | undefined
// なので TypeScript では使いづらいのとバリデーションやノーマライズも必要なので
// ここでやる
function parseAndNormalizeArgs( config: ParseArgsConfig ):ParseArgsLike<argsOptions>
{
	const parsed = parseArgs( config );

	if( parsed.values.id === undefined )
	{
		if( ! parsed.values.lang || typeof parsed.values.lang !== 'string')
		{
			console.error('Error: --lang is required');
			process.exit( 1 );
		}
	}

	const normalizeAsInteger = ( value: string | boolean | (string | boolean)[] | undefined ):number | undefined =>
	{
		if( value === undefined ){ return undefined }
		if( typeof value === 'boolean' ) { return undefined }
		if( Array.isArray( value )){ return undefined }

		if( ! /^[+-]?\d+$/.test(value) )
		{
			throw new Error(`"${value}" is not an integer.`);
		}

		return parseInt( value, 10 );
	}

	const values:argsOptions =
	{
		lang:			parsed.values.lang as string | undefined,
		limit:			normalizeAsInteger( parsed.values.limit ),
		skip: 			normalizeAsInteger( parsed.values.skip ),
		id:				normalizeAsInteger( parsed.values.id ),
		openAiModel:	parsed.values['open-ai-model'] as string,
		editPrompt:		parsed.values['edit-prompt'] as boolean,
		editor:			parsed.values.editor as string | undefined,
		test:			parsed.values.test as boolean,
		help:			parsed.values.help as boolean,
		verbose:		parsed.values.verbose as boolean,
		logInfo:		parsed.values['log-info'] as boolean,
		reTranslation:	parsed.values['re-translation'] as boolean,
		count:			parsed.values.count as boolean,
		show:			parsed.values.show as boolean,
	};

	return {...parsed ,values }
}

// コマンド引数には大抵あちらこちらから参照したいのでグローバルでパースする
const { values: opts ,positionals: argv } = parseAndNormalizeArgs( parseConfig );



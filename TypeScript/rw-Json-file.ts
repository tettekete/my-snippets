// utils/json.ts
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

/** ファイルパスを process.cwd() 基準で解決する */
function resolvePath( filePath: string ): string
{
	return path.isAbsolute( filePath )
		? filePath
		: path.resolve( process.cwd(), filePath );
}

/** 非同期で JSON を読み込む */
export async function readJson( filePath: string ): Promise<any>
{
	const abs = resolvePath( filePath );
	const text = await fsp.readFile( abs, "utf8" );
	return JSON.parse( text ) as any;
}

/** 同期で JSON を読み込む */
export function readJsonSync( filePath: string ): any
{
	const abs = resolvePath( filePath );
	const text = fs.readFileSync( abs, "utf8" );
	return JSON.parse( text ) as any;
}

/** 非同期で JSON を書き込む（インデント付き） */
export async function writeJson( filePath: string ,data: any ,indent = 2 ): Promise<void>
{
	const abs = resolvePath( filePath );
	const text = JSON.stringify( data, null, indent ) + "\n";
	await fsp.mkdir( path.dirname( abs ), { recursive: true } );
	await fsp.writeFile( abs, text, "utf8" );
}

/** 同期で JSON を書き込む（インデント付き） */
export function writeJsonSync( filePath: string ,data: any ,indent = 2 ): void
{
	const abs = resolvePath( filePath );
	const text = JSON.stringify( data, null, indent ) + "\n";
	fs.mkdirSync( path.dirname( abs ), { recursive: true } );
	fs.writeFileSync( abs, text, "utf8" );
}
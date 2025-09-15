/**
 * 
 * @param seed - ゼロ以外の正数
 * @returns 
 */
export function xorShift32(seed: number)
{
	let x = seed >>> 0;	// force to uint32 (like C++ static_cast<uint32_t>)
	return () =>
	{
		x ^= x << 13; x >>>= 0;
		x ^= x >>> 17; x >>>= 0;
		x ^= x << 5;  x >>>= 0;
		return (x >>> 0) / 0xFFFFFFFF;
	};
}

/*
// シードを固定してジェネレーターを作成
const randomGenerator1 = xorShift32(12345);
const randomGenerator2 = xorShift32(12345);

// どちらも同じ乱数列を生成する
console.log(randomGenerator1()); // 例: 1406932606
console.log(randomGenerator1()); // 例: 654583775

console.log(randomGenerator2()); // 例: 1406932606
console.log(randomGenerator2()); // 例: 654583775	
 */

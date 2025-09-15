function mulberry32(seed: number)
{
	return function() {
		seed |= 0; // シードを32ビット整数に変換
		seed = (seed + 0x6D2B79F5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 10), 1 | t)) | 0;
		return (t ^ (t >>> 15)) >>> 0 / 4294967296;
	};
}

/*
// シードを固定してジェネレーターを作成
const randomGenerator1 = mulberry32(12345);
const randomGenerator2 = mulberry32(12345);

// どちらも同じ乱数列を生成する
console.log(randomGenerator1()); // 例: 0.12345...
console.log(randomGenerator1()); // 例: 0.98765...

console.log(randomGenerator2()); // 例: 0.12345...
console.log(randomGenerator2()); // 例: 0.98765...
*/
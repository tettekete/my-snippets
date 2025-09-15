/**
 * 線形合同法 (LCG) を用いたシード付き疑似乱数ジェネレーター
 * @param seed 初期シード
 */
export class LCG
{
	private m = 0x80000000; // 2^31
	private a = 1103515245;
	private c = 12345;
	private state: number;

	constructor(seed: number)
	{
		this.state = seed || 1; // シードが0やnullの場合は1を使用
	}

	/**
	* 0から1未満の疑似乱数を生成
	*/
	public next(): number
	{
		this.state = (this.a * this.state + this.c) % this.m;
		return this.state / (this.m - 1);
	}
}

/*
// 同じシードでインスタンスを生成
const lcg1 = new LCG(12345);
const lcg2 = new LCG(12345);

console.log(lcg1.next()); // 毎回同じ値
console.log(lcg1.next());

console.log(lcg2.next()); // 毎回同じ値
console.log(lcg2.next());

// 異なるシードでインスタンスを生成
const lcg3 = new LCG(54321);
console.log(lcg3.next()); // 上記とは異なる値
console.log(lcg3.next());
*/
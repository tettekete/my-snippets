
type unknownHash = {[key: string]:unknown };
	// この書き方を インデックスシグネチャ と呼ぶ

// あるいは Record ユーティリティーを使って以下のように書くこともできる
type unknownHash2 = Record<string, unknown>;

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// あるいは可読性を犠牲にするならば
//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

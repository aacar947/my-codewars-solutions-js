
let res = []
function fib(n) {
    console.log(n)
    if (n === 0) {
        res = [0n, 1n]
        return 0n;
    }
    fib(parseInt(n / 2));
    let a = res[0], b = res[1];
    // as F(2n) = F(n)[2F(n+1) – F(n)]
    const c = a * (2n * b - a);
    // as F(2n + 1) = F(n)^2 + F(n+1)^2
    const d = a * a + b * b;
    res = n % 2 === 0 ? [c, d] : [d, c + d];
    return n < 0 && n % 2 === 0 ? -res[0] : res[0]
}

console.log(fib(0))
console.log(fib(1))
console.log(fib(5))
console.log(fib(8))
console.log(fib(1_770_156))
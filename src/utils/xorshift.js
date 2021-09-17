
export default function xorshift(seed)
{
    let x = seed;
    x ^= x << 13;
    x ^= x >>> 7; //bitshift right without preserving sign because JS is dumb
    x ^= x << 17;
    return x;
}
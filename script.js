const sp = new URLSearchParams({ a: '1' });

sp.append('a', '2');

console.log(sp.toString());

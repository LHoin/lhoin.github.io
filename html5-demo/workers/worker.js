var arr = [];
for (var i = 0; i<10000000; i++) {
	arr.push(Math.round(Math.random() * 1000000));
}
postMessage('prepared');
arr.sort();
postMessage('finished');

function* generatorFunction() {
	console.log('started');

	const val1 = yield 1; // yield a value
	console.log('val1', val1); // log the value received back

	const val2 = yield 2; // yield another value
	console.log('val2', val2); // log the value received back

	return 'a';
}

console.log('starting...');
const gen = generatorFunction();

console.log('gen.next()', gen.next()); // Start the generator function
console.log('gen.next(10)', gen.next(10)); // Sends value back into the generator
console.log('gen.next(20)', gen.next(20)); // Sends another value back into the generator
console.log('return', gen.return('b'));

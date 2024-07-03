function* generatorFunction(): Generator<string, null, number> {
	const val1: number = yield 'a'; // yield a value
	console.log(val1); // log the value received back

	const val2: number = yield 'a'; // yield another value
	console.log(val2); // log the value received back
	return null;
}

const gen = generatorFunction();

console.log(gen.next()); // Start the generator function
console.log(gen.next(10)); // Sends value back into the generator
console.log(gen.next(20)); // Sends another value back into the generator
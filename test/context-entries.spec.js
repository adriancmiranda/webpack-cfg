import test from 'ava-spec';
import { contextEntries } from '../tools';

test('tools/contextEntries object', t => {
	const inputEntry = {
		index: ['foo.js'],
	};
	const entry = contextEntries('./context/test/', inputEntry);
	t.truthy(inputEntry.index[0] === entry.index[0]);
	t.is(entry.index[0], './context/test/foo.js');
});

test('tools/contextEntries array', t => {
	const inputEntry = ['foo.js'];
	const entry = contextEntries('/context/array/test/', inputEntry);
	t.falsy(inputEntry[0] === entry[0]);
	t.truthy(entry[0], '/context/array/test/foo.js');
});

test('tools/contextEntries string', t => {
	const inputEntry = 'foo.js';
	const entry = contextEntries('context/string/test/2', inputEntry);
	t.falsy(inputEntry === entry);
	t.is(entry, './context/string/test/2/foo.js');
});

test('tools/contextEntries unexpected', t => {
	const voidEntry = contextEntries('./context/string/test/2', undefined);
	const voidContext = contextEntries(undefined, 'foo.js');
	t.is(voidEntry, undefined);
	t.is(voidContext, 'foo.js');
});

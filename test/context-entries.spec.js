import test from 'ava-spec';
import { sep } from 'path';
import { contextEntries } from '../tools';

test('tools/contextEntries object', t => {
	const inputEntry = {
		index: ['foo.js'],
	};
	const entry = contextEntries('./context/test/', inputEntry);
	t.truthy(inputEntry.index[0] === entry.index[0]);
	t.is(entry.index[0], `.${sep}context${sep}test${sep}foo.js`);
});

test('tools/contextEntries array', t => {
	const inputEntry = ['foo.js'];
	const entry = contextEntries('/context/array/test/', inputEntry);
	t.falsy(inputEntry[0] === entry[0]);
	t.truthy(entry[0], `${sep}context${sep}array${sep}test${sep}foo.js`);
});

test('tools/contextEntries string', t => {
	const inputEntry = 'foo.js';
	const entry = contextEntries('context/string/test/2', inputEntry);
	t.falsy(inputEntry === entry);
	t.is(entry, `.${sep}context${sep}string${sep}test${sep}2${sep}foo.js`);
});

test('tools/contextEntries unexpected', t => {
	const voidEntry = contextEntries('./context/string/test/2', undefined);
	const voidContext = contextEntries(undefined, 'foo.js');
	t.is(voidEntry, undefined);
	t.is(voidContext, 'foo.js');
});

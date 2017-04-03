import test from 'ava-spec';
import { sep } from 'path';
import { contextEntries } from '../tools';

test('tools/contextEntries object', t => {
	const inputEntry = {
		index: ['foo.js'],
	};
	const entry = contextEntries(`./context/test/`, inputEntry);
	t.truthy(inputEntry.index[0] === entry.index[0]);
	t.truthy(entry.index[0].indexOf(`..${sep}..${sep}`) === 0);
});

test('tools/contextEntries array', t => {
	const inputEntry = ['foo.js'];
	const entry = contextEntries(`./context/array/test/`, inputEntry);
	t.falsy(inputEntry[0] === entry[0]);
	t.truthy(entry[0].indexOf(`..${sep}..${sep}..${sep}`) === 0);
});

test('tools/contextEntries string', t => {
	const inputEntry = 'foo.js';
	const entry = contextEntries(`./context/string/test/2`, inputEntry);
	t.falsy(inputEntry === entry);
	t.truthy(entry.indexOf(`..${sep}..${sep}..${sep}..${sep}`) === 0);
});

test('tools/contextEntries unexpected', t => {
	const entry = contextEntries(`./context/string/test/2`, undefined);
	t.is(entry, undefined);
});

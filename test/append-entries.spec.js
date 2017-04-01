import test from 'ava-spec';
import { appendEntries } from '../tools';

const testEntry = ['footer.js'];

test('tools/appendEntries object', t => {
	const inputEntry = {
		stats: './source/stats.json',
		index: [
			'./source/index.js',
			'./source/index.html',
			'./source/mobile.html',
		],
		main: [
			'./source/index.scss',
			'./source/index.pug',
			'./source/index.txt',
		],
	};
	const expectedStatsLength = 1 + testEntry.length;
	const expectedIndexLength = inputEntry.index.length + testEntry.length;
	const expectedMainLength = inputEntry.main.length + testEntry.length;
	const entry = appendEntries(testEntry, inputEntry);
	t.is(entry.stats.length, expectedStatsLength);
	t.is(entry.stats[entry.stats.length - 1], testEntry[0]);
	t.is(entry.index.length, expectedIndexLength);
	t.is(entry.index[entry.index.length - 1], testEntry[0]);
	t.is(entry.main.length, expectedMainLength);
	t.is(entry.main[entry.main.length - 1], testEntry[0]);
});

test('tools/appendEntries string', t => {
	const entry = appendEntries(testEntry[0], 'foo.js');
	t.is(entry.length, 2);
	t.is(entry[entry.length - 1], testEntry[0]);
});

test('tools/appendEntries array', t => {
	const entry = appendEntries(testEntry, ['foo.js', 'test.js']);
	t.is(entry.length, 3);
	t.is(entry[entry.length - 1], testEntry[0]);
});

test('tools/appendEntries ignore unexpected values', t => {
	const entry = appendEntries(testEntry[0], undefined);
	t.is(entry.length, 2);
	t.is(entry[entry.length - 1], testEntry[0]);
});

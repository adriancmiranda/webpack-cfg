import test from 'ava-spec';
import { prependEntries } from '../tools';

const testEntry = [
	'webpack-dev-server/client?http://localhost:3000',
	'webpack/hot/only-dev-server',
];

test('tools/prependEntries object', t => {
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
	let entry = prependEntries(testEntry, inputEntry);
	t.is(entry.stats.length, expectedStatsLength);
	t.is(entry.stats[0], testEntry[0]);
	t.is(entry.stats[1], testEntry[1]);
	t.is(entry.stats[2], './source/stats.json');
	t.is(entry.index.length, expectedIndexLength);
	t.is(entry.index[0], testEntry[0]);
	t.is(entry.index[1], testEntry[1]);
	t.is(entry.index[2], './source/index.js');
	t.is(entry.main.length, expectedMainLength);
	t.is(entry.main[0], testEntry[0]);
	t.is(entry.main[1], testEntry[1]);
	t.is(entry.main[2], './source/index.scss');
	inputEntry.index.splice(0, 2);
	delete inputEntry.stats;
	delete inputEntry.main;
	entry = prependEntries(testEntry, inputEntry);
	t.is(entry.index.length, expectedIndexLength);
	t.is(entry.index[0], testEntry[0]);
	t.is(entry.index[1], testEntry[1]);
});

test('tools/prependEntries string', t => {
	let entry = prependEntries(testEntry, 'foo.js');
	t.is(entry.length, 3);
	t.is(entry[0], testEntry[0]);
	t.is(entry[1], testEntry[1]);

	entry = prependEntries('server/action.js', 'main.js');
	t.is(entry.length, 2);
	t.is(entry[0], 'server/action.js');
});

test('tools/prependEntries array', t => {
	const entry = prependEntries(testEntry, ['foo.js', 'test.js']);
	t.is(entry.length, 4);
	t.is(entry[0], testEntry[0]);
	t.is(entry[1], testEntry[1]);
});

test('tools/prependEntries ignore unexpected values', t => {
	const entry = prependEntries(testEntry, undefined);
	t.is(entry.length, 3);
	t.is(entry[0], testEntry[0]);
	t.is(entry[1], testEntry[1]);
});

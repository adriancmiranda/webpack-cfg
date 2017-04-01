import test from 'ava-spec';
import { mergeEntries } from '../tools';

test('tools/mergeEntries should work', t => {
	const pugEntry = './source/index.pug';
	const txtEntry = ['./source/index.txt'];
	const jsonEntry = {
		stats: './source/stats.json',
	};
	const jsEntry = {
		index: ['./source/index.js'],
	};
	const cssEntry = {
		main: './source/index.scss',
	};
	const htmlEntry = {
		index: ['./source/index.html', './source/mobile.html'],
	};
	const entry = mergeEntries(pugEntry, txtEntry, jsonEntry, jsEntry, cssEntry, htmlEntry);
	t.truthy(entry.index.length === 3, 'Got two "index" entries.');
	t.truthy(entry.index.indexOf(jsEntry.index[0]) > -1, `entry.index: "${jsEntry.index[0]}" exists`);
	t.truthy(entry.index.indexOf(htmlEntry.index[0]) > -1, `entry.index: "${htmlEntry.index[0]}" exists`);
	t.truthy(entry.index.indexOf(htmlEntry.index[1]) > -1, `entry.index: "${htmlEntry.index[1]}" exists`);
	t.truthy(entry.main.length === 3, 'Got three "main" entries.');
	t.truthy(entry.main.indexOf(pugEntry) > -1, `entry.main: "${pugEntry}" exists`);
	t.truthy(entry.main.indexOf(txtEntry[0]) > -1, `entry.main: "${txtEntry[0]}" exists`);
	t.truthy(entry.main.indexOf(cssEntry.main) > -1, `entry.main: "${cssEntry.main}" exists`);
	t.is(entry.stats, jsonEntry.stats, 'Got one "stats" entry.');
});

test('tools/mergeEntries should validate', t => {
	const wrongEntry = {
		index: {
			file: 'wrong-entry.js',
		},
	};
	const error = t.throws(() => {
		mergeEntries('foo.js', wrongEntry);
	}, TypeError);
	t.is(error.message, 'An entry has a invalid type.');
});

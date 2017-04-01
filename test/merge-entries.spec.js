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
  t.truthy(entry.index.length === 3, 'You got two "index" entries.');
  t.truthy(entry.stats.length === jsonEntry.stats.length, 'You got one "stats" entry.');
  t.truthy(entry.main.length === 3, 'You got three "main" entries.');
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

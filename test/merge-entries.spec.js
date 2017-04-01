import test from 'ava-spec';
import { mergeEntries } from '../tools';

test('tools/mergeEntries', t => {
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

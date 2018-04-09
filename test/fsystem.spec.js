import path from 'path';
import test from 'ava-spec';
import { fsystem } from '../tools';

test('tools/fsystem', t => {
	t.is(toString.call(fsystem), '[object Object]');
	t.is(toString.call(fsystem.isDirectory), '[object Function]');
	t.is(toString.call(fsystem.isFile), '[object Function]');
	t.is(toString.call(fsystem.dirs), '[object Function]');
	t.is(toString.call(fsystem.tree), '[object Function]');
	t.is(toString.call(fsystem.aliases), '[object Function]');
	t.is(fsystem.isDirectory(`${__dirname}/templates`), true);
	t.is(fsystem.isDirectory(`${__dirname}/abc`), false);
	t.is(fsystem.isFile(`${__dirname}/flatten.spec.js`), true);
	t.is(fsystem.isFile(`${__dirname}/abc.py`), false);
	t.deepEqual(fsystem.aliases(__dirname, { prefix: '@' }), {
		'@': __dirname,
		'@configs': `${__dirname}/configs`,
		'@templates': `${__dirname}/templates`,
	});
	t.deepEqual(fsystem.aliases(__dirname, { main: '__init__.js' }), {
		'~': `${__dirname}/__init__.js`,
		configs: `${__dirname}/configs/__init__.js`,
		templates: `${__dirname}/templates/__init__.js`,
	});
	t.deepEqual(fsystem.aliases(__dirname, { includeOwn: false }), {
		configs: `${__dirname}/configs`,
		templates: `${__dirname}/templates`,
	});
	t.deepEqual(fsystem.aliases(__dirname), {
		'~': __dirname,
		configs: `${__dirname}/configs`,
		templates: `${__dirname}/templates`,
	});
});

import test from 'ava-spec';
import { parseArgv } from '../tools';

test('tools/parseArgv params', t => {
	t.is(toString.call(parseArgv), '[object Function]');
	t.deepEqual(parseArgv(1), {});
	t.deepEqual(parseArgv(null), {});
	t.deepEqual(parseArgv(undefined), {});
	t.deepEqual(parseArgv('foo'), {});
	t.deepEqual(parseArgv([
		'/usr/local/bin/node',
		'script.js',
		'--path=script.js',
		'--version=1.0.0'
	]), {
		path: 'script.js',
		version: '1.0.0',
	});
});

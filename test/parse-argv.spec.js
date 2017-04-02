import test from 'ava-spec';
import { parseArgv } from '../tools';

test('tools/parseArgv params', t => {
	t.deepEqual(parseArgv.params(1), {});
	t.deepEqual(parseArgv.params(null), {});
	t.deepEqual(parseArgv.params(undefined), {});
	t.deepEqual(parseArgv.params('foo'), {});
	t.deepEqual(parseArgv.params({ env: 'development', run: 'client-watch,server-watch' }), {
		env: 'development',
		run: ['client-watch', 'server-watch']
	});
	t.deepEqual(parseArgv.params({ dev: true, run: 'client-watch,server-watch' }), {
		dev: true,
		run: ['client-watch', 'server-watch']
	});
	t.deepEqual(parseArgv.params({ env: 'production,test', run: 'client-watch' }), {
		env: ['production', 'test'],
		run: 'client-watch'
	});
});

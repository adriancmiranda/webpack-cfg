import test from 'ava-spec';
import { parseEnv } from '../tools';

test('tools/parseEnv params', t => {
	t.deepEqual(parseEnv.params(1), {});
	t.deepEqual(parseEnv.params(null), {});
	t.deepEqual(parseEnv.params(undefined), {});
	t.deepEqual(parseEnv.params('foo'), {});
	t.deepEqual(parseEnv.params({ env: 'development', run: 'client-watch,server-watch' }), {
		env: 'development',
		run: ['client-watch', 'server-watch']
	});
	t.deepEqual(parseEnv.params({ dev: true, run: 'client-watch,server-watch' }), {
		dev: true,
		run: ['client-watch', 'server-watch']
	});
	t.deepEqual(parseEnv.params({ env: 'production,test', run: 'server-watch,client-watch' }), {
		env: ['production', 'test'],
		run: ['server-watch', 'client-watch'],
	});
});

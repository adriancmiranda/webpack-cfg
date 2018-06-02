import test from 'ava-spec';
import { parseEnv } from '../tools';

test('tools/parseEnv params', t => {
	t.deepEqual(parseEnv(1), {});
	t.deepEqual(parseEnv(null), {});
	t.deepEqual(parseEnv(undefined), {});
	t.deepEqual(parseEnv(), {});
	t.deepEqual(parseEnv('foo'), {});
	t.deepEqual(parseEnv({ env: 'development', run: 'client-watch,server-watch' }), {
		env: 'development',
		run: ['client-watch', 'server-watch']
	});
	t.deepEqual(parseEnv({ dev: true, run: 'client-watch,server-watch' }), {
		dev: true,
		run: ['client-watch', 'server-watch']
	});
	t.deepEqual(parseEnv({ env: 'production,test', run: 'server-watch,client-watch' }), {
		env: ['production', 'test'],
		run: ['server-watch', 'client-watch'],
	});
	t.deepEqual(parseEnv.definitions({ env: 'production,test', run: 'server-watch,client-watch' }), {
		env: '"production,test"',
		run: '"server-watch,client-watch"',
	});
});

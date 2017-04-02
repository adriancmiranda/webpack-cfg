import test from 'ava-spec';
import { parseArgv } from '../tools';

test('tools/parseArgv params', t => {
	t.is(parseArgv.params(1), 1);
	t.is(parseArgv.params('foo'), 'foo');
	t.deepEqual(parseArgv.params(null), null);
	t.deepEqual(parseArgv.params(undefined), {});
	t.deepEqual(parseArgv.params({ run: 'client-watch,server-watch' }), {
		run: ['client-watch', 'server-watch']
	});
	t.deepEqual(parseArgv.params({ dev:true, run: 'client-watch,server-watch' }), {
		run: ['client-watch', 'server-watch'], dev: true
	});
	t.deepEqual(parseArgv.params({ run: 'client-watch' }), {
		run: ['client-watch']
	});
});

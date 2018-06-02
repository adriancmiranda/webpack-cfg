import test from 'ava-spec';
import { WebpackCfgError } from '../errors';
import { alias } from '../tools';

test('tools/alias', t => {
	const src = alias('./source');
	t.is(toString.call(src), '[object Function]');
	t.is(src(), 'source');
	t.is(src('index.js'), 'source/index.js');
	t.is(src('core', 'index.js'), 'source/core/index.js');
	t.is(src('core', 'facade', 'index.js'), 'source/core/facade/index.js');
	const err = t.throws(() => {
		src(1);
	}, WebpackCfgError);
	t.is(err.code, 500);
	t.is(toString.call(err.message), '[object String]');
	t.true(err.message.startsWith('The "path" argument must be of type string'));
});

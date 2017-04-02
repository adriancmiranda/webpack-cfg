import test from 'ava-spec';
import { alias } from '../tools';

test('tools/alias', t => {
	const src = alias('./source');
	t.is(toString.call(src), '[object Function]');
	t.is(src(), 'source');
	t.is(src('index.js'), 'source/index.js');
	t.is(src('core', 'index.js'), 'source/core/index.js');
	t.is(src('core', 'facade', 'index.js'), 'source/core/facade/index.js');
});

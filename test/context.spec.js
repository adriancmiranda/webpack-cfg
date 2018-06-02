import test from 'ava-spec';
import { WebpackCfgError } from '../errors';
import { context } from '../tools';

test('tools/context', t => {
	const ctx = context(process.cwd());
	const src = context('source');
	t.is(toString.call(ctx), '[object Function]');
	t.is(toString.call(src), '[object Function]');
	t.is(ctx(), process.cwd());
	t.is(src(), 'source');
	t.is(ctx('test'), './test');
	t.is(src('foo'), './../foo');
	t.is(src(1), 'source');
	t.is(ctx(1), process.cwd());
});

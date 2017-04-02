import test from 'ava-spec';
import { absAlias } from '../tools';

test('tools/absAlias', t => {
	const src = absAlias(process.cwd());
	t.is(toString.call(src), '[object Function]');
	t.is(src(), process.cwd());
	t.is(src('index.js'), `${process.cwd()}/index.js`);
	t.is(src('core', 'index.js'), `${process.cwd()}/core/index.js`);
	t.is(src('core', 'facade', 'index.js'), `${process.cwd()}/core/facade/index.js`);
});

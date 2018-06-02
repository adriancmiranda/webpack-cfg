import test from 'ava-spec';
import { sep } from 'path';
import { WebpackCfgError } from '../errors';
import { absAlias } from '../tools';

test('tools/absAlias', t => {
	const src = absAlias(process.cwd());
	t.is(toString.call(src), '[object Function]');
	t.is(src(), process.cwd());
	t.is(src('index.js'), `${process.cwd()}${sep}index.js`);
	t.is(src('core', 'index.js'), `${process.cwd()}${sep}core${sep}index.js`);
	t.is(src('core', 'facade', 'index.js'), `${process.cwd()}${sep}core${sep}facade${sep}index.js`);
	const err = t.throws(() => {
		src(1);
	}, WebpackCfgError);
	t.is(err.code, 500);
	t.is(toString.call(err.message), '[object String]');
	t.true(err.message.startsWith('The "path" argument must be of type string'));
});

import test from 'ava-spec';
import { WebpackCfgError } from '../errors';

test('tools/WebpackCfgError', t => {
	t.is(toString.call(WebpackCfgError), '[object Function]');
	// t.throws(new WebpackCfgError(err));
});
import test from 'ava-spec';
import { getNodePaths } from '../tools';

test('tools/get-node-paths', t => {
	t.is(toString.call(getNodePaths), '[object Function]');
});

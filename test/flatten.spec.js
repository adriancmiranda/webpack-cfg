import test from 'ava-spec';
import { flatten } from '../tools';

test('tools/flatten', t => {
	t.is(toString.call(flatten), '[object Function]');
	t.deepEqual(flatten([ [1,2,3], [4],[5] ]), [1,2,3,4,5]);
	t.deepEqual(flatten([ [1,2,3], [[4],[5]] ], true), [1,2,3,4,5]);
	t.deepEqual(flatten([1,2,3,4,5]), [1,2,3,4,5]);
});

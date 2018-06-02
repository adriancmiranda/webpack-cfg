import test from 'ava-spec';
import { interpolate } from '../tools';

test('tools/interpolate', t => {
	t.is(toString.call(interpolate), '[object Function]');
});
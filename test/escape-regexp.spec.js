import test from 'ava-spec';
import { escapeRegExp } from '../tools';

test('tools/escapeRegExp', t => {
	t.is(toString.call(escapeRegExp), '[object Function]');
});
import test from 'ava-spec';
import { CustomError } from '../errors';

test('tools/CustomError', t => {
	t.is(toString.call(CustomError), '[object Function]');
});
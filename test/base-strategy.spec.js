import test from 'ava-spec';
import strategy from '../lib/templates/base-strategy';

test('templates/baseStrategy', t => {
	const target = {
		output: {
			filename: '[name].js'
		}
	};
	// t.deepEqual(strategy(undefined, target), target);
	// t.not(strategy({
	// 	output: {
	// 		filename: '[name].[chunkhash].js',
	// 	}
	// }, target).output.filename, target.output.filename);
});

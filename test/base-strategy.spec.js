import test from 'ava-spec';
import strategy from '../lib/templates/base-strategy';

test('templates/baseStrategy', t => {
	const fromFilename = '[name].js';
	const toFilename = '[name].[chunkhash].js';
	let from = {
		output: {
			filename: fromFilename
		},
		resolve: {
			modules: ['node_modules']
		}
	};
	t.is(strategy(from, {
		output: {
			filename: toFilename,
		}
	}).output.filename, fromFilename, 'object merged');
	t.is(from.output.filename, fromFilename, 'from is a pristine object');
	t.deepEqual(strategy(from.resolve.modules, ['source', 'bower_components']), ['source', 'bower_components', 'node_modules'])
	t.deepEqual(strategy(undefined, from), from);
});

import test from 'ava-spec';
import strategy from '../lib/templates/base-strategy';

const fromFilename = '[name].js';
const toFilename = '[name].[chunkhash].js';
function getPristineObject() {
	return {
		output: {
			filename: fromFilename
		},
		resolve: {
			modules: ['node_modules']
		}
	};
}

test('templates/baseStrategy', t => {
	// let from = getPristineObject();
	// t.not(strategy(from, {
	// 	output: {
	// 		filename: toFilename,
	// 	}
	// }).output.filename, fromFilename, 'object merged');
	// t.is(from.output.filename, toFilename, 'from is a dirty object');

	// from = getPristineObject();
	// t.not(from.output.filename, toFilename, 'from is a pristine object');
	// t.deepEqual(strategy(from.resolve.modules, ['source', 'bower_components']), ['source', 'bower_components', 'node_modules'])
	// console.log(from)
	// t.deepEqual(strategy(undefined, from), from);
});

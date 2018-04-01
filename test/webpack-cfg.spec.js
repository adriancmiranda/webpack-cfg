import path from 'path';
import test from 'ava-spec';
import webpackCfg from '../';

const stringSingleTask = './configs/server-test.js';
const clientTasks = './configs/client-*.js';
const serverTasks = './configs/server-*.js';
const objectTasks = {
	client: clientTasks,
	server: serverTasks
};

test('tools/webpackCfg pattern of non-existent files', t => {
	const pattern = './inexistent/file.js';
	const err = t.throws(() => {
		webpackCfg({ foo: pattern });
	}, Error);
	t.is(err.message, `Nothing was found on "${pattern}" pattern.`);
});

test('tools/webpackCfg non-existent "run" property', t => {
	const component = webpackCfg(clientTasks);
	let config;
	const err = t.throws(() => {
		config = component.setConfig({ run: undefined }, () => {});
	}, TypeError);
	t.is(config, undefined, 'Has no config on demand.');
	t.is(err.message, [
		'Could not configure your webpack with this settings.',
		'Please, define the "run" property with any task filename previously registered to get a setting.',
	].join(' '));
});

test.todo('Make a glob alias to call tasks');
test('tools/webpackCfg count injections', t => {
	const config = webpackCfg(objectTasks, () => {});
	t.is(config({
		run: [
			// 3 for client
			'client-test',
			'client-watch',
			'client-build',
			// 3 for server
			'server-test',
			'server-watch',
			'server-build',
		].join(',')
	}).length, (Object.keys(objectTasks).length * 3));
});

test('tools/webpackCfg', t => {
	const component = webpackCfg(stringSingleTask);
	t.is(toString.call(component.setConfig), '[object Function]', 'setConfig method exists');
	t.is(toString.call(component.common), '[object Object]', 'common property exists');
	t.truthy(component.common.cfg && component.common.res, 'common is a dotcfg');
	const config = component.setConfig({ run: 'server-test' }, () => {});
	t.falsy(Array.isArray(config), 'Got a single task.');
	t.is(config.name, 'server:test', 'Got the correct task');
});

test('tools/webpackCfg config function', t => {
	const component = webpackCfg(objectTasks);
	const config = component.setConfig((common, client, server) => {
		t.truthy(common.cfg && common.res, 'common is a dotcfg');
		t.truthy(client.cfg && client.res, 'client is a dotcfg');
		t.truthy(server.cfg && server.res, 'server is a dotcfg');
	});
	t.is(toString.call(config), '[object Function]');
	t.truthy(config.common.cfg && config.common.res, 'common is externally accessible');
	t.truthy(config.client.cfg && config.client.res, 'client is externally accessible');
	t.truthy(config.server.cfg && config.server.res, 'server is externally accessible');
});

test('tools/webpackCfg config', t => {
	const component = webpackCfg(objectTasks);
	const argv = { dev: true, run: ['client-build'] };
	const config = component.setConfig(argv, (common, client, server) => {
		t.truthy(common.cfg && common.res, 'common is a dotcfg');
		t.truthy(client.cfg && client.res, 'client is a dotcfg');
		t.truthy(server.cfg && server.res, 'server is a dotcfg');
		common.cfg('lifecycle', process.env.npm_lifecycle_event);
		common.cfg('cwd', process.cwd());
		t.is(toString.call(common.cfg('cwd')), '[object Function]', 'cwd from strategy works');
		common.cfg('context', process.cwd());
		t.is(toString.call(common.cfg('context')), '[object Function]', 'prefix context from strategy works');
		common.cfg('path.public', 'public');
		t.is(toString.call(common.cfg('path.public')), '[object Function]', 'prefix path from strategy works');
		common.cfg('path.output', 'dist');
		t.is(toString.call(common.cfg('path.output')), '[object Function]', 'prefix path from strategy works');
		common.cfg('path.assets', 'assets');
		t.is(toString.call(common.cfg('path.assets')), '[object Function]', 'prefix path from strategy works');
		common.cfg('path.scripts', common.res('path.assets', 'core'));
		t.is(toString.call(common.cfg('path.scripts')), '[object Function]', 'prefix path from strategy works');
		common.cfg('build.publicPath', 'dist');
		t.truthy(common.cfg('build.publicPath'), 'dist');
		client.cfg('path.scripts', 'source/scripts');
		t.truthy(client.cfg('path.scripts'), 'source/scripts');
		client.cfg('script.entry.index', 'client.js');
		client.cfg('style.entry.index', 'theme.css');
	});
	t.is(toString.call(config), '[object Object]', 'Getting a single task');
	t.is(config.entry.index.length, 2);
	t.is(config.entry.index[0], './public/client.js');
	t.is(config.entry.index[1], './public/theme.css');
	t.is(config.name, 'client:build', 'Got the correct task');
	t.is(config.devtool, false, 'Got the correct devtool');
	t.is(config.target, 'web', 'Got the correct target');
	t.is(config.context, process.cwd(), 'Got the correct context');
	t.is(config.output.path, path.join(process.cwd(), 'dist'), 'Got the correct output.path');
	t.is(config.output.publicPath, 'dist', 'Got the correct output.publicPath');
	t.is(config.output.filename, 'source/scripts/[name].[chunkhash].js', 'Got the correct output.filename');
	t.is(config.output.chunkFilename, 'source/scripts/[id].[chunkhash].js', 'Got the correct output.chunkFilename');
	t.deepEqual(config.resolve.alias, undefined, 'Got the correct resolve.alias');
	t.deepEqual(config.resolve.aliasFields, ['browser'], 'Got the correct resolve.aliasFields');
	t.deepEqual(config.resolve.mainFields, ['browser', 'module', 'main'], 'Got the correct resolve.mainFields');
	t.deepEqual(config.resolve.mainFiles, ['index'], 'Got the correct resolve.mainFiles');
	t.deepEqual(config.resolve.descriptionFiles, ['package.json', 'bower.json'], 'Got the correct resolve.descriptionFiles');
	t.deepEqual(config.resolve.modules, [undefined, 'node_modules', undefined], 'Got the correct resolve.modules');
	t.deepEqual(config.resolve.extensions, ['.js', '.json', '.scss', '.pug'], 'Got the correct resolve.extensions');
});

test('tools/webpackCfg multi config', t => {
	const component = webpackCfg(objectTasks);
	const argv = { dev: true, run: ['client-watch', 'server-watch'] };
	const config = component.setConfig(argv, (common, client, server) => {
		t.truthy(common.cfg && common.res, 'common is a dotcfg');
		t.truthy(client.cfg && client.res, 'client is a dotcfg');
		t.truthy(server.cfg && server.res, 'server is a dotcfg');
	});
	t.truthy(Array.isArray(config), 'Got multi tasks');
	t.is(config[0].name, 'client:watch', 'Got the correct task on correct order');
	t.is(config[1].name, 'server:watch', 'Got the correct task on correct order');
});

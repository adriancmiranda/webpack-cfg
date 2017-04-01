import test from 'ava-spec';
import webpackCfg from '../';

const bundler = webpackCfg({
	client: './configs/client-*.js',
	styles: './configs/styles-*.js',
	server: './configs/server-*.js',
});

test('tools/webpackCfg', t => {
	t.is(toString.call(bundler.registerTasks), '[object Function]', 'registerTasks method exists');
	t.is(toString.call(bundler.setConfig), '[object Function]', 'setConfig method exists');
	t.is(toString.call(bundler.common), '[object Object]', 'common property exists');
	t.truthy(bundler.common.cfg && bundler.common.exe, 'common is a dotcfg');
});

test('tools/webpackCfg config function', t => {
	const getConfig = bundler.setConfig((common, styles, server) => {
		t.truthy(common.cfg && common.exe, 'common is a dotcfg');
		t.truthy(styles.cfg && styles.exe, 'styles is a dotcfg');
		t.truthy(server.cfg && server.exe, 'server is a dotcfg');
	});
	t.is(toString.call(getConfig), '[object Function]');
});

test('tools/webpackCfg config', t => {
	const argv = { dev: true, run: ['client-watch'] };
	const getConfig = bundler.setConfig(argv, (common, styles, server) => {
		t.truthy(common.cfg && common.exe, 'common is a dotcfg');
		t.truthy(styles.cfg && styles.exe, 'styles is a dotcfg');
		t.truthy(server.cfg && server.exe, 'server is a dotcfg');
	});
	// t.is(toString.call(getConfig), '[object Object]');
});

test('tools/webpackCfg multi config', t => {
	const argv = { dev: true, run: ['client-watch', 'server-watch'] };
	const getConfig = bundler.setConfig(argv, (common, styles, server) => {
		t.truthy(common.cfg && common.exe, 'common is a dotcfg');
		t.truthy(styles.cfg && styles.exe, 'styles is a dotcfg');
		t.truthy(server.cfg && server.exe, 'server is a dotcfg');
	});
	// t.truthy(Array.isArray(getConfig), '');
});

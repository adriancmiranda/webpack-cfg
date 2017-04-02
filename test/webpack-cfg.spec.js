import test from 'ava-spec';
import webpackCfg from '../';

const tasks = {
	client: './configs/client-*.js',
	server: './configs/server-*.js'
};
const component = webpackCfg(tasks);

test('tools/webpackCfg', t => {
	t.is(toString.call(component.registerTasks), '[object Function]', 'registerTasks method exists');
	t.is(toString.call(component.setConfig), '[object Function]', 'setConfig method exists');
	t.is(toString.call(component.common), '[object Object]', 'common property exists');
	t.truthy(component.common.cfg && component.common.exe, 'common is a dotcfg');
	const config = component.setConfig({}, () => {});
	t.is(config.length, Object.keys(tasks).length * 3, 'Got all tasks');
});

test('tools/webpackCfg config function', t => {
	const config = component.setConfig((common, client, server) => {
		t.truthy(common.cfg && common.exe, 'common is a dotcfg');
		t.truthy(client.cfg && client.exe, 'client is a dotcfg');
		t.truthy(server.cfg && server.exe, 'server is a dotcfg');
	});
	t.is(toString.call(config), '[object Function]');
	t.truthy(config.common.cfg && config.common.exe, 'common is externally accessible');
	t.truthy(config.client.cfg && config.client.exe, 'client is externally accessible');
	t.truthy(config.server.cfg && config.server.exe, 'server is externally accessible');
});

test('tools/webpackCfg config', t => {
	const argv = { dev: true, run: ['client-watch'] };
	const config = component.setConfig(argv, (common, client, server) => {
		t.truthy(common.cfg && common.exe, 'common is a dotcfg');
		t.truthy(client.cfg && client.exe, 'client is a dotcfg');
		t.truthy(server.cfg && server.exe, 'server is a dotcfg');
	});
	t.is(toString.call(config), '[object Object]', 'Getting a single task');
	t.is(config.name, 'client:watch', 'Got the correct task');
});

test('tools/webpackCfg multi config', t => {
	const argv = { dev: true, run: ['client-watch', 'server-watch'] };
	const config = component.setConfig(argv, (common, client, server) => {
		t.truthy(common.cfg && common.exe, 'common is a dotcfg');
		t.truthy(client.cfg && client.exe, 'client is a dotcfg');
		t.truthy(server.cfg && server.exe, 'server is a dotcfg');
	});
	t.truthy(Array.isArray(config), 'Got multi tasks');
	t.truthy(config[0].name, 'client:watch', 'Got the correct task on correct order');
	t.truthy(config[1].name, 'server:watch', 'Got the correct task on correct order');
});

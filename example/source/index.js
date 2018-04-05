/* eslint-disable indent */
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import styles from './_index.scss';

OfflinePluginRuntime.install();

const $el = document.querySelector('[data-ui-view]');
const url = `${window.location.origin}/api/hooray`;

$el.innerHTML += ' ... <br>';
fetch(url).then(response => response.json()).then((json) => {
  $el.classList.add(styles.done);
  $el.innerHTML += `<small>${json.message}</small>`;
  console.log(`${url}:`, json);
}).catch((reason) => {
  $el.classList.add(styles.fail);
  $el.innerHTML += `<small>${reason}</small>`;
  console.error(`${url}:`, reason);
});

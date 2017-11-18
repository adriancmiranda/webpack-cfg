/* eslint-disable indent */
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import styles from './_index.scss';

OfflinePluginRuntime.install();

const $el = document.querySelector('[data-ui-view]');
const urlAPI = `${window.location.origin}/api`;
const urlAPIGreetings = `${window.location.origin}/api/hooray`;
const prefix = $el.innerHTML;

$el.innerHTML += ' ...';
fetch(urlAPI).then(response => response.text()).then((response) => {
  $el.classList.add(styles.done);
  $el.innerHTML = `${prefix}<br><small>${response}</small>`;
  console.log(`${urlAPI}:`, response);
}).catch((reason) => {
  $el.classList.add(styles.fail);
  $el.innerHTML += `<br><small>${reason}</small>`;
  console.error(`${urlAPI}:`, reason);
});

fetch(urlAPIGreetings).then(response => response.json()).then((response) => {
  $el.classList.add(styles.done);
  $el.innerHTML += `<br><small>${response.message}</small>`;
  console.log(`${urlAPIGreetings}:`, response);
}).catch((reason) => {
  $el.classList.add(styles.fail);
  $el.innerHTML += `<br><small>${reason}</small>`;
  console.error(`${urlAPIGreetings}:`, reason);
});

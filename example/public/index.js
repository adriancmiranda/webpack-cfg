/* eslint-disable indent */
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import styles from './_index.scss';

const $el = document.querySelector('[data-ui-view]');
const urlAPI = `${window.location.origin}/api`;
const urlAPIGreetings = `${window.location.origin}/api/hooray`;
const clientStatusMessage = $el.innerHTML;

function fetchAll() {
  OfflinePluginRuntime.install();

  $el.innerHTML += ' ...';
  fetch(urlAPI).then(response => response.text()).then((response) => {
    $el.classList.add('is-done');
    $el.innerHTML = `${clientStatusMessage}<br>${response}...`;
    console.log(`${urlAPI}:`, response);
  }).catch((reason) => {
    $el.classList.add('is-fail');
    $el.innerHTML += `<br><small>${reason}</small>`;
    console.error(`${urlAPI}:`, reason);
  });

  fetch(urlAPIGreetings).then(response => response.json()).then((response) => {
    $el.classList.add('is-done');
    $el.innerHTML += `<br><small class="${styles.data}">${response.message}</small>`;
    console.log(`${urlAPIGreetings}:`, response);
  }).catch((reason) => {
    $el.classList.add('is-fail');
    $el.innerHTML += `<br><small>${reason}</small>`;
    console.error(`${urlAPIGreetings}:`, reason);
  });
}

fetchAll();

if (module.hot) {
  // ========================================================================
  // https://webpack.js.org/api/hot-module-replacement/
  // ========================================================================
  module.hot.accept((err) => {
    if (err) console.error(err);
    else fetchAll();
  });
  module.hot.dispose(() => {
    $el.innerHTML = clientStatusMessage;
  });
}

import data from '../data.json';

let appLanguage = "data"

export function i18n(id) {
  return data[appLanguage][id];
}


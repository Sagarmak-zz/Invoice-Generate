import ENV from './env.js';

export default {
  apiUrl: ENV.url,
  apiKey: ENV.key,

  get(key) {
    return this[key];
  }
}

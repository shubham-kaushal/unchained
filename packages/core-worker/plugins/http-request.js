import { WorkerDirector } from 'meteor/unchained:core-worker';
import { log } from 'meteor/unchained:core-logger';
import fetch from 'isomorphic-unfetch';
import WorkerPlugin from './base';

class HttpRequestWorkerPlugin extends WorkerPlugin {
  static key = 'shop.unchained.worker-plugin.http-request';

  static label = 'Request a resource via http request. 200 = success';

  static version = '1.0';

  static type = 'HTTP_REQUEST';

  static async doWork({ url, data = {}, headers, method = 'post' }) {
    log(`HttpRequestWorkerPlugin -> doWork: ${url} ${data}`, {
      level: 'verbose'
    });

    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', ...headers }
      });

      const result = await res.json();

      if (res.status === 200) {
        return { success: true, result };
      }
      return { success: false, result };
    } catch (err) {
      console.error(err.message); // eslint-disable-line
      return {
        success: false,
        error: err
      };
    }
  }
}

WorkerDirector.registerPlugin(HttpRequestWorkerPlugin);

export default HttpRequestWorkerPlugin;
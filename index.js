/**
 * Class that represents an helper for the construction of a multipart request.
 * @class
 * @example
 *
 * const xhr = new XMLHttpRequest();
 * const multipartData = new MultipartData('multipart/mixed');
 * const header = new Map();
 * const data = { foo: 'bar' };
 * const image = **Binary data to string**;
 *
 * header.set('Content-Type', 'image/jpeg');
 * header.set('Content-Length', image.length);
 * multipartData.append(data, header);
 *
 * header.set('Content-Disposition', 'form-data');
 * header.set('name', 'foo');
 * header.set('filename', 'foo.json');
 * header.set('Content-Type', 'application/json');
 * header.set('Content-Length', data.length);
 * multipartData.append(image, header);
 *
 * xhr.setRequestHeader("Content-type", multipartData.contentType);
 * xhr.send(multipartData.multipartBody);
 */
export default class MultipartData {

  /**
   * Create a MultipartData.
   * @constructor
   * @param {string} [contentType=multipart/form-data] - Content type of the multipart request.
   * @param {string} boundary [boundary=Random boundary] - Boundary of the multipart request.
   */
  constructor(contentType = 'multipart/form-data', boundary) {

    this.jump = '\r\n';

    if (boundary) {

      this.boundary = boundary;

    } else {

      const epochTicks = 621355968000000000;
      const ticksPerMillisecond = 10000;
      const yourTicks = epochTicks + ((new Date).getTime() * ticksPerMillisecond);
      this.boundary = '---------------------------' + yourTicks;

    }

    this.contentType = contentType + '; boundary=' + this.boundary;
    this._iteratorArray = [];

  }

  /**
   * Append a new block in the body of the multipart request.
   * @param {string} data - Content to send.
   * @param {Object|Map} [header] - Metadata of the body to send.
   */
  append(data, header) {

    const boundary = '--' + this.boundary + this.jump;
    let allProperties = '';
    let body = typeof data === 'string' ? data : JSON.stringify(data);

    try {

      if (header instanceof Map === false && header instanceof Object) {

        const headerKeys = Object.keys(header);
        const headerKeysLength = headerKeys.length;

        for (let i = 0; i < headerKeysLength; i++) {
          let key = headerKeys[i];
          let value = header[key];

          allProperties = this._processProperty(allProperties, key, value);
        }

      } else if (header instanceof Map) {

        for (let [key, value] of header) {
          allProperties = this._processProperty(allProperties, key, value);
        }

      } else {
        throw 'The kind of the header param must be Object or Map';
      }


    } catch (exception) {
      console.error(exception);
    }


    body = this.jump + this.jump + body + this.jump;

    this._iteratorArray.push(boundary + allProperties + body);

  }

  /**
   * Get body of the request to send.
   * @return {string}
   */
  get multipartBody() {
    return this._iteratorArray.join(this.jump) + this.boundary + '--';
  }

  /**
   * Get content type of the request to send.
   * @return {string}
   */
  get contenType() {
    return this.contentType;
  }

  *[Symbol.iterator]() {

    const iteratorArray = this._iteratorArray;
    const iteratorLength = iteratorArray.length;

    for (let i = 0; i < iteratorLength; i++) {
      yield iteratorArray[i];
    }

  }

  _processProperty(allProperties, key, value) {

    if (key[0] === key[0].toUpperCase()) {

      if (allProperties) {
        allProperties += this.jump;
      }
      allProperties += key + ': ' + value + '';

    } else {

      allProperties += '; ' + key + '="' + value + '"';

    }

    return allProperties;

  }

}

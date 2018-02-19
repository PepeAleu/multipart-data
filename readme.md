# multipart-data [![Build Status](https://secure.travis-ci.org/PepeAleu/multipart-data.svg?branch=master)](https://travis-ci.org/PepeAleu/multipart-data) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

A minimal helper for you need work with multipart requests.

## Installation

```bash
npm install --save multipart-data
```

### Import

```javascript
import MultipartData from "multipart-data-helper";
```

### Usage

```javascript
const xhr = new XMLHttpRequest();
const multipartData = new MultipartData('multipart/mixed');
const header = new Map();
const data = { foo: 'bar' };
const image = 'Da23sdnn3wun43fskm'; //Binary data to string;

header.set('Content-Type', 'image/jpeg');
header.set('Content-Length', image.length);
multipartData.append(data, header);

header.set('Content-Disposition', 'form-data');
header.set('name', 'foo');
header.set('filename', 'foo.json');
header.set('Content-Type', 'application/json');
header.set('Content-Length', data.length);
multipartData.append(image, header);

xhr.setRequestHeader("Content-type", multipartData.contentType);
xhr.send(multipartData.multipartBody);
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by José Aleu Núñez ([@PepeAleu](https://twitter.com/PepeAleu)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).

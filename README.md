# publishers <sup>[![Version Badge][2]][1]</sup>

[![dependency status][5]][6]
[![dev dependency status][7]][8]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][1]

Provide a package name, get a list of every version, and who published it.

## Example

### CLI

```console
> publishers publishers
┌─────────┬──────────┬────────────────────┬────────────────────────────┐
│ (index) │   name   │       email        │          created           │
├─────────┼──────────┼────────────────────┼────────────────────────────┤
│ v1.0.1  │ 'ljharb' │ 'ljharb@gmail.com' │ '2020-02-04T02:26:10.321Z' │
│ v1.0.0  │ 'ljharb' │ 'ljharb@gmail.com' │ '2020-02-03T21:34:48.957Z' │
└─────────┴──────────┴────────────────────┴────────────────────────────┘
```

```console
> publishers publishers --json
{
	"v1.0.1": {
		"name": "ljharb",
		"email": "ljharb@gmail.com",
		"created": "2020-02-04T02:26:10.321Z"
	},
	"v1.0.0": {
		"name": "ljharb",
		"email": "ljharb@gmail.com",
		"created": "2020-02-03T21:34:48.957Z"
	}
}
```

```console
> publishers publishers --json --sort=asc
{
	"v1.0.0": {
		"name": "ljharb",
		"email": "ljharb@gmail.com",
		"created": "2020-02-03T21:34:48.957Z"
	},
	"v1.0.1": {
		"name": "ljharb",
		"email": "ljharb@gmail.com",
		"created": "2020-02-04T02:26:10.321Z"
	}
}
```

### API
```js
const assert = require('assert');
const { execSync } = require('child_process');
const getPublishers = require('publishers');

const results = getPublishers('publishers').then((results) => {
	assert.deepEqual(
		results,
		JSON.parse(String(execSync('npx publishers --json publishers')))
	);
}).catch((e) => {
	console.error(e);
	process.exit(1);
});
```

[1]: https://npmjs.org/package/publishers
[2]: https://versionbadg.es/ljharb/publishers.svg
[5]: https://david-dm.org/ljharb/publishers.svg
[6]: https://david-dm.org/ljharb/publishers
[7]: https://david-dm.org/ljharb/publishers/dev-status.svg
[8]: https://david-dm.org/ljharb/publishers?type=dev
[11]: https://nodei.co/npm/publishers.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/publishers.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/publishers.svg
[downloads-url]: https://npm-stat.com/charts.html?package=publishers

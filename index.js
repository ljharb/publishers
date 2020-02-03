'use strict';

const pacote = require('pacote');
const semverCompare = require('semver/functions/compare-build');
const fromEntries = require('object.fromentries');

const sortAsc = ([a], [b]) => semverCompare(a, b);
const sortDesc = ([a], [b]) => -semverCompare(a, b);

module.exports = async function getPublishers(packageName, ascending = undefined) {
	if (typeof packageName !== 'string' || packageName.length === 0) {
		throw new TypeError('`packageName` must be a non-empty string');
	}
	if (arguments.length > 1 && typeof ascending !== 'boolean') {
		throw new TypeError('`ascending` must be `true` or `false`');
	}
	const packument = await pacote.packument(packageName, { fullMetadata: true });
	const entries = Object.entries(packument.versions)
		.map(([v, { _npmUser: u }]) => [`v${v}`, { ...u, created: packument.time[v] }])
		.sort(ascending ? sortAsc : sortDesc);
	return fromEntries(entries);
};

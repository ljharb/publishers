'use strict';

const test = require('tape');
const Test = require('tape/lib/test');
const inspect = require('object-inspect');

const getPublishers = require('..');

// eslint-disable-next-line max-params
Test.prototype.rejects = function (fn, expected, msg, extra) {
	return new Promise((resolve) => resolve(fn())).then(
		() => {
			throw new SyntaxError('expected promise to reject; it fulfilled');
		},
		(err) => {
			this.throws(() => { throw err; }, expected, msg, extra);
		},
	);
};

test('arguments', async (t) => {
	await t.rejects(() => getPublishers(), TypeError, 'first argument must be a string');

	await Promise.all([
		undefined,
		null,
		true,
		false,
		NaN,
		0,
		Infinity,
		{},
		[],
	].map((nonString) => t.rejects(
		() => getPublishers(nonString),
		TypeError,
		`first argument must be a string, got ${inspect(nonString)}`,
	)));

	return Promise.all([
		undefined,
		null,
		NaN,
		0,
		Infinity,
		42,
		'',
		'true',
		[],
		{},
	].map((nonBoolean) => t.rejects(
		() => getPublishers('foo', nonBoolean),
		TypeError,
		`second argument must be a boolean, got ${inspect(nonBoolean)}`,
	)));
});

test('known package', async (t) => {
	var pkg = 'just-next-tick';
	const [
		noSort,
		desc,
		asc,
	] = await Promise.all([
		getPublishers(pkg),
		getPublishers(pkg, false),
		getPublishers(pkg, true),
	]);

	t.deepEqual(noSort, desc, 'default sort order matches “descending”');

	t.deepEqual(desc, {
		'v2.0.0': { name: 'nj48', email: 'spam@njohnson.me', created: '2016-03-22T23:48:46.602Z' },
		'v0.0.1-security': { name: 'npm', email: 'npm@npmjs.com', created: '2016-03-23T22:10:13.754Z' },
		'v0.0.0': { name: 'npm', email: 'support@npmjs.com', created: '2013-10-29T03:23:41.377Z' },
	}, 'desc matches expected info');
	t.deepEqual(Object.keys(desc), ['v2.0.0', 'v0.0.1-security', 'v0.0.0'], 'desc versions are in proper order');

	t.deepEqual(asc, {
		'v0.0.0': { name: 'npm', email: 'support@npmjs.com', created: '2013-10-29T03:23:41.377Z' },
		'v0.0.1-security': { name: 'npm', email: 'npm@npmjs.com', created: '2016-03-23T22:10:13.754Z' },
		'v2.0.0': { name: 'nj48', email: 'spam@njohnson.me', created: '2016-03-22T23:48:46.602Z' },
	}, 'asc matches expected info');
	t.deepEqual(Object.keys(asc), ['v0.0.0', 'v0.0.1-security', 'v2.0.0'], 'asc versions are in proper order');
});

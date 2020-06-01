/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import DestroyableBindable from '../DestroyableBindable';
import List from '../List';
import Map from '../Map';
import ReadonlyCollection from '../ReadonlyCollection';
import Set from '../Set';
import AbstractCounter from './AbstractCounter';
import {countList, default as ListCounter} from './list';
import {countMap, default as MapCounter} from './map';
import {countSet, default as SetCounter} from './set';

/**
 * Creates a counter matching the source collection type.
 * @param source Source collection.
 * @param test Filtering criteria.
 * @param config Counter configuration.
 * @returns Collection counter.
 */
export function createCounter<T>(source: ReadonlyCollection<T>, test: (item: T) => any,
                                 config?: AbstractCounter.Config): AbstractCounter<T> {
	return (source instanceof List) ? new ListCounter(source, test, config) :
		(source instanceof Map) ? new MapCounter(source, test, config) :
			(source instanceof Set) ? new SetCounter(source, test, config) : null;
}

/**
 * Counts matching items in a collection and starts synchronization.
 * @param source Source collection.
 * @param test Filtering criteria.
 * @param scope Call scope of %test function.
 * @returns Count of matching items.
 */
export function countCollection<T>(source: ReadonlyCollection<T>, test: (item: T) => any,
                                   scope?: any): DestroyableBindable<number> {
	return (source instanceof List) ? countList(source, test, scope) :
		(source instanceof Map) ? countMap(source, test, scope) :
			(source instanceof Set) ? countSet(source, test, scope) : null;
}

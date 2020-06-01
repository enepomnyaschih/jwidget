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

import DestroyableReadonlyCollection from '../DestroyableReadonlyCollection';
import List from '../List';
import Map from '../Map';
import ReadonlyCollection from '../ReadonlyCollection';
import Set from '../Set';
import AbstractFilterer from './AbstractFilterer';
import {default as ListFilterer, filterList} from './list';
import {default as MapFilterer, filterMap} from './map';
import {default as SetFilterer, filterSet} from './set';

/**
 * Creates a filterer matching the source collection type.
 * @param source Source collection.
 * @param test Filtering criteria.
 * @param scope Filterer configuration.
 * @returns Collection filterer.
 */
export function createFilterer<T>(source: ReadonlyCollection<T>, test: (item: T) => any,
                                  scope?: any): AbstractFilterer<T> {
	return (source instanceof List) ? new ListFilterer(source, test, {scope}) :
		(source instanceof Map) ? new MapFilterer(source, test, {scope}) :
			(source instanceof Set) ? new SetFilterer(source, test, {scope}) : null;
}

/**
 * Filters a collection and starts synchronization.
 * @param source Source collection.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target collection.
 */
export function filterCollection<T>(source: ReadonlyCollection<T>, test: (item: T) => any,
                                    scope?: any): DestroyableReadonlyCollection<T> {
	return (source instanceof List) ? filterList(source, test, scope) :
		(source instanceof Map) ? filterMap(source, test, scope) :
			(source instanceof Set) ? filterSet(source, test, scope) : null;
}

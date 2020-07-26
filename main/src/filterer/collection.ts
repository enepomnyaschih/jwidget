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

import DestroyableReadonlyBindableCollection from '../DestroyableReadonlyBindableCollection';
import BindableArray from '../BindableArray';
import BindableMap from '../BindableMap';
import ReadonlyBindableCollection from '../ReadonlyBindableCollection';
import BindableSet from '../BindableSet';
import AbstractFilterer from './AbstractFilterer';
import {default as ArrayFilterer, filterArray} from './array';
import {default as MapFilterer, filterMap} from './map';
import {default as SetFilterer, filterSet} from './set';

/**
 * Creates a filterer matching the source collection type.
 * @param source Source collection.
 * @param test Filtering criteria.
 * @param scope Filterer configuration.
 * @returns Collection filterer.
 */
export function createFilterer<T>(source: ReadonlyBindableCollection<T>, test: (item: T) => any,
								  scope?: any): AbstractFilterer<T> {
	return (source instanceof BindableArray) ? new ArrayFilterer(source, test, {scope}) :
		(source instanceof BindableMap) ? new MapFilterer(source, test, {scope}) :
			(source instanceof BindableSet) ? new SetFilterer(source, test, {scope}) : null;
}

/**
 * Filters a collection and starts synchronization.
 * @param source Source collection.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target collection.
 */
export function filterCollection<T>(source: ReadonlyBindableCollection<T>, test: (item: T) => any,
									scope?: any): DestroyableReadonlyBindableCollection<T> {
	return (source instanceof BindableArray) ? filterArray(source, test, scope) :
		(source instanceof BindableMap) ? filterMap(source, test, scope) :
			(source instanceof BindableSet) ? filterSet(source, test, scope) : null;
}

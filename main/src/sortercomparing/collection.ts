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

import DestroyableReadonlyList from '../DestroyableReadonlyList';
import List from '../List';
import Map from '../Map';
import ReadonlyCollection from '../ReadonlyCollection';
import Set from '../Set';
import AbstractSorterComparing from './AbstractSorterComparing';
import {default as ListSorterComparing, sortListComparing} from './list';
import {default as MapSorterComparing, sortMapComparing} from './map';
import {default as SetSorterComparing, sortSetComparing} from './set';

/**
 * Creates a sorter (comparing) matching the source collection type.
 * @param source Source collection.
 * @param config Sorter configuration.
 * @returns Collection sorter (comparing).
 */
export function createSorterComparing<T>(source: ReadonlyCollection<T>,
                                         config?: AbstractSorterComparing.FullConfig<T>): AbstractSorterComparing<T> {
	return (source instanceof List) ? new ListSorterComparing(source, config) :
		(source instanceof Map) ? new MapSorterComparing(source, config) :
			(source instanceof Set) ? new SetSorterComparing(source, config) : null;
}

/**
 * Sorts a collection (comparing) and starts synchronization.
 * @param source Source collection.
 * @param config Sorter configuration.
 * @returns Sorted list.
 */
export function sortCollectionComparing<T>(source: ReadonlyCollection<T>,
                                           config?: AbstractSorterComparing.Config<T>): DestroyableReadonlyList<T> {
	return (source instanceof List) ? sortListComparing(source, config) :
		(source instanceof Map) ? sortMapComparing(source, config) :
			(source instanceof Set) ? sortSetComparing(source, config) : null;
}
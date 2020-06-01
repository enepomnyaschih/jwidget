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

import DestroyableReadonlySet from '../DestroyableReadonlySet';
import List from '../List';
import Map from '../Map';
import ReadonlyCollection from '../ReadonlyCollection';
import Set from '../Set';
import AbstractConverterToSet from './AbstractConverterToSet';
import {default as ListConverterToSet, listToSet} from './list';
import {default as MapConverterToSet, mapToSet} from './map';
import {default as SetConverterToSet, setToSet} from './set';

/**
 * Creates a converter to set matching the source collection type.
 * @param source Source collection.
 * @param config Converter configuration.
 * @returns Collection converter to set.
 */
export function createConverterToSet<T>(source: ReadonlyCollection<T>,
                                        config?: AbstractConverterToSet.Config<T>): AbstractConverterToSet<T> {
	return (source instanceof List) ? new ListConverterToSet(source, config) :
		(source instanceof Map) ? new MapConverterToSet(source, config) :
			(source instanceof Set) ? new SetConverterToSet(source, config) : null;
}

/**
 * Converts a collection to set and starts synchronization.
 * @param source Source collection.
 * @returns Target set.
 */
export function collectionToSet<T>(source: ReadonlyCollection<T>): DestroyableReadonlySet<T> {
	return (source instanceof List) ? listToSet(source) :
		(source instanceof Map) ? mapToSet(source) :
			(source instanceof Set) ? setToSet(source) : null;
}

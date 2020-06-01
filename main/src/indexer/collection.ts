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

import DestroyableReadonlyMap from '../DestroyableReadonlyMap';
import List from '../List';
import Map from '../Map';
import Set from '../Set';
import AbstractIndexer from './AbstractIndexer';
import {default as ListIndexer, indexList} from './list';
import {default as MapIndexer, indexMap} from './map';
import {default as SetIndexer, indexSet} from './set';
import ReadonlyCollection from "../ReadonlyCollection";

/**
 * Creates an indexer matching the source collection type.
 * @param source Source collection.
 * @param getKey Indexer function.
 * @param config Indexer configuration.
 * @returns Collection indexer.
 */
export function createIndexer<T>(source: ReadonlyCollection<T>, getKey: (item: T) => any,
                                 config?: AbstractIndexer.Config<T>): AbstractIndexer<T> {
	return (source instanceof List) ? new ListIndexer(source, getKey, config) :
		(source instanceof Map) ? new MapIndexer(source, getKey, config) :
			(source instanceof Set) ? new SetIndexer(source, getKey, config) : null;
}

/**
 * Indexes a collection and starts synchronization.
 * @param source Source collection.
 * @param getKey Indexer function.
 * @param scope Call scope of `getKey` callback.
 * @returns Collection index map.
 */
export function indexCollection<T>(source: ReadonlyCollection<T>, getKey: (item: T) => any,
                                   scope?: any): DestroyableReadonlyMap<T> {
	return (source instanceof List) ? indexList(source, getKey, scope) :
		(source instanceof Map) ? indexMap(source, getKey, scope) :
			(source instanceof Set) ? indexSet(source, getKey, scope) : null;
}

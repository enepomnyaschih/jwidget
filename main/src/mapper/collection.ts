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
import AbstractMapper from './AbstractMapper';
import {default as ListMapper, mapList} from './list';
import {default as MapMapper, mapMap} from './map';
import {default as SetMapper, mapSet} from './set';

/**
 * Creates a mapper matching the source collection type.
 * @param source Source collection.
 * @param create Mapping callback.
 * @param config Mapper configuration.
 * @returns Collection mapper.
 */
export function createMapper<T, U>(source: ReadonlyCollection<T>, create: (sourceValue: T) => U,
                                   config?: AbstractMapper.Config<T, U>): AbstractMapper<T, U> {
	return (source instanceof List) ? new ListMapper(source, create, config) :
		(source instanceof Map) ? new MapMapper(source, create, config) :
			(source instanceof Set) ? new SetMapper(source, create, config) : null;
}

/**
 * Maps a collection and starts synchronization.
 * @param source Source collection.
 * @param create Mapping callback.
 * @param config Mapper configuration.
 * @returns Target collection.
 */
export function mapCollection<T, U>(source: ReadonlyCollection<T>, create: (item: T) => U,
                                    config?: AbstractMapper.Config<T, U>): DestroyableReadonlyCollection<U> {
	return (source instanceof List) ? mapList(source, create, config) :
		(source instanceof Map) ? mapMap(source, create, config) :
			(source instanceof Set) ? mapSet(source, create, config) : null;
}

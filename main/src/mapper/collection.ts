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
import AbstractMapper from './AbstractMapper';
import {default as ArrayMapper, mapArray} from './array';
import {default as MapMapper, mapMap} from './map';
import {default as SetMapper, mapSet} from './set';

/**
 * Creates a mapper matching the source collection type.
 * @param source Source collection.
 * @param create Mapping callback.
 * @param config Mapper configuration.
 * @returns Collection mapper.
 */
export function createMapper<T, U>(source: ReadonlyBindableCollection<T>, create: (sourceValue: T) => U,
								   config?: AbstractMapper.Config<T, U>): AbstractMapper<T, U> {
	return (source instanceof BindableArray) ? new ArrayMapper(source, create, config) :
		(source instanceof BindableMap) ? new MapMapper(source, create, config) :
			(source instanceof BindableSet) ? new SetMapper(source, create, config) : null;
}

/**
 * Maps a collection and starts synchronization.
 * @param source Source collection.
 * @param create Mapping callback.
 * @param config Mapper configuration.
 * @returns Target collection.
 */
export function mapCollection<T, U>(source: ReadonlyBindableCollection<T>, create: (item: T) => U,
									config?: AbstractMapper.Config<T, U>): DestroyableReadonlyBindableCollection<U> {
	return (source instanceof BindableArray) ? mapArray(source, create, config) :
		(source instanceof BindableMap) ? mapMap(source, create, config) :
			(source instanceof BindableSet) ? mapSet(source, create, config) : null;
}

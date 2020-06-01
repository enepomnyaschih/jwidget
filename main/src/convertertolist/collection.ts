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
import AbstractConverterToList from './AbstractConverterToList';
import {default as ListConverterToList, listToList} from './list';
import {default as MapConverterToList, mapToList} from './map';
import {default as SetConverterToList, setToList} from './set';

export function createConverterToList<T>(source: ReadonlyCollection<T>, config: AbstractConverterToList.Config<T>): AbstractConverterToList<T> {
	return (source instanceof List) ? new ListConverterToList(source, config) :
		(source instanceof Map) ? new MapConverterToList(source, config) :
		(source instanceof Set) ? new SetConverterToList(source, config) : null;
}

export function collectionToList<T>(source: ReadonlyCollection<T>): DestroyableReadonlyList<T> {
	return (source instanceof List) ? listToList(source) :
		(source instanceof Map) ? mapToList(source) :
		(source instanceof Set) ? setToList(source) : null;
}

export function collectionAsList<T>(source: ReadonlyCollection<T>): DestroyableReadonlyList<T> {
	return (source instanceof List) ? source :
		(source instanceof Map) ? mapToList(source) :
		(source instanceof Set) ? setToList(source) : null;
}

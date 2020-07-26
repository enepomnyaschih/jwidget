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

import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import BindableArray from '../BindableArray';
import BindableMap from '../BindableMap';
import ReadonlyBindableCollection from '../ReadonlyBindableCollection';
import BindableSet from '../BindableSet';
import AbstractConverterToArray from './AbstractConverterToArray';
import {default as ArrayConverterToArray, arrayToArray} from './array';
import {default as MapConverterToArray, mapToArray} from './map';
import {default as SetConverterToArray, setToArray} from './set';

export function createConverterToArray<T>(
	source: ReadonlyBindableCollection<T>, config: AbstractConverterToArray.Config<T>): AbstractConverterToArray<T> {
	return (source instanceof BindableArray) ? new ArrayConverterToArray(source, config) :
		(source instanceof BindableMap) ? new MapConverterToArray(source, config) :
		(source instanceof BindableSet) ? new SetConverterToArray(source, config) : null;
}

export function collectionToArray<T>(source: ReadonlyBindableCollection<T>): DestroyableReadonlyBindableArray<T> {
	return (source instanceof BindableArray) ? arrayToArray(source) :
		(source instanceof BindableMap) ? mapToArray(source) :
		(source instanceof BindableSet) ? setToArray(source) : null;
}

export function collectionAsArray<T>(source: ReadonlyBindableCollection<T>): DestroyableReadonlyBindableArray<T> {
	return (source instanceof BindableArray) ? source :
		(source instanceof BindableMap) ? mapToArray(source) :
		(source instanceof BindableSet) ? setToArray(source) : null;
}

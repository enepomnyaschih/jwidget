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

import List from '../List';
import Map from '../Map';
import ReadonlyCollection from '../ReadonlyCollection';
import Set from '../Set';
import AbstractObserver from './AbstractObserver';
import ListObserver from './list';
import MapObserver from './map';
import SetObserver from './set';

/**
 * Creates an observer matching the source collection type.
 * @param source Source collection.
 * @param config Observer configuration.
 * @returns Collection observer.
 */
export function createObserver<T>(source: ReadonlyCollection<T>,
                                  config: AbstractObserver.Config<T>): AbstractObserver<T> {
	return (source instanceof List) ? new ListObserver(source, config) :
		(source instanceof Map) ? new MapObserver(source, config) :
			(source instanceof Set) ? new SetObserver(source, config) : null;
}
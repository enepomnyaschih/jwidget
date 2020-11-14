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

import * as ArrayUtils from "../ArrayUtils";
import BindableArray from '../BindableArray';
import Class from "../Class";
import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import IBindableArray from "../IBindableArray";
import IBindableSet from '../IBindableSet';
import {cmp} from "../index";
import IndexCount from "../IndexCount";
import IndexItems from "../IndexItems";
import ReadonlyBindableArray from "../ReadonlyBindableArray";
import ReadonlyBindableSet from '../ReadonlyBindableSet';

/**
 * Sorter (comparing). Builds an array containing the values of a set sorted by a comparer.
 */
export default class SetSorter<T> extends Class {

	private _compare: (x: T, y: T) => number;
	private _order: number;
	private _targetCreated: boolean;
	private _target: IBindableArray<T>;

	/**
	 * @param source Source set.
	 * @param config Sorter configuration.
	 */
	constructor(readonly source: ReadonlyBindableSet<T>, config: SetSorter.FullConfig<T> = {}) {
		super();
		this._compare = config.compare || cmp;
		this._order = config.order || 1;
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new BindableArray<T>(source.silent) : config.target;
		this._splice([], source.native);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * Target array.
	 */
	get target(): ReadonlyBindableArray<T> {
		return this._target;
	}

	/**
	 * Resorts target array forcibly. Call this method on modification of sorting factors.
	 */
	resort() {
		this._target.sortComparing(this._compare, this._order);
	}

	protected destroyObject() {
		this._splice(this.source, []);
		if (this._targetCreated) {
			this._target.destroy();
		}
		this._compare = null;
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableSet.SpliceResult<T>) {
		this._splice(spliceResult.removedValues, spliceResult.addedValues);
	}

	private _onClear(oldContents: ReadonlySet<T>) {
		this._splice(oldContents, []);
	}

	private _splice(removedValues: Iterable<T>, addedValues: Iterable<T>) {
		const removedValuesSorted = [...removedValues].sort((x, y) => this._order * this._compare(x, y));
		const addedValuesSorted = [...addedValues].sort((x, y) => this._order * this._compare(x, y));
		const valuesToRemove = new Array<T>(removedValuesSorted.length);
		const valuesToAdd = new Array<T>(addedValuesSorted.length);
		let iRemoved = 0;
		let iAdded = 0;
		let jRemoved = 0;
		let jAdded = 0;
		// ignore the items which are removed and added at the same time
		while ((iRemoved < removedValuesSorted.length) || (iAdded < addedValuesSorted.length)) {
			const removedValue = removedValuesSorted[iRemoved];
			const addedValue = addedValuesSorted[iAdded];
			const c = cmp(removedValue === undefined, addedValue === undefined) ||
				(this._order * this._compare(removedValue, addedValue));
			if (c < 0) {
				valuesToRemove[jRemoved++] = removedValue;
				++iRemoved;
			} else if (c > 0) {
				valuesToAdd[jAdded++] = addedValue;
				++iAdded;
			} else {
				++iRemoved;
				++iAdded;
			}
		}
		valuesToRemove.splice(jRemoved, valuesToRemove.length - jRemoved);
		valuesToAdd.splice(jAdded, valuesToAdd.length - jAdded);

		let iAdds = 0;
		let addShift = 0;
		const segmentsToRemove: IBindableArray.IndexCount[] = [];
		const segmentsToAdd: IBindableArray.IndexItems<T>[] = [];
		let removeParams: IndexCount = null;
		const lTarget = this.target.length.get();
		for (let iTarget = 0; iTarget < lTarget; ++iTarget) {
			const value = this.target.get(iTarget);
			const index = ArrayUtils.binarySearch(valuesToRemove, x => this._order * this._compare(x, value) > 0) - 1;
			if (valuesToRemove[index] === value) {
				if (!removeParams) {
					removeParams = new IndexCount(iTarget, 0);
					segmentsToRemove.push(removeParams);
				}
				++removeParams.count;
				--addShift;
			} else {
				removeParams = null;
				var addParams = new IndexItems<T>(iTarget + addShift, []);
				while ((iAdds < valuesToAdd.length) && (this._order * this._compare(valuesToAdd[iAdds], value) < 0)) {
					(<any>addParams.items).push(valuesToAdd[iAdds++]);
					++addShift;
				}
				if (addParams.items.length !== 0) {
					segmentsToAdd.push(addParams);
				}
			}
		}
		if (iAdds < valuesToAdd.length) {
			segmentsToAdd.push(new IndexItems<T>(lTarget + addShift, valuesToAdd.slice(iAdds)));
		}
		this._target.trySplice(segmentsToRemove, segmentsToAdd);
	}
}

namespace SetSorter {

	/**
	 * AbstractSorterComparing configuration.
	 */
	export interface Config<T> {
		/**
		 * Item comparing callback.
		 */
		readonly compare?: (x: T, y: T) => number;

		/**
		 * Sorting order. Positive number for ascending sorting, negative for descending sorting. Defaults to 1.
		 */
		readonly order?: number;
	}

	/**
	 * AbstractSorterComparing full configuration.
	 */
	export interface FullConfig<T> extends Config<T> {
		/**
		 * Target array. By default, created automatically.
		 */
		readonly target?: IBindableArray<T>;
	}
}

/**
 * Sorts a set and starts synchronization.
 * @param source Source set.
 * @param config Sorter configuration.
 * @returns Sorted list.
 */
export function startSortingSet<T>(source: ReadonlyBindableSet<T>,
								   config: SetSorter.Config<T> = {}): DestroyableReadonlyBindableArray<T> {
	if (source.silent) {
		const compare = config.compare || cmp,
			order = config.order || 1;
		return new BindableArray([...source].sort((x, y) => order * compare(x, y)), true);
	}
	const target = new BindableArray<T>();
	return target.owning(new SetSorter<T>(source, {
		target,
		compare: config.compare,
		order: config.order
	}));
}

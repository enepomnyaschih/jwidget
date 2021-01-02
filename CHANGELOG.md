# 2.3

Main release goal is to catch up with rapidly developing TypeScript features and default type definitions, avoid naming
conflicts between them and framework API. Secondary goal is to simplify the framework, e.g. delete some parts of the API
that don't complement its nature of being a value binding library, that don't generate significant benefit to
justify their maintenance, that are confusing to the end user.

Specifically:

* Deleted Identifiable interface and iid field from all its subinterfaces and implementations.
* Deleted Dictionary interface and DictionaryUtils. All their usages have been replaced with Map or ReadonlyMap.
* Event:
    * Renamed Event to Dispatcher (to avoid conflict with TypeScript Event).
    * Renamed IEvent to IDispatcher.
    * Renamed dummyEvent to dummyDispatcher.
    * Renamed trigger method to dispatch.
    * Renamed all event getters in all interfaces and classes as follows: changeEvent => onChange.
    * Renamed all event parameter interfaces as follows: ChangeEventParams => ChangeMessage.
* Deleted Reducer and all method variations accepting it.
* Changed runAsync's run's resolve callback to accept PromiseLike instead of Promise.
* View bindings (bindAttr, bindClass etc.):
    * Changed them to accept such elements that implement only a subset of JQuery methods. It makes their testing
    easier.
    * Changed them to accept Bindable/IProperty instances of a specific type (boolean, string) instead of any.
    * Changed bindVal to be generic `bindVal<T extends string | number | string[]>` to be aligned with JQuery.val.
* Added Renderable interface.
* Component:
    * Map is not considered as a renderable collection anymore.
    * Renamed addList to addArray.
    * Renamed addCollection to addSet and changed it to accept ReadonlyBindableSet.
* Changed Destructor's callback to return void instead of any.
* Mapper:
    * Changed listen to accept `Listenable<unknown>` instead of `Listenable<any>`.
    * Changed bind to accept `Bindable<unknown>` instead of `Bindable<any>`.
    * Changed Mapper.ByReducer constructor arguments.
    * Removed mapProperties variation by Reducer.
    * Added mapPropertiesByReducer.
* Router:
    * Added force argument to update method.
    * Removed redirect method.
    * Renamed Router.Redirector to RouteRedirector and extracted it to a separate module.
    * Renamed redirect to redirectRoute and moved it to RouteRedirector module.
    * Renamed Router.Node to RoutingNode and extracted it to a separate module.
* Collections. Their interfaces have been made as close to their native analogues as possible:
    * Deleted ReadonlyCollection, DestroyableReadonlyCollection, ICollection (to emphasize the fact that collections
    are not interchangeable).
    * Deleted getKey getter from all collections (it is not needed anymore).
    * Deleted getKey and scope arguments from all constructors and methods.
    * Deleted index, filter, count, map (to prevent their misuse as synchronizers).
    * Deleted empty, first, clone, toSorted, toSortedComparing, getSortingIndices, getSortingIndicesComparing, toArray,
    toList, toSet, asArray, asList, asSet, removeItem, max, maxComparing, min, minComparing, equal.
    * Replaced flags with silent in all constructors. ADAPTER flag has been deleted.
    * Made all collections iterable (for..of).
    * Renamed ownItems to ownValues ("item" is only applicable to array and means a pair of "index" + "value" now).
    * Changed types of all the majority of dispatchers (simplified).
    * List:
        * Renamed List to BindableArray (for consistency with native Array, BindableMap and BindableSet - see below).
        * Renamed IList to IBindableArray.
        * Renamed ReadonlyList to ReadonlyBindableArray.
        * Renamed DestroyableReadonlyList to DestroyableReadonlyBindableArray.
        * Deleted last, lastIndex, backEvery, binarySearch, toReversed, maxIndex, maxIndexComparing,
        minIndex, minIndexComparing, pop.
        * Renamed items to native and made it a readonly array.
        * Renamed contains to includes (for consistency with native Array).
        * Renamed removeItems to removeValues.
        * Added lastIndexOf, reduceRight.
        * Changed callback semantics in every, some, find, findIndex to return boolean.
        * Changed detectSplice, detectFilter, detectReorder, addAll, reorder, performSplice, performFilter,
        performReorder to accept a readonly array.
        * Changed splice, trySplice to accept iterables as segmentsToRemove and segmentsToAdd.
        * Changed trySet to return a value instead of Some(value).
        * Deleted IBindableArray.EventParams and IBindableArray.ItemsEventParams interfaces.
        * IBindableArray.MoveMessage:
            * Deleted sender.
            * Renamed item to value.
        * IBindableArray.ReplaceMessage:
            * Deleted sender.
            * Renamed oldItem to oldValue.
            * Renamed newItem to newValue.
        * IBindableArray.ReorderMessage:
            * Deleted sender.
            * Renamed items to oldContents and made it a readonly array. 
            * Renamed indexArray to indexMapping and made it a readonly array.
        * IBindableArray.SpliceParams:
            * Renamed removeParamsList to segmentsToRemove and made it a readonly array.
            * Renamed addParamsList to segmentsToAdd and made it a readonly array.
        * IBindableArray.SpliceResolve:
            * Renamed oldItems to oldContents and made it a readonly array.
            * Renamed removedItemsList to removedSegments and made it a readonly array.
            * Renamed addedItemsList to addedSegments and made it a readonly array.
            * Renamed removeParamsList to removeParams and made it a readonly array.
            * Made removedItems, addedItems readonly arrays.
        * Converted IBindableArray.IndexCount interface to a type = `readonly [number, number]`.
        * Converted IBindableArray.IndexItems interface to a type = `readonly [number, readonly T[]]`.
    * Map:
        * Rebased it on native Map, therefore it now can accept any type of key, not just string!
        * Renamed Map to BindableMap (to avoid conflict with native Map).
        * Renamed IMap to IBindableMap.
        * Renamed ReadonlyMap to ReadonlyBindableMap (to avoid conflict with TypeScript ReadonlyMap).
        * Renamed DestroyableReadonlyMap to DestroyableReadonlyBindableMap.
        * Deleted firstKey, contains, every, some, keyOf, find, findKey, reduce, maxKey, maxKeyComparing, minKey, minKeyComparing,
        toDictionary, putAllVerbose, removeItems.
        * Renamed items to native and made it a ReadonlyMap.
        * Renamed length to size.
        * Renamed getKeys to keys and made it an iterator of pairs.
        * Renamed containsKey to has.
        * Renamed put to set.
        * Renamed putAll to setAll and made it accept a ReadonlyMap.
        * Renamed tryPut to trySet.
        * Renamed tryPutAll to trySetAll and made it accept a ReadonlyMap.
        * Added values, entries.
        * Changed detectSplice, detectReindex to accept a ReadonlyMap.
        * Changed removeAll to accept an iterable of keys.
        * Changed clear, tryClear to return a ReadonlyMap.
        * Changed splice, trySplice to accept an iterable of keys and ReadonlyMap of entries.
        * Changed reindex, tryReindex to accept a ReadonlyMap and return a Map.
        * Changed tryRemoveAll to accept an iterable of keys and return a Map.
        * Changed performSplice, performReindex to accept a ReadonlyMap.
        * Deleted IBindableMap.EventParams and all its descendants.
        * IBindableMap.SpliceParams:
            * Renamed removedKeys to keysToRemove and made it an iterable.
            * Renamed updatedItems to entriesToUpdate and made it a ReadonlyMap.
        * IBindableMap.SpliceResult:
            * Renamed removedItems to removedEntries and made it a ReadonlyMap.
            * Renamed addedItems to addedEntries and made it a ReadonlyMap.
    * Set:
        * Rebased it on native Set, therefore it now can accept any type of value, not just Identifiable!
        * Renamed Set to BindableSet (to avoid conflict with native Set).
        * Renamed ISet to IBindableSet.
        * Renamed ReadonlySet to ReadonlyBindableSet (to avoid conflict with TypeScript ReadonlySet).
        * Renamed DestroyableReadonlySet to DestroyableReadonlyBindableSet.
        * Deleted reduce, removeItems.
        * Renamed items to native and made it a ReadonlySet.
        * Renamed length to size.
        * Renamed contains to has.
        * Changed detectSplice to accept an iterable.
        * Changed addAll, tryAddAll to accept an iterable and return a ReadonlySet.
        * Renamed remove to delete.
        * Renamed removeAll to deleteAll, changed it to accept an iterable and return a ReadonlySet.
        * Renamed tryRemoveAll to tryDeleteAll, changed it to accept an iterable and return a ReadonlySet.
        * Changed clear, tryClear to return a ReadonlySet.
        * Changed splice, trySplice to accept iterables.
        * Changed performSplice to accept an iterable.
        * Deleted IBindableSet.EventParams and all its descendants.
        * IBindableSet.SpliceParams:
            * Renamed removedItems to valuesToRemove and made it an iterable.
            * Renamed addedItems to valuesToAdd and made it a ReadonlyMap.
        * IBindableSet.SpliceResult:
            * Renamed removedItems to removedValues and made it a ReadonlySet.
            * Renamed addedItems to addedValues and made it a ReadonlySet.
* Deleted IndexCount, IndexItems classes.
* Collection synchronizers:
    * Moved all collection synchronizers to jwidget/collection folder (to avoid former confusion that all kinds of
    synchronizers are available for all kinds of collections).
    * Converter to Array. This synchronizer ignores value order, so it makes sense to keep it available only for Set.
    Moreover, for Array this synchronizer's behaviour could be confusing to the users. If you happen to use it for Array
    or Map, convert them to a Set and then convert the set to Array:
        * Renamed SetConverterToList to SetConverterToArray.
        * Renamed setToList to startConvertingSetToArray.
        * Deleted AbstractConverterToList, ListConverterToList, listToList, MapConverterToList, mapToList,
        createConverterToList, collectionToList, collectionAsList.
    * Converter to Set. Has been renamed to value/key collector to avoid confusion for Map:
        * Renamed AbstractConverterToSet to AbstractValueCollector.
        * Renamed ListConverterToSet to ArrayValueCollector.
        * Renamed MapConverterToSet to MapValueCollector.
        * Renamed SetConverterToSet to SetValueCollector.
        * Renamed listToSet to startCollectingArrayValues.
        * Renamed mapToSet to startCollectingMapValues.
        * Renamed setToSet to startCollectingSetValues.
        * Added MapKeyCollector, startCollectingMapKeys.
        * Deleted createConverterToSet, collectionToSet.
    * Counter. This synchronizer ignores value order, so it makes sense to keep it available only for Set.
    If you happen to use it for Array or Map, convert them to a Set and then start counting matching items in it.
    Also, its name was confusing, so it was renamed:
        * Renamed SetCounter to SetMatchingValueCounter.
        * Renamed countSet to startCountingMatchingSetValues.
        * Deleted AbstractCounter, ListCounter, countList, MapCounter, countMap, AbstractCounter, createCounter,
        countCollection.
    * Filterer:
        * Renamed ListFilterer to ArrayFilterer.
        * Renamed filterList to startFilteringArray.
        * Renamed filterMap to startFilteringMap.
        * Renamed filterSet to startFilteringSet.
        * Deleted AbstractFilterer, createFilterer, filterCollection.
    * Indexer. This synchronizer ignores value order, so it makes sense to keep it available only for Set.
    If you happen to use it for Array or Map, convert them to a Set and then start indexing it:
        * Renamed indexSet to startIndexingSet.
        * Deleted AbstractIndexer, ListIndexer, indexList, MapIndexer, indexMap, createIndexer, indexCollection.
    * Inserter:
        * Renamed ListInserter to ArrayInserter.
    * Mapper:
        * Renamed ListMapper to ArrayMapper.
        * Renamed mapList to startMappingArray.
        * Renamed mapMap to startMappingMap.
        * Renamed mapSet to startMappingSet.
        * Deleted createMapper, mapCollection.
    * Merger:
        * Renamed ListMerger to ArrayMerger.
        * Renamed mergeLists to startMergingArrays.
        * Deleted mergeNoSync.
    * Observer:
        * Deleted all implementations.
    * Reverser:
        * Renamed ListReverser to ArrayReverser.
        * Renamed reverseList to startReversingArray.
    * Sorter comparing. This synchronizer ignores value order, so it makes sense to keep it available only for Set.
    If you happen to use it for Array or Map, convert them to a Set and then start indexing it:
        * Renamed SetSorterComparing to SetSorter.
        * Renamed sortSetComparing to startSortingSet.
        * Deleted AbstractSorterComparing, ListSorterComparing, sortListComparing, MapSorterComparing, sortMapComparing,
        createSorterComparing, sortCollectionComparing.
* Core utilities:
    * Deleted isUndefined, isDefined, isNull, isNotNull, isNil, isNotNil, isFalsy, isTruthy, isInt, isNumber, isString,
    isBoolean, isFunction, isArray, isRegExp, isDate, def, defn, apply, cmpIdentifiables, get, newIid, iidStr, SILENT,
    ADAPTER, CollectionFlags.
    * Changed smartCmp to stop recognizing Identifiable objects.
* ArrayUtils:
    * Deleted getLast, isEmpty, contains, find, findIndex, max, maxIndex, maxComparing, maxIndexComparing, min,
    minIndex, minComparing, minIndexComparing, count, getSortingIndices, getSortingIndicesComparing, toSorted,
    toSortedComparing, toReversed, index, reduce, add, set, remove, removeAll, removeItem, removeItems,
    clear, splice, reorder, sort, sortComparing, equal, backEvery, tryAddAll, trySet, tryRemoveAll, tryMove, tryClear,
    detectSplice, detectFilter, detectReorder, detectSort, detectSortComparing.
    * Added backForEach.
    * Simplified binarySearch input.
    * Changed isIdentity, invert, merge to accept a readonly array.
    * Changed addAll to accept an iterable as items.
    * Changed trySplice to accept iterables as segmentsToRemove and segmentsToAdd.
    * Changed tryReorder to accept a readonly array as indexArray.
* DomUtils:
    * Changed isTextInput to accept such elements that implement only a subset of JQuery methods. It makes its testing
    easier.
* StringUtils:
    * Deleted htmlEncode, htmlDecode, ellipsis, pad, hyphen.
    * Removed parseClass variation that accepts an array.
* Added IterableUtils: map, filter, count, index.
* Added MapUtils: map, filter, getIterableKeys, getIterableValues.
* Added SetUtils: SetLike, getDifference.
* All framework features have been covered by tests.

# 2.2.1

* Added Babel to the build pipeline to repair IE 11 support.

# 2.2

* :boom: **Breaking change.** Changed jQuery consumption mechanics to ES6 import as opposed to old-fashined import via
&lt;script&gt; tag.
* :boom: **Breaking change.** Changed jWidget compilation target to es2015 to enable async/await support (it however requires the dependent
projects to integrate Babel now - project template is updated).
* :boom: **Breaking change.** Destruction order of Map and Set with item owning flag is no longer reversed (to avoid
memory and performance penalty).
* Changed license to MIT.
* Fixed a mistake in absolute root endpoint handling.
* Upgraded all dependencies.
* Stabilized and modernized the project template.

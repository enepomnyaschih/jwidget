import IClass from '../../IClass';

/**
 * View synchronizer with map. Listens all map events and reduces them to 2 granular functions:
 * item is added with specific key and item is removed with specific key. In optimization purposes,
 * you can define a third function: map is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Unlike JW.AbstractCollection.Observer, tracks items keys.
 * Can be used mainly for DOM-element synchronization with map of child elements.
 *
 * Use [[JW.AbstractMap.createInserter|createInserter]] method to create the synchronizer.
 *
 *     var inserter = map.createInserter({
 *         addItem: function(el, key) { this.el.find("[elkey=" + key + "]").append(el); },
 *         removeItem: function(el, key) { el.detach(); },
 *         scope: this
 *     });
 *
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * Synchronizer rules:
 *
 * - Function [[Inserter.Config.addItem|addItem]]
 * is called for all items of source map on synchronizer initialization.
 * - Function [[Inserter.Config.clearItems|clearItems]]
 * is called for map, or function
 * [[Inserter.Config.removeItem|removeItem]] is called for
 * all items of source map on synchronizer destruction.
 * - On source map reindexing, items keys are synchorinized by callback functions calls.
 *
 * @param T Map item type.
 */
interface IMapInserter extends IClass {
}

export default IMapInserter;

import CssUpdater from './CssUpdater';
import IClass from '../../IClass';
import Property from '../../Property';

/**
 * Watches string modification and updates the specified CSS style of the DOM element.
 * Returns [[JW.UI.CssUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind background color style to color property value
 *     this.own(el.jwcss("background-color", color));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwcss.html"></iframe>
 *
 * @param style CSS style name.
 * @param property Style value.
 */
export function css(el: JQuery, style: string, property: Property<any>): IClass {
	return new CssUpdater(el, style, property);
}

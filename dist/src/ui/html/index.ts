import HtmlUpdater from './HtmlUpdater';
import IClass from '../../IClass';
import Property from '../../Property';

/**
 * Watches string property modification and updates inner HTML of the DOM element.
 * Returns [[JW.UI.HtmlUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind inner HTML to html property value
 *     this.own(el.jwhtml(html));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwhtml.html"></iframe>
 *
 * @param property HTML value.
 */
export function html(el: JQuery, property: Property<string>): IClass {
	return new HtmlUpdater(el, property);
}

import AttrUpdater from './AttrUpdater';
import IClass from '../../IClass';
import Property from '../../Property';

/**
 * Watches string property modification and updates the specified attribute of the DOM element.
 * Returns [[JW.UI.AttrUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind "title" attribute to title property value
 *     this.own(el.jwattr("title", title));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwattr.html"></iframe>
 *
 * @param attr DOM element attribute name.
 * @param property Attribute value.
 */
export default function attr(el: JQuery, attr: string, property: Property<any>): IClass {
	return new AttrUpdater(el, attr, property);
}

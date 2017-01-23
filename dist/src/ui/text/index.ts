import IClass from '../../IClass';
import Property from '../../Property';
import TextUpdater from './TextUpdater';

/**
 * Watches string modification and updates inner text of the DOM element.
 * Returns [[JW.UI.TextUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind inner text to property value
 *     this.own(el.jwtext(text));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwtext.html"></iframe>
 *
 * @param property Text value.
 */
export default function text(el: JQuery, property: Property<string>): IClass {
	return new TextUpdater(el, property);
}

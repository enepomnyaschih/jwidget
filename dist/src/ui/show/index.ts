import IClass from '../../IClass';
import Property from '../../Property';
import VisibleUpdater from './VisibleUpdater';

/**
 * Watches boolean property modification and updates visibility of the DOM element.
 * To make element invisible, sets "display: none" inline style. To make
 * element visible, removes "display" inline style. Make sure that element is visible according to your CSS rules.
 * Returns [[JW.UI.VisibleUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind element visibility to property value
 *     this.own(el.jwshow(checked));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="215" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwshow.html"></iframe>
 *
 * @param property Element visibility.
 */
export function show(el: JQuery, property: Property<boolean>): IClass {
	return new VisibleUpdater(el, property);
}

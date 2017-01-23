import Dictionary from './Dictionary';

/**
 * Result of [[JW.UI.AbstractTemplate.createElement|createElement]] method call.
 * HTML template rendering output. Must expose two public properties: [[root]] and [[groups]].
 */
interface TemplateOutput {
	/**
	 * The rendered element. In a component, it is claimed as component root element.
	 */
	root: HTMLElement;

	/**
	 * Map from jwid to the elements with this jwid.
	 */
	groups: Dictionary<HTMLElement[]>;
}

export default TemplateOutput;

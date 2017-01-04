/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * HTML template. This class compiles the input template only once, and uses element cloning further on to
		 * optimize rendering performance.
		 */
		export class Template extends AbstractTemplate {
			/**
			 * @hidden
			 */
			mirror: HTMLElement = null;

			/**
			 * @hidden
			 */
			groups: JW.Dictionary<number[][]>;

			/**
			 * @param html Input HTML.
			 */
			constructor(public html: string) {
				super();
			}

			/**
			 * @inheritdoc
			 */
			createElement(): TemplateOutput {
				this._compile();
				var root = <HTMLElement>(this.mirror.cloneNode(true));
				var groups: JW.Dictionary<HTMLElement[]> = {};
				for (var index = 0, count = this.ids.length; index < count; ++index) {
					var id = this.ids[index];
					var paths = this.groups[id];
					var groupSize = paths.length;
					var group = new _JW.A(groupSize);
					for (var i = 0; i < groupSize; ++i) {
						var path = paths[i];
						var el = root;
						for (var j = 0, n = path.length; j < n; ++j) {
							el = <HTMLElement>(el.childNodes[path[j]]);
						}
						group[i] = el;
					}
					groups[id] = group;
				}
				return { root: root, groups: groups };
			}

			/**
			 * @hidden
			 */
			_addElement(id: string, el: HTMLElement, path: number[]) {
				this.groups[id] = this.groups[id] || [];
				this.groups[id].push(path.concat());
			}

			/**
			 * @hidden
			 */
			private _compile() {
				if (this.mirror !== null) {
					return;
				}
				this.mirror = parseHtml(this.html);
				this.groups = {};
				this._compileAttributes(this.mirror);
			}
		}

		template(Component, {
			main: '<div></div>'
		});
	}
}

import Bindable from "./Bindable";
import Component from "./Component";
import ReadonlyBindableCollection from "./ReadonlyBindableCollection";

type Renderable = Component | Bindable<Component> | ReadonlyBindableCollection<Component>;

export default Renderable;

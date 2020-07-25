import Bindable from "./Bindable";
import Component from "./Component";
import ReadonlyCollection from "./ReadonlyCollection";

type Renderable = Component | Bindable<Component> | ReadonlyCollection<Component>;

export default Renderable;

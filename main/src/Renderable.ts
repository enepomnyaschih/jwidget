import Bindable from "./Bindable";
import Component from "./Component";
import ReadonlyBindableArray from "./ReadonlyBindableArray";
import ReadonlyBindableSet from "./ReadonlyBindableSet";

type Renderable = Component | Bindable<Component> | ReadonlyBindableArray<Component> | ReadonlyBindableSet<Component>;

export default Renderable;

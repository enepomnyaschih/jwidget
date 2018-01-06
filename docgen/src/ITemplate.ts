import Project from "./Project";

export default interface ITemplate {
	(project: Project): void;
}

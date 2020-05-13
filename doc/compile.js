const fs = require("fs"),
	path = require("path"),
	parseYamlDocProject = require("yaml-doc").default,
	applyBootstrapTemplate = require("yaml-doc-bootstrap").default;

const project = parseYamlDocProject(path.resolve(__dirname, "project.yaml")),
	dist = path.resolve(__dirname, "dist");
fs.rmdirSync(dist, {recursive: true});
applyBootstrapTemplate(project, dist);

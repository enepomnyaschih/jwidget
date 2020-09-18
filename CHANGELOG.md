# 2.2.1

* Added Babel to the build pipeline to repair IE 11 support.

# 2.2

* :boom: **Breaking change.** Changed jQuery consumption mechanics to ES6 import as opposed to old-fashined import via
&lt;script&gt; tag.
* :boom: **Breaking change.** Changed jWidget compilation target to es2015 to enable async/await support (it however requires the dependent
projects to integrate Babel now - project template is updated).
* :boom: **Breaking change.** Destruction order of Map and Set with item owning flag is no longer reversed (to avoid
memory and performance penalty).
* Changed license to MIT.
* Fixed a mistake in absolute root endpoint handling.
* Upgraded all dependencies.
* Stabilized and modernized the project template.

/// <reference path="../../scripts/qunit/qunit.d.ts" />

class TestHelper {
	private _expectedOutput: string[] = [];
	private _expectedOutputIndex: number = 0;

	constructor(private assert: QUnitAssert) {
	}

	close() {
		this._assertOutputFinish();
	}

	setExpectedOutput(...output: string[]) {
		this._assertOutputFinish();
		this._expectedOutput = output;
		this._expectedOutputIndex = 0;
	}

	output(output: string) {
		this.assert.notStrictEqual(this._expectedOutputIndex, this._expectedOutput.length);
		this.assert.strictEqual(output, this._expectedOutput[this._expectedOutputIndex]);
		++this._expectedOutputIndex;
	}

	assertEpsEqual(expected, got, eps) {
		this.assert.ok(Math.abs(expected - got) < eps);
	}

	private _assertOutputFinish() {
		this.assert.strictEqual(this._expectedOutputIndex, this._expectedOutput.length);
	}

	static test(title: string, callback: (assert: QUnitAssert, helper: TestHelper) => void) {
		QUnit.test(title, function(assert) {
			var helper = new TestHelper(assert);
			callback.call(this, assert, helper);
			helper.close();
		});
	}
}

/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import Destroyable from "./Destroyable";
import dummyDestroyable from "./dummyDestroyable";
import IDispatcher from "./IDispatcher";

class DummyDispatcher implements IDispatcher<any> {

	get dummy() {
		return true;
	}

	purge(): void {
	}

	listen(_handler: (message: any) => any, _scope?: any): Destroyable {
		return dummyDestroyable;
	}

	dispatch(_message?: any): void {
	}
}

/**
 * Dummy implementation of `Listenable<any>` interface.
 * As opposed to `Dispatcher`, doesn't really register any listeners, but just pretends it does that.
 */
const dummyDispatcher = <IDispatcher<any>>(new DummyDispatcher()); // An extra variable helps IntelliSense to find this import
export default dummyDispatcher;

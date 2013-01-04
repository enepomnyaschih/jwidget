/*
	JW Schema validation test (one of many).
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ns("JW.Tests.Schema.DigMyData.Account");

JW.Tests.Schema.DigMyData.Account.InfoTestCase = JW.Schema.TestCase.extend({
	schemaUrl: "/tests/schema/digmydata/account/info",
	
	testData: function()
	{
		this.assertValidName("data");
	}
});

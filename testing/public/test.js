var assert = chai.assert;

describe("convert", function() {
	function expectFn(input, precision, expected) {
		it("переводит значение копеек " + input + " в рубли с точностью " + precision + " результат: " + expected, function() {
			assert.equal(convert(input, precision), expected);
		});
	}

	describe("переводит значение копеек в рубли", function() {
		function makeTest(x) {
		  var expected = x / 100 + '.00';
		  it("переводит значение копеек " + x + " в рубли результат: " + expected, function() {
			assert.equal(convert(x, 2), expected);
		  });
		}

		for (var x = 0; x <= 4; x++) {
		  makeTest(100 + x * 100);
		}
	});

	describe("переводит нулевое значение копеек в рубли", function() {
		[
			[0, 2, 0],
			['0', 2, 0],
		]
			.forEach(a => expectFn(a[0], a[1], a[2]));
	});

	describe("переводит копейки при незаданном или некорректном значении точности", function() {
		[
			[1333, -2, "13"],
			[888, undefined, "8.88"],
			[777, null, "8"],
			[666, false, "7"],
		]
			.forEach(a => expectFn(a[0], a[1], a[2]));
	});
	
	describe("переводит значение копеек в рубли c разной точностью", function() {
		var n = Math.pow(2, 31) - 1;
		n = n / Math.pow(10, String(n).length - 3);

		[
			[n, 0, "2"],
			[n, 1, "2.1"],
			[n, 2, "2.14"],
			[n, 3, "2.140"]
		]
			.forEach(a => expectFn(a[0], a[1], a[2]));
	});
});

describe("miss", function() {
	function expectFn(input, expected) {
		it("при вводе " + input + " результат: " + expected, function() {
			assert.equal(miss(input), expected);
		});
	}

	describe("выводит Miss если число кратно трем", function() {
		var m = 'Miss';

		[
			[3, m],
			[6, m],
			[9, m],
			[12, m]
		]
			.forEach(a => expectFn(a[0], a[1], a[2]));
	});
	
	describe("выводит Kiss если число кратно пяти", function() {
		var m = 'Kiss';

		[
			[5, m],
			[10, m],
			[20, m],
			[25, m]
		]
			.forEach(a => expectFn(a[0], a[1], a[2]));
	});
	
	describe("выводит MissKiss если число одновременно кратно пяти и трем", function() {
		var m = 'MissKiss';

		[
			[15, m],
			[30, m],
			[45, m],
			[90, m]
		]
			.forEach(a => expectFn(a[0], a[1], a[2]));
	});
	
	describe("выводит введенное число если оно не кратно пяти и не кратно трем", function() {
		[
			[1, 1],
			[7, 7],
			[13, 13],
			[97, 97]
		]
			.forEach(a => expectFn(a[0], a[1], a[2]));
	});
});
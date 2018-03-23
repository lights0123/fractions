/**
 * Reduces a fraction
 * from https://stackoverflow.com/a/4652513
 *
 * @param numerator
 * @param denominator
 * @returns {*[]}    An array with the first element being the numerator and the second the denominator
 */
function reduce(numerator, denominator) {
	function gcd(a, b) {
		return b ? gcd(b, a % b) : a;
	}

	gcd = gcd(numerator, denominator);
	return [numerator / gcd, denominator / gcd];
}

var superscript = {
	'0': '⁰',
	'1': 'ⁱ',
	'2': '²',
	'3': '³',
	'4': '⁴',
	'5': '⁵',
	'6': '⁶',
	'7': '⁷',
	'8': '⁸',
	'9': '⁹',
	'+': '⁺',
	'-': '⁻',
	'=': '⁼',
	'(': '⁽',
	')': '⁾',
	'a': 'ᵃ',
	'b': 'ᵇ',
	'c': 'ᶜ',
	'd': 'ᵈ',
	'e': 'ᵉ',
	'f': 'ᶠ',
	'g': 'ᵍ',
	'h': 'ʰ',
	'i': 'ⁱ',
	'j': 'ʲ',
	'k': 'ᵏ',
	'l': 'ˡ',
	'm': 'ᵐ',
	'n': 'ⁿ',
	'o': 'ᵒ',
	'p': 'ᵖ',
	'r': 'ʳ',
	's': 'ˢ',
	't': 'ᵗ',
	'u': 'ᵘ',
	'v': 'ᵛ',
	'w': 'ʷ',
	'x': 'ˣ',
	'y': 'ʸ',
	'z': 'ᶻ'
};

var subscript = {
	'0': '₀',
	'1': '₁',
	'2': '₂',
	'3': '₃',
	'4': '₄',
	'5': '₅',
	'6': '₆',
	'7': '₇',
	'8': '₈',
	'9': '₉',
	'+': '₊',
	'-': '₋',
	'=': '₌',
	'(': '₍',
	')': '₎',
	'a': 'ₐ',
	'e': 'ₑ',
	'h': 'ₕ',
	'i': 'ᵢ',
	'j': 'ⱼ',
	'k': 'ₖ',
	'l': 'ₗ',
	'm': 'ₘ',
	'n': 'ₙ',
	'o': 'ₒ',
	'p': 'ₚ',
	'r': 'ᵣ',
	's': 'ₛ',
	't': 'ₜ',
	'u': 'ᵤ',
	'v': 'ᵥ',
	'x': 'ₓ'
};

var fractions = {
	'1/2': '½',
	'1/3': '⅓',
	'2/3': '⅔',
	'1/4': '¼',
	'3/4': '¾',
	'1/5': '⅕',
	'2/5': '⅖',
	'3/5': '⅗',
	'4/5': '⅘',
	'1/6': '⅙',
	'5/6': '⅚',
	'1/7': '⅐',
	'1/8': '⅛',
	'3/8': '⅜',
	'5/8': '⅝',
	'7/8': '⅞',
	'1/9': '⅑',
	'1/10': '⅒'
};

var slash = '⁄';

function getFraction(numerator, denominator) {
	numerator = numerator.trim();
	denominator = denominator.trim();

	function map(num, den) {
		if (fractions[num + '/' + den]) return fractions[num + '/' + den];
		var numOut = '',denOut='';
		num.split('').forEach(function (val) {
			var correspondingNum=superscript[val];
			console.log(correspondingNum);
			if(!correspondingNum)throw new Error();
			numOut+=correspondingNum;
		});
		console.log(den);
		den.split('').forEach(function (val) {
			var correspondingNum=subscript[val];
			console.log(val);
			console.log(correspondingNum);
			if(!correspondingNum)throw new Error();
			denOut+=correspondingNum;
		});
	}

	var orig = map(numerator, denominator);
	var simp = '';
	if (/^\d+$/.test(numerator) && /^\d+$/.test(denominator)) {
		simp = reduce(numerator, denominator);
		simp = map(simp[0], simp[1]);
	}
	return [orig, simp];
}

var app = new Vue({
	el: '#app',
	data: {
		fractionForm: '',
		simplified: '',
		numerator: '',
		denominator: ''
	},
	watch: {
		numerator: function (numerator) {

		}
	}
});
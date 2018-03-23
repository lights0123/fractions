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
	'a':'ᵃ',
	'b':'ᵇ',
	'c':'ᶜ',
	'd':'ᵈ',
	'e':'ᵉ',
	'f':'ᶠ',
	'g':'ᵍ',
	'h':'ʰ',
	'i':'ⁱ',
	'j':'ʲ',
	'k':'ᵏ',
	'l':'ˡ',
	'm':'ᵐ',
	'n':'ⁿ',
	'o':'ᵒ',
	'p':'ᵖ',
	'r':'ʳ',
	's':'ˢ',
	't':'ᵗ',
	'u':'ᵘ',
	'v':'ᵛ',
	'w':'ʷ',
	'x':'ˣ',
	'y':'ʸ',
	'z':'ᶻ'
};
var fractions = [['1','2','½'],['1','3','⅓'],['2','3','⅔'],['1','4','¼'],['3','4','¾'],['1','5','⅕'],['2','5','⅖']];

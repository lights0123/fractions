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


/**
 * From https://stackoverflow.com/a/30810322
 * Copies text into clipboard
 *
 * @param text  the text to copy
 * @param cb    the callback with the result of the copy
 */
function copyTextToClipboard(text, cb) {
	if (!navigator.clipboard) {
		var textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		var success = false;
		try {
			success = document.execCommand('copy');
			document.body.removeChild(textArea);
		} catch (e) {
			document.body.removeChild(textArea);
			cb(e);
			return;
		}
		if (!success) cb(new Error("Copy Failed"));
		else cb();
		return;
	}
	navigator.clipboard.writeText(text).then(cb, cb);
}

var superscript = {
	'0': '⁰',
	'1': '¹',
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
	'z': 'ᶻ',
	' ': ' '
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
	'x': 'ₓ',
	' ': ' '
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
		var numOut = '', denOut = '';
		num.split('').forEach(function (val) {
			var correspondingNum = superscript[val];
			if (!correspondingNum) throw new Error();
			numOut += correspondingNum;
		});
		console.log(den);
		den.split('').forEach(function (val) {
			var correspondingNum = subscript[val];
			if (!correspondingNum) throw new Error();
			denOut += correspondingNum;
		});
		return numOut + slash + denOut;
	}

	var orig = map(numerator, denominator);
	var simp = '';
	if (/^\d+$/.test(numerator) && /^\d+$/.test(denominator)) {
		simp = reduce(numerator, denominator);
		simp = map(simp[0].toString(), simp[1].toString());
	}
	if (simp === orig) simp = '';
	return [orig, simp];
}

var app = new Vue({
	el: '#app',
	data: {
		fractionForm: '',
		simplified: '',
		numerator: '',
		denominator: '',
		origFracText: 'Copy',
		origFracIcon: 'copy outline',
		simpText: 'Copy',
		simpIcon: 'copy outline'
	},
	watch: {
		numerator: function (numerator) {
			try {
				var frac = getFraction(numerator, this.denominator);
				this.fractionForm = frac[0];
				this.simplified = frac[1];
				console.log(frac);
			} catch (e) {

			}
		}, denominator: function (denominator) {
			try {
				var frac = getFraction(this.numerator, denominator);
				this.fractionForm = frac[0];
				this.simplified = frac[1];
			} catch (e) {

			}
		}
	},
	methods: {
		copyOrig: function () {
			var self = this;
			copyTextToClipboard(this.fractionForm, function (err) {
				if (err) {
					self.origFracText = 'Error';
					self.origFracIcon = 'exclamation triangle';
				} else {
					self.origFracText = 'Copied';
					self.origFracIcon = 'check';
				}
			})
		},
		copySimp: function () {
			var self = this;
			copyTextToClipboard(this.simplified, function (err) {
				if (err) {
					self.simpText = 'Error';
					self.simpIcon = 'exclamation triangle';
				} else {
					self.simpText = 'Copied';
					self.simpIcon = 'check';
				}
			})
		},
		origFracReset: function () {
			this.origFracText = 'Copy';
			this.origFracIcon = 'copy outline';
		},
		simpReset: function () {
			this.simpText = 'Copy';
			this.simpIcon = 'copy outline';
		}
	}
});
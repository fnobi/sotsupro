$(function () {
	var TOC = function (selector) {
		this.headers = [];

		this.$rootElement = $(selector);
	};

	TOC.prototype.render = function () {
		var $rootElement = this.$rootElement;
		var headers = this.headers;
		$rootElement.empty();

		var $ul = $('<ul />');
		$rootElement.append($ul);

		headers.forEach(function ($header) {
			$ul.append($('<li />').append(
				$('<a />')
					.html($header.html())
					.attr('href', '#' + $header.attr('id'))
			));
		});

		return $rootElement;
	};

	TOC.prototype.addHeader = function ($header) {
		var index = this.headers.length + 1;

		$header.attr('id', 'section' + index);
		$header.prepend(index + ' ');
		this.headers.push($header);
	};

	var toc = new TOC('#toc');

	$('article h1').each(function () {
		toc.addHeader($(this));
	});

	toc.render();
});
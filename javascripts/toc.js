$(function () {
	var TOC = function (selector) {
		this.sections = [];
	};

	TOC.prototype.render = function () {
		var $ul = this.$ul || $('<ul />');
		$ul.empty();

		this.sections.forEach(function (section) {
			$ul.append(section.renderItem());
		});

		this.$ul = $ul;
		return $ul[0];
	};

	TOC.prototype.addSection = function ($section) {
		this.sections.push(new TOCSection(
			$section,
			this.sections.length + 1
		));
	};

	var TOCSection = function ($section, index) {
		this.$section = $section;
		this.index = index;
		this.initHeader();
		this.initSubSections();
	};

	TOCSection.prototype.initHeader = function () {
		var $section = this.$section;
		var $header = $('h1', $section).first();

		var index = this.index;
		var id = $header.attr('id') || ('section' + index);

		$header.attr('id', id);
		$header.prepend('<a href="#' + id + '">' + index + '</a> - ');

		this.$header = $header;

		return $header[0];
	};

	TOCSection.prototype.initSubSections = function () {
		var self = this;
		var $section = this.$section;
		var indexpre = self.index + '.';
		var subSections = [];

		if ($('section', $section)[0]) {
			$('section', $section).each(function () {
				subSections.push(new TOCSection(
					$(this),
					indexpre + (subSections.length + 1)
				));
			});
		}

		this.subSections = subSections;
		return subSections;
	};

	TOCSection.prototype.renderItem = function () {
		if (this.$item) {
			return this.$item[0];
		}

		var $header = this.$header;
		var id = $header.attr('id');

		var $item = $('<li />').append(
			$('<a href="#' + id + '">' + $header.html() + '</a>')
		);

		var subSections = this.subSections;

		if (subSections.length) {
			var $list = $('<ul />');
			subSections.forEach(function (subSection) {
				$list.append(subSection.renderItem());
			});
			$item.append($list);
		}

		this.$item = $item;
		return $item[0];
	};

	var toc = new TOC();

	$('article > section').each(function () {
		toc.addSection($(this));
	});

	$('#toc').append(toc.render());
});
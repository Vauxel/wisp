function sortFileList(field) {
	var table_header = $("#file-list-wrapper > .file-list-header");
	var table_body = $("#file-list-wrapper > .file-list-body");
	var table_rows = table_body.children("div");

	var table_column = table_header.find(".file-list-col-" + field);
	var table_column_icon = table_column.children(".file-list-sort");
	var direction;

	if(table_column.data("sort") == 1) {
		direction = -1;

		table_column_icon.removeClass("fa-sort-amount-asc");
		table_column_icon.addClass("fa-sort-amount-desc");
	} else if(table_column.data("sort") == -1) {
		direction = 1;

		table_column_icon.removeClass("fa-sort-amount-desc");
		table_column_icon.addClass("fa-sort-amount-asc");
	} else {
		direction = 1;
	}

	table_column.data("sort", direction);

	table_rows.sort(function(rowa, rowb) {
		var rowa_value = $(rowa).find(".file-list-col-" + field).text();
		var rowb_value = $(rowb).find(".file-list-col-" + field).text();

		if(field == "name") {
			// No special logic
		} else if(field == "size") {
			rowa_value = rowa_value.split();
			rowb_value = rowb_value.split();

			var multiplier;

			switch(rowa_value[1]) {
				case "bytes": multiplier = 1; break;
				case "KB": multiplier = 1024; break;
				case "MB": multiplier = 1024 * 1024; break;
				case "GB": multiplier = 1024 * 1024 * 1024; break;
				case "TB": multiplier = 1024 * 1024 * 1024 * 1024; break;
			}

			rowa_value = rowa_value[0] * multiplier;

			switch(rowb_value[1]) {
				case "bytes": multiplier = 1; break;
				case "KB": multiplier = 1024; break;
				case "MB": multiplier = 1024 * 1024; break;
				case "GB": multiplier = 1024 * 1024 * 1024; break;
				case "TB": multiplier = 1024 * 1024 * 1024 * 1024; break;
			}

			rowb_value = rowb_value[0] * multiplier;
		} else if(field == "date") {
			rowa_value = new Date(rowa_value).getTime();
			rowb_value = new Date(rowb_value).getTime();
		}

		if(rowa_value > rowb_value) {
			return direction;
		}

		if(rowb_value > rowa_value) {
			return -direction;
		}

		return 0;
	});

	table_rows.detach().appendTo(table_body);
}
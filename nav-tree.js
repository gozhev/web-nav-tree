function navTreeButtonSetText(button, folded) {
	if (folded) {
		button.innerHTML = "+";
	} else {
		button.innerHTML = "−";
	}
}

function navTreeInit(node) {
	if (!node) {
		console.error("nav-tree: null node");
		return;
	}
	if (!node.classList.contains("nav-tree")) {
		console.error("nav-tree: node is not a nav-tree");
		return;
	}
	var buttons = node.getElementsByTagName("BUTTON");
	for (let i = 0; i < buttons.length; ++i) {
		let button = buttons[i];
		let li = button.parentElement;
		if (!li) {
			console.error("nav-tree: button's parent is null");
			continue;
		}
		if (li.tagName != "LI") {
			console.error(
				"nav-tree: button's parent is not a li: " + li.tagName);
			continue;
		}
		let next_li = li.nextElementSibling;
		if (!next_li) {
			console.error("nav-tree: next element is null");
			continue;
		}
		if (next_li.tagName != "LI") {
			console.error(
				"nav-tree: next element is not a li: " + next_li.tagName);
			continue;
		}
		let folded = next_li.classList.contains("folded");
		if (!folded && !next_li.classList.contains("unfolded")) {
			console.error("nav-tree: next li is not foldable");
			continue;
		}
		navTreeButtonSetText(button, folded);
		let on_click = function(e) {
			if (e.preventDefault) {
				e.preventDefault()
			} else {
				e.returnValue = false;
			}
			next_li.classList.toggle("unfolded");
			let folded = next_li.classList.toggle("folded");
			navTreeButtonSetText(button, folded);
		}
		if (button.addEventListener) {
			button.addEventListener("click", on_click);
		} else {
			button.attachEvent("onclick", on_click);
		}
	}
}

document.addEventListener("DOMContentLoaded", function() {
	navTreeInit(document.getElementById("nav-tree"));
});

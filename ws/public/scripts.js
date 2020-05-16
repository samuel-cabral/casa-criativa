function onOff() {
	document
		.querySelector("#modal")
		.classList
		.toggle("hide");

	document
		.querySelector("body")
		.classList
		.toggle("hideScroll");

	document
		.querySelector("#modal")
		.classList
		.toggle("addScroll");
}

function checkFields(event) {

	const valuesToCheck = [
		"title",
		"category",
		"image",
		"description",
		"link",
	]

	const isEmpty = valuesToCheck.find(function(value) {

		const CheckIfIsString = typeof event.target[value].value === "string"
		const CheckIfIsEmpty = !event.target[value].value.trim()

		if (CheckIfIsString && CheckIfIsEmpty) {
			return true //achei um cara vazio
		}
	})

	if (isEmpty) {
		event.preventDefault()
		alert("Ei, preencha todos os campos, por favor!")
	}

}
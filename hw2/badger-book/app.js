function buildStudents(data) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	const studentNum = document.getElementById("num-results");
	studentNum.innerText = data.length
	const studentListHTML = document.getElementById("students");
	studentListHTML.innerHTML = '';
	for (let i in data) {
		const student = data[i]
		// console.log(data[i]);
		let studentHTML = document.createElement("div");
		studentHTML.className = "col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3";
		const studentName = document.createElement("h4");
		studentName.innerText = student['name']['first'] + " " + student['name']['last'];
		const studentMajor = document.createElement("h6");
		studentMajor.innerText = student["major"];
		const studentInfo = document.createElement("p");
		studentInfo.innerText = `${student['name']['first']} is taking ${student['numCredits']} and is ${student['fromWisconsin'] ? "" : "not"} from WIsconsin`;
		const studentHobbyStart = document.createElement("p");
		studentHobbyStart.innerText = `They have ${student['interests'].length} interest(s) including...`;
		const studentHobby = document.createElement("ul");
		for (let hobby in student['interests']) {
			const oneHobby = document.createElement("li");
			// console.log(hobby);
			oneHobby.innerText = student['interests'][hobby];
			studentHobby.appendChild(oneHobby);
		}
		studentHTML.appendChild(studentName);
		studentHTML.appendChild(studentMajor);
		studentHTML.appendChild(studentInfo);
		studentHTML.appendChild(studentHobbyStart);
		studentHTML.appendChild(studentHobby);
		studentListHTML.appendChild(studentHTML);
	}
}

let allStudents;


// fromWisconsin
// : 
// false
// interests
// : 
// ['Singing']
// major
// : 
// "Biology"
// name
// : 
// {first: 'Emily', last: 'Taylor'}
// numCredits
// : 
// 15
function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!
	const name = document.getElementById("search-name").value;
	const major = document.getElementById("search-major").value;
	const interest = document.getElementById("search-interest").value;
	let matchStudents = allStudents;
	console.log(allStudents);
	if (name) {
		matchStudents = allStudents.filter(student => {
			return student['name']['first'].toLowerCase().includes(name.toLowerCase()) || student['name']['last'].toLowerCase().includes(name.toLowerCase());
		})
	}
	if (major) {
		matchStudents = matchStudents.filter(student => {
			return student['major'].toLowerCase().includes(major.toLowerCase());
		})
	}
	if (interest) {
		console.log(interest);
		matchStudents = matchStudents.filter(student => {
			for (i of student['interests']) {
				console.log(i);	
				console.log(interest);
				console.log(i.toLowerCase().includes(interest.toLowerCase()));
				if (i.toLowerCase().includes(interest.toLowerCase())) {
					return true;
				}
			}
			return false;
		})
	}
	buildStudents(matchStudents);

	// TODO Implement the search
}

fetch("https://cs571.org/rest/f24/hw2/students", {
	method: "GET",
	headers: {
		"X-CS571-ID": CS571.getBadgerId()
	}
}).then((response) => response.json()).then((data) => {
	// console.log(data);		
	allStudents = data;
	buildStudents(data);
})

document.getElementById("search-btn").addEventListener("click", handleSearch);
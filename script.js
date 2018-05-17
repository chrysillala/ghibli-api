// create new request variable and assign a new XHR request object to it 
var request = new XMLHttpRequest();

// open a new connection, using GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function() {

	// get element with id root
	const app = document.getElementById('root');

	const searchInput = document.getElementById('searchInput');

	// create website logo by creating image element
	const logo = document.createElement('img');
	// set the image source
	logo.src = 'totoro.png';

	// craate div element and set the class attribute to container
	const container = document.createElement('div');
	container.setAttribute('class','container');

	// append child to append logo and container div to root
	app.appendChild(container);
	container.appendChild(logo);
	container.appendChild(searchInput);


	const movieTable = document.getElementById('movieTable');

	const movieList = document.createElement('tbody');
	movieList.setAttribute('id','movieList');
	movieList.setAttribute('class','list');	

	// begin accessing json data
	// parse the response and create data variable that contains all json data
	// as an array of javascript objects
	var data = JSON.parse(this.response);

	// display only any success response
	if (request.status >= 200 && request.status < 400) {

		// log all movie title
		data.forEach(movie => {

			const tr = document.createElement('tr');

			const tdTitle = document.createElement('td');
			tdTitle.setAttribute('class','tdTitle');
			tdTitle.textContent = `${movie.title} (${movie.release_date})`;

			const tdDirector = document.createElement('td');
			tdDirector.setAttribute('class','tdDirector');
			tdDirector.textContent = movie.director;
			
			const tdDescription = document.createElement('td');
			tdDescription.setAttribute('class','tdDescription');
			tdDescription.textContent = `${movie.description}`;
			
			container.appendChild(movieTable);
			movieTable.appendChild(movieList);
			movieList.appendChild(tr);
			tr.appendChild(tdTitle);
			tr.appendChild(tdDirector);
			tr.appendChild(tdDescription);	

			console.log(movie.title);
			console.log(movie.director);
			console.log(movie.description);

		});


		// search filter
		var options = {
			valueNames: [ 'tdTitle', 'tdDirector', 'tdDescription' ]
		};
		var movieColumn = new List('root', options);

	} else { // log out error if request fails

		const errorMessage = document.createElement('errorMessage');
		errorMessage.textContent = `oh no it's not working`;

		app.appendChild(errorMessage);

		console.log('error');
	}
}
// send request
request.send();
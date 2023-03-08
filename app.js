let myMovies = {};
const inp = document.querySelector("input");
const myMovieList = document.querySelector("ul");
const table = document.createElement('table');
const movieHistoryCard = document.getElementById('movieHistoryCard');
const filter_input = document.getElementById(`filter`);



const filter_movies = (event) => {
    input = event.target.value;
    let arr = Object.keys(myMovies).filter(movie => {
        return movie.toLowerCase().includes(input.toLowerCase());
    });
    myMovieList.innerHTML = ``;
    console.log(arr);
    arr.forEach(textToInsert => {
        const list_text = document.createTextNode(textToInsert);
        const li = document.createElement("li");
        li.classList.add('movie_list');
        li.appendChild(list_text);
        li.style.listStyleType = "none";
        myMovieList.appendChild(li);
    });
};

const clearInput = () => {
    inp.value = "";
};

const clearMovies = () => {
    myMovies = {};
    myMovieList.innerHTML = '';
    table.innerHTML = '';
};

const addMovie = () => {
    const userTypedText = inp.value.trim();
    if (userTypedText !== '') {
        let textToInsert = userTypedText.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (textToInsert in myMovies) {
            myMovies[textToInsert] += 1;
        } else {
            myMovies[textToInsert] = 1;
            const li = document.createElement("li");
            li.classList.add('movie_list');
            const list_text = document.createTextNode(textToInsert);
            li.appendChild(list_text);
            li.style.listStyleType = "none";
            myMovieList.appendChild(li);  
        };

        table.innerHTML = `
            <tr>
                <th>Movie</th>
                <th>Count</th>
            </tr>
            <tr>
                <td>${textToInsert}</td>
                <td>${myMovies[textToInsert]}</td>
            </tr>
        `;

        for (const [movie, count] of Object.entries(myMovies)) {
            if (movie !== textToInsert) {
                table.innerHTML += `
                    <tr>
                        <td>${movie}</td>
                        <td>${count}</td>
                    </tr>
                `;
            };
        };

        movieHistoryCard.innerHTML = '';
        movieHistoryCard.appendChild(table);
        table.style.width = "100%";
    }

    clearInput();
}


filter_input.addEventListener('input', filter_movies);
// Namespace variables
const app = {};

app.filmsArray = [];

app.$dropdownList = $('select');

app.$section = $('section');
app.$filmImage = $('#film_image')
app.$title = $('#title');
app.$originalTitle = $('#original_title');
app.$originalTitleRomanised = $('#original_title_romanised');
app.$releaseDate = $('#release_date');
app.$filmLength = $('#film_length');
app.$director = $('#director');
app.$description = $('#description');

// Create dropdown list from API
app.createDropdownList = function() {
    app.$dropdownList.empty();
    app.filmsArray.forEach((film, filmIndex) => {
        app.$dropdownList.append(`<option value="${filmIndex}">${film.title} (${film.release_date})</option>`);
    })
};

// Display selected film to the screen
app.displayFilm = function(filmIndex) {
    app.$section.removeClass('hidden');
    
    const {image, title, original_title, original_title_romanised, release_date, running_time, director, description} = app.filmsArray[filmIndex];

    app.$filmImage.attr('src', image).attr('alt', `Movie poster for "${title}"`);

    app.$title.text(title);
    app.$originalTitle.text(`${original_title}`);
    app.$originalTitleRomanised.text(`(${original_title_romanised})`);

    app.$releaseDate.html(`<span class="info_tag">Release Year: </span>${release_date}`);
    app.$filmLength.html(`<span class="info_tag">Film duration: </span>${running_time} minutes`)
    app.$director.html(`<span class="info_tag">Director: </span>${director}`);

    app.$description.text(description);
};

// Display error to the screen when API call fails
app.displayError = function() {
    app.$section.removeClass('hidden');
    app.$dropdownList.empty();
    app.$section.html(`<p class='error'>There was an error loading the API. Try refreshing the page!</p>`)
};

// Init
app.init = function() {
    // Retrieve films from API
    $.ajax({
        url: 'https://ghibliapi.herokuapp.com/films/',
        method: 'GET',
        dataType: 'json'
    }).then(function(response){
        app.filmsArray = response;
        app.createDropdownList();
        // Display first film by default
        app.displayFilm(0);
    }).catch(function(error){
        app.displayError();
    })
};

// Dropdown list event listner
app.dropdownSelect = function() {
    app.$dropdownList.on('change', function(){
        app.displayFilm(app.$dropdownList.val())
    });
}

// Main
$(document).ready(function(){

    app.init();

    app.dropdownSelect();

})
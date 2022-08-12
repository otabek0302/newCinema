let URL = 'http://localhost:3001/'
let data 


function update() {
     axios.get(URL + 'movies')
         .then(res => {
             reload(res.data)
             data = res.data
            //  console.log(res.data);
          })
     .catch(err => console.log(err))
}
update()

//Variables
let ul = document.querySelector('.promo__interactive-list');
let modal = document.querySelector('.modal');
let promo__bg = document.querySelector('.promo__bg'),
    promo__genre = document.querySelector('.promo__genre'),
    promo__title = document.querySelector('.promo__title'),
    promo__descr = document.querySelector('.promo__descr'),
    imdb = document.querySelector('.imdb'),
    movieSearch = document.querySelector('.movieSearch');


//Serach
let inpSearch = document.querySelector('#search')
inpSearch.onkeyup = () => {
    let filtered = data.filter((item , index) => item.Title.toLowerCase().includes(inpSearch.value.toLowerCase().trim()))

    reload(filtered)
}


//Sorted
function reload(arr) {
    ul.innerHTML = "";
    for (const item of arr) {
        let li = document.createElement('li'),
            a = document.createElement('a'),
            del = document.createElement('div'),
            star = document.createElement('div'),
            span = document.createElement('span');
        
            li.classList.add('promo__interactive-item'),
            del.classList.add('delete'),
            star.classList.add('star')    
        
            a.innerHTML = `${arr.indexOf(item) + 1}. ${item.Title}`
        
            star.append(span)
            li.append(star,a,del)
            ul.append(li);

        
            li.onclick = () => {
                //Function change showmovies[index]
                location.href = `./post.html?id=${item.id}`
                console.log(item);
            }
            del.onclick = () => {
                delItem(item)
            } 
    }
}


//Function del
function delItem (data) {    
    let idx = movies.indexOf(data)
    movies.splice(idx, 1)
    reload(movies)
    console.log(movies);
}

//Meny activity and Filter by Genres
let promo__menu_item = document.querySelectorAll('.promo__menu-item');
promo__menu_item.forEach(item => {
    item.onclick = () => {
        promo__menu_item.forEach(el => el.classList.remove('promo__menu-item_active'))
        item.classList.add('promo__menu-item_active')
        
        //Outputing with Type
        let type = item.getAttribute('data-type')
        promo__menu_item.filter(el => {
            if (el.type.toLowerCase() == type.toLowerCase()) {
                let genre = [el];
                reload(genre)
                console.log(genre);
            }
        });
    }
})


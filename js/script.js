let endOfPage = 0;

let preloading = false;


const showPreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log(`showPreloader()`);
    preloader.style.display = 'block';
    preloading = true;

}

const hidePreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log(`hidePreloader()`);
    preloader.style.display = 'none';
    preloading = false;
}

const getData = () => {
    // console.log(`getData()`);

    if (!preloading) {

        showPreloader();


        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {

                let body = document.body;

                // dodajemy separator
                let hr = document.createElement('hr');
                body.appendChild(hr);

                for (let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebsite = document.createElement('p');

                    pId.innerText = `User ID: ${user.id}`;
                    pName.innerText = `User ID: ${user.name}`;
                    pWebsite.innerHTML = `User ID: ${user.pWebsite}<br />-----`;

                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebsite);
                }


                // Gdy dane zostały pobrane i umieszczone na stronie - wyłącznie preloadera 

                hidePreloader();

                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

const scrollToEndOfPage = () => {
    // console.log(scrollToEndOfPage);

    let d = document.documentElement;

    // Wysokość łącznie z tym co nie widać na ekranie
    let scrollHeight = d.scrollHeight;

    // Liczba pixeli o którą przeskrolowaliśmy od góry
    let scrollTop = d.scrollTop;

    // wewnętrzna wysokość okna przeglądarki
    let clientHeight = d.clientHeight;

    // Dodajemy zaokrąglenie    
    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

    console.log(sumScrollTopClientHeight);

    console.log(`scrollHeight: ${scrollHeight}`);
    console.log(`scrollTop: ${scrollTop}`)
    console.log(`clientHeight: ${clientHeight}`);
    console.log(`=======================`);

    if (sumScrollTopClientHeight >= scrollHeight) {

        endOfPage += 1;

        console.log(`Scrolled to the end of page: ${endOfPage}`);

        getData();
    }

}

window.addEventListener('scroll', scrollToEndOfPage);
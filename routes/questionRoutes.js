const request    = require('request');
const cheerio    = require('cheerio');

module.exports = (app) => {
    app.get('/movies', (req, res) => {
        let url = 'https://en.m.wikipedia.org/wiki/List_of_highest-grossing_films';
        request(url, (err, body, html) => {
            const $ = cheerio.load(html);
            const returnVal = [];
            let rank = 1;
    
            $('th').each((i, e) => {
                el = {
                    rank: rank,
                    title: $(e).find('a').text()   
                };
                if (el.title !== '' && returnVal.length < 5) {
                    returnVal.push(el);
                    rank++;
                }
            });
            return res.send(returnVal);
        });
    });
    
    app.get('/countries', (req, res) => {
        let url = 'https://en.m.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population';
        simpleTd(res, url, 3, 6, false);
    });

    //TV finales needs some work:
    app.get('/tvFinales', (req, res) => {
        let url = 'https://en.wikipedia.org/wiki/List_of_most_watched_television_broadcasts_in_the_United_States';
        request(url, (err, body, html) => {
            const $ = cheerio.load(html);
            const returnVal = [];
            let rank = 1;
    
            $('td').each((i, e) => {
                el = {
                    rank: rank,
                    title: $(e).find('a').attr('title')   
                };
                if (el.title !== undefined && returnVal.length < 6) {
                    returnVal.push(el);
                    rank++;
                }
            });
            return res.send(returnVal.splice(1, 5));
        });
    })

    //world series appearances:
    app.get('/worldseries', (req, res) => {
        let url = 'https://en.wikipedia.org/wiki/List_of_World_Series_champions';
        request(url, (err, body, html) => {
            let $ = cheerio.load(html);
            const returnVal = [];
            let rank = 1;
            let tableHTML = $('#Years_of_appearance').parent().next().next().html();
            $ = cheerio.load(tableHTML);

            $('a').each((i, e) => {
                el = {
                    rank: rank,
                    title: $(e).attr('title')   
                };
                if (titleChecker(el.title, 'World Series') && titleChecker(el.title, 'History') && returnVal.length < 5) {
                    returnVal.push(el);
                    rank++;
                }
            });
            return res.send(returnVal);
        });
    });

    //best selling video game consoles:
    app.get('/gameconsoles', (req, res) => {
        let url = 'https://en.wikipedia.org/wiki/List_of_best-selling_game_consoles';
        simpleTd(res, url, 0, 5, true);
    });

    //Superbowl Appearances:
    app.get('/superbowlwins', (req, res) => {
        let url = 'https://en.wikipedia.org/wiki/List_of_Super_Bowl_champions';
        request(url, (err, body, html) => {
            let $ = cheerio.load(html);
            const returnVal = [];
            let rank = 1;
            //There has to be a better way to use this:
            let tableHTML = $('body').find('#Super_Bowl_appearances_by_team').parent().nextUntil('table').next().next().next().html();
            $ = cheerio.load(tableHTML);

            $('a').each((i, e) => {
                el = {
                    rank: rank,
                    title: $(e).attr('title')   
                };
                if (titleChecker(el.title, 'Super Bowl')  && returnVal.length < 5) {
                    returnVal.push(el);
                    rank++;
                }
            });
            return res.send(returnVal);
        });
    });

    //busiest airports in the world:
    app.get('/busyairports', (req, res) => {
        let url = 'https://en.wikipedia.org/wiki/List_of_busiest_airports_by_passenger_traffic';
        simpleTd(res, url, 1, 8, true);
    });

    //Largest Private employers
    app.get('/largestemployers', (req, res) => {
        let url = 'https://en.wikipedia.org/wiki/List_of_largest_employers_in_the_United_States';
        simpleTd(res, url, 1, 3, true);
    });

    //us cities by population:
    app.get('/uscities', (req, res) => {
        let url = 'https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population';
        simpleTd(res, url, 11, 11, false);
    });

    //largest cities in the world
    app.get('/worldcities', (req, res) => {
        let url = 'https://en.wikipedia.org/wiki/List_of_cities_proper_by_population';
        simpleTd(res, url, 4, 8, false);
    });




    //HELPER FUNCTIONS

    function titleChecker(a, b) {
        if (a !== undefined) {
            return a.indexOf(b) !== -1 ? false : true;
        }
    }

    //This helps if I just want to get the value in the same column over and over again.
    function indexer(index, start, rate) {
        for (let i = 0; i < 6; i++) {
            if (index === start + rate * i) {
                return true;
            }
        }
        return false;
    }

    //If it's a page with only one table on it and I the values needed are in the same column and in a td element this will work. The 'title' parameter toggles wether the 'title' 
    //attribute is returned or if just the text being displayed in the <td> will be displayed. 
    function simpleTd(res, url, start, rate, title) {
        request(url, (err, body, html) => {
            let $ = cheerio.load(html);
            const returnVal = [];
            let rank = 1;
            
            $('td').each((i, e) => {
                el = {
                    rank: rank,
                    title: title ? $(e).find('a').text() : $(e).find('a').attr('title')
                };
                if (returnVal.length < 5 && indexer(i, start, rate)) {
                    returnVal.push(el);
                    rank++;
                }
            });
            return res.send(returnVal);
        });
    }
}
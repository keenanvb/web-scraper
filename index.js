const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

request('', (error, res, body) => {
    if (!error && res.statusCode == 200) {
        console.log('Access website data...')
        const $ = cheerio.load(body);
        let list = [];
        $('li').each((index, value) => {
            let fastFacts = {
                num: '',
                text: '',
            }
            let item = $(value).text().replace(/\n/g, '');
            fastFacts.num = index;
            fastFacts.text = item
            list.push(fastFacts);
        });
        saveFacts(list);
        //console.log(JSON.stringify(list, undefined, 2));
        console.log('Data saved');
    } else {
        console.log('error ', error)
    }
});

let saveFacts = (facts) => {
    fs.writeFileSync('fastFacts-data.json', JSON.stringify(facts));
};

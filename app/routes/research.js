const ResearchDAO = require("../data/research-dao").ResearchDAO;
const needle = require('needle');

function ResearchHandler (db) {
    "use strict";

    const researchDAO = new ResearchDAO(db);

    this.displayResearch = (req, res) => {
        
        if (req.query.symbol) {
            const symbol = '' + req.query.symbol;
            const url = `${req.query.url}/${symbol}`; 
            return needle.get(url, (error, newResponse) => {
                if (!error && newResponse.statusCode == 200)
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write(`The following is the stock ${prettyName(symbol)} information you requested.\n\n`);
                    res.write('\n\n');
                    res.write(newResponse.body);
                    return res.end();
            });
        }
        
        return res.render("research");
    };

}


function prettyName(input) {
    return input.toLowerCase();
}


module.exports = ResearchHandler;

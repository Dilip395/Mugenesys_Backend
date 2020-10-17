var express    = require('express');        // call express
var app        = express();                 // define our app using express
const kml = require('./loadkml');
var inside = require('point-in-polygon');
const cors = require('cors')

var port = process.env.PORT || 8080;        // set our port

// load data in memory
var data = kml.getData();

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    const lat = parseFloat(req.query.lat);
    const long = parseFloat(req.query.long);

    res.json({ message: getOutlet(lat, long)}); 
});

const getOutlet = (lat, long) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].geometry['type'] === 'Polygon') {
            var polygon = data[i].geometry.coordinates[0];

            if (inside([ long, lat, 0 ], polygon)) {
                return data[i].properties.name;
            }
        }
    
    }
    return 'not found';
}


app.use(cors());
app.use('/api', router);

app.listen(port);
console.log('Server started ' + port);
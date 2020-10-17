const getData = () => {
    const kmlParse = require("kml-parse");
    const fs = require("fs");
    const DOMParser = require("xmldom").DOMParser;

    const kmlDom = new DOMParser().parseFromString(fs.readFileSync("data.kml", "utf8"))
    const geoLocationData = kmlParse.parse(kmlDom);
    const data = geoLocationData.geoJSON.features;

    return data;
}

exports.getData = getData;

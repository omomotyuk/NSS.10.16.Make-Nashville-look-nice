
var EXIF = require("../../../node_modules/exif-js/exif.js");

//
const ExifData = {

    getExifData: (photoData) => {

        let GpsData = {
            DateTime: "",
            GPSLatitude: "",
            GPSLatitudeRef: "",
            GPSLongitude: "",
            GPSLongitudeRef: ""
        }

        EXIF.getData(photoData, function () {
            //var allMetaData = EXIF.getAllTags(this);

            GpsData.DateTime = EXIF.getTag(this, "DateTime")
            GpsData.GPSLatitude = EXIF.getTag(this, "GPSLatitude")
            GpsData.GPSLatitudeRef = EXIF.getTag(this, "GPSLatitudeRef")
            GpsData.GPSLongitude = EXIF.getTag(this, "GPSLongitude")
            GpsData.GPSLongitudeRef = EXIF.getTag(this, "GPSLongitudeRef")
        })

        return GpsData
    }
}

export default ExifData

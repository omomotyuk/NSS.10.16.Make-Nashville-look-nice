var EXIF = require("../../../node_modules/exif-js/exif.js");
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

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

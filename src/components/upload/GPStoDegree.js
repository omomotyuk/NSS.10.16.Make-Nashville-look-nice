//
// http://android-er.blogspot.com/2010/01/convert-exif-gps-info-to-degree-format.html/convert-exif-gps-info-to-degree-format.html
//

export default class GPStoDegree {

    valid = false
    Data = []

    Latitude = []
    Longitude = []

    newDegree = (latitude, longitude) => {
        let degree = {
            latitude: latitude,
            longitude: longitude
        }
        return degree
    }

    constructor(data) {

        this.Data = data

        //console.log("constructor data:", this.Data)

        let attrLATITUDE = this.Data.GPSLatitude
        let attrLATITUDE_REF = this.Data.GPSLatitudeRef
        let attrLONGITUDE = this.Data.GPSLongitude
        let attrLONGITUDE_REF = this.Data.GPSLongitudeRef

        if ((attrLATITUDE != null)
            && (attrLATITUDE_REF != null)
            && (attrLONGITUDE != null)
            && (attrLONGITUDE_REF != null)) {

            this.valid = true;

            if (attrLATITUDE_REF === "N") {
                this.Latitude = this.convertToDegree(attrLATITUDE);
            }
            else {
                this.Latitude = 0 - this.convertToDegree(attrLATITUDE);
            }

            if (attrLONGITUDE_REF === "E") {
                this.Longitude = this.convertToDegree(attrLONGITUDE);
            }
            else {
                this.Longitude = 0 - this.convertToDegree(attrLONGITUDE);
            }
        }
    }

    getData() {
        return this.newDegree(this.Latitude, this.Longitude)
    }

    convertToDegree(number) {
        let result = null
        result = number[0] + number[1] / 60 + number[2] / 3600;
        return result;
    }

    isValid() {
        return this.valid;
    }

    getLatitudeE6() {
        return (this.Latitude * 1000000);
    }

    getLongitudeE6() {
        return (this.Longitude * 1000000);
    }

    // TODO Auto-generated method stub
    toString() {
        return (String.valueOf(this.Latitude)
            + ", "
            + String.valueOf(this.Longitude));
    }
}

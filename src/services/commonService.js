import { axiosGet } from "./ajaxServices";
import {
  urlGoogleAutoComplete,
  urlGetLocationDetail,
  urlGetLocationFromCoordinate,
  urlGetCoordFromPlaceId,
} from "./CONSTANTS";

export const getAddresses = (keyword, countries = ["ZA"]) => {
  const url = urlGoogleAutoComplete;
  let str_countries = [];
  for (var i = 0; i < countries.length; i++) {
    str_countries.push(`country:${countries[i]}`);
  }
  str_countries = str_countries.join("|");

  const param = {
    keyword: keyword,
    str_countries: str_countries,
  };

  return new Promise((resolve, reject) => {
    axiosGet(url, param, "getAddresses")
      .then((res) => {
        resolve(res.predictions);
      })
      .catch((err) => {
        reject([]);
      });
  });
};
export const getAddressFromCoord = (lat, lng) => {
  const url = urlGetLocationFromCoordinate;
  const param = {
    latitude: lat,
    longitude: lng,
  };

  return new Promise((resolve, reject) => {
    axiosGet(url, param, "getAddressFromCoord")
      .then((res) => {
        let address = res.plus_code.compound_code;
        if (res.results.length > 0) {
          address = res.results[0]["formatted_address"];
        }
        resolve(address);
      })
      .catch((err) => {
        reject("");
      });
  });
};
export const getCoordinateFromPlaceID = (placeId) => {
  // urlGetCoordFromPlaceId
  const url = urlGetCoordFromPlaceId;
  const param = { place_id: placeId };
  return new Promise((resolve, reject) => {
    axiosGet(url, param, "getCoordinateFromPlaceID")
      .then((res) => {
        const loc = res.result.geometry.location;
        resolve(loc);
      })
      .catch((err) => {
        reject({ lat: 0, lng: 0 });
      });
  });
};

export const apiGetPassiveDetail = () => {
  return new Promise((resolve, reject) => {
    axiosGet(urlGetLocationDetail, {}, "apiGetPassiveDetail")
      .then((detail) => {
        const { latitude, longitude, country_name, region_name, city } = detail;
        resolve({
          latitude: latitude,
          longitude: longitude,
          address: `${city}, ${region_name}, ${country_name}`,
        });
      })
      .catch((er) => {
        reject(er);
      });
  });
};

export const validateEmail = (email) => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  if (!pattern.test(email)) {
    return false;
  } else {
    return true;
  }
};
export const validatePassword = (password) => {
  if (password.length < 6) {
    return false;
  }
  return true;
};

export const calcDistance = (lat1, lng1, lat2, lng2) => {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lng2 - lng1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

function toRad(Value) {
  return (Value * Math.PI) / 180;
}

/*

///////////////////////////////////////////
  Delete Authorization field 
///////////////////////////////////////////
axios
.get(url, {
  crossDomain: true,
  transformRequest: (data, headers) => {
    delete headers.common["Authorization"];
  },
})
.then((res) => {
  const loc = res.data.result.geometry.location;
  resolve(loc);
})
.catch((err) => {
  reject({ lat: 0, lng: 0 });
});
*/

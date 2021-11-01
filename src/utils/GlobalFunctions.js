export const isEmpty = (list, field, errorList) => {
  if (list[field] === undefined || list[field] === null || list[field] === "") {
    var res = [...errorList, field];
    return res;
  }
  return errorList;
};

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const ValidateEmail = (email) => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  if (!pattern.test(email)) {
    return false;
  } else {
    return true;
  }
};
export const ValidPhone = (str) => {
  var isphone =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(str);
  return isphone;
};

export const get_data_value = (data, field, default_value) => {
  if (is_empty(default_value)) {
    default_value = "";
  }
  if (is_empty(data)) {
    return default_value;
  }
  if (is_null(data[field])) {
    return default_value;
  } else {
    return data[field];
  }
};
export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
export const is_empty = (value) => {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === false
  ) {
    return true;
  } else {
    return false;
  }
};
export const is_null = (value) => {
  if (value === undefined || value === null) {
    return true;
  } else {
    return false;
  }
};
export const isEmptyObject = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
};
export const empty = (value) => {
  let res = is_empty(value);
  //return res;
  if (!res) {
    //if value is not empty (res is false)
    if (Array.isArray(value)) {
      return value.length === 0;
    } else if (typeof value === "object") {
      return isEmptyObject(value);
    } else {
      return false;
    }
  } else {
    return true;
  }
};
export const intval = (value) => {
  if (empty(value)) {
    return 0;
  } else {
    let val = parseInt(value);
    return val;
  }
};
export const priceFormat = (num) => {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
export const timeConverter = (UNIX_timestamp, with_ago = false) => {
  var unix = Math.round(Date.now() / 1000);
  //unix = moment().unix();
  //unix = unix - 360;///////////////////////////////
  //console.log('unix timestamp', unix);
  var delta = unix - UNIX_timestamp;
  //console.log('delta', delta);
  if (delta < 0) delta = 0;

  var time = "";
  if (delta < 86400 && with_ago) {
    var hour = Math.floor(delta / 3600);
    delta = delta - hour * 3600;
    var min = Math.floor(delta / 60);
    delta = delta - min * 60;
    if (hour === 0) {
      if (min === 0) {
        time = "Just now";
      } else {
        time = min + "minute" + (min > 1 ? "s" : "") + " ago";
      }
    } else {
      time = hour + "hour" + (hour > 1 ? "s" : "") + " ago";
    }
  } else {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = "0" + a.getDate();
    var hour = "0" + a.getHours();
    var min = "0" + a.getMinutes();
    var sec = "0" + a.getSeconds();
    //time = date.substr(-2) + ' ' + month + ' ' + year + ' ' + hour.substr(-2) + ':' + min.substr(-2) + ':' + sec.substr(-2) ;
    time =
      date.substr(-2) +
      " " +
      month +
      " " +
      year +
      " " +
      hour.substr(-2) +
      ":" +
      min.substr(-2);
  }
  return time;
};
export const toLocalDatetime = (unix_timestamp) => {
  var milliseconds = unix_timestamp * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
  return humanDateFormat;
};

export const toLocalDate = (unix_timestamp) => {
  var milliseconds = unix_timestamp * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleDateString(); //2019-12-9 
  return humanDateFormat;
};

export const trim_phone = ($num) => {
  $num = $num.replace("+", "");
  $num = $num.replace("-", "");
  $num = $num.replace("_", "");
  $num = $num.replace("(", "");
  $num = $num.replace(")", "");
  $num = $num.replace(" ", "");
  $num = $num.replace(/ /g, "");
  return $num;
};
export const get_phone_number_info = (num, separator) => {
  if (is_null(separator)) {
    separator = "-";
  }
  num = trim_phone(num);
  var phone_number = num.slice(-10);
  var prefix = "";
  if (num.length > phone_number.length) {
    prefix = num.substring(0, num.length - phone_number.length);
  }
  //console.log('num,,,', num, phone_number, prefix);
  var formatted =
    "" +
    phone_number.substring(0, 3) +
    separator +
    phone_number.substring(3, 6) +
    separator +
    phone_number.substring(6, 10);
  return [prefix, formatted];
};
export const format_phone = (num, separator, with_prefix) => {
  if (is_null(separator)) {
    separator = "-";
  }
  if (is_null(with_prefix)) {
    with_prefix = false;
  }
  var obj = get_phone_number_info(num, separator);
  if (with_prefix) {
    return obj[0] + " " + obj[1];
  }
  return obj[1];
};
export const to_array = (obj) => {
  let arr = [];
  for (let key in obj) {
    arr.push(obj[key]);
  }
  return arr;
};
export const encodeHtmlStr = (str) => {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};
export const get_utc_timestamp = () => {
  let a = 0;
  let timestamp = new Date().getTime();
  a = Math.floor(timestamp / 1000); //a = Math.floor(Date.now() / 1000);
  return a;
};

export const curl_post = (path, params, method='post') => {

  // The rest of this code assumes you are not using a library.
  // It can be made less verbose if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
  form.remove()
}

export const showToast = (str, type) => {
  window.showToast(str, type);
};
export const show_dialog = (title, content, d_size) => {
  window.show_dialog(title, content, d_size);
};
export const isMobile = () => {
  return window.is_mobile();
};
export const show_loading = (status) => {
  return window.show_loading(status);
};
export const jQuery = window.jQuery;

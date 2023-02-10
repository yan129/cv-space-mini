
/* 是否手机号码*/
const validatePhone = (value) => {
  const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
  if (!reg.test(value) && value != '') {
    return false;
  }
  return true;
}

/* 判断值为空 */
const isEmpty = (value) => {
  // 判断字符串
  if(value === 'undefined' || value === '' || value === 'null' || value === null || value === undefined){
    return true;
  }
  // 判断数组
  if(Array.prototype.isPrototypeOf(value) && value.length === 0){
    return true;
  }
  // 判断对象
  if(Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0){
    return true;
  }
  return false;
}

const isNotEmpty = (value) => {
  return !isEmpty(value);
}

/** 16进制颜色转为rgba */
const hexToRgba = (hex, opacity) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgba(${parseInt(result[1], 16)},${parseInt(
    result[2],
    16
  )},${parseInt(result[3], 16)},${opacity})`;
}

export default {
  validatePhone,
  isEmpty,
  isNotEmpty,
  hexToRgba
}

function miss(i) {
    let output = '';

    if (i % 3 === 0) {
      output = 'Miss';
    }
  
    if (i % 5 === 0) {
      output = `${output}Kiss`;
    }
  
    if (!output.length) {
      output = i;
    }
  
    return output;
}

/* 
 * Переводит копейки в рубли
 */
function convert(value, precision) {
  let result = 0;

  if (typeof precision === 'undefined') {
	precision = 2;
  } else if (typeof precision === 'number' && precision < 0) {
	precision = 0;
  }

  if (value) {
	var intValue = parseInt(value);

	if (!isNaN(intValue)) {
	  result = precision === 0 ? String(intValue / 100 ^ 0) : (intValue / 100).toFixed(precision);
	}
  }

  return result;
}
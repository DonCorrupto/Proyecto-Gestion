class ValidaEmail{
	isValidarEmail(email){
		const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(String(email).toLowerCase());
	}
}
  
module.exports = new ValidaEmail();

//  export const isTrue = () => true;

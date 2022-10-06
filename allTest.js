
class Valida{
	isValidarEmail(email){
		const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(String(email).toLowerCase());
	}

	isValidarAuth(auth){
		const idAuth = "6NqAjyxCTMNfjHqBonBGOHXBd9K2";
		const idBD = auth;
		if( idAuth == idBD){
			return true;
		}
	}
}

module.exports = new Valida();

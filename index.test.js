
//EJEMPLO funciona pero no en el codigo index
const Valida = require("./allTest.js"); 


//1 
describe("Valida el formato de email ingresado", () => {
	test("retorna true para input \"user@gmail.com\"", () => {
		expect(Valida.isValidarEmail("user@gmail.com")).toBe(true);
	});
	
	test("retorna false para input \"a\"", () => {
		expect(Valida.isValidarEmail("a")).toBe(false);
	});
});

//2 SI DOS VALORES SON IGUALES, PODRIAS TESTEAR SI EL CORREO INGRESADO Y EL CORREO DE BASE DE DATOS SON IGUALES

describe("Validar correo y contraseña ingresados", () => {
	const datosIngresados = {
		email: "user@gmail.com",
		password: 123456789
	};
	const datosFirebase = {
		email: "user@gmail.com",
		password: 123456789
	};
	test("Comprobamos que los objectos son iguales", () => {
		expect(datosIngresados).toEqual(datosFirebase);
	});
}); 

//3

describe("Validar si el auth de firebase funciona", () => {
	test('Resultado true', () => {
   		expect(Valida.isValidarAuth("6NqAjyxCTMNfjHqBonBGOHXBd9K2")).toBeTruthy();
	});
}); 

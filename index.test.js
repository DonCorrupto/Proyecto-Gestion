//EJEMPLO funciona pero no en el codigo index
const ValidaEmail = require('./allTest.js') 
//import {isTrue} from './allTest';


//1 
test('retorna true para input "user@gmail.com"', () => {
   expect(ValidaEmail.isValidarEmail('user@gmail.com')).toBe(true);
});

test('retorna false para input "a"', () => {
    expect(ValidaEmail.isValidarEmail('a')).toBe(false);
});

//2 SI DOS VALORES SON IGUALES, PODRIAS TESTEAR SI EL CORREO INGRESADO Y EL CORREO DE BASE DE DATOS SON IGUALES

describe('Common matchers', () => {
    const datos = {
        nombre: 'Persona 1',
        edad: 10
    }
    const datos2 = {
        nombre: 'Persona 1',
        edad: 10
    }
    test('Comprobamos que los objectos son iguales', () => {
        expect(datos).toEqual(datos2);
    });
}); 


//test('Resultado true', () => {
 //   expect(isTrue()).toBeTruthy();
//});
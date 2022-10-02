//EJEMPLO funciona pero no en el codigo index
const ValidaEmail = require('./allTest') 

//1 
test('retorna true para input "user@gmail.com"', () => {
   expect(ValidaEmail.isValidarEmail('user@gmail.com')).toBe(true);
});

test('retorna false para input "a"', () => {
    expect(ValidaEmail.isValidarEmail('a')).toBe(false);
});

//2

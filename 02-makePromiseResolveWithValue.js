/**
 * ЗАВДАННЯ 2: Promise.resolve() та статичні методи
 * 
 * Promise.resolve() - швидкий спосіб створити успішний проміс
 */

// ==================== ЗАВДАННЯ 2.1 ====================
/**
 * Створіть проміс, який одразу резолвиться зі значенням
 * 
 * @param {any} value - Будь-яке значення
 * @returns {Promise<any>}
 */
function makePromiseResolveWith(value) {
    // TODO: Використайте Promise.resolve()
}

// Перевірка:
makePromiseResolveWith(5)
    .then(value => console.log(' Тест 2.1:', value)); // Очікується: 5


// ==================== ЗАВДАННЯ 2.2 ====================
/**
 * Створіть функцію, яка приймає масив чисел
 * і повертає проміс з сумою цих чисел
 * 
 * @param {number[]} numbers 
 * @returns {Promise<number>}
 */
function sumNumbers(numbers) {
    // TODO: Порахуйте суму та поверніть її через Promise.resolve()
}

// Перевірка:
sumNumbers([1, 2, 3, 4, 5])
    .then(sum => console.log(' Тест 2.2:', sum)); // Очікується: 15


// ==================== ЗАВДАННЯ 2.3 ====================
/**
 * Створіть функцію, яка конвертує об'єкт користувача
 * додаючи йому поле fullName
 * 
 * @param {{firstName: string, lastName: string}} user 
 * @returns {Promise<{firstName: string, lastName: string, fullName: string}>}
 */
function addFullName(user) {
    // TODO: Додайте поле fullName і поверніть через проміс
    // fullName = firstName + ' ' + lastName
}

// Перевірка:
addFullName({ firstName: 'John', lastName: 'Doe' })
    .then(user => console.log(' Тест 2.3:', user));
// Очікується: { firstName: 'John', lastName: 'Doe', fullName: 'John Doe' }


// ==================== ЗАВДАННЯ 2.4 ====================
/**
 * Створіть функцію, яка приймає проміс або звичайне значення
 * і завжди повертає проміс
 * Підказка: Promise.resolve() може приймати вже існуючий проміс
 * 
 * @param {any} value 
 * @returns {Promise<any>}
 */
function ensurePromise(value) {
    // TODO: Поверніть проміс, навіть якщо value вже є промісом
}

// Перевірка:
ensurePromise(42)
    .then(val => console.log(' Тест 2.4a:', val)); // 42

ensurePromise(Promise.resolve(100))
    .then(val => console.log(' Тест 2.4b:', val)); // 100


// ==================== ЗАВДАННЯ 2.5 ====================
/**
 * Створіть функцію для конвертації callback-based функції в проміс
 * Функція має приймати значення та callback(error, result)
 * Поверніть проміс, який резолвиться з результатом
 * 
 * @param {any} value 
 * @returns {Promise<string>}
 */
function callbackToPromise(value) {
    // TODO: Симулюйте роботу з callback
    // Створіть проміс, який використовує setTimeout для виклику callback
    // callback має викликатися через 100мс з результатом 'Processed: ' + value
}

// Перевірка:
callbackToPromise('test')
    .then(result => console.log(' Тест 2.5:', result));
// Очікується: 'Processed: test'


// ==================== ЗАВДАННЯ 2.6 ====================
/**
 * Створіть функцію, яка конвертує масив значень в масив промісів
 * Кожен проміс має резолвитися з відповідним значенням
 * 
 * @param {any[]} values 
 * @returns {Promise<any>[]}
 */
function valuesToPromises(values) {
    // TODO: Конвертуйте кожне значення в проміс
}

// Перевірка:
const promises = valuesToPromises([1, 2, 3]);
Promise.all(promises)
    .then(results => console.log(' Тест 2.6:', results));
// Очікується: [1, 2, 3]


// ==================== ЗАВДАННЯ 2.7 ====================
/**
 * Створіть функцію-обгортку для синхронних функцій,
 * яка перехоплює помилки та повертає проміс
 * 
 * @param {Function} fn - Синхронна функція
 * @param {any[]} args - Аргументи для функції
 * @returns {Promise<any>}
 */
function tryCatchPromise(fn, ...args) {
    // TODO: Викличте fn з args
    // Якщо fn кидає помилку - поверніть rejected проміс
    // Інакше - поверніть resolved проміс з результатом
}

// Перевірка:
const goodFunction = (a, b) => a + b;
const badFunction = () => { throw new Error('Oops!'); };

tryCatchPromise(goodFunction, 5, 3)
    .then(result => console.log(' Тест 2.7a:', result)); // 8

tryCatchPromise(badFunction)
    .catch(error => console.log(' Тест 2.7b:', error.message)); // 'Oops!'


/**
 * ПИТАННЯ ДЛЯ САМОПЕРЕВІРКИ:
 * 
 * 1. Яка різниця між new Promise(resolve => resolve(value)) та Promise.resolve(value)?
 * 2. Що поверне Promise.resolve(Promise.resolve(5))?
 * 3. Чи можна передати проміс в Promise.resolve()?
 * 4. Чи є Promise.resolve() синхронним чи асинхронним?
 * 5. Коли краще використовувати Promise.resolve() замість конструктора?
 */

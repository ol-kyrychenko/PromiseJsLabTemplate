/**
 * ЗАВДАННЯ 10: Promise.race()
 * 
 * Promise.race() повертає проміс, який виконується або відхиляється
 * як тільки один з промісів у масиві виконується або відхиляється
 */

// ==================== ЗАВДАННЯ 10.1 ====================
/**
 * Створіть функцію, яка повертає найшвидшу відповідь
 * 
 * @param {number[]} delays - Масив затримок в мілісекундах
 * @returns {Promise<number>} - Найменша затримка
 */
function getFastestResponse(delays) {
    // TODO: Створіть масив промісів з різними затримками
    // Кожен проміс резолвиться зі своєю затримкою
    // Використайте Promise.race() щоб отримати найшвидшу відповідь
}

// Перевірка:
getFastestResponse([1000, 500, 2000, 300])
    .then(result => console.log(' Тест 10.1:', result)); // 300


// ==================== ЗАВДАННЯ 10.2 ====================
/**
 * Створіть функцію timeout для промісів
 * Якщо проміс не виконується за вказаний час - reject з помилкою
 * 
 * @param {Promise} promise - Проміс для виконання
 * @param {number} ms - Максимальний час очікування
 * @returns {Promise}
 */
function withTimeout(promise, ms) {
    // TODO: Створіть проміс-таймаут, який reject після ms мілісекунд
    // Використайте Promise.race() між promise та таймаутом
}

// Перевірка:
const slowPromise = new Promise(resolve => setTimeout(() => resolve('Done'), 2000));
const fastPromise = new Promise(resolve => setTimeout(() => resolve('Done'), 500));

withTimeout(fastPromise, 1000)
    .then(result => console.log(' Тест 10.2a:', result)); // 'Done'

withTimeout(slowPromise, 1000)
    .catch(error => console.log(' Тест 10.2b:', error.message)); // 'Timeout'


// ==================== ЗАВДАННЯ 10.3 ====================
/**
 * Симуляція запитів до різних серверів
 * Поверніть відповідь від найшвидшого сервера
 */

function fetchFromServer(serverName, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                server: serverName,
                data: `Data from ${serverName}`,
                responseTime: delay
            });
        }, delay);
    });
}

/**
 * Отримайте дані від найшвидшого сервера
 * 
 * @returns {Promise<{server: string, data: string, responseTime: number}>}
 */
function fetchFromFastestServer() {
    // TODO: Створіть запити до трьох серверів з різними затримками
    // Server A: 1000ms, Server B: 500ms, Server C: 800ms
    // Поверніть результат від найшвидшого
}

// Перевірка:
fetchFromFastestServer()
    .then(result => console.log(' Тест 10.3:', result));
// Очікується: { server: 'Server B', data: 'Data from Server B', responseTime: 500 }


// ==================== ЗАВДАННЯ 10.4 ====================
/**
 * Створіть функцію, яка конкурує кілька джерел даних
 * і повертає першу успішну відповідь
 * Але якщо всі джерела падають - reject
 */

function unreliableSource(name, delay, shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${name} failed`));
            } else {
                resolve({ source: name, data: 'Success!' });
            }
        }, delay);
    });
}

/**
 * Спробуйте отримати дані з кількох джерел
 * Поверніть перше успішне
 * 
 * @returns {Promise<{source: string, data: string}>}
 */
function getDataFromAnySource() {
    // TODO: Створіть 3 джерела:
    // Source A: delay 300, fails
    // Source B: delay 500, succeeds
    // Source C: delay 200, fails
    // Використайте Promise.race() але обробіть помилки так,
    // щоб продовжити чекати на інші джерела
}

// Перевірка:
getDataFromAnySource()
    .then(result => console.log(' Тест 10.4:', result));
// Очікується: { source: 'Source B', data: 'Success!' }


// ==================== ЗАВДАННЯ 10.5 ====================
/**
 * Створіть систему з fallback серверами
 * Спробуйте основний сервер, якщо він не відповідає за 1 секунду
 * переключіться на резервний
 */

function primaryServer() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Primary data'), 2000);
    });
}

function backupServer() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Backup data'), 500);
    });
}

/**
 * Спробуйте отримати дані:
 * 1. Спочатку з primary
 * 2. Якщо primary не відповідає за 1000ms - використайте backup
 * 3. Поверніть {source: 'primary'|'backup', data: string}
 * 
 * @returns {Promise<{source: string, data: string}>}
 */
function getDataWithFallback() {
    // TODO: Реалізуйте логіку з таймаутом та fallback
    // Підказка: використайте Promise.race() з таймаутом
}

// Перевірка:
getDataWithFallback()
    .then(result => console.log(' Тест 10.5:', result));
// Очікується: { source: 'backup', data: 'Backup data' }


// ==================== ЗАВДАННЯ 10.6 ====================
/**
 * Створіть функцію для конкуруючих обчислень
 * Запустіть кілька воркерів паралельно і поверніть результат першого
 */

function worker(workerId, complexity) {
    return new Promise(resolve => {
        const startTime = Date.now();
        setTimeout(() => {
            resolve({
                workerId,
                result: `Worker ${workerId} completed`,
                timeTaken: Date.now() - startTime
            });
        }, complexity * Math.random() * 100);
    });
}

/**
 * Запустіть 5 воркерів паралельно і поверніть результат найшвидшого
 * Воркери мають складність 1, 2, 3, 4, 5
 * 
 * @returns {Promise<{workerId: number, result: string, timeTaken: number}>}
 */
function parallelComputation() {
    // TODO: Створіть 5 воркерів і використайте Promise.race()
}

// Перевірка:
parallelComputation()
    .then(result => console.log(' Тест 10.6:', result));


// ==================== БОНУСНЕ ЗАВДАННЯ 10.7 ====================
/**
 * Створіть "розумний" race, який ігнорує помилки
 * і чекає на першу успішну відповідь
 * 
 * @param {Promise[]} promises 
 * @returns {Promise}
 */
function raceSuccess(promises) {
    // TODO: Модифікуйте Promise.race() щоб він чекав на першу успішну відповідь
    // і ігнорував помилки, доки хоча б один проміс не виконається успішно
    // Якщо всі проміси падають - reject з масивом всіх помилок
}

// Перевірка:
const testPromises = [
    Promise.reject(new Error('Error 1')),
    new Promise(resolve => setTimeout(() => resolve('Success!'), 500)),
    Promise.reject(new Error('Error 2'))
];

raceSuccess(testPromises)
    .then(result => console.log(' Тест 10.7:', result)); // 'Success!'


/**
 * ПИТАННЯ ДЛЯ САМОПЕРЕВІРКИ:
 * 
 * 1. Що поверне Promise.race([]) з пустим масивом?
 * 2. Чи продовжують виконуватися інші проміси після того, як один виконався?
 * 3. Як Promise.race() обробляє reject?
 * 4. Яка різниця між Promise.race() та Promise.any()?
 * 5. Чи можна використовувати Promise.race() для таймаутів?
 * 6. Що станеться якщо передати в Promise.race() не-проміси?
 */

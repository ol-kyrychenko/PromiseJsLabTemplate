/**
 * ЗАВДАННЯ 11: Promise.allSettled()
 * 
 * Promise.allSettled() чекає на завершення ВСІХ промісів,
 * незалежно від того, виконалися вони успішно чи з помилкою
 */

// ==================== ЗАВДАННЯ 11.1 ====================
/**
 * Використайте Promise.allSettled() для обробки масиву промісів
 * Порахуйте скільки успішних і скільки невдалих
 */
function analyzeResults(promises) {
    // TODO: Використайте Promise.allSettled()
    // Поверніть об'єкт {successful: number, failed: number, results: [...]}
}

// Перевірка:
const testPromises1 = [
    Promise.resolve(1),
    Promise.reject(new Error('Fail')),
    Promise.resolve(3),
    Promise.reject(new Error('Another fail')),
    Promise.resolve(5)
];

analyzeResults(testPromises1)
    .then(stats => {
        console.log(' Тест 11.1:', stats);
        // Очікується: {successful: 3, failed: 2, results: [...]}
    });


// ==================== ЗАВДАННЯ 11.2 ====================
/**
 * Відправити email всім користувачам
 * Повернути статистику: скільки відправлено, скільки помилок
 */

function sendEmail(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 30% шанс помилки
            if (Math.random() > 0.7) {
                reject(new Error(`Failed to send to ${email}`));
            } else {
                resolve(`Email sent to ${email}`);
            }
        }, 100);
    });
}

/**
 * @param {string[]} emails 
 * @returns {Promise<{sent: number, failed: number, details: object[]}>}
 */
async function sendBulkEmails(emails) {
    // TODO: Відправте email всім і поверніть статистику
}

// Перевірка:
const emails = ['user1@test.com', 'user2@test.com', 'user3@test.com', 'user4@test.com'];
sendBulkEmails(emails)
    .then(result => console.log(' Тест 11.2:', result));


// ==================== ЗАВДАННЯ 11.3 ====================
/**
 * Завантажити дані з кількох API
 * Використати успішні результати, логувати помилки
 */

function fetchAPI(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url.includes('broken')) {
                reject(new Error(`API ${url} is down`));
            } else {
                resolve({ url, data: `Data from ${url}` });
            }
        }, Math.random() * 300);
    });
}

/**
 * @param {string[]} urls 
 * @returns {Promise<{successful: object[], failed: Error[]}>}
 */
async function fetchMultipleAPIs(urls) {
    // TODO: Завантажте дані з усіх URL
    // Поверніть успішні результати та логи помилок
}

// Перевірка:
const apis = [
    'https://api1.com/data',
    'https://api2-broken.com/data',
    'https://api3.com/data',
    'https://api4-broken.com/data',
    'https://api5.com/data'
];

fetchMultipleAPIs(apis)
    .then(result => {
        console.log(' Тест 11.3:');
        console.log('  Successful:', result.successful.length);
        console.log('  Failed:', result.failed.length);
    });


// ==================== ЗАВДАННЯ 11.4 ====================
/**
 * Створіть систему моніторингу здоров'я серверів
 * Перевірте всі сервери і створіть звіт про їх статус
 */

function checkServerHealth(serverName, delay, shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${serverName} is down`));
            } else {
                resolve({
                    server: serverName,
                    status: 'healthy',
                    responseTime: delay
                });
            }
        }, delay);
    });
}

/**
 * @returns {Promise<{healthy: object[], unhealthy: object[], totalServers: number}>}
 */
async function monitorServers() {
    const servers = [
        { name: 'Server A', delay: 100, shouldFail: false },
        { name: 'Server B', delay: 300, shouldFail: true },
        { name: 'Server C', delay: 150, shouldFail: false },
        { name: 'Server D', delay: 500, shouldFail: true },
        { name: 'Server E', delay: 200, shouldFail: false }
    ];

    // TODO: Перевірте всі сервери
    // Поверніть детальний звіт про стан кожного
}

// Перевірка:
monitorServers()
    .then(report => {
        console.log(' Тест 11.4: Server Health Report');
        console.log('  Healthy:', report.healthy.length);
        console.log('  Unhealthy:', report.unhealthy.length);
        console.log('  Total:', report.totalServers);
    });


// ==================== ЗАВДАННЯ 11.5 ====================
/**
 * Пакетна обробка даних з детальним звітом
 * Для кожного елемента треба виконати кілька операцій
 */

function validateData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.value < 0) {
                reject(new Error('Negative value'));
            } else {
                resolve({ ...data, validated: true });
            }
        }, 50);
    });
}

function processData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.value > 100) {
                reject(new Error('Value too large'));
            } else {
                resolve({ ...data, processed: true, result: data.value * 2 });
            }
        }, 50);
    });
}

function saveData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.8) {
                reject(new Error('Database error'));
            } else {
                resolve({ ...data, saved: true });
            }
        }, 50);
    });
}

/**
 * Для кожного item виконайте всі три операції
 * Використайте Promise.allSettled() на двох рівнях:
 * 1. Для операцій над одним item
 * 2. Для всіх items
 * 
 * @param {object[]} items 
 * @returns {Promise<{totalItems: number, fullyProcessed: number, partiallyProcessed: number, failed: number, details: object[]}>}
 */
async function processBatchWithDetails(items) {
    // TODO: Складна пакетна обробка з детальною статистикою
}

// Перевірка:
const dataItems = [
    { id: 1, value: 10 },
    { id: 2, value: -5 },
    { id: 3, value: 50 },
    { id: 4, value: 150 },
    { id: 5, value: 30 }
];

processBatchWithDetails(dataItems)
    .then(report => {
        console.log(' Тест 11.5: Batch Processing Report');
        console.log(report);
    });


// ==================== БОНУСНЕ ЗАВДАННЯ 11.6 ====================
/**
 * Створіть систему graceful degradation
 * Якщо основний сервіс недоступний - використайте запасний
 * Якщо і він недоступний - використайте кеш
 * Поверніть звіт про те, звідки отримали дані
 */

const cache = new Map([
    ['user:1', { id: 1, name: 'Cached User', source: 'cache' }]
]);

function fetchFromPrimary(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.3) {
                reject(new Error('Primary service down'));
            } else {
                resolve({ id, name: 'Primary User', source: 'primary' });
            }
        }, 100);
    });
}

function fetchFromBackup(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                reject(new Error('Backup service down'));
            } else {
                resolve({ id, name: 'Backup User', source: 'backup' });
            }
        }, 200);
    });
}

/**
 * Спробуйте отримати дані з трьох джерел одночасно
 * Використайте перше успішне
 * Якщо всі недоступні - поверніть помилку
 * 
 * @param {number} userId 
 * @returns {Promise<{data: object, source: string, attemptedSources: string[]}>}
 */
async function fetchWithFallback(userId) {
    // TODO: Реалізуйте graceful degradation
    // Підказка: Promise.allSettled() + логіка вибору першого успішного
}

// Перевірка:
// fetchWithFallback(1)
//     .then(result => {
//         console.log(' Тест 11.6:', result);
//     });


/**
 * ПИТАННЯ ДЛЯ САМОПЕРЕВІРКИ:
 * 
 * 1. Яка різниця між Promise.all() та Promise.allSettled()?
 * 2. Коли краще використовувати Promise.allSettled()?
 * 3. Який формат результату у Promise.allSettled()?
 * 4. Чи може Promise.allSettled() кинути помилку?
 * 5. Як обробити результати Promise.allSettled()?
 * 6. Чи виконуються всі проміси до кінця?
 */

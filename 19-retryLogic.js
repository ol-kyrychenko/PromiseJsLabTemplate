/**
 * ЗАВДАННЯ 19: Retry Logic - Логіка повторних спроб
 * 
 * У реальних додатках часто потрібно повторювати запити при помилках
 * Це критично важлива навичка для роботи з нестабільними API
 */

// ==================== ЗАВДАННЯ 19.1 ====================
/**
 * Створіть простий retry механізм
 * 
 * @param {Function} fn - Асинхронна функція для виконання
 * @param {number} maxRetries - Максимальна кількість спроб
 * @returns {Promise}
 */
function retry(fn, maxRetries) {
    // TODO: Спробуйте виконати fn
    // Якщо помилка і є ще спроби - спробуйте знову
    // Якщо спроби закінчилися - reject
}

// Перевірка:
let attempt1 = 0;
function unreliableFunction() {
    attempt1++;
    if (attempt1 < 3) {
        return Promise.reject(new Error('Failed'));
    }
    return Promise.resolve('Success on attempt ' + attempt1);
}

retry(unreliableFunction, 5)
    .then(result => console.log(' Тест 19.1:', result));
// Очікується: 'Success on attempt 3'


// ==================== ЗАВДАННЯ 19.2 ====================
/**
 * Створіть retry з експоненційною затримкою (exponential backoff)
 * Затримка збільшується: 100ms, 200ms, 400ms, 800ms...
 * 
 * @param {Function} fn 
 * @param {number} maxRetries 
 * @param {number} initialDelay - Початкова затримка в мс
 * @returns {Promise}
 */
function retryWithBackoff(fn, maxRetries, initialDelay = 100) {
    // TODO: Реалізуйте з затримкою між спробами
    // Затримка має подвоюватися після кожної невдалої спроби
}

// Перевірка:
let attempt2 = 0;
function unstableAPI() {
    attempt2++;
    console.log(`  Attempt ${attempt2} at ${new Date().toLocaleTimeString()}`);
    if (attempt2 < 3) {
        return Promise.reject(new Error('API Error'));
    }
    return Promise.resolve('API Success');
}

console.log('Starting retryWithBackoff at', new Date().toLocaleTimeString());
retryWithBackoff(unstableAPI, 5, 100)
    .then(result => console.log(' Тест 19.2:', result));


// ==================== ЗАВДАННЯ 19.3 ====================
/**
 * Створіть retry лише для певних типів помилок
 * Наприклад, Network Errors можна повторювати, а Validation Errors - ні
 */

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * @param {Function} fn 
 * @param {number} maxRetries 
 * @param {Function} shouldRetry - Функція, яка визначає чи робити retry
 * @returns {Promise}
 */
function conditionalRetry(fn, maxRetries, shouldRetry) {
    // TODO: Повторюйте тільки якщо shouldRetry(error) повертає true
}

// Перевірка:
let attempt3 = 0;
function apiWithDifferentErrors() {
    attempt3++;
    if (attempt3 === 1) {
        return Promise.reject(new NetworkError('Connection failed'));
    }
    if (attempt3 === 2) {
        return Promise.reject(new ValidationError('Invalid data'));
    }
    return Promise.resolve('Success');
}

conditionalRetry(
    apiWithDifferentErrors,
    5,
    (error) => error.name === 'NetworkError'
)
    .catch(error => console.log(' Тест 19.3:', error.name));
// Очікується: ValidationError (не робимо retry для цієї помилки)


// ==================== ЗАВДАННЯ 19.4 ====================
/**
 * Створіть retry з детальним логуванням
 * Логуйте кожну спробу, затримку, та результат
 */

/**
 * @param {Function} fn 
 * @param {number} maxRetries 
 * @param {Object} options - {initialDelay, maxDelay, onRetry}
 * @returns {Promise}
 */
function retryWithLogging(fn, maxRetries, options = {}) {
    const {
        initialDelay = 100,
        maxDelay = 5000,
        onRetry = null
    } = options;

    // TODO: Реалізуйте retry з:
    // 1. Експоненційною затримкою (але не більше maxDelay)
    // 2. Викликом onRetry(attempt, error, nextDelay) перед кожною спробою
    // 3. Поверненням детальної інформації про всі спроби
}

// Перевірка:
let attempt4 = 0;
function trackableFunction() {
    attempt4++;
    if (attempt4 < 4) {
        return Promise.reject(new Error(`Fail ${attempt4}`));
    }
    return Promise.resolve('Success!');
}

retryWithLogging(trackableFunction, 5, {
    initialDelay: 50,
    maxDelay: 500,
    onRetry: (attempt, error, delay) => {
        console.log(`  Retry ${attempt}: ${error.message}, waiting ${delay}ms`);
    }
})
    .then(result => console.log(' Тест 19.4:', result));


// ==================== ЗАВДАННЯ 19.5 ====================
/**
 * Створіть систему retry з обмеженням за часом
 * Навіть якщо є спроби, зупиніться якщо пройшло багато часу
 */

/**
 * @param {Function} fn 
 * @param {Object} options - {maxRetries, maxTime, initialDelay}
 * @returns {Promise}
 */
function retryWithTimeout(fn, options = {}) {
    const {
        maxRetries = 3,
        maxTime = 5000,  // Максимальний час в мс
        initialDelay = 100
    } = options;

    // TODO: Реалізуйте retry який зупиняється якщо:
    // 1. Досягнуто maxRetries
    // 2. АБО пройшло більше maxTime мілісекунд від початку
}

// Перевірка:
let attempt5 = 0;
function slowFunction() {
    attempt5++;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (attempt5 < 10) {
                reject(new Error(`Attempt ${attempt5}`));
            } else {
                resolve('Success');
            }
        }, 200);
    });
}

console.log('Starting retryWithTimeout at', new Date().toLocaleTimeString());
retryWithTimeout(slowFunction, {
    maxRetries: 20,
    maxTime: 1000,
    initialDelay: 100
})
    .catch(error => {
        console.log(' Тест 19.5: Stopped due to timeout');
        console.log('  Total attempts:', attempt5);
    });


// ==================== ЗАВДАННЯ 19.6 ====================
/**
 * Створіть "розумний" retry з адаптивною затримкою
 * Затримка залежить від типу помилки
 */

class RateLimitError extends Error {
    constructor(retryAfter) {
        super('Rate limit exceeded');
        this.name = 'RateLimitError';
        this.retryAfter = retryAfter; // seconds
    }
}

class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ServerError';
    }
}

/**
 * @param {Function} fn 
 * @param {number} maxRetries 
 * @returns {Promise}
 */
function smartRetry(fn, maxRetries) {
    // TODO: Реалізуйте retry який:
    // 1. Для RateLimitError чекає error.retryAfter секунд
    // 2. Для ServerError використовує експоненційну затримку
    // 3. Для інших помилок не робить retry
}

// Перевірка:
let attempt6 = 0;
function smartAPI() {
    attempt6++;
    if (attempt6 === 1) {
        return Promise.reject(new RateLimitError(1));
    }
    if (attempt6 === 2) {
        return Promise.reject(new ServerError('Server overload'));
    }
    if (attempt6 === 3) {
        return Promise.resolve('Success!');
    }
}

// smartRetry(smartAPI, 5)
//     .then(result => console.log(' Тест 19.6:', result));


// ==================== ЗАВДАННЯ 19.7 ====================
/**
 * Створіть універсальну retry систему з усіма можливостями
 */

/**
 * @param {Function} fn 
 * @param {Object} config
 * @returns {Promise<{result: any, attempts: number, totalTime: number, errors: Error[]}>}
 */
function universalRetry(fn, config = {}) {
    const defaults = {
        maxRetries: 3,
        maxTime: 10000,
        initialDelay: 100,
        maxDelay: 5000,
        backoffMultiplier: 2,
        shouldRetry: () => true,
        onRetry: () => {},
        onSuccess: () => {},
        onFailure: () => {}
    };

    const options = { ...defaults, ...config };

    // TODO: Створіть комплексну систему retry з:
    // 1. Усіма типами обмежень (maxRetries, maxTime)
    // 2. Гнучкою стратегією затримки
    // 3. Умовним retry (shouldRetry)
    // 4. Callback'ами для моніторингу
    // 5. Детальною статистикою виконання
}

// Перевірка (розкоментуйте після реалізації):
// let attempt7 = 0;
// universalRetry(
//     () => {
//         attempt7++;
//         if (attempt7 < 3) {
//             return Promise.reject(new Error('Not yet'));
//         }
//         return Promise.resolve('Finally!');
//     },
//     {
//         maxRetries: 5,
//         initialDelay: 50,
//         onRetry: (attempt, error) => console.log(`  Retry ${attempt}: ${error.message}`)
//     }
// )
//     .then(result => console.log(' Тест 19.7:', result));


/**
 * ПИТАННЯ ДЛЯ САМОПЕРЕВІРКИ:
 * 
 * 1. Чому важливо мати затримку між спробами?
 * 2. Що таке exponential backoff і чому він корисний?
 * 3. Які типи помилок варто повторювати, а які ні?
 * 4. Як захистити систему від нескінченних retry?
 * 5. Коли краще використовувати часовий ліміт замість лічильника спроб?
 * 6. Як retry впливає на продуктивність системи?
 * 7. Що таке jitter в контексті retry і навіщо він потрібен?
 */

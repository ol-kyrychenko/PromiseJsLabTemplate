/**
 * Тестові утиліти для лабораторних робіт
 * 
 * Використовуйте ці функції для перевірки ваших рішень
 */

// ==================== УТИЛІТИ ДЛЯ ТЕСТУВАННЯ ====================

/**
 * Перевірка що проміс резолвиться зі значенням
 */
async function expectResolve(promise, expectedValue) {
    try {
        const result = await promise;
        if (result === expectedValue) {
            console.log(' PASS: Promise resolved with expected value');
            return true;
        } else {
            console.log(`   FAIL: Expected ${expectedValue}, got ${result}`);
            return false;
        }
    } catch (error) {
        console.log('   FAIL: Promise rejected but should resolve');
        return false;
    }
}

/**
 * Перевірка що проміс відхиляється
 */
async function expectReject(promise, expectedError) {
    try {
        const result = await promise;
        console.log('   FAIL: Promise resolved but should reject');
        return false;
    } catch (error) {
        if (!expectedError || error.message === expectedError) {
            console.log(' PASS: Promise rejected as expected');
            return true;
        } else {
            console.log(`   FAIL: Expected error "${expectedError}", got "${error.message}"`);
            return false;
        }
    }
}

/**
 * Перевірка часу виконання
 */
async function expectTiming(promise, minMs, maxMs) {
    const start = Date.now();
    await promise;
    const duration = Date.now() - start;
    
    if (duration >= minMs && duration <= maxMs) {
        console.log(` PASS: Execution time ${duration}ms within range [${minMs}, ${maxMs}]`);
        return true;
    } else {
        console.log(`   FAIL: Execution time ${duration}ms outside range [${minMs}, ${maxMs}]`);
        return false;
    }
}

/**
 * Тестовий раннер
 */
class TestRunner {
    constructor(name) {
        this.name = name;
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(description, testFn) {
        this.tests.push({ description, testFn });
        return this;
    }

    async run() {
        console.log('\n' + '='.repeat(60));
        console.log(`Running tests: ${this.name}`);
        console.log('='.repeat(60) + '\n');

        for (const { description, testFn } of this.tests) {
            try {
                console.log(`Testing: ${description}`);
                await testFn();
                this.passed++;
            } catch (error) {
                console.log(`   FAIL: ${error.message}`);
                this.failed++;
            }
            console.log('');
        }

        console.log('='.repeat(60));
        console.log(`Results: ${this.passed} passed, ${this.failed} failed`);
        console.log('='.repeat(60) + '\n');
    }
}


// ==================== ДОПОМІЖНІ ФУНКЦІЇ ====================

/**
 * Створює проміс з затримкою
 */
function delay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

/**
 * Створює проміс який reject після затримки
 */
function delayReject(ms, error) {
    return new Promise((_, reject) => 
        setTimeout(() => reject(error || new Error('Rejected')), ms)
    );
}

/**
 * Вимірює час виконання промісу
 */
async function measureTime(promise) {
    const start = Date.now();
    const result = await promise;
    const duration = Date.now() - start;
    return { result, duration };
}

/**
 * Виконує проміс з таймаутом
 */
function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), ms)
    );
    return Promise.race([promise, timeout]);
}

/**
 * Retry helper
 */
async function retry(fn, maxAttempts = 3, delayMs = 100) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) throw error;
            await delay(delayMs);
        }
    }
}

/**
 * Логер для промісів
 */
function logPromise(promise, label) {
    console.log(`[${label}] Started`);
    return promise
        .then(result => {
            console.log(`[${label}]  Resolved:`, result);
            return result;
        })
        .catch(error => {
            console.log(`[${label}]    Rejected:`, error.message);
            throw error;
        });
}


// ==================== ПРИКЛАД ВИКОРИСТАННЯ ====================

// Приклад 1: Базове тестування
async function example1() {
    const promise = Promise.resolve(42);
    await expectResolve(promise, 42);
}

// Приклад 2: Тестування помилок
async function example2() {
    const promise = Promise.reject(new Error('Test error'));
    await expectReject(promise, 'Test error');
}

// Приклад 3: Тестування часу
async function example3() {
    const promise = delay(500, 'result');
    await expectTiming(promise, 450, 550);
}

// Приклад 4: Використання TestRunner
async function example4() {
    const runner = new TestRunner('My Tests');
    
    runner
        .test('Should resolve with 42', async () => {
            const result = await Promise.resolve(42);
            if (result !== 42) throw new Error('Wrong value');
        })
        .test('Should reject with error', async () => {
            try {
                await Promise.reject(new Error('Test'));
                throw new Error('Should have rejected');
            } catch (error) {
                if (error.message !== 'Test') throw error;
            }
        });
    
    await runner.run();
}

// Приклад 5: Вимірювання часу
async function example5() {
    const { result, duration } = await measureTime(
        delay(300, 'Done')
    );
    console.log(`Result: ${result}, Time: ${duration}ms`);
}


// ==================== ЕКСПОРТ ====================

// Для використання в Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        expectResolve,
        expectReject,
        expectTiming,
        TestRunner,
        delay,
        delayReject,
        measureTime,
        withTimeout,
        retry,
        logPromise
    };
}


// ==================== ШВИДКИЙ СТАРТ ====================

/**
 * Скопіюйте цей код у свій файл для швидкого тестування:
 * 
 * ```javascript
 * const runner = new TestRunner('Моє завдання');
 * 
 * runner
 *     .test('Опис тесту 1', async () => {
 *         // Ваш тестовий код
 *     })
 *     .test('Опис тесту 2', async () => {
 *         // Ваш тестовий код
 *     });
 * 
 * runner.run();
 * ```
 */

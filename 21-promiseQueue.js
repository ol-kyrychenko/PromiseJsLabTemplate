/**
 * ЗАВДАННЯ 21: Promise Queue - Черга Промісів
 * 
 * Черга промісів дозволяє контролювати порядок виконання асинхронних операцій
 * Це важливо коли порядок має значення
 */

// ==================== ЗАВДАННЯ 21.1 ====================
/**
 * Створіть просту чергу FIFO (First In, First Out)
 * Проміси виконуються по черзі, один за одним
 */
class PromiseQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    /**
     * Додати проміс в чергу
     * @param {Function} promiseFactory - Функція що повертає проміс
     */
    add(promiseFactory) {
        // TODO: Додайте promiseFactory в чергу
        // Якщо черга не обробляється - почніть обробку
    }

    async process() {
        // TODO: Обробіть всі проміси в черзі по порядку
        // Кожен наступний починається тільки після завершення попереднього
    }
}

// Перевірка:
const queue1 = new PromiseQueue();

queue1.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log(' Тест 21.1: Task 1 completed');
        resolve(1);
    }, 300);
}));

queue1.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log(' Тест 21.1: Task 2 completed');
        resolve(2);
    }, 100);
}));

queue1.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log(' Тест 21.1: Task 3 completed');
        resolve(3);
    }, 200);
}));
// Очікується виконання в порядку: Task 1 → Task 2 → Task 3


// ==================== ЗАВДАННЯ 21.2 ====================
/**
 * Створіть чергу з пріоритетами
 * Завдання з вищим пріоритетом виконуються першими
 */
class PriorityQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    /**
     * @param {Function} promiseFactory 
     * @param {number} priority - Вищий номер = вищий пріоритет
     */
    add(promiseFactory, priority = 0) {
        // TODO: Додайте з урахуванням пріоритету
        // Відсортуйте чергу за пріоритетом
    }

    async process() {
        // TODO: Обробіть по черзі з урахуванням пріоритету
    }
}

// Перевірка:
const queue2 = new PriorityQueue();

queue2.add(() => Promise.resolve(console.log('  Priority 1')), 1);
queue2.add(() => Promise.resolve(console.log('  Priority 5')), 5);
queue2.add(() => Promise.resolve(console.log('  Priority 3')), 3);

console.log(' Тест 21.2: Виконання за пріоритетом:');
// Очікується: Priority 5 → Priority 3 → Priority 1


// ==================== ЗАВДАННЯ 21.3 ====================
/**
 * Створіть чергу з можливістю паузи та відновлення
 */
class ControllableQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
        this.paused = false;
    }

    add(promiseFactory) {
        // TODO: Додайте в чергу
    }

    pause() {
        // TODO: Призупиніть обробку
    }

    resume() {
        // TODO: Відновіть обробку
    }

    async process() {
        // TODO: Обробляйте з урахуванням паузи
        // Перевіряйте this.paused перед кожним завданням
    }
}

// Перевірка:
const queue3 = new ControllableQueue();

queue3.add(() => Promise.resolve(console.log('  Task A')));
queue3.add(() => Promise.resolve(console.log('  Task B')));

setTimeout(() => {
    queue3.pause();
    console.log('  Queue paused');
}, 100);

setTimeout(() => {
    queue3.add(() => Promise.resolve(console.log('  Task C')));
    queue3.resume();
    console.log('  Queue resumed');
}, 500);

console.log(' Тест 21.3: Контрольована черга');


// ==================== ЗАВДАННЯ 21.4 ⭐ ====================
/**
 * Створіть чергу з обмеженням часу виконання
 * Якщо завдання не виконується за заданий час - скасуйте його
 */
class TimedQueue {
    constructor(timeout = 5000) {
        this.queue = [];
        this.timeout = timeout;
        this.processing = false;
    }

    add(promiseFactory) {
        // TODO: Додайте з таймаутом
    }

    async process() {
        // TODO: Обробіть з таймаутом для кожного завдання
        // Використайте Promise.race() з таймером
    }
}

// Перевірка:
const queue4 = new TimedQueue(500);

queue4.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log('  Fast task completed');
        resolve();
    }, 200);
}));

queue4.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log('  This should not print');
        resolve();
    }, 1000);
}));

console.log(' Тест 21.4: Черга з таймаутом');


// ==================== ЗАВДАННЯ 21.5 ====================
/**
 * Створіть чергу з автоматичним retry
 * Якщо завдання падає - спробуйте ще раз
 */
class RetryQueue {
    constructor(maxRetries = 3) {
        this.queue = [];
        this.maxRetries = maxRetries;
        this.processing = false;
    }

    add(promiseFactory, retries = 0) {
        // TODO: Додайте з можливістю retry
    }

    async process() {
        // TODO: Обробіть з retry логікою
        // Якщо завдання падає і retries < maxRetries - спробуйте знову
    }
}

// Перевірка:
const queue5 = new RetryQueue(3);
let attempt = 0;

queue5.add(() => {
    attempt++;
    console.log(`  Attempt ${attempt}`);
    if (attempt < 3) {
        return Promise.reject(new Error('Failed'));
    }
    return Promise.resolve('Success!');
});

console.log(' Тест 21.5: Черга з retry');


// ==================== ЗАВДАННЯ 21.6 ====================
/**
 * Створіть чергу з callback'ами для моніторингу
 */
class MonitoredQueue {
    constructor(options = {}) {
        this.queue = [];
        this.processing = false;
        this.onStart = options.onStart || (() => {});
        this.onComplete = options.onComplete || (() => {});
        this.onError = options.onError || (() => {});
        this.stats = {
            total: 0,
            completed: 0,
            failed: 0
        };
    }

    add(promiseFactory) {
        // TODO: Додайте з моніторингом
        this.stats.total++;
    }

    async process() {
        // TODO: Обробіть з викликом callback'ів
        // onStart перед кожним завданням
        // onComplete після успішного виконання
        // onError при помилці
    }

    getStats() {
        return this.stats;
    }
}

// Перевірка:
const queue6 = new MonitoredQueue({
    onStart: (index) => console.log(`  Starting task ${index + 1}`),
    onComplete: (index, result) => console.log(`  Task ${index + 1} completed`),
    onError: (index, error) => console.log(`  Task ${index + 1} failed:`, error.message)
});

queue6.add(() => Promise.resolve('OK'));
queue6.add(() => Promise.reject(new Error('Fail')));
queue6.add(() => Promise.resolve('OK'));

console.log('Тест 21.6: Черга з моніторингом');


// ==================== ЗАВДАННЯ 21.7 ====================
/**
 * Створіть універсальну чергу з усіма можливостями
 */
class UniversalQueue {
    constructor(options = {}) {
        this.queue = [];
        this.processing = false;
        this.paused = false;
        
        // Опції
        this.concurrency = options.concurrency || 1; // Скільки завдань одночасно
        this.timeout = options.timeout || null;
        this.maxRetries = options.maxRetries || 0;
        this.autoStart = options.autoStart !== false;
        
        // Callback'и
        this.onStart = options.onStart || (() => {});
        this.onComplete = options.onComplete || (() => {});
        this.onError = options.onError || (() => {});
        this.onDrain = options.onDrain || (() => {}); // Коли черга порожня
        
        // Статистика
        this.stats = {
            total: 0,
            completed: 0,
            failed: 0,
            running: 0
        };
    }

    add(promiseFactory, priority = 0) {
        // TODO: Реалізуйте повну функціональність
    }

    pause() {
        // TODO
    }

    resume() {
        // TODO
    }

    clear() {
        // TODO: Очистити чергу
    }

    async process() {
        // TODO: Обробка з урахуванням concurrency
        // Одночасно може виконуватися до this.concurrency завдань
    }

    getStats() {
        return { ...this.stats };
    }
}

// Перевірка:
// const queue7 = new UniversalQueue({
//     concurrency: 2,
//     timeout: 1000,
//     maxRetries: 2,
//     onComplete: (task, result) => console.log('Completed:', result),
//     onDrain: () => console.log('All tasks completed!')
// });

// for (let i = 1; i <= 5; i++) {
//     queue7.add(() => new Promise(resolve => {
//         setTimeout(() => resolve(`Task ${i}`), Math.random() * 500);
//     }));
// }


/**
 * ПИТАННЯ ДЛЯ САМОПЕРЕВІРКИ:
 * 
 * 1. Яка різниця між чергою та паралельним виконанням?
 * 2. Коли краще використовувати чергу з пріоритетами?
 * 3. Як реалізувати LIFO (Last In, First Out) чергу?
 * 4. Чи потрібна черга якщо є concurrency limit?
 * 5. Як захистити чергу від memory leaks?
 * 6. Що таке backpressure і як черга допомагає з ним?
 * 7. Як тестувати асинхронні черги?
 */

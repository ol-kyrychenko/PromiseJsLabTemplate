/**
 * ЗАВДАННЯ 7: Ланцюжки промісів (Promise Chaining)
 * 
 * Ланцюжки промісів - потужний інструмент для послідовної обробки даних
 * Кожен .then() повертає новий проміс
 */

// ==================== ЗАВДАННЯ 7.1 ====================
/**
 * Створіть ланцюжок, який:
 * 1. Починається з числа 5
 * 2. Множить на 2
 * 3. Додає 10
 * 4. Конвертує в рядок
 * 
 * Очікуваний результат: "20"
 */
function simpleChain() {
    return Promise.resolve(5)
        // TODO: Додайте .then() для множення на 2
        // TODO: Додайте .then() для додавання 10
        // TODO: Додайте .then() для конвертації в рядок
}

// Перевірка:
simpleChain()
    .then(result => console.log(' Тест 7.1:', result)); // "20"


// ==================== ЗАВДАННЯ 7.2 ====================
/**
 * Створіть ланцюжок обробки даних користувача:
 * 1. Отримати об'єкт {name: 'john doe', age: 25}
 * 2. Конвертувати name у верхній регістр
 * 3. Додати поле isAdult (age >= 18)
 * 4. Додати поле nameLength
 * 
 * @param {{name: string, age: number}} user 
 * @returns {Promise<{name: string, age: number, isAdult: boolean, nameLength: number}>}
 */
function processUser(user) {
    return Promise.resolve(user)
        // TODO: Реалізуйте ланцюжок трансформацій
}

// Перевірка:
processUser({ name: 'john doe', age: 25 })
    .then(result => console.log(' Тест 7.2:', result));
// Очікується: { name: 'JOHN DOE', age: 25, isAdult: true, nameLength: 8 }


// ==================== ЗАВДАННЯ 7.3 ====================
/**
 * Створіть ланцюжок з асинхронними операціями
 * Використовуйте функції нижче для побудови ланцюжка
 */

function fetchUserData(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: userId, username: 'user_' + userId });
        }, 100);
    });
}

function fetchUserPosts(user) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                ...user,
                posts: ['Post 1', 'Post 2', 'Post 3']
            });
        }, 100);
    });
}

function countPosts(userData) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                ...userData,
                postCount: userData.posts.length
            });
        }, 100);
    });
}

/**
 * Створіть функцію, яка:
 * 1. Отримує дані користувача
 * 2. Отримує його пости
 * 3. Рахує кількість постів
 * 
 * @param {number} userId 
 * @returns {Promise<{id: number, username: string, posts: string[], postCount: number}>}
 */
function getUserWithPostCount(userId) {
    // TODO: Побудуйте ланцюжок з трьох функцій вище
}

// Перевірка:
getUserWithPostCount(123)
    .then(result => console.log(' Тест 7.3:', result));


// ==================== ЗАВДАННЯ 7.4 ====================
/**
 * Створіть ланцюжок з обробкою помилок
 * Якщо number < 0 - кинути помилку
 * Інакше виконати обчислення
 */

function validateNumber(number) {
    if (number < 0) {
        throw new Error('Number must be positive');
    }
    return number;
}

/**
 * Створіть функцію, яка:
 * 1. Валідує число (використовуйте validateNumber)
 * 2. Множить на 2
 * 3. Додає 5
 * 4. Повертає результат у форматі {original: number, result: number}
 * 5. Обробляє помилки та повертає {error: string}
 * 
 * @param {number} number 
 * @returns {Promise<{original?: number, result?: number, error?: string}>}
 */
function safeCalculation(number) {
    // TODO: Реалізуйте з обробкою помилок
}

// Перевірка:
safeCalculation(10)
    .then(result => console.log(' Тест 7.4a:', result));
// Очікується: { original: 10, result: 25 }

safeCalculation(-5)
    .then(result => console.log(' Тест 7.4b:', result));
// Очікується: { error: 'Number must be positive' }


// ==================== ЗАВДАННЯ 7.5 ====================
/**
 * Створіть складний ланцюжок обробки замовлення
 */

const products = {
    101: { id: 101, name: 'Laptop', price: 1000, stock: 5 },
    102: { id: 102, name: 'Mouse', price: 25, stock: 50 },
    103: { id: 103, name: 'Keyboard', price: 75, stock: 0 }
};

function getProduct(productId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products[productId];
            if (product) {
                resolve(product);
            } else {
                reject(new Error('Product not found'));
            }
        }, 100);
    });
}

function checkStock(product) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (product.stock > 0) {
                resolve(product);
            } else {
                reject(new Error('Out of stock'));
            }
        }, 100);
    });
}

function calculateTotal(product, quantity) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                product: product.name,
                quantity: quantity,
                unitPrice: product.price,
                total: product.price * quantity
            });
        }, 100);
    });
}

/**
 * Створіть функцію оформлення замовлення:
 * 1. Отримати продукт за ID
 * 2. Перевірити наявність на складі
 * 3. Обчислити вартість
 * 4. Обробити всі можливі помилки
 * 
 * @param {number} productId 
 * @param {number} quantity 
 * @returns {Promise<{product: string, quantity: number, unitPrice: number, total: number} | {error: string}>}
 */
function placeOrder(productId, quantity) {
    // TODO: Реалізуйте повний ланцюжок з обробкою помилок
}

// Перевірка:
placeOrder(101, 2)
    .then(result => console.log(' Тест 7.5a:', result));
// Очікується: { product: 'Laptop', quantity: 2, unitPrice: 1000, total: 2000 }

placeOrder(103, 1)
    .then(result => console.log(' Тест 7.5b:', result));
// Очікується: { error: 'Out of stock' }

placeOrder(999, 1)
    .then(result => console.log(' Тест 7.5c:', result));
// Очікується: { error: 'Product not found' }


// ==================== БОНУСНЕ ЗАВДАННЯ 7.6 🔥 ====================
/**
 * Створіть функцію, яка виконує серію трансформацій над рядком
 * і повертає історію всіх змін
 * 
 * @param {string} text 
 * @returns {Promise<{original: string, steps: string[], final: string}>}
 */
function transformWithHistory(text) {
    // TODO: Створіть ланцюжок, який:
    // 1. Зберігає оригінальний текст
    // 2. Конвертує в нижній регістр (зберегти в історію)
    // 3. Видаляє пробіли (зберегти в історію)
    // 4. Інвертує рядок (зберегти в історію)
    // 5. Повертає об'єкт з original, steps[], final
}

// Перевірка (розкоментуйте після реалізації):
// transformWithHistory('Hello World')
//     .then(result => console.log(' Тест 7.6:', result));
// Очікується: {
//   original: 'Hello World',
//   steps: ['hello world', 'helloworld', 'dlrowolleh'],
//   final: 'dlrowolleh'
// }


/**
 * ПИТАННЯ ДЛЯ САМОПЕРЕВІРКИ:
 * 
 * 1. Що повертає .then()?
 * 2. Чи можна повернути проміс з .then()?
 * 3. Що станеться якщо в .then() кинути помилку?
 * 4. Як працює .catch() в середині ланцюжка?
 * 5. Чи можна продовжити ланцюжок після .catch()?
 * 6. Яка різниця між return value та return Promise.resolve(value) в .then()?
 */

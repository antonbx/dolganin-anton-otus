// asyncFunctions - массив асинхронных функций

let fn1 = () => {
    console.log('fn1');
    return Promise.resolve(1);
};

let fn2 = () => new Promise(resolve => {
    console.log('fn2');
    setTimeout(() => resolve(2), 1000);
});

// реализация

async function promiseReduce(asyncFunctions, reduce, initialValue) {
    for (let i = 0, c = asyncFunctions.length; i < c; i++) {
        let fn = asyncFunctions[i];
        // await - так как ф-я асин-я по условию
        await fn.call().then((fnResult) => {
            // в условии не совсем очевидно сказано про параметры reduce
            // но по логике именования параметр memo - это сохраняемое значение,
            // а параметр value - это новое значение
            initialValue = reduce(initialValue, fnResult);
            // промежуточные значения будут: 1, 2
        });
    }
    // по условию надо вернуть промис с результатом
    // фактически, это два в одном - промис, который сразу решен
    return Promise.resolve(initialValue);
}

// проверка

promiseReduce(
    [fn1, fn2],
    function (memo, value) {
        console.log('reduce');
        return memo * value;
    },
    1
)
    .then(console.log);

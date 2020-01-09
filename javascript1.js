// внешняя оболочка по сути нужна для хранения суммирующего значения
let sum = function(i) {

    let val = i;
    // очевидно, возвращать мы должны функцию
    let summing = function(n) {
        // далее уже в лоб по условию
        if (typeof n === 'undefined') {
            return val;
        } else {
            val += n;
            return summing;
        }
    };

    return summing;
};
// вообще я изначально хотел решить _красиво_ задачу:
// sum(1);
// sum(2);
// sum();>> получаем результат
// то есть допускаем бесконечное число вызовов по коду,
// а не в одной строчке (что имеет мало практического смысла)
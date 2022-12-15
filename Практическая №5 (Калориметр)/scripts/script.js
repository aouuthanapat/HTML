// используем  библиотеку jquery
$(document).ready(function (){
    class meal {
        constructor(name, cal) {
                 //constructor - это специальный метод, служащий для создания и инициализации объектов, созданных с использованием class
            this.name = name;
            this.cal = cal;
        }
    }

    let menu = [
        new meal("Ветчина", 365),
        new meal("Говядина", 180),
        new meal("Корейка", 430),
        new meal("Крольчатина", 115),
        new meal("Курица вареная", 135),
        new meal("Курица жареная", 210),
        new meal("Почки", 66),
        new meal("Печень", 100),
        new meal("Сердце", 87),
        new meal("Утка", 405),
        new meal("Йогурт 1.5%", 51),
        new meal("Кефир 1%", 38),
        new meal("Кефир 0%", 30),
        new meal("Молоко 3.2%", 65),
        new meal("Сливки 10%", 120),
        new meal("Сметана 10%", 115),
        new meal("Творог 18%", 226),
        new meal("Крупа гречневая", 346),
        new meal("Крупа манная", 340),
        new meal("Крупа овсяная", 374),
        new meal("Крупа перловая", 342),
        new meal("Рис", 337),
        new meal("Макароны", 350),
    ];

    let calFormSelect = $('.calorimeter-form #meal');
    let calFormButton = $('.calorimeter-form button');
    let totalCalValue = $('#total-caloric-content');
    let table = $('.table');

    // выбор продукта
    menu.forEach(function (item) { //перебор массива
        calFormSelect.append(new Option(item['name']));
    })

    // добавление в табл 
    calFormButton.click(function () {
        let mealValue = calFormSelect.children('option:selected').val();
        let meal = menu.find(x => x["name"] === mealValue);
        let count = 1;
        let newTableRow = `<tr><td class="name">${meal.name}</td><td class="count">${count}</td><td class="calories">${meal.cal} кКал</td><td class="avgCal">${meal.cal * count} кКал</td></tr>`;
        let tableRow = $('td').filter(function() {
            return $(this).text() === meal.name;
        }).closest("tr");
        let mealName = tableRow.find('.name').html();
        let mealCount = tableRow.find('.count').html();

        if (mealName === undefined) {
            table.append(newTableRow);
        } else {
            mealCount++;
            tableRow.find('.count').html(mealCount);
            tableRow.find('.avgCal').html(`${meal.cal * mealCount} кКал`);
        }
    });

    // Calculate calories
    $('#calculate-button').click(function () { //получение элемента с id="calculate-button"
        let totalCal = 0;
        let tableRows = $('.table tbody tr');

        if (tableRows.length) {
            tableRows.each(function () {
                let mealCount = $(this).find('.count').html();
                let mealCal = $(this).find('.calories').text().split(" ")[0];
                totalCal += mealCal * mealCount;
            })

            totalCalValue.text(`Прием пищи составит: ${totalCal} кКал`);
        } else {
            alert('Для начала нужно добавить ингредиенты для приема пищи')
        }
    });

    // Clear table
    $('#сlear-button').click(function () {
        let tableRows = $('.table tbody tr');

        if (tableRows.length){
            $('.table tbody').empty();
            totalCalValue.text('Прием пищи составит: 0 кКал');
        } else {
            alert('Нечего отчищать');
        }
    })
});
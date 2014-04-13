# JW.Updater

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Updater

Наблюдает за изменением [свойств](#!/guide/rujwproperty) и вызывает
указанную функцию, передавая в нее значения свойств в качестве аргументов. Также,
функция вызывается при инициализации.

    var frequency = new JW.Property(106.2);
    var wave = new JW.Property("FM");
    var updater = new JW.Updater([ frequency, wave ], function(frequency, wave) {
        console.log("Включаем радио на частоте " + frequency + " " + wave);
    }, this); // вывод: Включаем радио на частоте 106.2 FM
    frequency.{@link JW.Property#set set}(105); // вывод: Включаем радио на частоте 105 FM
    wave.{@link JW.Property#set set}("УКВ"); // вывод: Включаем радио на частоте 105 УКВ

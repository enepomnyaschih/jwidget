# JW.Switcher

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Switcher

Наблюдает за изменением [свойств](#!/guide/rujwproperty) и вызывает
указанные функции.

Функция {@link JW.Switcher#init init} вызывается при инициализации Switcher'а и изменении значения свойства.
Новые значения свойств передаются в качестве аргументов.

Функция {@link JW.Switcher#done done} вызывается при изменении значения свойства и при уничтожении Switcher'а.
Бывшие значения свойств передаются в качестве аргументов.

    var property = new JW.Property(1);
    var switcher = new JW.Switcher([property], {
        {@link JW.Switcher#init init}: function(value) {
            console.log("Init " + value);
            return value + 1;
        },
        {@link JW.Switcher#done done}: function(value) {
            console.log("Done " + value);
        },
        {@link JW.Switcher#scope scope}: this
    }); // вывод: Init 1
    property.{@link JW.Property#set set}(2); // вывод: Done 1, Init 2
    property.{@link JW.Property#set set}(null); // вывод: Done 2
    property.{@link JW.Property#set set}(3); // вывод: Init 3
    switcher.{@link JW.Switcher#destroy destroy}(); // вывод: Done 3

По умолчанию, функции не вызываются, если значение хотя бы одного свойства - null. Вы можете изменить это с помощью
опции {@link JW.Switcher#acceptNull acceptNull}.

Реалистичный сценарий использования switcher'а представлен ниже:

    this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
    this.{@link JW.Class#own own}(new JW.Switcher([this.selectedDocument], {
        {@link JW.Switcher#init init}: function(document) {
            document.selected.{@link JW.Property#set set}(true);
        },
        {@link JW.Switcher#done done}: function(document) {
            document.selected.{@link JW.Property#set set}(false);
        },
        {@link JW.Switcher#scope scope}: this
    }));

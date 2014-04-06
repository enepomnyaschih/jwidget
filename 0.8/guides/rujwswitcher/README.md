# JW.Switcher

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Switcher

`<V>` Наблюдает за изменением {@link JW.Property свойства} и вызывает
указанные функции {@link JW.Switcher#init init} и {@link JW.Switcher#done done},
передавая в них значение свойства в качестве аргумента.
Также, функция {@link JW.Switcher#init init} вызывается при инициализации switcher'а,
а функция {@link JW.Switcher#done done} вызывается при уничтожении switcher'а.
Функции не вызываются, если значение свойства - null.

    var property = new JW.Property(1);
    var switcher = new JW.Switcher(property, {
        {@link JW.Switcher#init init}: function(value) { console.log("Init " + value); },
        {@link JW.Switcher#done done}: function(value) { console.log("Done " + value); },
        {@link JW.Switcher#scope scope}: this
    }); // вывод: Init 1
    property.{@link JW.Property#set set}(2); // вывод: Done 1, Init 2
    property.{@link JW.Property#set set}(null); // вывод: Done 2
    property.{@link JW.Property#set set}(3); // вывод: Init 3
    switcher.{@link JW.Switcher#destroy destroy}(); // вывод: Done 3

Реалистичный сценарий использования switcher'а представлен ниже:

    this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
    this.own(new JW.Switcher(this.selectedDocument, {
        {@link JW.Switcher#init init}: function(document) { document.selected.{@link JW.Property#set set}(true); },
        {@link JW.Switcher#done done}: function(document) { document.selected.{@link JW.Property#set set}(false); },
        {@link JW.Switcher#scope scope}: this
    }));

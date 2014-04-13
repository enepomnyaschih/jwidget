# JW.Switcher

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Switcher

`<V>` Наблюдает за изменением [свойства](#!/guide/rujwproperty) и вызывает
указанные функции.

Функция {@link JW.Switcher#init init} вызывается при инициализации Switcher'а и изменении значения свойства.
Новое значение свойства передается в качестве аргумента, и функция может вернуть произвольный объект
в качестве "отпечатка" этого значения.

Функция {@link JW.Switcher#done done} вызывается при изменении значения свойства и при уничтожении Switcher'а.
"Отпечаток", выданный функцией {@link JW.Switcher#init init}, передается в качестве первого аргумента, а бывшее
значение свойства передается в качетсве второго аргумента.

Функции не вызываются, если значение свойства - null.

    var property = new JW.Property(1);
    var switcher = new JW.Switcher(property, {
        {@link JW.Switcher#init init}: function(value) {
            console.log("Init " + value);
            return value + 1;
        },
        {@link JW.Switcher#done done}: function(tracker, value) {
            console.log("Done " + value + " tracked by " + tracker);
        },
        {@link JW.Switcher#scope scope}: this
    }); // вывод: Init 1
    property.{@link JW.Property#set set}(2); // вывод: Done 1 tracked by 2, Init 2
    property.{@link JW.Property#set set}(null); // вывод: Done 2 tracked by 3
    property.{@link JW.Property#set set}(3); // вывод: Init 3
    switcher.{@link JW.Switcher#destroy destroy}(); // вывод: Done 3 tracked by 4

Реалистичный сценарий использования switcher'а представлен ниже:

    this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
    this.{@link JW.Class#own own}(new JW.Switcher(this.selectedDocument, {
        {@link JW.Switcher#init init}: function(document) { document.selected.{@link JW.Property#set set}(true); },
        {@link JW.Switcher#done done}: function(unused, document) { document.selected.{@link JW.Property#set set}(false); },
        {@link JW.Switcher#scope scope}: this
    }));

"Отпечаток" можно использовать, чтобы создавать цепочки из Switcher'а и [Functor](#!/guide/rujwfunctor)'а или
[Copier](#!/guide/rujwcopier)'а. Например, представьте, что у вас есть несколько папок и несколько документов в каждой
папке. Одна из папок выбрана, и один из документов выбран в каждой из папок. Вы хотели бы следить за текущим
выбранным документом в текущей выбранной папке. Это можно сделать следующим способом:

    var Folder = function() {
        Folder.{@link JW.Class#_super _super}.call(this);
        this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
    };
    
    JW.extend(Folder, JW.Class);
    
    var App = function() {
        App.{@link JW.Class#_super _super}.call(this);
        this.selectedFolder = this.{@link JW.Class#own own}(new JW.Property());
        this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
        this.{@link JW.Class#own own}(new JW.Switcher(this.selectedFolder, {
            {@link JW.Switcher#cfg-init init}: function(folder) {
                return new JW.Copier(folder.selectedDocument, {{@link JW.Copier#cfg-target target}: this.selectedDocument});
            },
            {@link JW.Switcher#cfg-done done}: JW.destroy,
            {@link JW.Switcher#cfg-scope scope}: this
        }));
    };
    
    JW.extend(App, JW.Class);

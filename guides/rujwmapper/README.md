# JW.Mapper

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Mapper

`<T>` Наблюдает за изменением значений исходных [свойств](#!/guide/rujwproperty) и пересоздает значение целевого
свойства с использованием указанных функций. В отличие от [JW.Functor](#!/guide/rujwfunctor), позволяет вам уничтожить
предыдущее созданное значение. Кроме того, Mapper сбрасывает целевое свойство в null при своем уничтожении.

    var count = new JW.Property(1);
    var units = new JW.Property("apples");
    var target = new JW.Property();

    // Следующая команда напечатает в консоль "Init 1 apples"
    var mapper = new JW.Mapper([ count, units ], {
        {@link JW.Mapper#cfg-target target}: target,
        {@link JW.Mapper#createValue createValue}: function(value, units) {
            var result = value + " " + units;
            console.log("Init " + result);
            return result;
        },
        {@link JW.Mapper#destroyValue destroyValue}: function(result, value, units) {
            console.log("Done " + result);
        },
        {@link JW.Mapper#scope scope}: this
    });
    assert("1 apples", target.{@link JW.Property#get get}());

    // Следующая команда напечатает "Done 1 apples" и "Init 2 apples"
    count.{@link JW.Property#set set}(2);
    assert("2 apples", target.{@link JW.Property#get get}());

    // Следующая команда напечатает "Done 2 apples"
    mapper.{@link JW.Mapper#destroy destroy}();
    assert(null, target.{@link JW.Property#get get}());

Если целевое свойство в конструктор не передано, то оно создается автоматически.
Обратите внимание, что в таком случае Mapper агрегирует его.

    var source = new JW.Property(1);
    var mapper = new JW.Mapper([ source ], {
        {@link JW.Mapper#createValue createValue}: function(value) {
            return value + " apples";
        },
        {@link JW.Mapper#scope scope}: this
    });
    var target = mapper.{@link JW.Mapper#property-target target};
    assert("1 apples", target.{@link JW.Property#get get}());
    mapper.{@link JW.Mapper#destroy destroy}();

В простых случаях, вы можете использовать упрощенные методы JW.Property#$$mapValue и JW.Property#$$mapObject. Они сразу возвращают целевое свойство:

    var source = new JW.Property(1);
    var target = source.{@link JW.Property#$$mapValue $$mapValue}(function(value) { return value + " apples"; });
    assert("1 apples", target.{@link JW.Property#get get}());
    target.{@link JW.Property#destroy destroy}();

Когда меняется значение исходного свойства, запускается следующий алгоритм:

1. Создается новое значение
1. Целевому свойству присваивается новое значение
1. Уничтожается старое значение

[JW.Switcher](#!/guide/rujwswitcher) работает наоборот:

1. Вызывается метод {@link JW.Switcher#done done}
1. Вызывается метод {@link JW.Switcher#init init}

Распространенный сценарий использования Mapper'а - это создание легко заменяемого дочернего компонента по данным:

    var MyComponent = function(document) {
        MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
        this.document = document;
    };
    
    JW.extend(MyComponent, JW.UI.Component, {
        // JW.Property<Document> document;
        
        renderDocument: function() {
            return this.{@link JW.Class#own own}(this.document.{@link JW.Property#$$mapObject $$mapObject}(function(document) {
                return new DocumentView(document);
            }, this);
        }
    });
    
    JW.UI.template(MyComponent, {
        main:
            '<div jwclass="my-component">' +
                '<div jwid="document"></div>' +
            '</div>'
    });

Также, Mapper позволяет вам выполнять цепочечные вычисления на базе свойств. Представьте, что у вас есть несколько
папок и несколько документов в каждой папке. Одна из папок выбрана, и в каждой папке есть один выбранный документ
Вы хотите создавать представление документа по текущей выбранной папке и текущему выбранному документу в этой
папке. Сделайте следующее:

    var Folder = function() {
        Folder.{@link JW.Class#_super _super}.call(this);
        this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
    };
    
    JW.extend(Folder, JW.Class);
    
    var App = function() {
        App.{@link JW.Class#_super _super}.call(this);
        this.selectedFolder = this.{@link JW.Class#own own}(new JW.Property());
        this.documentView = this.{@link JW.Class#own own}(new JW.Property());
        this.{@link JW.Class#own own}(new JW.Mapper([this.selectedFolder], {
            {@link JW.Mapper#cfg-createValue createValue}: function(folder) {
                return new JW.Mapper([folder.selectedDocument], {
                    {@link JW.Mapper#cfg-target target}: this.documentView,
                    {@link JW.Mapper#cfg-createValue createValue}: function(document) {
                        return new DocumentView(folder, document);
                    },
                    {@link JW.Mapper#cfg-destroyValue destroyValue}: JW.destroy,
                    {@link JW.Mapper#cfg-scope scope}: this
                });
            },
            {@link JW.Mapper#cfg-destroyValue destroyValue}: JW.destroy,
            {@link JW.Mapper#cfg-scope scope}: this
        }));
    };
    
    JW.extend(App, JW.Class);

По умолчанию, Mapper не вызывает функции, если хотя бы одно из исходных значений равно null. Но вы можете изменить это,
используя опцию {@link JW.Mapper#acceptNull acceptNull}.

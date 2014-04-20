# JW.UI.Component

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.Component

Базовый класс UI компонента.

Возможности:

- Рендеринг по HTML шаблону
- Прямой доступ к элементам компонента
- [jQuery-интерфейс](http://api.jquery.com/) для работы с элементами
- Удобный API для работы с дочерними компонентами

У jWidget очень простой интерфейс, но весьма необычная философия, которая гарантирует соответствие архитектуре
Model-View без больших усилий. Начнем с примеров.

### Пример UI компонента jWidget

    // Объявляем пространство имен
    var MyApp = {};
    
    // Объявляем конструктор компонента
    MyApp.Component = function(message, link) {
        MyApp.Component.{@link JW.Class#static-property-_super _super}.call(this);
        this.message = message;
        this.link = link;
    };
    
    // Наследуемся от JW.UI.Component
    JW.extend(MyApp.Component, JW.UI.Component, {
        // String message;
        // String link;
        
        // override
        {@link JW.UI.Component#renderComponent renderComponent}: function() {
            this.{@link JW.Class#method-_super _super}();
            this.{@link JW.UI.Component#getElement getElement}("hello-message").text(this.message);
            this.{@link JW.UI.Component#getElement getElement}("link").attr("href", this.link);
        }
    });
    
    JW.UI.template(MyApp.Component, {
        main:
            '<div jwclass="myapp-component">' +
                '<div jwid="hello-message" />' +
                '<a href="#" jwid="link">Click me!</a>' +
            '</div>'
    });

Рассмотрим, как это работает. У каждого компонента есть главный шаблон, который передается в функцию
JW.UI.template с именем `main` и по умолчанию равен
<code>&lt;div /&gt;</code>. Вы можете добавить и другие шаблоны, они будут доступны в поле компонента
<code>{@link JW.UI.Component#templates this.templates}.&lt;template_name&gt;</code> (но они используются очень редко).
Подкласс наследует шаблоны базового класса.

Обратите внимание на специальные атрибуты `jwclass` и `jwid`. `jwclass` - это корневой CSS-класс компонента,
`jwid` - это суффикс к `jwclass` в данном элементе. Так, в результате рендеринга этого компонента мы получим
следующий фрагмент HTML:

    <div class="myapp-component">
        <div class="myapp-component-hello-message" />
        <a href="#" class="myapp-component-link">Click me!</a>
    </div>

Вы можете получить элемент по его `jwid`, используя метод {@link JW.UI.Component#getElement getElement}. В результате вызова этого метода вы получите
[jQuery-обертку](http://api.jquery.com/) над этим элементом. У корневого элемента `jwid` равен "root".
Кроме того, у компонента есть поле {@link JW.UI.Component#el el}, которое ссылается на корневой jQuery-элемент компонента.

### Создание компонента в коде

Компонент может быть создан простым конструированием. После этого, вы можете использовать метод {@link JW.UI.Component#renderTo renderTo}
или {@link JW.UI.Component#renderAs renderAs}, чтобы вставить этот компонент в DOM.

    var component;
    
    jQuery(function() {
        component = new MyApp.Component("Hello world!", "http://google.com");
        component.{@link JW.UI.Component#renderTo renderTo}("body");
    });

### Дочерние компоненты

Есть 4 способа добавить дочерний компонент:

- Добавить компонент в словарь {@link JW.UI.Component#children children} с ключом, равным `jwid` элемента, который вы хотите заменить дочерним
компонентом. Обычно, это делается в методе {@link JW.UI.Component#renderComponent renderComponent}.
- Добавить легко заменяемый дочерний компонент, используя метод {@link JW.UI.Component#addReplaceable addReplaceable}. Передайте туда [JW.Property](#!/guide/rujwproperty) и фреймворк
обеспечит непрерывную синхронизацию с этим свойством во время работы приложения.
- Добавить массив дочерних компонентов в один из элементов с помощью метода {@link JW.UI.Component#addArray addArray}. Если переданный массив
является JW.ObservableArray, то фреймворк обеспечит непрерывную синхронизацию с этим массивом во время
работы приложения.
- Определить метод <code>render&lt;ChildId&gt;</code>, где <code>&lt;ChildId&gt;</code> - это `jwid` элемента,
записанный в CamelCase с заглавной буквы. Пример: `renderArticle` (рендерит элемент `jwid="article"`).
Если метод возвращает [JW.UI.Component](#!/guide/rujwuicomponent), [JW.Property](#!/guide/rujwproperty) или [JW.AbstractArray](#!/guide/rujwabstractarray), то результат будет трактоваться как дочерний компонент
или массив дочерних компонентов. Определите метод `renderRoot` для рендеринга корневого элемента, но вы сможете
вернуть там только JW.AbstractArray. Смотрите параграф **Подробнее о методе render&lt;ChildId&gt;** для деталей.

Такой интерфейс с одной стороны прост, с другой стороны гибок в плане следования архитектуре Model-View.

[Учебник. Часть 1. Модель и представление](#!/guide/rusample1)

### Подробнее о массивах дочерних компонентов

Для создания массивов UI компонентов на основе массивов данных удобно использовать [JW.AbstractCollection.Mapper](#!/guide/rujwabstractcollectionmapper).
Благодаря ему, представление будет автоматически обновляться при изменении данных.

По этой же причине рекомендуем использовать [JW.AbstractCollection](#!/guide/rujwabstractcollection) в реализации классов модели вместо нативных
JavaScript Array и Object: у наших коллекций есть Observable-реализации и они могут синхронизироваться друг с другом.

[Учебник. Часть 6. Синхронизаторы коллекций](#!/guide/rusample6)

### Подробнее о методе render&lt;ChildId&gt;

Вы можете определить метод `render<ChildId>` для всех элементов HTML шаблона, у которых есть атрибут `jwid`.
`<ChildId>` равен этому `jwid`, записанному в CamelCase с большой буквы. Сигнатура метода:

<code>renderChildId(el: [jQuery](http://api.jquery.com/)): Mixed</code>

`el` - элемент с соответствующим `jwid`.

В зависимости от того, какой результат возвращает этот метод, есть следующие варианты:

- Если метод возвращает [JW.UI.Component](#!/guide/rujwuicomponent), то он будет добавлен в словарь {@link JW.UI.Component#children children} и станет дочерним компонентом. Не работает для корневого элемента.
- Если метод возвращает [JW.Property](#!/guide/rujwproperty), то он будет добавлен как легко заменяемый дочерний компонент методом {@link JW.UI.Component#addReplaceable addReplaceable}. Не работает для корневого элемента.
- Если метод возвращает [JW.AbstractArray](#!/guide/rujwabstractarray), то он будет добавлен как массив дочерних компонентов методом {@link JW.UI.Component#addArray addArray}.
- Если метод возвращает `false` (===), то элемент будет удален из HTML компонента. Не работает для корневого элемента.
- В противном случае, фреймворк не выполнит никаких дополнительных действий по инициализации элемента.

### Удаление и уничтожение компонентов

Вы можете уничтожить компонент методом {@link JW.UI.Component#destroy destroy}. Но вы не сможете уничтожить компонент, который добавлен в другой
компонент в качестве дочернего (если попробуете, фреймворк выбросит исключение). Сначала вы должны удалить
дочерний компонент из родителя. Чтобы это сделать, нужно выполнить операцию, обратную операции добавления.
Так, чтобы удалить компонент с `jwid="comments"` вы должны вызвать метод {@link JW.AbstractMap#method-remove remove}
объекта {@link JW.UI.Component#children children}. Сразу же после этого вы можете уничтожить его:

    this.{@link JW.UI.Component#children children}.{@link JW.AbstractMap#method-remove remove}("comments").{@link JW.Class#destroy destroy}();

В таком случае, элемент HTML шаблона с таким `jwid` вернется в свое изначальное состояние.

Вы можете свободно уничтожать дочерние компоненты в методе {@link JW.UI.Component#destroyComponent destroyComponent} родительского компонента.
В этом методе, дочерние компоненты уже удалены из родителя фреймворком и готовы к уничтожению.

Кроме того, вы можете использовать метод агрегации {@link JW.Class#own own} для уничтожения дочерних компонентов.

С массивами дочерних компонентов все немного сложнее. Первый способ удалить дочерний компонент, который добавлен в
родителя через массив - это удалить этот компонент из массива (если это JW.ObservableArray). Второй способ:
метод {@link JW.UI.Component#addArray addArray} возвращает экземпляр JW.UI.Component.Array. Если вы его уничтожите, то массив будет
удален из родительского компонента:

        // override
        {@link JW.UI.Component#renderComponent renderComponent}: function() {
            this._labelMapper = this.labels.{@link JW.AbstractArray#createMapper createMapper}({
                {@link JW.AbstractCollection.Mapper#createItem createItem}: function(label) { return new LabelView(label); },
                {@link JW.AbstractCollection.Mapper#destroyItem destroyItem}: JW.destroy,
                {@link JW.AbstractCollection.Mapper#scope scope}: this
            });
            // Добавляем метки в элемент с jwid="labels"
            this._labelArray = this.{@link JW.UI.Component#addArray addArray}(this._labelMapper.{@link JW.AbstractCollection.Mapper#property-target target}, "labels");
        },
        
        clearLabels: function() {
            this._labelArray.{@link JW.Class#destroy destroy}();
        }

**Замечение:** Все массивы уже уничтожены перед вызовом метода {@link JW.UI.Component#destroyComponent destroyComponent}, т.е. такие дочерние компоненты
уже удалены из родителя. Но сами компоненты еще не уничтожены. Обычно это делается путем уничтожения соответствующего
синхронизатора:

        {@link JW.UI.Component#destroyComponent destroyComponent}: function() {
            this._labelMapper.{@link JW.Class#destroy destroy}(); // уничтожаем представления всех меток
            this.{@link JW.Class#method-_super _super}();
        }

Правила, описанные в этом параграфе, могут показаться вам слишком сложными, но их первопричины станут яснее
в следующем параграфе.

### Общие практики работы с дочерними компонентами

**Внутренние именованные дочерние компоненты**

Этот пример описывает, как создается и уничтожается дочерний компонент с `jwid="title-box"`.

    var MyComponent = function() {
        MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
    };
    
    JW.extend(MyComponent, JW.UI.Component, {
        renderTitleBox: function() {
            return this.{@link JW.Class#own own}(new TitleBox());
        }
    });
    
    JW.UI.template(MyComponent, {
        main:
            '<div jwclass="my-component">' +
                '<div jwid="title-box" />' +
            '</div>'
    });

**Внутренний заменяемый дочерний компонент**

Этот пример описывает, как создается легко заменяемый дочерний компонент с `jwid="document"`.
Предположим, что у вас есть свойство "document", и вы хотите заменять старое представление документа новым при смене
значения этого свойства.

    var MyComponent = function(document) {
        MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
        this.document = document;
    };
    
    JW.extend(MyComponent, JW.UI.Component, {
        // JW.Property<Document> document;
        
        renderDocument: function() {
            return this.{@link JW.Class#own own}(new JW.Mapper([this.document], {
                {@link JW.Mapper#createValue createValue}: function(document) {
                    return new DocumentView(document);
                },
                {@link JW.Mapper#destroyValue destroyValue}: JW.destroy,
                {@link JW.Mapper#scope scope}: this
            })).{@link JW.Mapper#property-target target};
        }
    });
    
    JW.UI.template(MyComponent, {
        main:
            '<div jwclass="my-component">' +
                '<div jwid="document" />' +
            '</div>'
    });

**Внутренние неизменяемые массивы дочерних компонентов**

Этот пример описывает, как дочерние компоненты создаются и уничтожаются на основе массива данных, и
как они добавляются внутрь элемента с `jwid="labels"`.

    var MyComponent = function(labels) {
        MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
        this.labels = labels;
    };
    
    JW.extend(MyComponent, JW.UI.Component, {
        // JW.AbstractArray<Label> labels;
        
        renderLabels: function() {
            return this.{@link JW.Class#own own}(this.labels.{@link JW.AbstractArray#$map $map}(function(label) {
                return new LabelView(label);
            }, this)).{@link JW.AbstractCollection#ownItems ownItems}();
        }
    });
    
    JW.UI.template(MyComponent, {
        main:
            '<div jwclass="my-component">' +
                '<div jwid="labels" />' +
            '</div>'
    });

**Внутренний изменяемый массив дочерних компонентов**

Этот пример описывает, как дочерние компоненты создаются и уничтожаются на основе массива данных, и
как они добавляются внутрь элемента с `jwid="labels"`. Массив дочерних компонентов будет автоматически
синхронизироваться с данными налету.

    var MyComponent = function(labels) {
        MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
        this.labels = labels;
    };
    
    JW.extend(MyComponent, JW.UI.Component, {
        // JW.AbstractArray<Label> labels;
        
        renderLabels: function() {
            return this.{@link JW.Class#own own}(this.labels.{@link JW.AbstractArray#createMapper createMapper}({
                {@link JW.AbstractCollection.Mapper#createItem createItem}: function(label) {
                    return new LabelView(label);
                },
                {@link JW.AbstractCollection.Mapper#destroyItem destroyItem}: JW.destroy,
                {@link JW.AbstractCollection.Mapper#scope scope}: this
            })).{@link JW.AbstractCollection.Mapper#property-target target};
        }
    });
    
    JW.UI.template(MyComponent, {
        main:
            '<div jwclass="my-component">' +
                '<div jwid="labels" />' +
            '</div>'
    });

**Внешние дочерние компоненты**

Этот пример описывает, как добавить дочерние компоненты, которые созданы кеи-то другим и, следовательно,
не должны быть уничтожены здесь автоматически. Здесь, "titleBox" может быть JW.UI.Component,
[JW.Property](#!/guide/rujwproperty)<JW.UI.Component> или [JW.AbstractArray](#!/guide/rujwproperty)<JW.UI.Component>.

    var MyComponent = function(titleBox) {
        MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
        this.titleBox = titleBox;
    };
    
    JW.extend(MyComponent, JW.UI.Component, {
        // Mixed titleBox;
        
        renderTitleBox: function() {
            return this.titleBox;
        }
    });
    
    JW.UI.template(MyComponent, {
        main:
            '<div jwclass="my-component">' +
                '<div jwid="title-box" />' +
            '</div>'
    });

### Этапы жизни компонента

Каждый компонент проходит несколько этапов жизненного цикла.

1. Как и у всех остальных классов, сначала вызывается **конструктор**. Обычно здесь объявляются все поля и присваиваются
их изначальные значения, создаются события и т.д. Здесь затрагивается только модель компонента, представление
полностью игнорируется. Обратите внимание, что компонент после конструирования еще не отрендерен, так что у него
еще нет полей {@link JW.UI.Component#el el} и {@link JW.UI.Component#children children}, а
метод {@link JW.UI.Component#addArray addArray} не будет работать. Смысл этого в том, чтобы дать вам возможность
сделать что-то еще между конструированием и рендерингом компонента, например, изменить значения каких-то полей и
вызвать какие-то методы. Вторая причина: вообще, во всех объектно-ориентированных языках программирования не
рекомендуется вызывать виртуальные методы внутри конструктора. Вы можете отрендерить компонент напрямую вызовом
метода {@link JW.UI.Component#render render}, {@link JW.UI.Component#renderTo renderTo},
{@link JW.UI.Component#renderAs renderAs}, или неявно путем добавления этого компонента в другой компонент в качестве
дочернего. Например, компонент будет сразу же отрендерен, если его добавить в словарь {@link JW.UI.Component#children children}. Вы можете
инициировать рендеринг компонента несколько раз, но отрендерен он будет лишь при первой попытке.
1. Метод {@link JW.UI.Component#beforeRender beforeRender} вызывается во время рендеринга компонента, после чтения HTML шаблона и инициализации всех ссылок
на элементы шаблона. Здесь удобно выполнять какие-либо предварительные действия перед созданием дочерних компонентов.
Но вы уже имеете право создавать здесь дочерние компоненты. Вызов <code>this._super()</code> выполняется в первой
строке метода.
1. Методы <code>render&lt;ChildId&gt;</code> вызываются для всех элементов HTML шаблона, т.е. выполняется
создание дочерних компонентов.
1. Вызывается метод {@link JW.UI.Component#renderComponent renderComponent}. Здесь следует присваивать атрибуты элементов, создавать дочерние компоненты,
подписываться на события и наполнять компонент поведением, если вы не захотели этого делать на предыдущем шаге.
Вызов <code>this._super()</code> выполняется в первой строке метода.
1. Метод {@link JW.UI.Component#afterAppend afterAppend} вызывается после первого появления компонента в HTML DOM и дереве UI компонентов.
Здесь следует выполнять лайаутинг компонента (вычислять размеры элементов). Здесь заканчивается рендеринг компонента.
Вызов <code>this._super()</code> выполняется в первой строке метода.
1. Метод {@link JW.UI.Component#destroyComponent destroyComponent} вызывается при уничтожении компонента. Здесь откатывается все, что было сделано во
время рендеринга компонента, т.е. на шагах 2-5. Фреймворк уже удалил все дочерние компоненты перед вызовом этого
метода, но сами компоненты еще не уничтожены. Вы должны уничтожить их явно, если вы не заагрегировали их
методом {@link JW.Class#own own}.
Вызов <code>this._super()</code> выполняется в последней строке метода.
1. Метод {@link JW.UI.Component#destroyObject destroyObject} вызывается при уничтожении компонента. Здесь откатывается все, что было сделано в
конструкторе компонента, т.е. на первом шаге.
Вызов <code>this._super()</code> выполняется в последней строке метода.

### Интеграция с jWidget SDK

Библиотека jWidget UI идеально интегрирована с [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/ru), что
дает вам хорошую оптимизацию JS-кода прямо из коробки, а также возможность выносить HTML шаблоны в отдельные файлы.
Например, вы можете упростить самый первый пример, разбив его на 2 файла:

**component.js**

    // Объявляем пространство имен
    var MyApp = {};
    
    // Объявляем конструктор компонента
    MyApp.Component = function(message, link) {
        MyApp.Component.{@link JW.Class#static-property-_super _super}.call(this);
        this.message = message;
        this.link = link;
    };
    
    // Наследуемся от JW.UI.Component
    JW.extend(MyApp.Component, JW.UI.Component, {
        // String message;
        // String link;
        
        // override
        {@link JW.UI.Component#renderComponent renderComponent}: function() {
            this.{@link JW.Class#method-_super _super}();
            this.{@link JW.UI.Component#getElement getElement}("hello-message").text(this.message);
            this.{@link JW.UI.Component#getElement getElement}("link").attr("href", this.link);
        }
    });

**component.jw.html**

    <div jwclass="myapp-component">
        <div jwid="hello-message" />
        <a href="#" jwid="link">Click me!</a>
    </div>

Чтобы это работало, вам нужно просто зарегистрировать следующие ресурсы в соответствующем пакете jWidget SDK:

    {
        "resources" : [
            "component.js",
            "component.jw.html : MyApp.Component",
            ...
        ]
    }

Конечно, вы можете использовать jWidget и без jWidget SDK, но в таком случае вам потребуется либо загружать
HTML шаблоны динамически, либо объявлять их явно прямо в JavaScript коде, используя функцию JW.UI.template.

Ищите более дополнительные примеры по использованию jWidget SDK в учебнике:

[Учебник. Часть 7. Инфраструктура проекта](#!/guide/rusample7)

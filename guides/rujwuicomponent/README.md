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
        {@link JW.UI.Component#afterRender afterRender}: function() {
            this.{@link JW.Class#method-_super _super}();
            this.{@link JW.UI.Component#getElement getElement}("hello-message").text(this.message);
            this.{@link JW.UI.Component#getElement getElement}("link").attr("href", this.link);
        }
    });
    
    JW.UI.template(MyApp.Component, {
        main:
            '<div jwclass="myapp-component">' +
                '<div jwid="hello-message"></div>' +
                '<a href="#" jwid="link">Click me!</a>' +
            '</div>'
    });

Рассмотрим, как это работает. У каждого компонента есть главный шаблон, который передается в функцию
JW.UI.template с именем `main` и по умолчанию равен
<code>&lt;div&gt;&lt;/div&gt;</code>. Вы можете добавить и другие шаблоны, они будут доступны в поле компонента
<code>{@link JW.UI.Component#templates this.templates}.&lt;template_name&gt;</code> (но они используются очень редко).
Подкласс наследует шаблоны базового класса.

Обратите внимание на специальные атрибуты `jwclass` и `jwid`. `jwclass` - это корневой CSS-класс компонента,
`jwid` - это суффикс к `jwclass` в данном элементе. Так, в результате рендеринга этого компонента мы получим
следующий фрагмент HTML:

    <div class="myapp-component">
        <div class="myapp-component-hello-message"></div>
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

Есть 5 способов добавить дочерний компонент:

- Добавить компонент в словарь {@link JW.UI.Component#children children} с ключом, равным `jwid` элемента, который вы хотите заменить дочерним
компонентом. Обычно, это делается в методе {@link JW.UI.Component#afterRender afterRender}.
- Добавить легко заменяемый дочерний компонент, используя метод {@link JW.UI.Component#addReplaceable addReplaceable}. Передайте туда [JW.Property](#!/guide/rujwproperty) и фреймворк
обеспечит непрерывную синхронизацию с этим свойством во время работы приложения.
- Добавить массив дочерних компонентов в один из элементов с помощью метода {@link JW.UI.Component#addArray addArray}. Если переданный массив
является JW.ObservableArray, то фреймворк обеспечит непрерывную синхронизацию с этим массивом во время
работы приложения.
- Добавить коллекцию дочерних компонентов в один из элементов с помощью метода
{@link JW.UI.Component#addCollection addCollection}. В отличие от метода {@link JW.UI.Component#addArray addArray},
{@link JW.UI.Component#addCollection addCollection} не сохраняет порядок дочерних компонентов.
Каждый новый добавленный компонент всегда добавляется в конец. Если переданная коллекция
является прослушиваемой (observable), то фреймворк обеспечит непрерывную синхронизацию с этой коллекцией во время
работы приложения.
- Определить метод <code>render&lt;ChildId&gt;</code>, где <code>&lt;ChildId&gt;</code> - это `jwid` элемента,
записанный в CamelCase с заглавной буквы. Пример: `renderArticle` (рендерит элемент `jwid="article"`).
Если метод возвращает [JW.UI.Component](#!/guide/rujwuicomponent), [JW.Property](#!/guide/rujwproperty) или [JW.AbstractCollection](#!/guide/rujwabstractcollection), то результат будет трактоваться как дочерний компонент
или коллекция дочерних компонентов. Определите метод `renderRoot` для рендеринга корневого элемента, но вы сможете
вернуть там только [JW.AbstractCollection](#!/guide/rujwabstractcollection). Смотрите параграф **Подробнее о методе render&lt;ChildId&gt;** для деталей.

Такой интерфейс с одной стороны прост, с другой стороны гибок в плане следования архитектуре Model-View.

[Учебник. Часть 1. Модель и представление](#!/guide/rusample1)

### Подробнее о коллекциях дочерних компонентов

Для создания коллекций UI компонентов на основе коллекций данных удобно использовать метод
{@link JW.AbstractCollection#$$mapObjects $$mapObjects}.
Благодаря ему, представление будет автоматически обновляться при изменении данных.

По этой же причине рекомендуем использовать коллекции jWidget в реализации классов модели вместо нативных
JavaScript Array и Object: у коллекций jWidget есть Observable-реализации, и они могут синхронизироваться друг с другом.

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
- Если метод возвращает [JW.AbstractCollection](#!/guide/rujwabstractcollection) (не являющаяся [JW.AbstractArray](#!/guide/rujwabstractarray)), то она будет добавлена как коллекция дочерних компонентов методом {@link JW.UI.Component#addCollection addCollection}.
- Если метод возвращает `false` (===), то элемент будет удален из HTML компонента. Не работает для корневого элемента.
- В противном случае, фреймворк не выполнит никаких дополнительных действий по инициализации элемента.

### Удаление и уничтожение компонентов

Вы можете уничтожать компоненты методом {@link JW.Class#destroy destroy}. Тем не менее, вы не можете уничтожить
компонент, который был добавлен в другой в качестве дочернего (в этом случае, фреймворк выбросит исключение).
Вы должны сначала удалить дочерний компонент из родителя. Чтобы это сделать, вам нужно выполнить операцию,
обратную операции добавления.

- Если вы добавили компонент в объект {@link JW.UI.Component#children children}, то вам нужно удалить его оттуда
методом {@link JW.AbstractMap#method-remove remove}.
- Метод {@link JW.UI.Component#addReplaceable addReplaceable} возвращает экземпляр класса JW.UI.Component.Replaceable.
Его уничтожение влечет удаление заменяемого дочернего компонента.
- Метод {@link JW.UI.Component#addArray addArray} возвращает экземпляр класса JW.UI.Component.Array.
Его уничтожение влечет удаление массива дочерних компонентов.
- Метод {@link JW.UI.Component#addCollection addCollection} возвращает экземпляр класса JW.UI.Component.Collection.
Его уничтожение влечет удаление коллекции дочерних компонентов.

Как только дочерний компонент удален, вы можете уничтожить его:

    this.{@link JW.UI.Component#children children}.{@link JW.AbstractMap#method-remove remove}("comments").{@link JW.Class#destroy destroy}();

Другой пример:

    // следует вызывать не ранее начала рендеринга компонента
    initLabels: function() {
        this._labelViews = this.labels.{@link JW.AbstractArray#$$mapObjects $$mapObjects}(function(label) {
            return new LabelView(label);
        }, this);
        // Добавляем метки в элемент с jwid="labels"
        this._labelArray = this.{@link JW.UI.Component#addArray addArray}(this._labelViews, "labels");
    },

    clearLabels: function() {
        this._labelArray.{@link JW.Class#destroy destroy}();
        this._labelArray = null;
        this._labelViews.{@link JW.Class#destroy destroy}();
        this._labelViews = null;
    }

Вам не нужно каждый раз явно удалять дочерние компоненты. При уничтожении родителя, фреймворк автоматически
удаляет все дочерние компоненты непосредственно перед вызовом метода {@link JW.UI.Component#unrender unrender}.
Тем не менее, он не уничтожает их. Вы можете воспользоваться методом агрегации объектов {@link JW.Class#own own},
чтобы их уничтожить. Так что в большинстве случаев ваш код будет выглядеть очень просто:

    renderTitleBox: function() {
        return this.{@link JW.Class#own own}(new TitleBox());
    },

    renderLabels: function() {
        return this.{@link JW.Class#own own}(this.labels.{@link JW.AbstractArray#$$mapObjects $$mapObjects}(function(label) {
            return new LabelView(label);
        }, this));
    }

### Общие практики работы с дочерними компонентами

**Создание дочернего компонента**

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
                '<div jwid="title-box"></div>' +
            '</div>'
    });

**Создание заменяемого дочернего компонента**

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
            return this.{@link JW.Class#own own}(this.document.{@link JW.Property#$$mapObject $$mapObject}(function(document) {
                return new DocumentView(document);
            }, this));
        }
    });
    
    JW.UI.template(MyComponent, {
        main:
            '<div jwclass="my-component">' +
                '<div jwid="document"></div>' +
            '</div>'
    });

**Создание коллекции дочерних компонентов**

Этот пример описывает, как дочерние компоненты создаются и уничтожаются на основе коллекции данных, и
как они добавляются внутрь элемента с `jwid="labels"`. Если коллекция данных наблюдаемая (observable),
то коллекция дочерних компонентов будет непрерывно синхронизироваться с данными.

    var MyComponent = function(labels) {
        MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
        this.labels = labels;
    };
    
    JW.extend(MyComponent, JW.UI.Component, {
        // JW.AbstractArray<Label> labels;
        
        renderLabels: function() {
            return this.{@link JW.Class#own own}(this.labels.{@link JW.AbstractArray#$$mapObjects $$mapObjects}(function(label) {
                return new LabelView(label);
            }, this));
        }
    });
    
    JW.UI.template(MyComponent, {
        main:
            '<div jwclass="my-component">' +
                '<div jwid="labels"></div>' +
            '</div>'
    });

**Добавление существующих компонентов в качестве дочерних**

Этот пример описывает, как добавить дочерние компоненты, которые созданы кем-то другим и, следовательно,
не должны быть уничтожены здесь автоматически. Здесь, "titleBox" может быть JW.UI.Component,
[JW.Property](#!/guide/rujwproperty)<JW.UI.Component> или [JW.AbstractCollection](#!/guide/rujwabstractcollection)<JW.UI.Component>.

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
                '<div jwid="title-box"></div>' +
            '</div>'
    });

### Этапы жизни компонента

Каждый компонент проходит несколько этапов жизненного цикла.

1. Как и у всех остальных классов, сначала вызывается **конструктор**. Обычно здесь объявляются все поля и присваиваются
их изначальные значения, создаются события и т.д. Здесь затрагивается только модель компонента, представление
полностью игнорируется. Обратите внимание, что компонент после конструирования еще не отрендерен, так что у него
еще нет полей {@link JW.UI.Component#el el} и {@link JW.UI.Component#children children}, а
методы {@link JW.UI.Component#addArray addArray}, {@link JW.UI.Component#addCollection addCollection} и
{@link JW.UI.Component#addReplaceable addReplaceable} не будут работать. Смысл этого в том, чтобы дать вам возможность
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
1. Вызывается метод {@link JW.UI.Component#afterRender afterRender}. Здесь следует присваивать атрибуты элементов, создавать дочерние компоненты,
подписываться на события и наполнять компонент поведением, если вы не захотели этого делать на предыдущем шаге.
Здесь заканчивается рендеринг компонента. Вызов <code>this._super()</code> выполняется в первой строке метода.
1. Метод {@link JW.UI.Component#afterAppend afterAppend} вызывается после первого появления компонента в HTML DOM и дереве UI компонентов.
Здесь следует выполнять лайаутинг компонента (вычислять размеры элементов).
Вызов <code>this._super()</code> выполняется в первой строке метода.
1. Метод {@link JW.UI.Component#releaseDom releaseDom} вызывается при уничтожении компонента. Здесь откатывается все, что было сделано в методе {@link JW.UI.Component#afterAppend afterAppend},
т.е. на шаге 5. Вызов <code>this._super()</code> выполняется в последней строке метода.
1. Метод {@link JW.UI.Component#unrender unrender} вызывается при уничтожении компонента. Здесь откатывается все, что было сделано во
время рендеринга компонента, т.е. на шагах 2-4. Фреймворк уже удалил все дочерние компоненты перед вызовом этого
метода, но сами компоненты еще не уничтожены. Вы должны уничтожить их явно, если вы не заагрегировали их
методом {@link JW.Class#own own}.
Вызов <code>this._super()</code> выполняется в последней строке метода.
1. Метод {@link JW.UI.Component#afterDestroy afterDestroy} вызывается при уничтожении компонента. Здесь откатывается все, что было сделано в
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
        {@link JW.UI.Component#afterRender afterRender}: function() {
            this.{@link JW.Class#method-_super _super}();
            this.{@link JW.UI.Component#getElement getElement}("hello-message").text(this.message);
            this.{@link JW.UI.Component#getElement getElement}("link").attr("href", this.link);
        }
    });

**component.jw.html**

    <div jwclass="myapp-component">
        <div jwid="hello-message"></div>
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

Ищите дополнительные примеры по использованию jWidget SDK в учебнике:

[Учебник. Часть 7. Инфраструктура проекта](#!/guide/rusample7)

### Сохранность clear-div

Начиная с jWidget 1.4, вы можете рендерить коллекции дочерних компонентов в непустые DOM элементы. В этом случае,
все существующие узлы останутся в конце элемента. Наиболее частое приложение для
этого - <a href="https://css-tricks.com/the-how-and-why-of-clearing-floats/" target="_blank">использование clear-div</a>.

<iframe style="border: 1px solid green; padding: 10px;" width="600" height="260" src="http://enepomnyaschih.github.io/mt/1.4/jwui-clear-div.html"></iframe>

# jQuery

Это краткое описание класса на русском языке.

Полная документация на английском: jQuery

## jwon

	{@link jQuery#jwon jwon}(events: String, [selector: String], handler: Function, [scope: Object])): JW.UI.JQEventAttachment

	handler(event: Event, target: DOMElement)

Добавляет обработчик события. jWidget-расширение метода <a href="http://api.jquery.com/on/" target="_blank">on</a>,
обладающее следующими возможностями.

### 1. Агрегация

Метод возвращает объект подписки на событие. Его уничтожение влечет отписку от события, что позволяет вам использовать
события jQuery в комбинации с методом {@link JW.Class#own own}.

    // Добавляем обработчик события "mousemove" и агрегируем подписку
    this.own($(window).{@link jQuery#jwon jwon}("mousemove", function(event) {
        $(".output").text(event.pageX + ":" + event.pageY);
    }, this));

### 2. Аргумент контекста вызова

Метод принимает контекст вызова функции в качестве аргумента, что позволяет вам избежать использования методов
JW.inScope и <a href="http://api.jquery.com/jQuery.proxy/" target="_blank">jQuery.proxy</a>.

    // На клик по кнопке уничтожаем этот компонент
    el.{@link jQuery#jwon jwon}("click", this.destroy, this);

Целевой элемент события, который jQuery обычно использует в качества контекста вызова, передается в функцию вторым
аргументом.

    el.{@link jQuery#jwon jwon}("click", function(event, target) { ... }, this);

Метод не имеет аргумента для передачи данных - используйте вместо него замыкания.

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-jwon.html"></iframe>

## jwattr

	{@link jQuery#jwattr jwattr}(attr: String, property: JW.Property<String>): JW.UI.AttrUpdater

Наблюдает за изменением строкового [свойства](#!/guide/rujwproperty) и обновляет значение указанного атрибута DOM
элемента. Возвращает экземпляр JW.UI.AttrUpdater, уничтожение которого прекращает синхронизацию.

	// Привязываем атрибут "title" к значению свойства title
	this.own(el.{@link jQuery#jwattr jwattr}("title", title));

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwattr.html"></iframe>

## jwclass

Метод управления CSS классами DOM элемента. Имеет две сигнатуры.

	{@link jQuery#jwclass jwclass}(cls: String, property: JW.Property<Boolean>): JW.UI.ClassUpdater
	{@link jQuery#jwclass jwclass}(cls: JW.Property<String>): JW.UI.ClassNameUpdater

<hr>

    {@link jQuery#jwclass jwclass}(cls: String, property: JW.Property<Boolean>): JW.UI.ClassUpdater

Наблюдает за изменением булевого [свойства](#!/guide/rujwproperty) и обновляет наличие указанного CSS класса в DOM элементе.
Возвращает экземпляр JW.UI.ClassUpdater, уничтожение которого прекращает синхронизацию.

	// Привязываем CSS-класс "checked" к значению свойства checked
	this.own(el.jwclass("checked", checked));

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-bool.html"></iframe>

<hr>

    {@link jQuery#jwclass jwclass}(cls: JW.Property<String>): JW.UI.ClassNameUpdater

Наблюдает за изменением строкового [свойства](#!/guide/rujwproperty) и обновляет имя CSS класса в DOM элементе.
Возвращает экземпляр JW.UI.ClassNameUpdater, уничтожение которого прекращает синхронизацию.

**Внимание:** Метод не проверяет наличие в элементе класса с таким же именем. Если такое произойдет,
он удалит этот класс при следующем изменении значения свойства. Тем не менее, он не станет трогать
другие классы, например, он не удаляет класс "application-rect" в примере ниже.

    // Привязываем имя CSS-класса к значению свойства color
    this.own(el.jwclass(color));

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="250" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-string.html"></iframe>

## jwcss

	{@link jQuery#jwcss jwcss}(style: String, property: JW.Property<String>): JW.UI.CssUpdater

Наблюдает за изменением строкового [свойства](#!/guide/rujwproperty) и обновляет значение указанного CSS стиля DOM элемента.
Возвращает экземпляр JW.UI.CssUpdater, уничтожение которого прекращает синхронизацию.

    // Привязываем цвет фона к значению свойства color
    this.own(el.{@link jQuery#jwcss jwcss}("background-color", color));

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwcss.html"></iframe>

## jwhtml

	{@link jQuery#jwhtml jwhtml}(property: JW.Property<String>): JW.UI.HtmlUpdater

Наблюдает за изменением строкового [свойства](#!/guide/rujwproperty) и обновляет HTML внутри DOM элемента.
Возвращает экземпляр JW.UI.HtmlUpdater, уничтожение которого прекращает синхронизацию.

    // Привязываем HTML внутри элемента к значению свойства
    this.own(el.jwhtml(html));

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwhtml.html"></iframe>

## jwprop

Метод управления свойствами DOM элемента. Имеет две сигнатуры.

    {@link jQuery#jwprop jwprop}("checked"): JW.Property<Boolean>
    {@link jQuery#jwprop jwprop}(prop: String, property: JW.Property<Boolean>): JW.UI.PropUpdater

<hr>

    {@link jQuery#jwprop jwprop}("checked"): JW.Property<Boolean>

Возвращает булевое [свойство](#!/guide/rujwproperty), содержащее состояние выбора чекбокса, и
начинает наблюдать за его изменением.
Неявно создает JW.UI.CheckedListener. Уничтожение результирующего свойства прекращает синхронизацию.

    // Наблюдаем за состоянием чекбокса
    var disabled = this.own(el.{@link jQuery#jwprop jwprop}("checked"));

<hr>

    {@link jQuery#jwprop jwprop}(prop: String, property: JW.Property<Boolean>): JW.UI.PropUpdater

Наблюдает за изменением булевого [свойства](#!/guide/rujwproperty) и обновляет значение указанного свойства DOM элемента.
Возвращает экземпляр JW.UI.PropUpdater, уничтожение которого прекращает синхронизацию.

    // Привязываем состояние элемента к значению свойства disabled
    this.own(el.{@link jQuery#jwprop jwprop}("disabled", disabled));

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="140" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwprop.html"></iframe>

## jwradio

Метод управления значением группы радиокнопок. Имеет две сигнатуры.

    jwradio(name: String): JW.Property<String>
    jwradio(name: String, value: JW.Property<String>): JW.UI.RadioUpdater

<hr>

    jwradio(name: String): JW.Property<String>

Возвращает строковое [свойство](#!/guide/rujwproperty), содержащее текущий выбор в группе радиокнопок, и
начинает наблюдать за его изменением.
Неявно создает JW.UI.RadioListener. Уничтожение результирующего свойства прекращает синхронизацию.

Обратите внимание, что объект привязывает обработчик события к элементу-контейнеру и использует механизм бабблинга
(всплытия) для определения изменения выбора. Поэтому не следует прерывать бабблинг в дочерних элементах контейнера.
У всех радиокнопок должен быть одинаковый атрибут "name". Если ни одна радиокнопка не выбрана, значение
свойства сбрасывается в null.

    // Наблюдаем за выбранной радиокнопкой
    var color = this.own(el.jwradio("color"));

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="255" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-string.html"></iframe>

<hr>

    jwradio(name: String, value: JW.Property<String>): JW.UI.RadioUpdater

Наблюдает за изменением строкового [свойства](#!/guide/rujwproperty) и обновляет выбор DOM радиокнопок.
Возвращает экземпляр JW.UI.RadioUpdater, уничтожение которого прекращает синхронизацию.

У всех радиокнопок должен быть одинаковый атрибут "name".

    // Привязываем выбор радиокнопки к значению свойства
    this.own(el.jwradio("letter", value));

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="170" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwradio.html"></iframe>

## jwtext

Наблюдает за изменением строкового [свойства](#!/guide/rujwproperty) и обновляет текст внутри DOM элемента.
Возвращает экземпляр JW.UI.TextUpdater, уничтожение которого прекращает синхронизацию.

    // Привязываем текст внутри элемента к значению свойства
    this.own(el.jwtext(text));

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwtext.html"></iframe>

## jwval

Метод управления значением DOM элемента. Имеет две сигнатуры.

    jwval(): JW.Property<String>
    jwval(value: JW.Property<String>): JW.UI.ValueUpdater

<hr>

    jwval(): JW.Property<String>

Возвращает строковое [свойство](#!/guide/rujwproperty), содержащее текущее значение элемента, и
начинает наблюдать за его изменением.
Неявно создает JW.UI.ValueListener. Уничтожение результирующего свойства прекращает синхронизацию.

    // Наблюдаем за значением текстового поля
    var value = this.own(el.jwval());

<hr>

    jwval(value: JW.Property<String>): JW.UI.ValueUpdater

Наблюдает за изменением строкового [свойства](#!/guide/rujwproperty) и обновляет значение внутри DOM элемента ввода текста.
Возвращает экземпляр JW.UI.ValueUpdater, уничтожение которого прекращает синхронизацию.

    // Привязываем значение элемента к свойству
    this.own(el.jwval(value));

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="285" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwval.html"></iframe>

## jwshow

Наблюдает за изменением булевого [свойства](#!/guide/rujwproperty) и обновляет видимость указанного DOM элемента.
Чтобы сделать элемент невидимым, добавляет inline стиль "display: none". Чтобы сделать элемент видимым, удаляет
inline стиль "display". Перед использованием убедитесь, что в соответствии с вашими CSS правилами элемент видимый.
Возвращает экземпляр JW.UI.VisibleUpdater, уничтожение которого прекращает синхронизацию.

    // Привязываем видимость элемента к значению свойства
    this.own(el.jwshow(checked));

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="215" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwshow.html"></iframe>

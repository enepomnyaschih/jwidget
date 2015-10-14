# jQuery

Это краткое описание класса на русском языке.

Полная документация на английском: jQuery

## jwon

`$(selector).{@link jQuery#jwon jwon}(events: String, [selector: String], handler: Function, [scope: Object])): JW.UI.JQEventAttachment`

`handler(event: Event, target: DOMElement)`

Добавляет обработчик события. jWidget-расширение метода <a href="http://api.jquery.com/on/" target="_blank">on</a>,
обладающее следующими возможностями.

### 1. Агрегация

Метод возвращает объект подписки на событие. Его уничтожение влечет отписку от события, что позволяет вам использовать
события jQuery в комбинации с методом {@link JW.Class#own own}.

    // Добавляем обработчик события "mousemove" и агрегируем подписку
    this.own($(window).jwon("mousemove", function(event) {
        $(".output").text(event.pageX + ":" + event.pageY);
    }, this));

### 2. Аргумент контекста вызова

Метод принимает контекст вызова функции в качестве аргумента, что позволяет вам избежать использования методов
JW.inScope и <a href="http://api.jquery.com/jQuery.proxy/" target="_blank">jQuery.proxy</a>.

    // На клик по кнопке уничтожаем этот компонент
    el.jwon("click", this.destroy, this);

Целевой элемент события, который jQuery обычно использует в качества контекста вызова, передается в функцию вторым
аргументом.

    el.jwon("click", function(event, target) { ... }, this);

Метод не имеет аргумента для передачи данных - используйте вместо него замыкания.

<iframe style="border: 1px solid green; padding: 10px;" width="800" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-jwon.html"></iframe>

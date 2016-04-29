# JW.AbstractCollection.Filterer

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractCollection.Filterer

`<T, C extends JW.AbstractCollection<T>>`

Фильтровщик коллекции. Создает новую коллекцию того же типа, включающую только те
элементы исходной коллекции, для которых указанная функция возвращает значение !== false.
Для массива синхронизатор сохранит порядок элементов.
Если исходная коллекция наблюдаемая (observable), начинает непрерывную синхронизацию.

    var source = new JW.ObservableArray([1, 2, 3]);
    var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
        {@link JW.AbstractCollection.Filterer#cfg-filterItem filterItem}: function(x) { return x % 2 === 1; }
    });
    var target = filterer.{@link JW.AbstractCollection.Filterer#property-target target};
    assert(target.{@link JW.AbstractArray#equal equal}([1, 3]));
    
    source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
    assert(target.{@link JW.AbstractArray#equal equal}([1, 3, 7, 1]));
    
    source.{@link JW.AbstractArray#move move}(2, 6); // move "3" item to the end
    assert(target.{@link JW.AbstractArray#equal equal}([1, 7, 1, 3]));

    filterer.{@link JW.AbstractCollection.Filterer#destroy destroy}();

Создавайте синхронизатор с помощью метода JW.AbstractCollection#createFilterer.
Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).

Целевую коллекцию можно передать в качестве конфигурационной опции:

    var source = new JW.Set();
    var target = new JW.Set();
    var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
        {@link JW.AbstractCollection.Filterer#cfg-target target}: target,
        {@link JW.AbstractCollection.Filterer#cfg-filterItem filterItem}: this._filterItem,
        {@link JW.AbstractCollection.Filterer#cfg-scope scope}: this
    });

В простых случаях, вы можете использовать упрощенный метод JW.AbstractCollection#$$filter. Он сразу возвращает целевую коллекцию:

    var source = new JW.ObservableArray([1, 2, 3]);
    var target = source.{@link JW.AbstractCollection#$$filter $$filter}(function(x) { return x % 2 === 1; });
    assert(target.{@link JW.AbstractArray#equal equal}([1, 3]));

    source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
    assert(target.{@link JW.AbstractArray#equal equal}([1, 3, 7, 1]));

    source.{@link JW.AbstractArray#move move}(2, 6); // move "3" item to the end
    assert(target.{@link JW.AbstractArray#equal equal}([1, 7, 1, 3]));

    target.{@link JW.AbstractArray#destroy destroy}();

Правила работы синхронизатора:

- Целевая коллекция находится в поле {@link JW.AbstractCollection.Filterer#property-target target}.
- При конструировании синхронизатора отфильтрованные элементы исходной коллекции сразу добавляются в
{@link JW.AbstractCollection.Filterer#property-target target}.
- При уничтожении синхронизатора все элементы удаляются из {@link JW.AbstractCollection.Filterer#property-target target}.
- Целевую коллекцию можно передать в качестве конфигурационной опции {@link JW.AbstractCollection.Filterer#cfg-target target}.
В этом случае, вся забота о ее уничтожении ложится на вас (хотя элементы будут из нее удалены автоматически
при уничтожении синхронизатора).
- Если {@link JW.AbstractCollection.Filterer#cfg-target target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
реализацию {@link JW.AbstractCollection.Filterer#property-target target} (простая или observable). В этом
случае, {@link JW.AbstractCollection.Filterer#property-target target} будет уничтожен автоматически при уничтожении синхронизатора.

**Дополнительные правила для различных типов коллекций**

[JW.AbstractArray](#!/guide/rujwabstractarray):

- При конструировании синхронизатора целевая коллекция должна быть пуста.
- Целевую коллекцию можно синхронизировать только с одной исходной коллекцией.

[JW.AbstractMap](#!/guide/rujwabstractmap):

- Целевую коллекцию можно синхронизировать с несколькими исходными коллекциями, если ключи всех элементов различны.
- В целевую коллекцию можно добавлять элементы вручную, если их ключи не пересекаются с ключами других элементов.

[JW.AbstractSet](#!/guide/rujwabstractset):

- Целевую коллекцию можно синхронизировать с несколькими исходными коллекциями, если все элементы различны.
- В целевую коллекцию можно добавлять элементы вручную, если они не пересекаются с другими элементами.

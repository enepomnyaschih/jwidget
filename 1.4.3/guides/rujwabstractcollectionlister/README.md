# JW.AbstractCollection.Lister

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractCollection.Lister

`<T extends JW.Class, C extends JW.AbstractCollection<T>>`

Конвертер в множество. Преобразует исходную коллекцию в множество. Можно использовать для быстрой проверки
принадлежности элемента коллекции.

    // Создаем два элемента для демонстрации
    var x = new JW.Class();
    var y = new JW.Class();

    // Создаем коллекцию и синхронизатор
    var array = new JW.ObservableArray([x]);
    var lister = array.{@link JW.AbstractCollection#createLister createLister}();
    var set = lister.{@link JW.AbstractCollection.Lister#property-target target};

    assert(set.{@link JW.AbstractSet#contains contains}(x));
    assert(!set.{@link JW.AbstractSet#contains contains}(y));

    // Целевое множество автоматически синхронизируется с исходной наблюдаемой коллекцией
    array.add(y);
    assert(set.{@link JW.AbstractSet#contains contains}(y));

    lister.{@link JW.AbstractCollection.Lister#destroy destroy}();

**Замечание:** Элементы исходной коллекции не должны повторяться (т.е. все элементы должны иметь уникальный _iid).

Создавайте конвертер с помощью метода JW.AbstractCollection#createLister.
Метод сам определит, какая реализация конвертера лучше подойдет (простая или observable).

Множество можно передать в качестве конфигурационной опции:

    var set = new JW.Set();
    var lister = collection.{@link JW.AbstractCollection#createLister createLister}({
        {@link JW.AbstractCollection.Lister#cfg-target target}: set
    });

В простых случаях, вы можете использовать упрощенный метод JW.AbstractCollection#$$toSet. Он сразу возвращает целевое множество:

    // Создаем два элемента для демонстрации
    var x = new JW.Class();
    var y = new JW.Class();

    // Создаем коллекции
    var array = new JW.ObservableArray([x]);
    var set = array.{@link JW.AbstractCollection#$$toSet $$toSet}();

    assert(set.{@link JW.AbstractSet#contains contains}(x));
    assert(!set.{@link JW.AbstractSet#contains contains}(y));

    // Целевое множество автоматически синхронизируется с исходной наблюдаемой коллекцией
    array.add(y);
    assert(set.{@link JW.AbstractSet#contains contains}(y));

    set.{@link JW.AbstractSet#destroy destroy}();

Правила работы конвертера:

- Целевое множество находится в поле {@link JW.AbstractCollection.Lister#property-target target}.
- При конструировании конвертера все элементы исходной коллекции сразу добавляются в {@link JW.AbstractCollection.Lister#property-target target}.
- При уничтожении конвертера все элементы исходной коллекции удаляются из {@link JW.AbstractCollection.Lister#property-target target}.
- Множество можно передать в качестве конфигурационной опции {@link JW.AbstractCollection.Lister#cfg-target target}.
В этом случае, вся забота о его уничтожении ложится на вас.
- Если {@link JW.AbstractCollection.Lister#cfg-target target} не передан, то он будет создан автоматически. Конвертер подберет наиболее подходящую
реализацию {@link JW.AbstractCollection.Lister#property-target target} (простая или observable). В этом
случае, {@link JW.AbstractCollection.Lister#property-target target} будет уничтожен автоматически при уничтожении конвертера.
- Можно конвертировать несколько коллекций в одно и то же множество, если все элементы различны.

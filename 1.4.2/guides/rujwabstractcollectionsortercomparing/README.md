# JW.AbstractCollection.SorterComparing

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractCollection.SorterComparing

`<T, C extends JW.AbstractCollection<T>>`

Конвертер в массив (сортировщик по компаратору). Преобразует исходную коллекцию в массив. Новые элементы
добавляются в такое место массива, что массив всегда остается в отсортированном состоянии.
Если исходная коллекция наблюдаемая (observable), начинает непрерывную синхронизацию.
Сортировка осуществляется по функции-компаратору, указанной пользователем.

    var source = new JW.ObservableArray([
        {title: "apple", id: 3},
        {title: "Carrot", id: 1},
        {title: "Apple", id: 2}
    ]);

    // Сортируем по заголовку без учета регистра, а потом по id
    var sorter = source.{@link JW.AbstractCollection#createSorterComparing createSorterComparing}({
        {@link JW.AbstractCollection.SorterComparing#cfg-compare compare}: function(x, y) {
            return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
        },
        {@link JW.AbstractCollection.SorterComparing#cfg-scope scope}: this
    });
    var target = sorter.{@link JW.AbstractCollection.SorterComparing#property-target target};

    assert(target.{@link JW.AbstractArray#get get}(0).id === 2); // Apple
    assert(target.{@link JW.AbstractArray#get get}(1).id === 3); // apple
    assert(target.{@link JW.AbstractArray#get get}(2).id === 1); // Carrot

    // Целевой массив автоматически синхронизируется с исходной наблюдаемой коллекцией
    source.add({title: "Banana", id: 4});
    assert(target.{@link JW.AbstractArray#get get}(0).id === 2); // Apple
    assert(target.{@link JW.AbstractArray#get get}(1).id === 3); // apple
    assert(target.{@link JW.AbstractArray#get get}(2).id === 4); // Banana
    assert(target.{@link JW.AbstractArray#get get}(3).id === 1); // Carrot

    sorter.{@link JW.AbstractCollection.SorterComparing#destroy destroy}();

**Замечание:** Элементы исходной коллекции не должны повторяться.

Создавайте конвертер с помощью метода JW.AbstractCollection#createSorterComparing.
Метод сам определит, какая реализация конвертера лучше подойдет (простая или observable).

Массив можно передать в качестве конфигурационной опции:

    var array = new JW.Array();
    var sorter = collection.{@link JW.AbstractCollection#createSorterComparing createSorterComparing}({
        {@link JW.AbstractCollection.SorterComparing#cfg-target target}: array,
        {@link JW.AbstractCollection.SorterComparing#cfg-compare compare}: function(x, y) {
            return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
        },
        {@link JW.AbstractCollection.SorterComparing#cfg-scope scope}: this
    });

В простых случаях, вы можете использовать упрощенный метод JW.AbstractCollection#$$toSortedComparing. Он сразу возвращает целевой словарь:

    var source = new JW.ObservableArray([
        {title: "apple", id: 3},
        {title: "Carrot", id: 1},
        {title: "Apple", id: 2}
    ]);

    // Сортируем по заголовку без учета регистра, а потом по id
    var target = source.{@link JW.AbstractCollection#$$toSortedComparing $$toSortedComparing}(function(x, y) {
        return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
    });

    assert(target.{@link JW.AbstractArray#get get}(0).id === 2); // Apple
    assert(target.{@link JW.AbstractArray#get get}(1).id === 3); // apple
    assert(target.{@link JW.AbstractArray#get get}(2).id === 1); // Carrot

    // Целевой массив автоматически синхронизируется с исходной наблюдаемой коллекцией
    source.add({title: "Banana", id: 4});
    assert(target.{@link JW.AbstractArray#get get}(0).id === 2); // Apple
    assert(target.{@link JW.AbstractArray#get get}(1).id === 3); // apple
    assert(target.{@link JW.AbstractArray#get get}(2).id === 4); // Banana
    assert(target.{@link JW.AbstractArray#get get}(3).id === 1); // Carrot

    target.{@link JW.AbstractArray#destroy destroy}();

Правила работы конвертера:

- Целевой массив находится в поле {@link JW.AbstractCollection.SorterComparing#property-target target}.
- При конструировании конвертера все элементы исходной коллекции сразу добавляются в {@link JW.AbstractCollection.SorterComparing#property-target target}.
- При уничтожении конвертера все элементы исходной коллекции удаляются из {@link JW.AbstractCollection.SorterComparing#property-target target}.
- Массив можно передать в качестве конфигурационной опции {@link JW.AbstractCollection.SorterComparing#cfg-target target}.
В этом случае, вся забота о его уничтожении ложится на вас.
- Если {@link JW.AbstractCollection.SorterComparing#cfg-target target} не передан, то он будет создан автоматически. Конвертер подберет наиболее подходящую
реализацию {@link JW.AbstractCollection.SorterComparing#property-target target} (простая или observable). В этом
случае, {@link JW.AbstractCollection.SorterComparing#property-target target} будет уничтожен автоматически при уничтожении конвертера.
- Можно конвертировать несколько коллекций в один и тот же массив, если все элементы различны.

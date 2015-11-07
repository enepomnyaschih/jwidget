# JW.AbstractCollection.Indexer

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractCollection.Indexer

`<T, C extends JW.AbstractCollection<T>>`

Индексатор коллекции. Преобразует исходную коллекцию в словарь, присваивая каждому элементу определенный ключ,
используя функцию, указанную пользователем. Используется для быстрого поиска элементов по ключу (например, по ID).
Если исходная коллекция наблюдаемая (observable), начинает непрерывную синхронизацию.

    var array = new JW.ObservableArray([{id: 9, label: "The item"}]);
    var indexer = array.{@link JW.ObservableArray#createIndexer createIndexer}({
        {@link JW.AbstractCollection.Indexer#cfg-getKey getKey}: function(item) { return item.id; },
        {@link JW.AbstractCollection.Indexer#cfg-scope scope}: this
    });
    var map = indexer.{@link JW.AbstractCollection.Indexer#property-target target};

    // Получаем элемент с ID = 9
    assert(map.{@link JW.AbstractMap#get get}(9).label === "The item");
    assert(map.{@link JW.AbstractMap#get get}(5) == null);

    // Целевой словарь автоматически синхронизируется с исходной наблюдаемой коллекцией
    array.add({id: 5, label: "New item"});
    assert(map.{@link JW.AbstractMap#get get}(5).label === "New item");

    indexer.{@link JW.AbstractCollection.Indexer#destroy destroy}();

**Замечание:** Все элементы должны иметь различные (уникальные) ключи.

Создавайте синхронизатор с помощью метода JW.AbstractCollection#createIndexer.
Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).

Словарь можно передать в качестве конфигурационной опции:

    var map = new JW.Map();
    var indexer = collection.{@link JW.AbstractCollection#createIndexer createIndexer}({
        {@link JW.AbstractCollection.Indexer#cfg-target target}: map,
        {@link JW.AbstractCollection.Indexer#cfg-getKey getKey}: function(item) { return item.id; },
        {@link JW.AbstractCollection.Indexer#cfg-scope scope}: this
    });

В простых случаях, вы можете использовать упрощенный метод JW.AbstractCollection#$$index. Он сразу возвращает целевой словарь:

    var array = new JW.ObservableArray([{id: 9, label: "The item"}]);
    var map = array.{@link JW.ObservableArray#$$index $$index}(function(item) { return item.id; });

    // Получаем элемент с ID = 9
    assert(map.{@link JW.AbstractMap#get get}(9).label === "The item");
    assert(map.{@link JW.AbstractMap#get get}(5) == null);

    // Целевой словарь автоматически синхронизируется с исходным наблюдаемым словарем
    array.add({id: 5, label: "New item"});
    assert(map.{@link JW.AbstractMap#get get}(5).label === "New item");

    map.{@link JW.AbstractMap#destroy destroy}();

Правила работы синхронизатора:

- Целевой словарь находится в поле {@link JW.AbstractCollection.Indexer#property-target target}.
- При конструировании синхронизатора все элементы исходной коллекции сразу добавляются в {@link JW.AbstractCollection.Indexer#property-target target}.
- При уничтожении синхронизатора все элементы исходной коллекции удаляются из {@link JW.AbstractCollection.Indexer#property-target target}.
- Словарь можно передать в качестве конфигурационной опции {@link JW.AbstractCollection.Indexer#cfg-target target}.
В этом случае, вся забота о его уничтожении ложится на вас.
- Если {@link JW.AbstractCollection.Indexer#cfg-target target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
реализацию {@link JW.AbstractCollection.Indexer#property-target target} (простая или observable). В этом
случае, {@link JW.AbstractCollection.Indexer#property-target target} будет уничтожен автоматически при уничтожении синхронизатора.
- Можно индексировать несколько коллекций в один и тот же словарь, если ключи всех элементов различны.

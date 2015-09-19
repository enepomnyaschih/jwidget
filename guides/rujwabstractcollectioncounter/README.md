# JW.AbstractCollection.Counter

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractCollection.Counter

`<T>`

Счетчик элементов коллекции, удовлетворяющих указанному критерию.
Создает новый [JW.Property](#!/guide/rujwproperty)&lt;number&gt;, содержащий количество
элементов исходной коллекции, для которых указанная функция возвращает значение !== false.
Если исходная коллекция наблюдаемая (observable), начинает непрерывную синхронизацию.

    var source = new JW.ObservableArray([1, 2, 3]);
    var counter = source.{@link JW.AbstractCollection#createCounter createCounter}({
        {@link JW.AbstractCollection.Counter#cfg-filterItem filterItem}: function(x) { return x % 2 === 1; }
    });
    var target = counter.{@link JW.AbstractCollection.Counter#property-target target};
    assert(target.{@link JW.Property#get get}() === 2); // 1, 3

    source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
    assert(target.{@link JW.Property#get get}() === 4); // 1, 3, 7, 1

    counter.{@link JW.AbstractCollection.Counter#destroy destroy}();

Создавайте синхронизатор с помощью метода JW.AbstractCollection#createCounter.
Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).

Целевое свойство можно передать в качестве конфигурационной опции:

    var source = new JW.ObservableSet();
    var target = new JW.Property(0);
    var counter = source.{@link JW.AbstractCollection#createCounter createCounter}({
        {@link JW.AbstractCollection.Counter#cfg-target target}: target,
        {@link JW.AbstractCollection.Counter#cfg-filterItem filterItem}: this._filterItem,
        {@link JW.AbstractCollection.Counter#cfg-scope scope}: this
    });

В простых случаях, вы можете использовать упрощенный метод JW.AbstractCollection#$$count. Он сразу возвращает целевое свойство:

    var source = new JW.ObservableArray([1, 2, 3]);
    var target = source.{@link JW.AbstractCollection#$$count $$count}(function(x) { return x % 2 === 1; });
    assert(target.{@link JW.Property#get get}() === 2); // 1, 3

    source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
    assert(target.{@link JW.Property#get get}() === 4); // 1, 3, 7, 1

    target.{@link JW.Property#destroy destroy}();

Вместо счетчика допустимо использовать [JW.AbstractCollection.Filterer](#!/guide/rujwabstractcollectionfilterer),
но счетчик работает гораздо быстрее, поскольку он не создает отфильтрованную коллекцию.

    var source = new JW.ObservableArray();

    // via filterer
    var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
        {@link JW.AbstractCollection.Filterer#cfg-filterItem filterItem}: this._filterItem,
        {@link JW.AbstractCollection.Filterer#cfg-scope scope}: this
    });
    var count = filterer.{@link JW.AbstractCollection.Filterer#property-target target}.{@link JW.ObservableArray#length length}; // JW.Property<number>

    // via counter, works faster
    var counter = source.{@link JW.AbstractCollection#createCounter createCounter}({
        {@link JW.AbstractCollection.Counter#cfg-filterItem filterItem}: this._filterItem,
        {@link JW.AbstractCollection.Counter#cfg-scope scope}: this
    });
    var count = counter.{@link JW.AbstractCollection.Counter#property-target target}; // JW.Property<number>

Счетчик работает корректно только для наблюдаемых (observable) коллекций.

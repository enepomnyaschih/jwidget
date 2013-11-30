# JW.AbstractArray.Merger

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractArray.Merger

`<T>`

Объединитель массивов. Создает массив, содержащий все элементы исходных массивов в том же порядке.

    var source = new JW.ObservableArray([
        new JW.Array([1, 2, 3]),
        new JW.ObservableArray(),
        new JW.Array([4])
    ]);
    var merger = source.{@link JW.AbstractArray#createMerger createMerger}();
    assert(merger.{@link JW.AbstractArray.Merger#property-target target}.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4]));
    
    source.{@link JW.AbstractArray#add add}(new JW.Array([5, 6]));
    assert(merger.{@link JW.AbstractArray.Merger#property-target target}.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4, 5, 6]));
    
    source.{@link JW.AbstractArray#get get}(1).{@link JW.AbstractArray#addAll addAll}([7, 8, 9]);
    assert(merger.{@link JW.AbstractArray.Merger#property-target target}.{@link JW.AbstractArray#equal equal}([1, 2, 3, 7, 8, 9, 4, 5, 6]));

Создавайте синхронизатор с помощью метода JW.AbstractArray#createMerger:

    var merger = array.{@link JW.AbstractArray#createMerger createMerger}();
    var array = merger.{@link JW.AbstractArray.Merger#property-target target};

Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).

Целевой массив можно передать в качестве конфигурационной опции:

    var source = new JW.Array();
    var target = new JW.Array();
    var merger = source.{@link JW.AbstractArray#createMerger createMerger}({
        {@link JW.AbstractArray.Merger#cfg-target target}: target
    });

Правила работы синхронизатора:

- Целевой массив находится в поле {@link JW.AbstractArray.Merger#property-target target}.
- Перед конструированием синхронизатора целевой массив должен быть пуст, в целевой массив нельзя добавлять элементы
вручную, нельзя создавать другие синхронизаторы с тем же целевым массивом.
- При конструировании синхронизатора все элементы исходных коллекций сразу добавляются в {@link JW.AbstractArray.Merger#property-target target}.
- При уничтожении синхронизатора все элементы исходных коллекций удаляются из {@link JW.AbstractArray.Merger#property-target target}.
- Целевой массив можно передать в качестве конфигурационной опции {@link JW.AbstractArray.Merger#cfg-target target}.
В этом случае, вся забота о его уничтожении ложится на вас.
- Если {@link JW.AbstractArray.Merger#cfg-target target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
реализацию {@link JW.AbstractArray.Merger#property-target target} (простая или observable). В этом
случае, {@link JW.AbstractArray.Merger#property-target target} будет уничтожен автоматически при уничтожении синхронизатора.

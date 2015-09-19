# JW.AbstractArray.Reverser

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractArray.Reverser

`<T>`

Обратитель массива. Создает массив, содержащий все элементы исходного массива в обратном порядке.
Если исходная коллекция наблюдаемая (observable), начинает непрерывную синхронизацию.

    var source = new JW.ObservableArray([1, 2, 3]);
    var reverser = source.{@link JW.AbstractArray#createReverser createReverser}();
    var target = reverser.{@link JW.AbstractArray.Reverser#property-target target};
    assert(target.{@link JW.AbstractArray#equal equal}([3, 2, 1]));
    
    source.{@link JW.AbstractArray#add add}(4);
    assert(target.{@link JW.AbstractArray#equal equal}([4, 3, 2, 1]));
    
    source.{@link JW.AbstractArray#remove remove}(2);
    assert(target.{@link JW.AbstractArray#equal equal}([4, 2, 1]));

    reverser.{@link JW.AbstractArray.Reverser#destroy destroy}();

Создавайте синхронизатор с помощью метода JW.AbstractArray#createReverser.
Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).

Целевой массив можно передать в качестве конфигурационной опции:

    var source = new JW.Array();
    var target = new JW.Array();
    var reverser = source.{@link JW.AbstractArray#createReverser createReverser}({
        {@link JW.AbstractArray.Reverser#cfg-target target}: target
    });

В простых случаях, вы можете использовать упрощенный метод JW.AbstractArray#$$toReversed. Он сразу возвращает целевой массив:

    var source = new JW.ObservableArray([1, 2, 3]);
    var target = source.{@link JW.AbstractArray#$$toReversed $$toReversed}();
    assert(target.{@link JW.AbstractArray#equal equal}([3, 2, 1]));

    source.{@link JW.AbstractArray#add add}(4);
    assert(target.{@link JW.AbstractArray#equal equal}([4, 3, 2, 1]));

    source.{@link JW.AbstractArray#remove remove}(2);
    assert(target.{@link JW.AbstractArray#equal equal}([4, 2, 1]));

    target.{@link JW.AbstractArray#destroy destroy}();

Правила работы синхронизатора:

- Целевой массив находится в поле {@link JW.AbstractArray.Reverser#property-target target}.
- Перед конструированием синхронизатора целевой массив должен быть пуст, в целевой массив нельзя добавлять элементы
вручную, нельзя создавать другие синхронизаторы с тем же целевым массивом.
- При конструировании синхронизатора все элементы исходной коллекции сразу добавляются в {@link JW.AbstractArray.Reverser#property-target target}.
- При уничтожении синхронизатора все элементы исходной коллекции удаляются из {@link JW.AbstractArray.Reverser#property-target target}.
- Целевой массив можно передать в качестве конфигурационной опции {@link JW.AbstractArray.Reverser#cfg-target target}.
В этом случае, вся забота о его уничтожении ложится на вас.
- Если {@link JW.AbstractArray.Reverser#cfg-target target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
реализацию {@link JW.AbstractArray.Reverser#property-target target} (простая или observable). В этом
случае, {@link JW.AbstractArray.Reverser#property-target target} будет уничтожен автоматически при уничтожении синхронизатора.

# JW.AbstractCollection.Orderer

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractCollection.Orderer

`<T extends JW.Class, C extends JW.AbstractCollection<T>>`

Конвертер в массив (упорядочитель). Преобразует исходную коллекцию в массив. Новые элементы добавляются в конец
массива.

    var orderer = collection.{@link JW.AbstractCollection#createOrderer createOrderer}();
    var array = orderer.{@link JW.AbstractCollection.Orderer#property-target target};

**Замечание:** Элементы исходной коллекции не должны повторяться.

Создавайте конвертер с помощью метода JW.AbstractCollection#createOrderer.
Метод сам определит, какая реализация конвертера лучше подойдет (простая или observable).

Массив можно передать в качестве конфигурационной опции:

    var array = new JW.Array();
    var orderer = collection.{@link JW.AbstractCollection#createOrderer createOrderer}({
        {@link JW.AbstractCollection.Orderer#cfg-target target}: array
    });

Правила работы конвертера:

- Целевой массив находится в поле {@link JW.AbstractCollection.Orderer#property-target target}.
- При конструировании конвертера все элементы исходной коллекции сразу добавляются в {@link JW.AbstractCollection.Orderer#property-target target}.
- При уничтожении конвертера все элементы исходной коллекции удаляются из {@link JW.AbstractCollection.Orderer#property-target target}.
- Массив можно передать в качестве конфигурационной опции {@link JW.AbstractCollection.Orderer#cfg-target target}.
В этом случае, вся забота о его уничтожении ложится на вас.
- Если {@link JW.AbstractCollection.Orderer#cfg-target target} не передан, то он будет создан автоматически. Конвертер подберет наиболее подходящую
реализацию {@link JW.AbstractCollection.Orderer#property-target target} (простая или observable). В этом
случае, {@link JW.AbstractCollection.Orderer#property-target target} будет уничтожен автоматически при уничтожении конвертера.
- Можно конвертировать несколько коллекций в один и тот же массив, если все элементы различны.

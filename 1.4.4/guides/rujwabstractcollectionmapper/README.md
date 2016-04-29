# JW.AbstractCollection.Mapper

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractCollection.Mapper

`<T, U, TC extends JW.AbstractCollection<T>, UC extends JW.AbstractCollection<U>>`

Конвертер элементов коллекции. Создает новую коллекцию того же типа, состоящую из элементов,
равных результату запуска функции, указанной пользователем, на каждом элементе.
Если исходная коллекция наблюдаемая (observable), начинает непрерывную синхронизацию.

    var source = new JW.ObservableArray([1, 2]);
    var mapper = source.{@link JW.ObservableArray#createMapper createMapper}({
        {@link JW.AbstractCollection.Mapper#cfg-createItem createItem}: function(x) { return 2 * x }
    });
    var target = source.{@link JW.AbstractCollection.Mapper#property-target target};

    assert(target.{@link JW.ObservableArray#get get}(0) === 2);
    assert(target.{@link JW.ObservableArray#get get}(1) === 4);

    // Целевая коллекция автоматически синхронизируется с исходной
    source.add(3);
    assert(target.{@link JW.ObservableArray#get get}(2) === 6);

    mapper.{@link JW.AbstractCollection.Mapper#destroy destroy}();

Используется, прежде всего, для превращения данных в представление.

    var mapper = dataCollection.{@link JW.AbstractCollection#createMapper createMapper}({
        {@link JW.AbstractCollection.Mapper#cfg-createItem createItem}: function(data) { return new View(this, data); },
        {@link JW.AbstractCollection.Mapper#cfg-destroyItem destroyItem}: JW.destroy,
        {@link JW.AbstractCollection.Mapper#cfg-scope scope}: this
    });
    var viewCollection = mapper.{@link JW.AbstractCollection.Mapper#property-target target};

Создавайте синхронизатор с помощью метода JW.AbstractCollection#createMapper.
Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).

Целевую коллекцию можно передать в качестве конфигурационной опции:

    var viewCollection = new JW.Array();
    var mapper = dataCollection.{@link JW.AbstractCollection#createMapper createMapper}({
        {@link JW.AbstractCollection.Mapper#cfg-target target}: viewCollection,
        {@link JW.AbstractCollection.Mapper#cfg-createItem createItem}: function(data) { return new View(this, data); },
        {@link JW.AbstractCollection.Mapper#cfg-destroyItem destroyItem}: JW.destroy,
        {@link JW.AbstractCollection.Mapper#cfg-scope scope}: this
    });

В простых случаях, вы можете использовать упрощенные методы JW.AbstractCollection#$$mapValues и JW.AbstractCollection#$$mapObjects. Они сразу возвращают целевую коллекцию:

    var viewCollection = dataCollection.{@link JW.AbstractCollection#$$mapObjects $$mapObjects}(function(data) {
        return new View(this, data);
    }, this);

    // Если коллекция больше не нужна, уничтожаем ее
    viewCollection.{@link JW.AbstractCollection#destroy destroy}();

Правила работы синхронизатора:

- Целевая коллекция находится в поле {@link JW.AbstractCollection.Mapper#property-target target}.
- При конструировании синхронизатора все элементы исходной коллекции сразу конвертируются и добавляются в
{@link JW.AbstractCollection.Mapper#property-target target}.
- При уничтожении синхронизатора все элементы удаляются из {@link JW.AbstractCollection.Mapper#property-target target} и уничтожаются.
- Целевую коллекцию можно передать в качестве конфигурационной опции {@link JW.AbstractCollection.Mapper#cfg-target target}.
В этом случае, вся забота о ее уничтожении ложится на вас (хотя элементы будут из нее удалены автоматически
при уничтожении синхронизатора).
- Если {@link JW.AbstractCollection.Mapper#cfg-target target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
реализацию {@link JW.AbstractCollection.Mapper#property-target target} (простая или observable). В этом
случае, {@link JW.AbstractCollection.Mapper#property-target target} будет уничтожен автоматически при уничтожении синхронизатора.
- При перемещении/переупорядочении элементов исходной коллекции элементы целевой коллекции не пересоздаются,
но перемещаются в полном соответствии с исходной коллекцией.

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

# JW.AbstractCollection.Observer

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractCollection.Observer

`<T, C extends JW.AbstractCollection<T>>`

Наблюдатель коллекции. Прослушивает все события коллекции и сводит их к 2 элементарным функциям:
элемент добавлен и элемент удален. В целях оптимизации, можно определить третью функцию: коллекция очищена
(в случае, если есть более эффективный алгоритм очистки, чем удаление всех элементов простым перебором).
Также, можно определить функцию, которая вызывается при любом изменении коллекции.
Синхронизатор можно использовать, например, для оповещения элементов о том, что их добавили в коллекцию.

    var observer = collection.{@link JW.AbstractCollection#createObserver createObserver}({
        {@link JW.AbstractCollection.Observer#cfg-addItem addItem}: function(item) { item.setInCollection(true); },
        {@link JW.AbstractCollection.Observer#cfg-removeItem removeItem}: function(item) { item.setInCollection(false); },
        {@link JW.AbstractCollection.Observer#cfg-scope scope}: this
    });

Создавайте синхронизатор с помощью метода JW.AbstractCollection#createObserver.
Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).

Другой вариант использования синхронизатора: если у вас на входе есть абстрактная коллекция (не известно,
простая или оповещающая), но вы хотите прослушивать событие изменения коллекции в случае, если она все же
оповещающая, то вы можете это сделать без нарушения принципов ООП:

    var observer = collection.{@link JW.AbstractCollection#createObserver createObserver}({
        {@link JW.AbstractCollection.Observer#cfg-change change}: function() { console.log("Collection is changed"); }
    });

Правила работы синхронизатора:

- При конструировании синхронизатора для всех элементов исходной коллекции вызывается функция
{@link JW.AbstractCollection.Observer#cfg-addItem addItem}.
- При уничтожении синхронизатора вызывается функция {@link JW.AbstractCollection.Observer#cfg-clearItems clearItems}, либо для всех элементов
вызывается функция {@link JW.AbstractCollection.Observer#cfg-removeItem removeItem}.
- При перемещении/переупорядочении элементов исходной коллекции функции {@link JW.AbstractCollection.Observer#cfg-addItem addItem},
{@link JW.AbstractCollection.Observer #cfg-removeItem removeItem} и {@link JW.AbstractCollection.Observer#cfg-clearItems clearItems} не вызываются.

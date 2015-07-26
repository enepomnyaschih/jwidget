# JW.AbstractArray.Inserter

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractArray.Inserter

`<T>`

Синхронизатор представления массива. Прослушивает все события массива и сводит их к 2 элементарным функциям:
элемент добавлен в указанное место и элемент удален из указанного места. В целях оптимизации, можно определить
третью функцию: коллекция очищена (в случае, если есть более эффективный алгоритм очистки, чем удаление всех
элементов простым перебором). В отличие от [JW.AbstractCollection.Observer](#!/guide/rujwabstractcollectionobserver), следит за порядком элементов.

Создавайте синхронизатор с помощью метода JW.AbstractArray#createInserter:

    var inserter = array.{@link JW.AbstractArray#createInserter createInserter}({
        {@link JW.AbstractArray.Inserter#cfg-addItem addItem}: function(item, index) { this.store.insert(item, index); },
        {@link JW.AbstractArray.Inserter#cfg-removeItem removeItem}: function(item, index) { this.store.remove(index); },
        {@link JW.AbstractArray.Inserter#cfg-scope scope}: this
    });

Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).

Правила работы синхронизатора:

- При конструировании синхронизатора для всех элементов исходной коллекции вызывается функция
{@link JW.AbstractArray.Inserter#cfg-addItem addItem}.
- При уничтожении синхронизатора вызывается функция {@link JW.AbstractArray.Inserter#cfg-clearItems clearItems}, либо для всех элементов
вызывается функция {@link JW.AbstractArray.Inserter#cfg-removeItem removeItem}.
- При перемещении/переупорядочении элементов вызовами функций синхронизируется порядок элементов.

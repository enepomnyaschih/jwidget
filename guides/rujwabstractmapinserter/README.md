# JW.AbstractMap.Inserter

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractMap.Inserter

`<T>`

Синхронизатор представления словаря. Прослушивает все события словаря и сводит их к 2 элементарным функциям:
элемент добавлен с указанным ключом и элемент удален с указанным ключом. В целях оптимизации, можно определить
третью функцию: коллекция очищена (в случае, если есть более эффективный алгоритм очистки, чем удаление всех
элементов простым перебором). В отличие от [JW.AbstractCollection.Observer](#!/guide/rujwabstractcollectionobserver), следит за ключами элементов.
Синхронизатор используется, прежде всего, для синхронизации DOM-элемента со словарем дочерних элементов.

Создавайте синхронизатор с помощью метода JW.AbstractMap#createInserter:

    var inserter = map.{@link JW.AbstractMap#createInserter createInserter}({
        {@link JW.AbstractMap.Inserter#cfg-addItem addItem}: function(el, key) { this.el.find("[elkey=" + key + "]").append(el); },
        {@link JW.AbstractMap.Inserter#cfg-removeItem removeItem}: function(el, key) { el.detach(); },
        {@link JW.AbstractMap.Inserter#cfg-scope scope}: this
    });

Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).

Правила работы синхронизатора:

- При конструировании синхронизатора для всех элементов исходной коллекции вызывается функция
{@link JW.AbstractMap.Inserter#cfg-addItem addItem}.
- При уничтожении синхронизатора вызывается функция {@link JW.AbstractMap.Inserter#cfg-clearItems clearItems}, либо для всех элементов
вызывается функция {@link JW.AbstractMap.Inserter#cfg-removeItem removeItem}.
- При изменении ключей/переиндексации элементов вызовами функций синхронизируется порядок элементов.

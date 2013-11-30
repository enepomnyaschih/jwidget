# JW.AbstractCollection

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractCollection

`<T>` Абстрактная коллекция элементов типа T.

Существует 3 типа коллекций:

- JW.AbstractArray (массив), наследуется от JW.IndexedCollection
- JW.AbstractMap (словарь), наследуется от JW.IndexedCollection
- JW.AbstractSet (множество)

Коллекции можно преобразовывать друг в друга с помощью алгоритмов.

Каждая коллекция предоставляется в двух вариантах:

- Простая коллекция: JW.Array, JW.Map, JW.Set
- Оповещающая коллекция: JW.ObservableArray, JW.ObservableMap, JW.ObservableSet

Отличие оповещающей коллекции от простой состоит в том, что она выбрасывает события о своем изменении. Это позволяет
синхронизировать данные с представлением налету в соответствии с архитектурой Model-View. Для связи оповещающих
коллекций между собой существуют синхронизаторы:

- Конвертер элементов: JW.AbstractCollection.Mapper
- Конвертер в множество: JW.AbstractCollection.Lister
- Конвертер в словарь (индексатор): JW.AbstractCollection.Indexer
- Конвертер в массив (упорядочитель): JW.AbstractCollection.Orderer
- Конвертер в массив (сортировщик по компаратору): JW.AbstractCollection.SorterComparing
- Наблюдатель: JW.AbstractCollection.Observer
- Синхронизаторы представления: JW.AbstractArray.Inserter, JW.AbstractMap.Inserter
- Объединитель массивов: JW.AbstractArray.Merger

Простые коллекции введены прежде всего для совместимости. Они имеют общий интерфейс с оповещающими коллекциями,
но работают немного быстрее.

При работе с коллекциями jWidget следует помнить несколько важных правил.

1) В коллекции jWidget запрещено добавлять null и undefined. При необходимости воспользуйтесь паттерном Null Object.

2) Большинство методов для изменения коллекции предоставлены в двух вариантах: tryMethod и method. Эти методы
выполняют одно и то же действие, но возвращают разный результат. Первый вариант, в основном, введен для внутреннего
использования и <em>всегда возвращает undefined, если коллекция не была изменена</em>. Например, JW.AbstractCollection#tryClear вернет
undefined, если вы пытаетесь очистить пустую коллекцию, в противном случае он вернет бывшее содержимое коллекции.
Второй вариант возвращает результат в более дружественном формате. Например, JW.AbstractCollection#clear всегда возвращает бывшее
содержимое коллекции. Так, если вы хотите очистить массив и уничтожить все элементы, следует воспользоваться
методом JW.AbstractCollection#clear:

    JW.Array.each(array.{@link JW.AbstractArray#clear clear}(), JW.destroy); // правильно
    JW.Array.each(array.{@link JW.AbstractArray#clear tryClear}(), JW.destroy); // неправильно: вылетит исключение 'undefined', если коллекция пуста

Так вы можете быть уверены в том, что функция JW.Array.each всегда получит на вход корректный массив, тогда как
метод JW.AbstractCollection#tryClear мог дать на выходе undefined.

3) Все методы, возвращающие коллекцию, предоставлены в двух вариантах: method и $method. Эти методы выполняют одно и
то же действие, но возвращают результат в разном формате. Первый метод вернет нативную коллекцию JavaScript: Array
или Object. Второй метод вернет обертку jWidget: JW.Array, JW.Map или JW.Set. Используйте тот метод, который
удобнее в данной конкретной ситуации. Например, $method удобен для цепочечных вызовов алгоритмов. Так, предыдущий
пример можно переписать следующим образом:

    array.{@link JW.AbstractArray#$clear $clear}().{@link JW.AbstractArray#each each}(JW.destroy);

А в следующем примере гораздо удобнее воспользоваться реализацией method:

    set.{@link JW.AbstractArray#addAll addAll}(array.{@link JW.AbstractArray#clear clear}());

4) Желательно, чтобы все элементы коллекции были различны. Некоторые методы, такие как
JW.AbstractArray#performReorder, требуют, чтобы у каждого элемента коллекции был свой уникальный ключ. Если 2
элемента коллекции совпадают, то совпадают и их ключи, поэтому такой метод работать не будет.

# Методы коллекции

Получение содержимого:

- {@link JW.AbstractCollection#getLength getLength} - Возвращает количество элементов в коллекции.
- {@link JW.AbstractCollection#isEmpty isEmpty} - Проверяет коллекцию на пустоту.
- {@link JW.AbstractCollection#getFirst getFirst} - Возвращает первый элемент коллекции.
- {@link JW.AbstractCollection#containsItem containsItem} - Содержит ли коллекция элемент.

Алгоритмы перебора:

- {@link JW.AbstractCollection#every every} - Проверяет все элементы по критерию.
Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
- {@link JW.AbstractCollection#some some} - Проверяет каждый элемент по критерию.
Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
- {@link JW.AbstractCollection#each each} - Перебирает элементы.
- {@link JW.AbstractCollection#search search} - Ищет элемент по критерию.
Возвращает первый элемент, удовлетворяющий критерию.
- {@link JW.AbstractCollection#filter filter}, {@link JW.AbstractCollection#$filter $filter} - Фильтрует коллекцию по критерию.
Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
- {@link JW.AbstractCollection#map map}, {@link JW.AbstractCollection#$map $map} - Отображает элементы коллекции.
Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
коллекции.
- {@link JW.AbstractCollection#toSorted toSorted}, {@link JW.AbstractCollection#$toSorted $toSorted}, {@link JW.AbstractCollection#toSortedComparing toSortedComparing}, {@link JW.AbstractCollection#$toSortedComparing $toSortedComparing} -
Строит массив из элементов коллекции, отсортированный по индексу
или компаратору.
- {@link JW.AbstractCollection#index index}, {@link JW.AbstractCollection#$index $index} - Индексирует коллекцию.
Строит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.
- {@link JW.AbstractCollection#toArray toArray}, {@link JW.AbstractCollection#$toArray $toArray} - Строит новый массив из элементов коллекции.
- {@link JW.AbstractCollection#toSet toSet}, {@link JW.AbstractCollection#$toSet $toSet} - Строит новое множество из элементов коллекции.
- {@link JW.AbstractCollection#asArray asArray}, {@link JW.AbstractCollection#$asArray $asArray} - Представляет коллекцию в виде массива.
- {@link JW.AbstractCollection#asSet asSet}, {@link JW.AbstractCollection#$asSet $asSet} - Представляет коллекцию в виде множества.

Изменение коллекции:

- {@link JW.AbstractCollection#removeItem removeItem} - Удаляет первое вхождение элемента из коллекции.
- {@link JW.AbstractCollection#removeItems removeItems} - Удаляет все вхождения элементов из коллекции.
- {@link JW.AbstractCollection#clear clear}, {@link JW.AbstractCollection#$clear $clear}, {@link JW.AbstractCollection#tryClear tryClear} - Очищает коллекцию.

Создание синхронизаторов:

- {@link JW.AbstractCollection#createMapper createMapper} - Создает конвертер элементов.
- {@link JW.AbstractCollection#createFilterer createFilterer} - Создает фильтровщик.
- {@link JW.AbstractCollection#createLister createLister} - Создает конвертер в множество.
- {@link JW.AbstractCollection#createIndexer createIndexer} - Создает индексатор.
- {@link JW.AbstractCollection#createOrderer createOrderer} - Создает конвертер в массив (упорядочитель).
- {@link JW.AbstractCollection#createSorterComparing createSorterComparing} - Создает конвертер в массив (сортировщик по компаратору).
- {@link JW.AbstractCollection#createObserver createObserver} - Создает наблюдатель.

Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):

- {@link JW.AbstractCollection#createEmpty createEmpty} - Создает пустую коллекцию того же типа.
- {@link JW.AbstractCollection#createEmptyArray createEmptyArray} - Создает пустой массив того же типа.
- {@link JW.AbstractCollection#createEmptyMap createEmptyMap} - Создает пустой словарь того же типа.
- {@link JW.AbstractCollection#createEmptySet createEmptySet} - Создает пустое множество того же типа.

Все те же самые методы доступны и для нативных коллекций JavaScript:

- Array, смотрите статические методы JW.Array
- Object как словарь, смотрите статические методы JW.Map
- Object как множество, смотрите статические методы JW.Set

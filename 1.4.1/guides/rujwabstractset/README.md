# JW.AbstractSet

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractSet

`<T extends JW.Class> extends JW.AbstractCollection<T>`

Абстрактное множество.

Множество - это неупорядоченная коллекция, оптимизированная под добавление/удаление/поиск элемента. В отличие от
массива и словаря, множество может содержать только экземпляры JW.Class. Внутреннее представление множества - это
словарь из {@link JW.Class#_iid iid} элемента в сам элемент.

# Методы множества

**Жирным шрифтом выделены изменения по сравнению с [JW.AbstractCollection](#!/guide/rujwabstractcollection).**

Получение содержимого:

- {@link JW.AbstractSet#getLength getLength} - Возвращает количество элементов в коллекции. Для наблюдаемых
(observable) коллекций, вам может также пригодиться свойство `length`, в том случае, если вы хотите динамически
следить за изменением количества элементов в коллекции.
- {@link JW.AbstractSet#isEmpty isEmpty} - Проверяет коллекцию на пустоту.
- {@link JW.AbstractSet#getFirst getFirst} - Возвращает первый элемент коллекции.
- {@link JW.AbstractSet#containsItem containsItem}, **{@link JW.AbstractSet#contains contains}** - Содержит ли коллекция элемент.
- **{@link JW.AbstractSet#getJson getJson} - Возвращает внутреннее представление множества.**

Алгоритмы перебора:

- {@link JW.AbstractSet#every every} - Проверяет все элементы по критерию.
Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
- {@link JW.AbstractSet#some some} - Проверяет каждый элемент по критерию.
Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
- {@link JW.AbstractSet#each each} - Перебирает элементы.
- {@link JW.AbstractSet#search search} - Ищет элемент по критерию.
Возвращает первый элемент, удовлетворяющий критерию.
- {@link JW.AbstractSet#filter filter}, {@link JW.AbstractSet#$filter $filter}, {@link JW.AbstractSet#$$filter $$filter} - Фильтрует коллекцию по критерию.
Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
- {@link JW.AbstractSet#count count}, {@link JW.AbstractSet#$count $count}, {@link JW.AbstractSet#$$count $$count} - Считает количество элементов, удовлетворяющих критерию.
- {@link JW.AbstractSet#map map}, {@link JW.AbstractSet#$map $map}, {@link JW.AbstractSet#$$mapValues $$mapValues}, {@link JW.AbstractSet#$$mapObjects $$mapObjects} - Отображает элементы коллекции.
Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
коллекции.
- {@link JW.AbstractSet#toSorted toSorted}, {@link JW.AbstractSet#$toSorted $toSorted}, {@link JW.AbstractSet#toSortedComparing toSortedComparing}, {@link JW.AbstractSet#$toSortedComparing $toSortedComparing}, {@link JW.AbstractSet#$$toSortedComparing $$toSortedComparing} -
Строит массив из элементов коллекции, отсортированный по индексу
или компаратору.
- {@link JW.AbstractSet#index index}, {@link JW.AbstractSet#$index $index}, {@link JW.AbstractSet#$$index $$index} - Индексирует коллекцию.
Строит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.
- {@link JW.AbstractSet#toArray toArray}, {@link JW.AbstractSet#$toArray $toArray}, {@link JW.AbstractSet#$$toArray $$toArray} - Строит новый массив из элементов коллекции.
- {@link JW.AbstractSet#toSet toSet}, {@link JW.AbstractSet#$toSet $toSet}, {@link JW.AbstractSet#$$toSet $$toSet} - Строит новое множество из элементов коллекции.
- {@link JW.AbstractSet#asArray asArray}, {@link JW.AbstractSet#$asArray $asArray} - Представляет коллекцию в виде массива.
- {@link JW.AbstractSet#asSet asSet}, {@link JW.AbstractSet#$asSet $asSet} - Представляет коллекцию в виде множества.

Изменение коллекции:

- **{@link JW.AbstractSet#add add}, {@link JW.AbstractSet#tryAdd tryAdd} - Добавляет элемент в множество.**
- **{@link JW.AbstractSet#addAll addAll}, {@link JW.AbstractSet#$addAll $addAll}, {@link JW.AbstractSet#tryAddAll tryAddAll} - Добавляет набор элементов в множество.**
- **{@link JW.AbstractSet#remove remove}, {@link JW.AbstractSet#tryRemove tryRemove} - Удаляет элемент из множества.**
- **{@link JW.AbstractSet#removeAll removeAll}, {@link JW.AbstractSet#$removeAll $removeAll}, {@link JW.AbstractSet#tryRemoveAll tryRemoveAll} - Удаляет набор элементов из множества.**
- {@link JW.AbstractSet#removeItem removeItem} - Удаляет первое вхождение элемента из коллекции.
- {@link JW.AbstractSet#removeItems removeItems} - Удаляет все вхождения элементов из коллекции.
- {@link JW.AbstractSet#clear clear}, {@link JW.AbstractSet#$clear $clear}, {@link JW.AbstractSet#tryClear tryClear} - Очищает коллекцию.
- **{@link JW.AbstractSet#splice splice}, {@link JW.AbstractSet#trySplice trySplice} - Удаляет/вставляет элементы.**
- **{@link JW.AbstractSet#performSplice performSplice} - Приводит содержимое методом {@link JW.AbstractSet#splice splice}.**

Создание синхронизаторов:

- {@link JW.AbstractSet#createMapper createMapper} - Создает конвертер элементов. Расширенная версия методов {@link JW.AbstractSet#$$mapValues $$mapValues} и {@link JW.AbstractSet#$$mapObjects $$mapObjects}.
- {@link JW.AbstractSet#createFilterer createFilterer} - Создает фильтровщик. Расширенная версия метода {@link JW.AbstractSet#$$filter $$filter}.
- {@link JW.AbstractSet#createCounter createCounter} - Создает счетчик подходящих элементов. Расширенная версия метода {@link JW.AbstractSet#$$count $$count}.
- {@link JW.AbstractSet#createLister createLister} - Создает конвертер в множество. Расширенная версия метода {@link JW.AbstractSet#$$toSet $$toSet}.
- {@link JW.AbstractSet#createIndexer createIndexer} - Создает индексатор. Расширенная версия метода {@link JW.AbstractSet#$$index $$index}.
- {@link JW.AbstractSet#createOrderer createOrderer} - Создает конвертер в массив (упорядочитель). Расширенная версия метода {@link JW.AbstractSet#$$toArray $$toArray}.
- {@link JW.AbstractSet#createSorterComparing createSorterComparing} - Создает конвертер в массив (сортировщик по компаратору). Расширенная версия метода {@link JW.AbstractSet#$$toSortedComparing $$toSortedComparing}.
- {@link JW.AbstractSet#createObserver createObserver} - Создает наблюдатель.

Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):

- {@link JW.AbstractSet#createEmpty createEmpty} - Создает пустую коллекцию того же типа.
- {@link JW.AbstractSet#createEmptyArray createEmptyArray} - Создает пустой массив того же типа.
- {@link JW.AbstractSet#createEmptyMap createEmptyMap} - Создает пустой словарь того же типа.
- {@link JW.AbstractSet#createEmptySet createEmptySet} - Создает пустое множество того же типа.

Другие методы:

- **{@link JW.AbstractSet#detectSplice detectSplice} - Определяет параметры метода {@link JW.AbstractSet#splice splice} для приведения содержимого.**
- **{@link JW.AbstractSet#equal equal} - Сравнивает с массивом.**

Все те же самые методы доступны и для нативного JavaScript Object как множества, смотрите статические методы JW.Set.

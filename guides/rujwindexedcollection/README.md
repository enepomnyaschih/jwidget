# JW.IndexedCollection

Это краткое описание класса на русском языке.

Полная документация на английском: JW.IndexedCollection

`<K, T> extends JW.AbstractCollection<T>`

Абстрактная коллекция элементов типа T с ключами типа K (индексированная коллекция).

Существует 2 типа индексированных коллекций:

- [JW.AbstractArray](#!/guide/rujwabstractarray) (массив, ключ - number)
- [JW.AbstractMap](#!/guide/rujwabstractmap) (словарь, ключ - string)

При работе с индексированными коллекциями следует помнить одно простое правило: во всех методах и коллбеках,
принимающих на вход элемент и его ключ, элемент всегда идет первым параметром, а ключ - вторым.

# Методы индексированной коллекции

**Жирным шрифтом выделены изменения по сравнению с [JW.AbstractCollection](#!/guide/rujwabstractcollection).**

Получение содержимого:

- {@link JW.IndexedCollection#getLength getLength} - Возвращает количество элементов в коллекции. Для наблюдаемых
(observable) коллекций, вам может также пригодиться свойство `length`, в том случае, если вы хотите динамически
следить за изменением количества элементов в коллекции.
- {@link JW.IndexedCollection#isEmpty isEmpty} - Проверяет коллекцию на пустоту.
- **{@link JW.IndexedCollection#get get} - Возвращает элемент коллекции по ключу.**
- {@link JW.IndexedCollection#getFirst getFirst} - Возвращает первый элемент коллекции.
- **{@link JW.IndexedCollection#getFirstKey getFirstKey} - Возвращает ключ первого элемента коллекции.**
- **{@link JW.IndexedCollection#getKeys getKeys}, {@link JW.IndexedCollection#$getKeys $getKeys} - Возвращает массив ключей всех элементов.**
- {@link JW.IndexedCollection#containsItem containsItem} - Содержит ли коллекция элемент.
- **{@link JW.IndexedCollection#containsKey containsKey} - Содержит ли коллекция ключ.**
- **{@link JW.IndexedCollection#keyOf keyOf} - Возвращает ключ элемента.**

Алгоритмы перебора (**функции-коллбеки алгоритмов переопределены и принимают дополнительные параметры -
ключи элементов**):

- {@link JW.IndexedCollection#every every} - Проверяет все элементы по критерию.
Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
- {@link JW.IndexedCollection#some some} - Проверяет каждый элемент по критерию.
Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
- {@link JW.IndexedCollection#each each} - Перебирает элементы.
- {@link JW.IndexedCollection#search search} - Ищет элемент по критерию.
Возвращает первый элемент, удовлетворяющий критерию.
- **{@link JW.IndexedCollection#find find} - Ищет элемент по критерию.
Возвращает ключ первого элемента, удовлетворяющего критерию.**
- {@link JW.IndexedCollection#filter filter}, {@link JW.IndexedCollection#$filter $filter}, {@link JW.IndexedCollection#$$filter $$filter} - Фильтрует коллекцию по критерию.
Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
- {@link JW.IndexedCollection#count count}, {@link JW.IndexedCollection#$count $count}, {@link JW.IndexedCollection#$$count $$count} - Считает количество элементов, удовлетворяющих критерию.
- {@link JW.IndexedCollection#map map}, {@link JW.IndexedCollection#$map $map}, {@link JW.IndexedCollection#$$mapValues $$mapValues}, {@link JW.IndexedCollection#$$mapObjects $$mapObjects} - Отображает элементы коллекции.
Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
коллекции.
- {@link JW.IndexedCollection#toSorted toSorted}, {@link JW.IndexedCollection#$toSorted $toSorted},
{@link JW.IndexedCollection#toSortedComparing toSortedComparing}, {@link JW.IndexedCollection#$toSortedComparing $toSortedComparing}, {@link JW.IndexedCollection#$$toSortedComparing $$toSortedComparing} -
Строит массив из элементов коллекции, отсортированный по индексу
или компаратору.
- **{@link JW.IndexedCollection#getSortingKeys getSortingKeys}, {@link JW.IndexedCollection#$getSortingKeys $getSortingKeys},
{@link JW.IndexedCollection#getSortingKeysComparing getSortingKeysComparing}, {@link JW.IndexedCollection#$getSortingKeysComparing $getSortingKeysComparing} -
Возвращает ключи элементов, отсортированных по индексу или компаратору.**
- {@link JW.IndexedCollection#index index}, {@link JW.IndexedCollection#$index $index}, {@link JW.IndexedCollection#$$index $$index} - Индексирует коллекцию.
Строит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.
- {@link JW.IndexedCollection#toArray toArray}, {@link JW.IndexedCollection#$toArray $toArray}, {@link JW.IndexedCollection#$$toArray $$toArray} - Строит новый массив из элементов коллекции.
- **{@link JW.IndexedCollection#toMap toMap}, {@link JW.IndexedCollection#$toMap $toMap} - Строит новый словарь из элементов коллекции.**
- {@link JW.IndexedCollection#toSet toSet}, {@link JW.IndexedCollection#$toSet $toSet}, {@link JW.IndexedCollection#$$toSet $$toSet} - Строит новое множество из элементов коллекции.
- {@link JW.IndexedCollection#asArray asArray}, {@link JW.IndexedCollection#$asArray $asArray} - Представляет коллекцию в виде массива.
- **{@link JW.IndexedCollection#asMap asMap}, {@link JW.IndexedCollection#$asMap $asMap} - Представляет коллекцию в виде словаря.**
- {@link JW.IndexedCollection#asSet asSet}, {@link JW.IndexedCollection#$asSet $asSet} - Представляет коллекцию в виде множества.

Изменение коллекции:

- **{@link JW.IndexedCollection#set set}, {@link JW.IndexedCollection#trySet trySet} - Заменяет элемент по ключу.**
- **{@link JW.IndexedCollection#remove remove}, {@link JW.IndexedCollection#tryRemove tryRemove} - Удаляет элемент по ключу.**
- {@link JW.IndexedCollection#removeItem removeItem} - Удаляет первое вхождение элемента из коллекции.
- {@link JW.IndexedCollection#removeItems removeItems} - Удаляет все вхождения элементов из коллекции.
- {@link JW.IndexedCollection#clear clear}, {@link JW.IndexedCollection#$clear $clear},
{@link JW.IndexedCollection#tryClear tryClear} - Очищает коллекцию.

Создание синхронизаторов:

- {@link JW.IndexedCollection#createMapper createMapper} - Создает конвертер элементов. Расширенная версия методов {@link JW.IndexedCollection#$$mapValues $$mapValues} и {@link JW.IndexedCollection#$$mapObjects $$mapObjects}.
- {@link JW.IndexedCollection#createFilterer createFilterer} - Создает фильтровщик. Расширенная версия метода {@link JW.IndexedCollection#$$filter $$filter}.
- {@link JW.IndexedCollection#createCounter createCounter} - Создает счетчик подходящих элементов. Расширенная версия метода {@link JW.IndexedCollection#$$count $$count}.
- {@link JW.IndexedCollection#createLister createLister} - Создает конвертер в множество. Расширенная версия метода {@link JW.IndexedCollection#$$toSet $$toSet}.
- {@link JW.IndexedCollection#createIndexer createIndexer} - Создает индексатор. Расширенная версия метода {@link JW.IndexedCollection#$$index $$index}.
- {@link JW.IndexedCollection#createOrderer createOrderer} - Создает конвертер в массив (упорядочитель). Расширенная версия метода {@link JW.IndexedCollection#$$toArray $$toArray}.
- {@link JW.IndexedCollection#createSorterComparing createSorterComparing} - Создает конвертер в массив (сортировщик по компаратору). Расширенная версия метода {@link JW.IndexedCollection#$$toSortedComparing $$toSortedComparing}.
- {@link JW.IndexedCollection#createObserver createObserver} - Создает наблюдатель.

Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):

- {@link JW.IndexedCollection#createEmpty createEmpty} - Создает пустую коллекцию того же типа.
- {@link JW.IndexedCollection#createEmptyArray createEmptyArray} - Создает пустой массив того же типа.
- {@link JW.IndexedCollection#createEmptyMap createEmptyMap} - Создает пустой словарь того же типа.
- {@link JW.IndexedCollection#createEmptySet createEmptySet} - Создает пустое множество того же типа.

Все те же самые алгоритмы доступны и для нативных коллекций JavaScript:

- Array, смотрите статические методы JW.Array
- Object как словарь, смотрите статические методы JW.Map

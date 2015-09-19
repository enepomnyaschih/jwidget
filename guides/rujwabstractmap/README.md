# JW.AbstractMap

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractMap

`<T> extends JW.IndexedCollection<string, T>`

Абстрактный словарь.

Словарь - это неупорядоченная коллекция, в которой каждый элемент имеет свой строковый ключ.

# Методы словаря

**Жирным шрифтом выделены изменения по сравнению с [JW.IndexedCollection](#!/guide/rujwindexedcollection).**

Получение содержимого:

- {@link JW.AbstractMap#getLength getLength} - Возвращает количество элементов в коллекции. Для наблюдаемых
(observable) коллекций, вам может также пригодиться свойство `length`, в том случае, если вы хотите динамически
следить за изменением количества элементов в коллекции.
- {@link JW.AbstractMap#isEmpty isEmpty} - Проверяет коллекцию на пустоту.
- {@link JW.AbstractMap#get get} - Возвращает элемент коллекции по ключу.
- {@link JW.AbstractMap#getFirst getFirst} - Возвращает первый элемент коллекции.
- {@link JW.AbstractMap#getFirstKey getFirstKey} - Возвращает ключ первого элемента коллекции.
- {@link JW.AbstractMap#getKeys getKeys}, {@link JW.AbstractMap#$getKeys $getKeys} - Возвращает массив ключей всех элементов.
- {@link JW.AbstractMap#containsItem containsItem} - Содержит ли коллекция элемент.
- {@link JW.AbstractMap#containsKey containsKey} - Содержит ли коллекция ключ.
- {@link JW.AbstractMap#keyOf keyOf} - Возвращает ключ элемента.
- **{@link JW.AbstractMap#getJson getJson} - Возвращает внутреннее представление словаря.**

Алгоритмы перебора:

- {@link JW.AbstractMap#every every} - Проверяет все элементы по критерию.
Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
- {@link JW.AbstractMap#some some} - Проверяет каждый элемент по критерию.
Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
- {@link JW.AbstractMap#each each} - Перебирает элементы.
- {@link JW.AbstractMap#search search} - Ищет элемент по критерию.
Возвращает первый элемент, удовлетворяющий критерию.
- {@link JW.AbstractMap#find find} - Ищет элемент по критерию.
Возвращает ключ первого элемента, удовлетворяющего критерию.
- {@link JW.AbstractMap#filter filter}, {@link JW.AbstractMap#$filter $filter}, {@link JW.AbstractMap#$$filter $$filter} - Фильтрует коллекцию по критерию.
Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
- {@link JW.AbstractMap#count count}, {@link JW.AbstractMap#$count $count}, {@link JW.AbstractMap#$$count $$count} - Считает количество элементов, удовлетворяющих критерию.
- {@link JW.AbstractMap#map map}, {@link JW.AbstractMap#$map $map}, {@link JW.AbstractMap#$$mapValues $$mapValues}, {@link JW.AbstractMap#$$mapObjects $$mapObjects} - Отображает элементы коллекции.
Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
коллекции.
- {@link JW.AbstractMap#toSorted toSorted}, {@link JW.AbstractMap#$toSorted $toSorted}, {@link JW.AbstractMap#toSortedComparing toSortedComparing}, {@link JW.AbstractMap#$toSortedComparing $toSortedComparing}, {@link JW.AbstractMap#$$toSortedComparing $$toSortedComparing} -
Строит массив из элементов коллекции, отсортированный по индексу
или компаратору.
- {@link JW.AbstractMap#getSortingKeys getSortingKeys}, {@link JW.AbstractMap#$getSortingKeys $getSortingKeys}, {@link JW.AbstractMap#getSortingKeysComparing getSortingKeysComparing}, {@link JW.AbstractMap#$getSortingKeysComparing $getSortingKeysComparing} -
Возвращает ключи элементов, отсортированных по индексу или компаратору.
- {@link JW.AbstractMap#index index}, {@link JW.AbstractMap#$index $index}, {@link JW.AbstractMap#$$index $$index} - Индексирует коллекцию.
Строит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.
- {@link JW.AbstractMap#toArray toArray}, {@link JW.AbstractMap#$toArray $toArray}, {@link JW.AbstractMap#$$toArray $$toArray} - Строит новый массив из элементов коллекции.
- {@link JW.AbstractMap#toMap toMap}, {@link JW.AbstractMap#$toMap $toMap} - Строит новый словарь из элементов коллекции.
- {@link JW.AbstractMap#toSet toSet}, {@link JW.AbstractMap#$toSet $toSet}, {@link JW.AbstractMap#$$toSet $$toSet} - Строит новое множество из элементов коллекции.
- {@link JW.AbstractMap#asArray asArray}, {@link JW.AbstractMap#$asArray $asArray} - Представляет коллекцию в виде массива.
- {@link JW.AbstractMap#asMap asMap}, {@link JW.AbstractMap#$asMap $asMap} - Представляет коллекцию в виде словаря.
- {@link JW.AbstractMap#asSet asSet}, {@link JW.AbstractMap#$asSet $asSet} - Представляет коллекцию в виде множества.

Изменение коллекции:

- {@link JW.AbstractMap#set set}, {@link JW.AbstractMap#trySet trySet} - Добавляет/заменяет элемент по ключу.
- **{@link JW.AbstractMap#setAll setAll}, {@link JW.AbstractMap#setAllVerbose setAllVerbose}, {@link JW.AbstractMap#trySetAll trySetAll} - Добавляет/заменяет набор элементов.**
- {@link JW.AbstractMap#remove remove}, {@link JW.AbstractMap#tryRemove tryRemove} - Удаляет элемент по ключу.
- **{@link JW.AbstractMap#removeAll removeAll}, {@link JW.AbstractMap#removeAllVerbose removeAllVerbose}, {@link JW.AbstractMap#$removeAllVerbose $removeAllVerbose}, {@link JW.AbstractMap#tryRemoveAll tryRemoveAll} - Удаляет набор элементов.**
- {@link JW.AbstractMap#removeItem removeItem} - Удаляет первое вхождение элемента из коллекции.
- {@link JW.AbstractMap#removeItems removeItems} - Удаляет все вхождения элементов из коллекции.
- **{@link JW.AbstractMap#setKey setKey}, {@link JW.AbstractMap#trySetKey trySetKey} - Меняет ключ элемента.**
- {@link JW.AbstractMap#clear clear}, {@link JW.AbstractMap#$clear $clear}, {@link JW.AbstractMap#tryClear tryClear} - Очищает коллекцию.
- **{@link JW.AbstractMap#splice splice}, {@link JW.AbstractMap#trySplice trySplice} - Удаляет/добавляет элементы.**
- **{@link JW.AbstractMap#reindex reindex}, {@link JW.AbstractMap#tryReindex tryReindex} - Меняет ключи элементов.**
- **{@link JW.AbstractMap#performSplice performSplice} - Приводит содержимое методом {@link JW.AbstractMap#splice splice}.**
- **{@link JW.AbstractMap#performReindex performReindex} - Приводит содержимое методом {@link JW.AbstractMap#reindex reindex}.**

Создание синхронизаторов:

- {@link JW.AbstractMap#createMapper createMapper} - Создает конвертер элементов. Расширенная версия методов {@link JW.AbstractMap#$$mapValues $$mapValues} и {@link JW.AbstractMap#$$mapObjects $$mapObjects}.
- {@link JW.AbstractMap#createFilterer createFilterer} - Создает фильтровщик. Расширенная версия метода {@link JW.AbstractMap#$$filter $$filter}.
- {@link JW.AbstractMap#createCounter createCounter} - Создает счетчик подходящих элементов. Расширенная версия метода {@link JW.AbstractMap#$$count $$count}.
- {@link JW.AbstractMap#createLister createLister} - Создает конвертер в множество. Расширенная версия метода {@link JW.AbstractMap#$$toSet $$toSet}.
- {@link JW.AbstractMap#createIndexer createIndexer} - Создает индексатор. Расширенная версия метода {@link JW.AbstractMap#$$index $$index}.
- {@link JW.AbstractMap#createOrderer createOrderer} - Создает конвертер в массив (упорядочитель). Расширенная версия метода {@link JW.AbstractMap#$$toArray $$toArray}.
- {@link JW.AbstractMap#createSorterComparing createSorterComparing} - Создает конвертер в массив (сортировщик по компаратору). Расширенная версия метода {@link JW.AbstractMap#$$toSortedComparing $$toSortedComparing}.
- {@link JW.AbstractMap#createObserver createObserver} - Создает наблюдатель.
- **{@link JW.AbstractMap#createInserter createInserter} - Создает синхронизатор представления со словарем.**

Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):
 *
- {@link JW.AbstractMap#createEmpty createEmpty} - Создает пустую коллекцию того же типа.
- {@link JW.AbstractMap#createEmptyArray createEmptyArray} - Создает пустой массив того же типа.
- {@link JW.AbstractMap#createEmptyMap createEmptyMap} - Создает пустой словарь того же типа.
- {@link JW.AbstractMap#createEmptySet createEmptySet} - Создает пустое множество того же типа.

Другие методы:

- **{@link JW.AbstractMap#detectSplice detectSplice} - Определяет параметры метода {@link JW.AbstractMap#splice splice} для приведения содержимого.**
- **{@link JW.AbstractMap#detectReindex detectReindex} - Определяет параметры метода {@link JW.AbstractMap#reindex reindex} для приведения содержимого.**
- **{@link JW.AbstractMap#equal equal} - Сравнивает с другим словарем.**

Все те же самые алгоритмы доступны и для нативного словаря JavaScript Object, смотрите статические методы JW.Map.

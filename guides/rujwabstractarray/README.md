# JW.AbstractArray

Это краткое описание класса на русском языке.

Полная документация на английском: JW.AbstractArray

`<T> extends JW.IndexedCollection<number, T>`

Абстрактный массив.

Массив - это упорядоченная коллекция, в которой каждый элемент имеет свой индекс. Индекс первого элемента равен 0,
индекс каждого следующего элемента на единицу больше.

# Методы массива

**Жирным шрифтом выделены изменения по сравнению с [JW.IndexedCollection](#!/guide/rujwindexedcollection).**

Получение содержимого:

- {@link JW.AbstractArray#getLength getLength} - Возвращает количество элементов в коллекции. Для наблюдаемых
(observable) коллекций, вам может также пригодиться свойство `length`, в том случае, если вы хотите динамически
следить за изменением количества элементов в коллекции.
- {@link JW.AbstractArray#isEmpty isEmpty} - Проверяет коллекцию на пустоту.
- {@link JW.AbstractArray#get get} - Возвращает элемент коллекции по индексу.
- {@link JW.AbstractArray#getFirst getFirst} - Возвращает первый элемент коллекции.
- **{@link JW.AbstractArray#getLast getLast} - Возвращает последний элемент коллекции.**
- {@link JW.AbstractArray#getFirstKey getFirstKey} - Возвращает индекс первого элемента коллекции.
- **{@link JW.AbstractArray#getLastKey getLastKey} - Возвращает индекс последнего элемента коллекции.**
- {@link JW.AbstractArray#getKeys getKeys}, {@link JW.AbstractArray#$getKeys $getKeys} - Возвращает массив индексов всех элементов.
- {@link JW.AbstractArray#containsItem containsItem} - Содержит ли коллекция элемент.
- {@link JW.AbstractArray#containsKey containsKey} - Содержит ли коллекция индекс.
- {@link JW.AbstractArray#keyOf keyOf} - Возвращает индекс элемента. Если элемент не найден, вернет undefined.
- **{@link JW.AbstractArray#indexOf indexOf} - Возвращает индекс элемента. Если элемент не найден, вернет -1.**
- **{@link JW.AbstractArray#getItems getItems} - Возвращает внутреннее представление массива.**
- **{@link JW.AbstractArray#binarySearch binarySearch} - Ищет позицию бинарным поиском.**

Алгоритмы перебора:

- {@link JW.AbstractArray#every every} - Проверяет все элементы по критерию.
Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
- {@link JW.AbstractArray#some some} - Проверяет каждый элемент по критерию.
Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
- {@link JW.AbstractArray#each each} - Перебирает элементы.
- {@link JW.AbstractArray#search search} - Ищет элемент по критерию.
Возвращает первый элемент, удовлетворяющий критерию.
- {@link JW.AbstractArray#find find} - Ищет элемент по критерию.
Возвращает индекс первого элемента, удовлетворяющего критерию.
- {@link JW.AbstractArray#filter filter}, {@link JW.AbstractArray#$filter $filter}, {@link JW.AbstractArray#$$filter $$filter} - Фильтрует коллекцию по критерию.
Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
- {@link JW.AbstractArray#count count}, {@link JW.AbstractArray#$count $count}, {@link JW.AbstractArray#$$count $$count} - Считает количество элементов, удовлетворяющих критерию.
- {@link JW.AbstractArray#map map}, {@link JW.AbstractArray#$map $map}, {@link JW.AbstractArray#$$mapValues $$mapValues}, {@link JW.AbstractArray#$$mapObjects $$mapObjects} - Отображает элементы коллекции.
Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
коллекции.
- {@link JW.AbstractArray#toSorted toSorted}, {@link JW.AbstractArray#$toSorted $toSorted}, {@link JW.AbstractArray#toSortedComparing toSortedComparing}, {@link JW.AbstractArray#$toSortedComparing $toSortedComparing}, {@link JW.AbstractArray#$$toSortedComparing $$toSortedComparing} -
Строит массив из элементов коллекции, отсортированный по индексу
или компаратору.
- {@link JW.AbstractArray#getSortingKeys getSortingKeys}, {@link JW.AbstractArray#$getSortingKeys $getSortingKeys}, {@link JW.AbstractArray#getSortingKeysComparing getSortingKeysComparing}, {@link JW.AbstractArray#$getSortingKeysComparing $getSortingKeysComparing} -
Возвращает индексы элементов, отсортированных по индексу или компаратору.
- {@link JW.AbstractArray#index index}, {@link JW.AbstractArray#$index $index}, {@link JW.AbstractArray#$$index $$index} - Индексирует коллекцию.
Строит словарь, в индексах которого находятся индексы элементов, а в значениях - соответствующие элементы.
- {@link JW.AbstractArray#toArray toArray}, {@link JW.AbstractArray#$toArray $toArray}, {@link JW.AbstractArray#$$toArray $$toArray} - Строит новый массив из элементов коллекции.
- {@link JW.AbstractArray#toMap toMap}, {@link JW.AbstractArray#$toMap $toMap} - Строит новый словарь из элементов коллекции.
- {@link JW.AbstractArray#toSet toSet}, {@link JW.AbstractArray#$toSet $toSet}, {@link JW.AbstractArray#$$toSet $$toSet} - Строит новое множество из элементов коллекции.
- {@link JW.AbstractArray#asArray asArray}, {@link JW.AbstractArray#$asArray $asArray} - Представляет коллекцию в виде массива.
- {@link JW.AbstractArray#asMap asMap}, {@link JW.AbstractArray#$asMap $asMap} - Представляет коллекцию в виде словаря.
- {@link JW.AbstractArray#asSet asSet}, {@link JW.AbstractArray#$asSet $asSet} - Представляет коллекцию в виде множества.
- **{@link JW.AbstractArray#backEvery backEvery} - Проверяет все элементы по критерию в обратном порядке.**
- **{@link JW.AbstractArray#merge merge}, {@link JW.AbstractArray#$merge $merge}, {@link JW.AbstractArray#$$merge $$merge} - (только для `JW.AbstractArray<? extends JW.AbstractArray>`). Строит новый массив, содержащий элементы всех подмассивов в том же порядке.**
- **{@link JW.AbstractArray#toReversed toReversed}, {@link JW.AbstractArray#$toReversed $toReversed}, {@link JW.AbstractArray#$$toReversed $$toReversed} - Строит новый массив, содержащий элементы исходного массива в обратном порядке.**

Изменение коллекции:

- **{@link JW.AbstractArray#add add}, {@link JW.AbstractArray#tryAdd tryAdd} - Вставляет элемент.**
- **{@link JW.AbstractArray#addAll addAll}, {@link JW.AbstractArray#tryAddAll tryAddAll} - Вставляет набор элементов.**
- {@link JW.AbstractArray#set set}, {@link JW.AbstractArray#trySet trySet} - Заменяет элемент по индексу.
- {@link JW.AbstractArray#remove remove}, {@link JW.AbstractArray#tryRemove tryRemove} - Удаляет элемент по индексу.
- **{@link JW.AbstractArray#removeAll removeAll}, {@link JW.AbstractArray#$removeAll $removeAll}, {@link JW.AbstractArray#tryRemoveAll tryRemoveAll} - Удаляет набор элементов.**
- {@link JW.AbstractArray#removeItem removeItem} - Удаляет первое вхождение элемента из коллекции.
- {@link JW.AbstractArray#removeItems removeItems} - Удаляет все вхождения элементов из коллекции.
- **{@link JW.AbstractArray#pop pop} - Удаляет последний элемент.**
- **{@link JW.AbstractArray#move move}, {@link JW.AbstractArray#tryMove tryMove} - Перемещает элемент.**
- {@link JW.AbstractArray#clear clear}, {@link JW.AbstractArray#$clear $clear}, {@link JW.AbstractArray#tryClear tryClear} - Очищает коллекцию.
- **{@link JW.AbstractArray#splice splice}, {@link JW.AbstractArray#trySplice trySplice} - Удаляет/вставляет элементы.**
- **{@link JW.AbstractArray#reorder reorder}, {@link JW.AbstractArray#tryReorder tryReorder} - Переупорядочивает элементы.**
- **{@link JW.AbstractArray#sort sort}, {@link JW.AbstractArray#sortComparing sortComparing} - Сортирует массив.**
- **{@link JW.AbstractArray#reverse reverse} - Обращает порядок элементов в массиве.**
- **{@link JW.AbstractArray#performSplice performSplice} - Приводит содержимое методом {@link JW.AbstractArray#splice splice}.**
- **{@link JW.AbstractArray#performFilter performFilter} - Фильтрует содержимое методом {@link JW.AbstractArray#splice splice}.**
- **{@link JW.AbstractArray#performReorder performReorder} - Приводит содержимое методом {@link JW.AbstractArray#reorder reorder}.**

Создание синхронизаторов:

- {@link JW.AbstractArray#createMapper createMapper} - Создает конвертер элементов. Расширенная версия методов {@link JW.AbstractArray#$$mapValues $$mapValues} и {@link JW.AbstractArray#$$mapObjects $$mapObjects}.
- {@link JW.AbstractArray#createFilterer createFilterer} - Создает фильтровщик. Расширенная версия метода {@link JW.AbstractArray#$$filter $$filter}.
- {@link JW.AbstractArray#createCounter createCounter} - Создает счетчик подходящих элементов. Расширенная версия метода {@link JW.AbstractArray#$$count $$count}.
- {@link JW.AbstractArray#createLister createLister} - Создает конвертер в множество. Расширенная версия метода {@link JW.AbstractArray#$$toSet $$toSet}.
- {@link JW.AbstractArray#createIndexer createIndexer} - Создает индексатор. Расширенная версия метода {@link JW.AbstractArray#$$index $$index}.
- {@link JW.AbstractArray#createOrderer createOrderer} - Создает конвертер в массив (упорядочитель). Расширенная версия метода {@link JW.AbstractArray#$$toArray $$toArray}.
- {@link JW.AbstractArray#createSorterComparing createSorterComparing} - Создает конвертер в массив (сортировщик по компаратору). Расширенная версия метода {@link JW.AbstractArray#$$toSortedComparing $$toSortedComparing}.
- {@link JW.AbstractArray#createObserver createObserver} - Создает наблюдатель.
- **{@link JW.AbstractArray#createInserter createInserter} - Создает синхронизатор представления с массивом.**
- **{@link JW.AbstractArray#createMerger createMerger} - Создает объединитель массивов. Расширенная версия метода {@link JW.AbstractArray#$$merge $$merge}.**
- **{@link JW.AbstractArray#createReverser createReverser} - Создает обратитель массива. Расширенная версия метода {@link JW.AbstractArray#$$toReversed $$toReversed}.**

Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):

- {@link JW.AbstractArray#createEmpty createEmpty} - Создает пустую коллекцию того же типа.
- {@link JW.AbstractArray#createEmptyArray createEmptyArray} - Создает пустой массив того же типа.
- {@link JW.AbstractArray#createEmptyMap createEmptyMap} - Создает пустой словарь того же типа.
- {@link JW.AbstractArray#createEmptySet createEmptySet} - Создает пустое множество того же типа.

Другие методы:

- **{@link JW.AbstractArray#detectSplice detectSplice} - Определяет параметры метода {@link JW.AbstractArray#splice splice} для приведения содержимого.**
- **{@link JW.AbstractArray#detectFilter detectFilter} - Определяет параметр removeParamsList метода {@link JW.AbstractArray#splice splice} для фильтрации содержимого.**
- **{@link JW.AbstractArray#detectReorder detectReorder} - Определяет параметры метода {@link JW.AbstractArray#reorder reorder} для приведения содержимого.**
- **{@link JW.AbstractArray#detectSort detectSort} - Определяет параметры метода {@link JW.AbstractArray#reorder reorder} для сортировки по индексу.**
- **{@link JW.AbstractArray#detectSortComparing detectSortComparing} - Определяет параметры метода {@link JW.AbstractArray#reorder reorder} для сортировки по компаратору.**
- **{@link JW.AbstractArray#collapse collapse} - Сплющивает многомерный массив.**
- **{@link JW.AbstractArray#equal equal} - Сравнивает с другим массивом.**

Все те же самые алгоритмы доступны и для нативного массива JavaScript Array, смотрите статические методы JW.Array.

Ext.data.JsonP.rujwindexedcollection({"guide":"<h1 id='rujwindexedcollection-section-jw.indexedcollection'>JW.IndexedCollection</h1>\n\n<p>Это краткое описание класса на русском языке.</p>\n\n<p>Полная документация на английском: <a href=\"#!/api/JW.IndexedCollection\" rel=\"JW.IndexedCollection\" class=\"docClass\">JW.IndexedCollection</a></p>\n\n<p><code>&lt;K, T&gt; extends <a href=\"#!/api/JW.AbstractCollection\" rel=\"JW.AbstractCollection\" class=\"docClass\">JW.AbstractCollection</a>&lt;T&gt;</code></p>\n\n<p>Абстрактная коллекция элементов типа T с ключами типа K (индексированная коллекция).</p>\n\n<p>Существует 2 типа индексированных коллекций:</p>\n\n<ul>\n<li><a href=\"#!/guide/rujwabstractarray\">JW.AbstractArray</a> (массив, ключ - number)</li>\n<li><a href=\"#!/guide/rujwabstractmap\">JW.AbstractMap</a> (словарь, ключ - string)</li>\n</ul>\n\n\n<p>При работе с индексированными коллекциями следует помнить одно простое правило: во всех методах и коллбеках,\nпринимающих на вход элемент и его ключ, элемент всегда идет первым параметром, а ключ - вторым.</p>\n\n<h1 id='rujwindexedcollection-section-%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%D1%8B-%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B9-%D0%BA%D0%BE%D0%BB%D0%BB%D0%B5%D0%BA%D1%86%D0%B8%D0%B8'>Методы индексированной коллекции</h1>\n\n<p><strong>Жирным шрифтом выделены изменения по сравнению с <a href=\"#!/guide/rujwabstractcollection\">JW.AbstractCollection</a>.</strong></p>\n\n<p>Получение содержимого:</p>\n\n<ul>\n<li><a href=\"#!/api/JW.IndexedCollection-method-getLength\" rel=\"JW.IndexedCollection-method-getLength\" class=\"docClass\">getLength</a> - Возвращает количество элементов в коллекции. Для наблюдаемых\n(observable) коллекций, вам может также пригодиться свойство <code>length</code>, в том случае, если вы хотите динамически\nследить за изменением количества элементов в коллекции.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-isEmpty\" rel=\"JW.IndexedCollection-method-isEmpty\" class=\"docClass\">isEmpty</a> - Проверяет коллекцию на пустоту.</li>\n<li><strong><a href=\"#!/api/JW.IndexedCollection-method-get\" rel=\"JW.IndexedCollection-method-get\" class=\"docClass\">get</a> - Возвращает элемент коллекции по ключу.</strong></li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-getFirst\" rel=\"JW.IndexedCollection-method-getFirst\" class=\"docClass\">getFirst</a> - Возвращает первый элемент коллекции.</li>\n<li><strong><a href=\"#!/api/JW.IndexedCollection-method-getFirstKey\" rel=\"JW.IndexedCollection-method-getFirstKey\" class=\"docClass\">getFirstKey</a> - Возвращает ключ первого элемента коллекции.</strong></li>\n<li><strong><a href=\"#!/api/JW.IndexedCollection-method-getKeys\" rel=\"JW.IndexedCollection-method-getKeys\" class=\"docClass\">getKeys</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-getKeys\" rel=\"JW.IndexedCollection-method-S-getKeys\" class=\"docClass\">$getKeys</a> - Возвращает массив ключей всех элементов.</strong></li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-containsItem\" rel=\"JW.IndexedCollection-method-containsItem\" class=\"docClass\">containsItem</a> - Содержит ли коллекция элемент.</li>\n<li><strong><a href=\"#!/api/JW.IndexedCollection-method-containsKey\" rel=\"JW.IndexedCollection-method-containsKey\" class=\"docClass\">containsKey</a> - Содержит ли коллекция ключ.</strong></li>\n<li><strong><a href=\"#!/api/JW.IndexedCollection-method-keyOf\" rel=\"JW.IndexedCollection-method-keyOf\" class=\"docClass\">keyOf</a> - Возвращает ключ элемента.</strong></li>\n</ul>\n\n\n<p>Алгоритмы перебора (<strong>функции-коллбеки алгоритмов переопределены и принимают дополнительные параметры -\nключи элементов</strong>):</p>\n\n<ul>\n<li><a href=\"#!/api/JW.IndexedCollection-method-every\" rel=\"JW.IndexedCollection-method-every\" class=\"docClass\">every</a> - Проверяет все элементы по критерию.\nВозвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-some\" rel=\"JW.IndexedCollection-method-some\" class=\"docClass\">some</a> - Проверяет каждый элемент по критерию.\nВозвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-each\" rel=\"JW.IndexedCollection-method-each\" class=\"docClass\">each</a> - Перебирает элементы.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-search\" rel=\"JW.IndexedCollection-method-search\" class=\"docClass\">search</a> - Ищет элемент по критерию.\nВозвращает первый элемент, удовлетворяющий критерию.</li>\n<li><strong><a href=\"#!/api/JW.IndexedCollection-method-find\" rel=\"JW.IndexedCollection-method-find\" class=\"docClass\">find</a> - Ищет элемент по критерию.\nВозвращает ключ первого элемента, удовлетворяющего критерию.</strong></li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-filter\" rel=\"JW.IndexedCollection-method-filter\" class=\"docClass\">filter</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-filter\" rel=\"JW.IndexedCollection-method-S-filter\" class=\"docClass\">$filter</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-S-filter\" rel=\"JW.IndexedCollection-method-S-S-filter\" class=\"docClass\">$$filter</a> - Фильтрует коллекцию по критерию.\nСтроит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-count\" rel=\"JW.IndexedCollection-method-count\" class=\"docClass\">count</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-count\" rel=\"JW.IndexedCollection-method-S-count\" class=\"docClass\">$count</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-S-count\" rel=\"JW.IndexedCollection-method-S-S-count\" class=\"docClass\">$$count</a> - Считает количество элементов, удовлетворяющих критерию.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-map\" rel=\"JW.IndexedCollection-method-map\" class=\"docClass\">map</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-map\" rel=\"JW.IndexedCollection-method-S-map\" class=\"docClass\">$map</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-S-mapValues\" rel=\"JW.IndexedCollection-method-S-S-mapValues\" class=\"docClass\">$$mapValues</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-S-mapObjects\" rel=\"JW.IndexedCollection-method-S-S-mapObjects\" class=\"docClass\">$$mapObjects</a> - Отображает элементы коллекции.\nСтроит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе\nколлекции.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-toSorted\" rel=\"JW.IndexedCollection-method-toSorted\" class=\"docClass\">toSorted</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-toSorted\" rel=\"JW.IndexedCollection-method-S-toSorted\" class=\"docClass\">$toSorted</a>,\n<a href=\"#!/api/JW.IndexedCollection-method-toSortedComparing\" rel=\"JW.IndexedCollection-method-toSortedComparing\" class=\"docClass\">toSortedComparing</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-toSortedComparing\" rel=\"JW.IndexedCollection-method-S-toSortedComparing\" class=\"docClass\">$toSortedComparing</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-S-toSortedComparing\" rel=\"JW.IndexedCollection-method-S-S-toSortedComparing\" class=\"docClass\">$$toSortedComparing</a> -\nСтроит массив из элементов коллекции, отсортированный по индексу\nили компаратору.</li>\n<li><strong><a href=\"#!/api/JW.IndexedCollection-method-getSortingKeys\" rel=\"JW.IndexedCollection-method-getSortingKeys\" class=\"docClass\">getSortingKeys</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-getSortingKeys\" rel=\"JW.IndexedCollection-method-S-getSortingKeys\" class=\"docClass\">$getSortingKeys</a>,\n<a href=\"#!/api/JW.IndexedCollection-method-getSortingKeysComparing\" rel=\"JW.IndexedCollection-method-getSortingKeysComparing\" class=\"docClass\">getSortingKeysComparing</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-getSortingKeysComparing\" rel=\"JW.IndexedCollection-method-S-getSortingKeysComparing\" class=\"docClass\">$getSortingKeysComparing</a> -\nВозвращает ключи элементов, отсортированных по индексу или компаратору.</strong></li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-index\" rel=\"JW.IndexedCollection-method-index\" class=\"docClass\">index</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-index\" rel=\"JW.IndexedCollection-method-S-index\" class=\"docClass\">$index</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-S-index\" rel=\"JW.IndexedCollection-method-S-S-index\" class=\"docClass\">$$index</a> - Индексирует коллекцию.\nСтроит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-toArray\" rel=\"JW.IndexedCollection-method-toArray\" class=\"docClass\">toArray</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-toArray\" rel=\"JW.IndexedCollection-method-S-toArray\" class=\"docClass\">$toArray</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-S-toArray\" rel=\"JW.IndexedCollection-method-S-S-toArray\" class=\"docClass\">$$toArray</a> - Строит новый массив из элементов коллекции.</li>\n<li><strong><a href=\"#!/api/JW.IndexedCollection-method-toMap\" rel=\"JW.IndexedCollection-method-toMap\" class=\"docClass\">toMap</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-toMap\" rel=\"JW.IndexedCollection-method-S-toMap\" class=\"docClass\">$toMap</a> - Строит новый словарь из элементов коллекции.</strong></li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-toSet\" rel=\"JW.IndexedCollection-method-toSet\" class=\"docClass\">toSet</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-toSet\" rel=\"JW.IndexedCollection-method-S-toSet\" class=\"docClass\">$toSet</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-S-toSet\" rel=\"JW.IndexedCollection-method-S-S-toSet\" class=\"docClass\">$$toSet</a> - Строит новое множество из элементов коллекции.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-asArray\" rel=\"JW.IndexedCollection-method-asArray\" class=\"docClass\">asArray</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-asArray\" rel=\"JW.IndexedCollection-method-S-asArray\" class=\"docClass\">$asArray</a> - Представляет коллекцию в виде массива.</li>\n<li><strong><a href=\"#!/api/JW.IndexedCollection-method-asMap\" rel=\"JW.IndexedCollection-method-asMap\" class=\"docClass\">asMap</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-asMap\" rel=\"JW.IndexedCollection-method-S-asMap\" class=\"docClass\">$asMap</a> - Представляет коллекцию в виде словаря.</strong></li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-asSet\" rel=\"JW.IndexedCollection-method-asSet\" class=\"docClass\">asSet</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-asSet\" rel=\"JW.IndexedCollection-method-S-asSet\" class=\"docClass\">$asSet</a> - Представляет коллекцию в виде множества.</li>\n</ul>\n\n\n<p>Изменение коллекции:</p>\n\n<ul>\n<li><strong><a href=\"#!/api/JW.IndexedCollection-method-set\" rel=\"JW.IndexedCollection-method-set\" class=\"docClass\">set</a>, <a href=\"#!/api/JW.IndexedCollection-method-trySet\" rel=\"JW.IndexedCollection-method-trySet\" class=\"docClass\">trySet</a> - Заменяет элемент по ключу.</strong></li>\n<li><strong><a href=\"#!/api/JW.IndexedCollection-method-remove\" rel=\"JW.IndexedCollection-method-remove\" class=\"docClass\">remove</a>, <a href=\"#!/api/JW.IndexedCollection-method-tryRemove\" rel=\"JW.IndexedCollection-method-tryRemove\" class=\"docClass\">tryRemove</a> - Удаляет элемент по ключу.</strong></li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-removeItem\" rel=\"JW.IndexedCollection-method-removeItem\" class=\"docClass\">removeItem</a> - Удаляет первое вхождение элемента из коллекции.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-removeItems\" rel=\"JW.IndexedCollection-method-removeItems\" class=\"docClass\">removeItems</a> - Удаляет все вхождения элементов из коллекции.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-clear\" rel=\"JW.IndexedCollection-method-clear\" class=\"docClass\">clear</a>, <a href=\"#!/api/JW.IndexedCollection-method-S-clear\" rel=\"JW.IndexedCollection-method-S-clear\" class=\"docClass\">$clear</a>,\n<a href=\"#!/api/JW.IndexedCollection-method-tryClear\" rel=\"JW.IndexedCollection-method-tryClear\" class=\"docClass\">tryClear</a> - Очищает коллекцию.</li>\n</ul>\n\n\n<p>Создание синхронизаторов:</p>\n\n<ul>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createMapper\" rel=\"JW.IndexedCollection-method-createMapper\" class=\"docClass\">createMapper</a> - Создает конвертер элементов. Расширенная версия методов <a href=\"#!/api/JW.IndexedCollection-method-S-S-mapValues\" rel=\"JW.IndexedCollection-method-S-S-mapValues\" class=\"docClass\">$$mapValues</a> и <a href=\"#!/api/JW.IndexedCollection-method-S-S-mapObjects\" rel=\"JW.IndexedCollection-method-S-S-mapObjects\" class=\"docClass\">$$mapObjects</a>.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createFilterer\" rel=\"JW.IndexedCollection-method-createFilterer\" class=\"docClass\">createFilterer</a> - Создает фильтровщик. Расширенная версия метода <a href=\"#!/api/JW.IndexedCollection-method-S-S-filter\" rel=\"JW.IndexedCollection-method-S-S-filter\" class=\"docClass\">$$filter</a>.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createCounter\" rel=\"JW.IndexedCollection-method-createCounter\" class=\"docClass\">createCounter</a> - Создает счетчик подходящих элементов. Расширенная версия метода <a href=\"#!/api/JW.IndexedCollection-method-S-S-count\" rel=\"JW.IndexedCollection-method-S-S-count\" class=\"docClass\">$$count</a>.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createLister\" rel=\"JW.IndexedCollection-method-createLister\" class=\"docClass\">createLister</a> - Создает конвертер в множество. Расширенная версия метода <a href=\"#!/api/JW.IndexedCollection-method-S-S-toSet\" rel=\"JW.IndexedCollection-method-S-S-toSet\" class=\"docClass\">$$toSet</a>.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createIndexer\" rel=\"JW.IndexedCollection-method-createIndexer\" class=\"docClass\">createIndexer</a> - Создает индексатор. Расширенная версия метода <a href=\"#!/api/JW.IndexedCollection-method-S-S-index\" rel=\"JW.IndexedCollection-method-S-S-index\" class=\"docClass\">$$index</a>.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createOrderer\" rel=\"JW.IndexedCollection-method-createOrderer\" class=\"docClass\">createOrderer</a> - Создает конвертер в массив (упорядочитель). Расширенная версия метода <a href=\"#!/api/JW.IndexedCollection-method-S-S-toArray\" rel=\"JW.IndexedCollection-method-S-S-toArray\" class=\"docClass\">$$toArray</a>.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createSorterComparing\" rel=\"JW.IndexedCollection-method-createSorterComparing\" class=\"docClass\">createSorterComparing</a> - Создает конвертер в массив (сортировщик по компаратору). Расширенная версия метода <a href=\"#!/api/JW.IndexedCollection-method-S-S-toSortedComparing\" rel=\"JW.IndexedCollection-method-S-S-toSortedComparing\" class=\"docClass\">$$toSortedComparing</a>.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createObserver\" rel=\"JW.IndexedCollection-method-createObserver\" class=\"docClass\">createObserver</a> - Создает наблюдатель.</li>\n</ul>\n\n\n<p>Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):</p>\n\n<ul>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createEmpty\" rel=\"JW.IndexedCollection-method-createEmpty\" class=\"docClass\">createEmpty</a> - Создает пустую коллекцию того же типа.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createEmptyArray\" rel=\"JW.IndexedCollection-method-createEmptyArray\" class=\"docClass\">createEmptyArray</a> - Создает пустой массив того же типа.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createEmptyMap\" rel=\"JW.IndexedCollection-method-createEmptyMap\" class=\"docClass\">createEmptyMap</a> - Создает пустой словарь того же типа.</li>\n<li><a href=\"#!/api/JW.IndexedCollection-method-createEmptySet\" rel=\"JW.IndexedCollection-method-createEmptySet\" class=\"docClass\">createEmptySet</a> - Создает пустое множество того же типа.</li>\n</ul>\n\n\n<p>Все те же самые алгоритмы доступны и для нативных коллекций JavaScript:</p>\n\n<ul>\n<li>Array, смотрите статические методы <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a></li>\n<li>Object как словарь, смотрите статические методы <a href=\"#!/api/JW.Map\" rel=\"JW.Map\" class=\"docClass\">JW.Map</a></li>\n</ul>\n\n","title":"JW.IndexedCollection"});
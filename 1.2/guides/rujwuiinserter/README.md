# JW.UI.Inserter

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.Inserter

Синхронизатор представления. Синхронизирует дочерние элементы DOM-элемента с исходным массивом. Обычно используется
совместно с [JW.AbstractArray.Mapper](#!/guide/rujwabstractcollectionmapper).

    var data = new JW.ObservableArray(["apple", "banana", "cherry"]);
    var elements = data.{@link JW.ObservableArray#createMapper createMapper}({
        {@link JW.ObservableArray.Mapper#cfg-createItem createItem}: function(value) { return jQuery('<option />').text(value)[0]; }
    }).{@link JW.ObservableArray.Mapper#property-target target};
    var inserter = new JW.UI.Inserter(elements, document.getElementById("myselect"));

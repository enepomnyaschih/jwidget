Ext.data.JsonP.rujwclass({"guide":"<h1 id='rujwclass-section-jw.class'>JW.Class</h1>\n\n<p>Это краткое описание класса на русском языке.</p>\n\n<p>Полная документация на английском: <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></p>\n\n<p>Самый базовый класс всех классов. От <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> и всех его потомков можно наследовать новые классы.</p>\n\n<p>Пример наследования класса:</p>\n\n<pre><code>// Конструктор\nvar Shape = function(name) {\n    // Вызываем конструктор базового класса\n    Shape.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    // Объявляем поля\n    this.name = name;\n};\n\n// Наследуем Shape от <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Shape, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    // string name;\n    // abstract number getArea();\n});\n\n// --------\n\nvar Rectangle = function(name, width, height) {\n    Rectangle.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this, name);\n    this.width = width;\n    this.height = height;\n    // Для оптимизации рекомендуется объявлять в конструкторе все поля, включая null\n    this.el = null;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Rectangle, Shape, {\n    // number width;\n    // number height;\n    // Element el;\n\n    // Деструктор\n    <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>: function() {\n        // Освобождаем ресурсы\n        if (this.el) {\n            this.el.remove();\n        }\n        // Вызываем деструктор базового класса\n        this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n    },\n\n    // Переопределяем метод\n    getArea: function() {\n        return this.width * this.height;\n    },\n\n    getElement: function() {\n        if (!this.el) {\n            this.el = jQuery('&lt;div&gt;&lt;/div&gt;');\n            this.el.width(this.width);\n            this.el.height(this.height);\n        }\n        return this.el;\n    }\n});\n</code></pre>\n","title":"JW.Class"});
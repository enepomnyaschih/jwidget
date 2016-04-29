# JW.Class

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Class

Самый базовый класс всех классов. От JW.Class и всех его потомков можно наследовать новые классы.

Пример наследования класса:

    // Конструктор
    var Shape = function(name) {
        // Вызываем конструктор базового класса
        Shape.{@link JW.Class#static-property-_super _super}.call(this);
        // Объявляем поля
        this.name = name;
    };
    
    // Наследуем Shape от JW.Class
    JW.extend(Shape, JW.Class, {
        // string name;
        // abstract number getArea();
    });
    
    // --------
    
    var Rectangle = function(name, width, height) {
        Rectangle.{@link JW.Class#static-property-_super _super}.call(this, name);
        this.width = width;
        this.height = height;
        // Для оптимизации рекомендуется объявлять в конструкторе все поля, включая null
        this.el = null;
    };
    
    JW.extend(Rectangle, Shape, {
        // number width;
        // number height;
        // Element el;
        
        // Деструктор
        {@link JW.Class#method-destroyObject destroyObject}: function() {
            // Освобождаем ресурсы
            if (this.el) {
                this.el.remove();
            }
            // Вызываем деструктор базового класса
            this.{@link JW.Class#method-_super _super}();
        },
        
        // Переопределяем метод
        getArea: function() {
            return this.width * this.height;
        },
        
        getElement: function() {
            if (!this.el) {
                this.el = jQuery('<div></div>');
                this.el.width(this.width);
                this.el.height(this.height);
            }
            return this.el;
        }
    });

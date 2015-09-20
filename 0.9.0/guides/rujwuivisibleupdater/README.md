﻿# JW.UI.VisibleUpdater

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.VisibleUpdater

Наблюдает за изменением булевого [свойства](#!/guide/rujwproperty) и обновляет видимость указанного DOM элемента.
Чтобы сделать элемент невидимым, добавляет inline стиль "display: none". Чтобы сделать элемент видимым, удаляет
inline стиль "display". Перед использованием убедитесь, что в соответствии с вашими CSS правилами элемент видимый.
Также, применяется при инициализации.

    var visible = new JW.Property(true);
    // Следующая команда сделает элемент видимым
    var updater = new JW.UI.VisibleUpdater($("#myelem"), visible);
    // Следующая команда сделает элемент невидимым
    visible.{@link JW.Property#set set}(false);
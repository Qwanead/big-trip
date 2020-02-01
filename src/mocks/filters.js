const FILTERS = [
  {
    title: `everything`,
    isChecked: true,
  },
  {
    title: `future`,
    isChecked: false,
  },
  {
    title: `past`,
    isChecked: false,
  },
];

export {FILTERS};


// youtube-dl -o '112-Решимость' Youtu.be/khiDX31GH9A;
// youtube-dl -o '113-Уверенность в цели' Youtu.be/JvF7WiGZ9fQ;
// youtube-dl -o '114-Наставник' Youtu.be/dfGkCiCHVpk;
// youtube-dl -o '115-Умственное равновесие' Youtu.be/kCBbmMWBaro;
// youtube-dl -o '116-Самоконтроль' Youtu.be/gapQm6j30KU;
// youtube-dl -o '117-Питание и менталитет успеха' Youtu.be/gapQm6j30KU;
// youtube-dl -o '118-Взаимодействие с объективной реальностью' Youtu.be/jhVP7uwl0PM;
// youtube-dl -o '119-Как преуспеть в жизни' Youtu.be/kiWMtM8G1eE;
// youtube-dl -o '120-Важность принципов' Youtu.be/9UN4areUuUQ;
// youtube-dl -o '121-Ахимса Жизнь без агрессии' Youtu.be/BiWxlefVjWI;
// youtube-dl -o '122-Сатья Благожелательная правдивость' Youtu.be/A31EZ-Qf57Y;
// youtube-dl -o '123-Астея Честность в финансах' Youtu.be/dFZhOrC-6JU;
// youtube-dl -o '124-Апариграха Жизнь без излишеств' Youtu.be/q1p4sR06fZg;
// youtube-dl -o '125-Брахмачарья Видеть Божественное' Youtu.be/A97tb5JOD14;
// youtube-dl -o '126-Шаоча Чистота во всём' Youtu.be/vc_fbdLeb4k;
// youtube-dl -o '127-Сантоша Благодарность' Youtu.be/hhlbhmiaiww;
// youtube-dl -o '128-Тапах Преодолевание трудностей' Youtu.be/Nr_Uh5Hp-9w;
// youtube-dl -o '129-Свадхьяя Самообразование' Youtu.be/zqoCiI7QAYk;
// youtube-dl -o '130-Ишвара Пранидхана Духовная цель' Youtu.be/mICJPsUksWs;
// youtube-dl -o '131-Зачем создавать семью' Youtu.be/9i3veG4HBrQ;
// youtube-dl -o '132-Вдохновляющая семья Ч.1' Youtu.be/6MnW0BqI0l4;
// youtube-dl -o '133-Вдохновляющая семья Ч.2' Youtu.be/CPBoM011UvE;
// youtube-dl -o '134-Духовные отношения Ч.1' Youtu.be/gl5qMbCf8hQ;
// youtube-dl -o '135-Духовные отношения Ч.2' Youtu.be/axeAs15now4;
// youtube-dl -o '136-Духовные отношения Ч.3' Youtu.be/on3rgrHLnuo;
// youtube-dl -o '137-Как быть супер женщиной' Youtu.be/HcLUtO1xBB8;
// youtube-dl -o '138-Влюбился - не женись' Youtu.be/rfB-ehZKbdY;
// youtube-dl -o '139-О монашеской жизни' Youtu.be/0SlqCDZrHMw;
// youtube-dl -o '140-6 внутренних врагов' Youtu.be/uFps6iWBIzQ;
// youtube-dl -o '141-8 душевных оков' Youtu.be/Omz5TGWNx7g;
// youtube-dl -o '142-Практики освобождения' Youtu.be/6l5Vrxwh518;
// youtube-dl -o '143-Как работает карма' Youtu.be/rVGGMgfVkRU;
// youtube-dl -o '144-Как не создавать карму' Youtu.be/71h_83Z_N74;
// youtube-dl -o '145-Как достичь самадхи' Youtu.be/wtHlsD8cs38;
// youtube-dl -o '146-Нужны ли мантры' Youtu.be/w3ZYhBEtJHg;
// youtube-dl -o '147-Творчество и медитация' Youtu.be/P8AeV3zWnj0;
// youtube-dl -o '148-Религиозность и духовность' Youtu.be/cOZzy_3nyMA;
// youtube-dl -o '149-Фундаментальная философия 1' Youtu.be/WjChXpLqDHE;
// youtube-dl -o '150-Фундаментальная философия 2' Youtu.be/eUa8cg7eixw;
// youtube-dl -o '151-Пратьяхара Йога и трансформация личности' Youtu.be/q4_GBghVFB0;
// youtube-dl -o '152-Сознание' Youtu.be/DCfgN6a_5NM;
// youtube-dl -o '153-Внушение и самовнушение' Youtu.be/TZVT7qgXITE;
// youtube-dl -o '154-Чакры и их значение' Youtu.be/EOUCJM7STU0;
// youtube-dl -o '155-Муладхара чакра' Youtu.be/PORI7QWe9sE;
// youtube-dl -o '156-Свадхистана чакра' Youtu.be/MmbpfTQHYbA;
// youtube-dl -o '157-Манипура чакра' Youtu.be/3DB7ICTK7jo;
// youtube-dl -o '158-Анахата чакра' Youtu.be/EYIMKN7qRwI;
// youtube-dl -o '159-Вишудха чакра' Youtu.be/IZIjbKXbBZI;
// youtube-dl -o '160-Агья чакра' Youtu.be/xK74OCIlr1U;
// youtube-dl -o '161-Сахасрара чакра' Youtu.be/mKFaRgCSNMk;
// youtube-dl -o '162-Идеальное здоровье' Youtu.be/9pTJHE34_cA;
// youtube-dl -o '163-Современная медицина' Youtu.be/eaAZCKKg9rQ;
// youtube-dl -o '164-Молоко Пить или нет' Youtu.be/h9yvNAdcYP8;
// youtube-dl -o '165-Кислотная и щелочная пища' Youtu.be/OuIzuA3tZwA;
// youtube-dl -o '166-Голодание' Youtu.be/k_JKfyGCaYQ;
// youtube-dl -o '167-Питание йогов' Youtu.be/10yUIjY3o9o;
// youtube-dl -o '168-Пища и сознание' Youtu.be/t7E7GG6B4Vw;
// youtube-dl -o '169-Как отказаться от алкоголя' Youtu.be/Wiq6ywAGE8o;
// youtube-dl -o '170-Курс Приобретение душевной силы' goo.gl/xVonzM;
// youtube-dl -o '171-Духовность и богатство Ч1' Youtu.be/6ws58JJ9k7w;
// youtube-dl -o '172-Процветание и духовность Ч2' Youtu.be/dv4KdDTStgI;
// youtube-dl -o '173-Привлечение денег возможно' Youtu.be/vz24A20a-hk;
// youtube-dl -o '174-Приносит ли богатство счастье' Youtu.be/raaWxpMKIRg;
// youtube-dl -o '175-Что такое бедность' Youtu.be/A75yllm_3E8;
// youtube-dl -o '176-Стоит ли помогать бедным' Youtu.be/18Tevb5joKc;
// youtube-dl -o '177-Зачем делать асаны' Youtu.be/01MmCYETq40;
// youtube-dl -o '178-21 правило выполнения асан' Youtu.be/PAGXdxm9Zsg;
// youtube-dl -o '183-Мужские практики' Youtu.be/aID-E9U7M1Q;
// youtube-dl -o '184-Что будет в 2050 году' Youtu.be/M-_hVoqRfjc;
// youtube-dl -o '185-Общество' Youtu.be/Xtpsfg1-k60;
// youtube-dl -o '186-Что такое служение' Youtu.be/wpXYyss_SU4;
// youtube-dl -o '187-100 000 единомышленников' Youtu.be/lnGD6RJfvA4;
// youtube-dl -o '188-Неогуманизм' Youtu.be/HAPXhVeJemE;
// youtube-dl -o '189-Культура и псевдо-культура' Youtu.be/ans2yxhqaSA;
// youtube-dl -o '190-Миссия Уроков Медитации' Youtu.be/1AKGxzDE-Sk;
// youtube-dl -o '191-Киртан пробуждает планету' Youtu.be/BFJHNBrX7s4;
// youtube-dl -o '192-О Власти и О Любви' Youtu.be/MWyO726J1Xs;
// youtube-dl -o '193-Светлая сторона силы Миллион Часов Киртана' Youtu.be/zh6_g5QzE3c;
// youtube-dl -o '194-Стадии Духовности для Человечества' Youtu.be/twHeCHZXL1A;
// youtube-dl -o '195-Почему важно уважать родителей' Youtu.be/7bRzroJSh7w;
// youtube-dl -o '196-Материализм, Культура, Духовность' Youtu.be/9esiXpOoSKQ;
// youtube-dl -o '198-Заблудиться в 3 соснах' Youtu.be/n-aYvrdkNF4;
// youtube-dl -o '200-Когда ученик готов' Youtu.be/PMp30apKetQ;
// youtube-dl -o '201-Техника медитации' Youtu.be/spbwnQ0B8yQ;
// youtube-dl -o '202-Основы концентрации' Youtu.be/PlfhCNRDgcg;
// youtube-dl -o '203-Положение тела' Youtu.be/JaVel3a6fTk;
// youtube-dl -o '204-Эффект ныряльщика' Youtu.be/axhI8h_8cqE;
// youtube-dl -o '205-Дыхание' Youtu.be/JmPRUVmqGrM;
// youtube-dl -o '206-Киртан, пение мантры' Youtu.be/ApQaPLf7TCE;
// youtube-dl -o '207-Лалита Мармика' Youtu.be/0FXFzLmCxUk;
// youtube-dl -o '208-Улучшение концентрации' Youtu.be/AEyUBHD4HE8;
// youtube-dl -o '209-Медитация в процессе жизни' Youtu.be/9xWIqOyTIfA;
// youtube-dl -o '210-Завершение стартового курса' Youtu.be/2QBH4f66kDA;

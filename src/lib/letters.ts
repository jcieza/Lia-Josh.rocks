export interface Letter {
    slug: string;
    title: string;
    from: "Josh" | "Lia";
    date: string;
    youtubeId?: string;
    coverColor?: string;
    pages: string[];
}

export const LETTERS: Letter[] = [
    {
        slug: "verdad-y-futuro",
        title: "Verdad y Futuro",
        from: "Josh",
        date: "12 de Enero, 2026",
        youtubeId: "450p7goxZqg", // Yellow - Coldplay
        coverColor: "from-rose-900/60 to-violet-900/60",
        pages: [
            // -- Intro --
            `Me pediste que sueñe con otra.\nMe dijiste: "Suena con Danna".\nMe dijiste: "Perdon por ser basura, por ser mala, por ser facil".\n\nLei ese mensaje del 12 de enero y senti el estruendo de un cristal que estalla. No porque fuera verdad, sino porque me dolio ver como tu mente, en un ataque de panico, tomaba el volante y tiraba del freno de mano a 200 km/h, intentando estrellarnos antes de que lleguemos a la meta.\n\nTe escribo esto no para discutir, sino para deletrearte.\n\nNo voy a sonar con nadie mas.\nVoy a despertar contigo.\nEsta es la evidencia de por que.`,

            // -- Cap 1 parte 1 --
            `Hay dos Celestes hablando en mi cabeza ahora mismo. Y necesito que tu tambien las veas.\n\nLa Celeste del 12 de Enero (La Sombra):\nLa que dice "Me siento inferior", "Soy peor que pisar mierda". Esta Celeste es pequena, esta temblando y cree que la unica forma de salvarse es empujandome lejos antes de que yo me vaya.\n\nPero esa Celeste es una mentirosa.\nY lo se porque conozco a la otra.`,

            // -- Cap 1 parte 2 --
            `La Celeste del 2 de Enero (La Villana Favorita):\n\nSolo diez dias antes, tu y yo hablabamos de algo muy diferente. No hablabamos de tristeza. Hablabamos de fuego.\n\nMe decias: "Me gustan asi, enfermotes y locos. Trastornados".\n\nNos reiamos. Me hablabas de Loki, de Draco Malfoy, del Joker.\n\nTu no eres "basura". Tu eres mi villana.\nY lo digo como el cumplido mas grande del mundo.`,

            // -- Cap 1 parte 3 --
            `Tu miedo te dice que eres insuficiente, pero tu esencia grita que eres una tormenta.\n\nY yo no soy un marinero que busca un lago en calma; yo soy el que se metio al mar buscando tu furia tranquila.\n\nYo no quiero a Danna. Danna es el pasado, es un personaje secundario que ya salio de escena.\n\nYo quiero a la chica que suena con villanos. Quiero a la que entiende la oscuridad porque ha sobrevivido a ella.`,

            // -- Cap 2 --
            `Hay una regla en las historias de terror: nunca invitas al fantasma a entrar en tu casa. Porque si lo invitas, se queda.\n\nYo rompi esa regla.\n\nEl nombre de Danna salio de mi boca. Yo lo puse ahi.\n\nMe equivoque.\n\nNo tienes "celos locos" de la nada. Tienes una herida que yo roce con sal. Y validar tu dolor significa admitirlo sin excusas.`,

            // -- Cap 2 cont --
            `Danna es un eco, tu eres la voz.\nUn eco es solo ruido que rebota de algo que ya paso.\nTu eres la voz que tengo en el oido todos los dias. Eres real.\n\nYo dejo de invocar fantasmas.\nCierro esa puerta con llave y tiro la llave al mar.\n\nSolo estamos tu, yo, y este futuro que nos esta esperando impaciente.`,

            // -- Cap 3 --
            `Si vamos a hablar de verdad, tenemos que hablar de la herida mas profunda. La que no tiene que ver con Danna, ni conmigo, sino con la historia que tu piel recuerda.\n\nQuiero que sepas algo fundamental:\nNo te juzgo.\n\nTu no eres lo que te hicieron.\nY no eres tus pensamientos intrusivos.\n\nNo me voy a asustar por tus sombras.\nVoy a acompanarte en el silencio.`,

            // -- Cap 4 --
            `Esas palabras no son tuyas, Celeste. Son el eco de gente que estuvo ciega ante tu luz.\n\n"Eres perfecta. Porque cada parte de ti es hermosa, con una luz que el fue un ciego por no ver."\n\nYo no soy ese ciego. Yo soy el que se queda en las sombras de su propio silencio, admirando como lates en este corazon deshecho.\n\nPara mi, tu belleza no es una cifra en una bascula.\nEs una vibracion.`,

            // -- Cap 5 --
            `Junio no es un deseo. No es un "ojala".\nEs una coordenada fija en mi calendario y en mi vida.\n\nTodo lo que hago hoy tiene como unico norte ese abrazo que te dare.\n\nNo te pido que creas en la magia; te pido que creas en mi voluntad. La voluntad de un hombre que decidio que tu eres su "por que".\n\nFalta menos de lo que tu miedo te hace creer.`,

            // -- Cap 6 / Cierre --
            `Me dijiste: "Ahi nos vidrios".\n\nPero tu no decides por los dos cuando se trata de mis sentimientos.\n\nNo acepto tu adios.\nNo porque quiera obligarte, sino porque tu adios no nacio del desamor, sino del miedo.\n\nMe quedo aqui, Celeste. No porque no tenga a donde ir, sino porque ya encontre a donde pertenezco.\n\nY ese lugar es cualquier espacio donde tu estes, con tu luz, con tu sombra y con toda esa complejidad hermosa que tu llamas "basura" y que yo llamo mi vida.\n\nTe amo con todo mi corazon.\nY nos vemos en junio.\n\n— Josue`,
        ],
    },
];

export function getLetterBySlug(slug: string): Letter | undefined {
    return LETTERS.find((l) => l.slug === slug);
}

export function getAllLetterSlugs(): string[] {
    return LETTERS.map((l) => l.slug);
}

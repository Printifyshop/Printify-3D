document.addEventListener('DOMContentLoaded', function () {
    // ==========================================
    // 1. MOBIEL MENU & PAGINA NAVIGATIE
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    const pageLinks = document.querySelectorAll('.page-link, .nav-to-info-btn, .nav-to-plaza-btn, .back-to-shop-btn');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = link.getAttribute('data-page') || 
                (link.classList.contains('nav-to-info-btn') ? 'info-page' : link.classList.contains('nav-to-plaza-btn') ? 'plaza-page' : 'shop-page');
            
            document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
            const targetSec = document.getElementById(targetPageId);
            if (targetSec) targetSec.classList.add('active');

            document.querySelectorAll('.page-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll(`[data-page="${targetPageId}"]`).forEach(l => l.classList.add('active'));

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Printify Plaza: fresh 20-question rounds, a personal best, and rotating facts.
    const plazaQuiz = document.getElementById('plazaStartQuiz');
    if (plazaQuiz) {
        const factList = [
            'Een FDM-printer bouwt een object op door gesmolten filament in banen neer te leggen.',
            'Een slicer vertaalt een 3D-model naar instructies die de printer kan uitvoeren.',
            'De eerste laag is belangrijk: die moet goed aan het printbed hechten.',
            'Een 3D-print bestaat uit veel dunne laagjes die samen de vorm maken.',
            'PLA wordt gemaakt uit hernieuwbare grondstoffen zoals zetmeelrijke planten.',
            'Een printbed helpt de eerste laag op zijn plek te houden.',
            'Een brim is een extra rand rond een print die het contact met het bed vergroot.',
            'Supports zijn tijdelijke steunen voor delen die anders in de lucht zouden printen.',
            'Infill is de interne vulling van een print; die hoeft niet altijd massief te zijn.',
            'Meer infill kost meestal extra materiaal en printtijd.',
            'De nozzle is het kleine mondstuk waar het gesmolten filament uit komt.',
            'Een koelventilator helpt sommige geprinte lagen sneller stevig te worden.',
            'Bruggen zijn stukken filament die tussen twee punten over een opening worden gelegd.',
            'Een overhang steekt uit ten opzichte van de laag eronder.',
            'De printoriëntatie kan invloed hebben op sterkte, uiterlijk en benodigde supports.',
            'Een skirt print eerst een losse lijn om de nozzle te vullen en de stroom te controleren.',
            'G-code bevat bewegingen en instellingen voor de printer.',
            'Een kalibratiekubus helpt om maatvoering en printkwaliteit te controleren.',
            'Een kleinere laaghoogte geeft doorgaans fijnere details, maar vraagt meer lagen.',
            'Een grotere nozzle kan bredere banen printen en soms sneller werken.',
            'PETG is vaak wat taaier en flexibeler dan PLA.',
            'Filament kan vocht opnemen; dat kan de printkwaliteit beïnvloeden.',
            'Een temperatuurtest helpt te zien welke nozzletemperatuur bij materiaal en printer past.',
            'Een raft is een tijdelijke basis onder een model om hechting te verbeteren.',
            'Perimeters vormen de buitenwanden van een geprint onderdeel.',
            'Een ontwerp met holle ruimtes kan materiaal besparen.',
            'Kleine speling in een ontwerp kan bewegende delen vrij laten draaien.',
            'De nozzle beweegt in X- en Y-richting terwijl de print in de Z-richting hoger wordt.',
            'De printtijd hangt onder meer af van formaat, laaghoogte, snelheid en vulling.',
            'Een 3D-model moet gesloten en geschikt zijn om te slicen voordat het betrouwbaar print.',
            'Een temperatuurtoren vergelijkt meerdere nozzletemperaturen in één print.',
            'Een dunne wand print sneller dan een massief blok met hetzelfde buitenformaat.',
            'De bouwruimte bepaalt hoe groot een object in één keer geprint kan worden.',
            'Een sensor kan filament detecteren en soms een print pauzeren als het op is.',
            'Een gladde eerste laag begint met een goed vlak en schoon printbed.',
            'Een purge-lijn kan de nozzle laten doorstromen voordat het model start.',
            'Na het printen kan een onderdeel nog nabewerking nodig hebben.',
            'Dezelfde vorm kan met andere instellingen een ander oppervlak krijgen.',
            'Een laaglijnpatroon is vaak zichtbaar op FDM-geprinte onderdelen.',
            'Een model opdelen in meerdere delen kan helpen als het te groot is voor het printbed.',
            'Een scherpe punt is lastiger te printen dan een brede, stabiele basis.',
            'Een goede hechting voorkomt dat de print tijdens het werk loskomt.',
            'De koeling wordt soms lager gezet voor lagen die extra hechting nodig hebben.',
            'De buitenwand kan er anders uitzien dan de interne vulling.',
            'Een slicer kan een print schatten op tijd en materiaalverbruik.',
            'Een rol filament heeft meestal een label met materiaal en aanbevolen instellingen.',
            'Een printkop kan meerdere onderdelen op één printbed achter elkaar printen.',
            'Een model op het printbed plaatsen heet ook wel arrangeren of positioneren.',
            'Een dunne laaghoogte geeft een rond oppervlak vaak minder zichtbare stapjes.',
            'Een 3D-printer kan geen echt zwevende laag printen zonder steun eronder.',
            'Een skirt raakt het model niet, een brim sluit aan rond de onderkant.',
            'Een infillpatroon verdeelt steun binnenin het onderdeel.',
            'Een goede eerste laag is plat en gelijkmatig over het printbed verdeeld.',
            'Een slicer kan meerdere modellen samen op één bouwplaat plaatsen.',
            'De printkop moet van positie wisselen tussen verschillende delen van een model.',
            'Na afkoelen zijn veel prints makkelijker van het bed te halen.',
            'Printinstellingen zijn afhankelijk van materiaal, printer en het gewenste resultaat.',
            'Een laag kan zichtbaar worden als een dunne horizontale lijn op het product.',
            'Een testprint helpt problemen op te sporen voordat je een groot model maakt.',
            'Een temperatuurtoren helpt om te vergelijken hoe materiaal print op verschillende temperaturen.',
            'Een goede eerste laag helpt voorkomen dat een print tijdens het printen loskomt.'
        ];
        const questionBank = [
            ['Wat doet een FDM-printer met filament?', 'Smelt het en legt het in banen neer', 'Snijdt het in dunne plaatjes'],
            ['Wat maakt een slicer van een 3D-model?', 'Printerinstructies per laag', 'Een foto van het model'],
            ['Waarom is de eerste laag zo belangrijk?', 'Die moet goed aan het printbed hechten', 'Die bepaalt de kleur van het filament'],
            ['Wat is een gebruikelijk effect van een kleinere laaghoogte?', 'Fijnere details en meer lagen', 'Minder lagen en grovere details'],
            ['Waarvoor worden supports gebruikt?', 'Om overhangende delen tijdelijk te ondersteunen', 'Om filament een andere kleur te geven'],
            ['Wat betekent infill?', 'De interne vulling van een print', 'De rand buiten het printbed'],
            ['Wat doet een brim meestal?', 'Vergroot het contact rond de basis', 'Maakt de nozzle kouder'],
            ['Waar komt het gesmolten filament uit?', 'De nozzle', 'De spoelhouder'],
            ['Van welke grondstoffen kan PLA worden gemaakt?', 'Hernieuwbare plantenbronnen', 'Metaalerts'],
            ['Wat kan de oriëntatie van een model veranderen?', 'Sterkte, uiterlijk en benodigde supports', 'Alleen de kleur'],
            ['Wat is een brug bij 3D-printen?', 'Filament over een opening tussen twee punten', 'Een geprint handvat'],
            ['Wat is een overhang?', 'Een deel dat uitsteekt voorbij de laag eronder', 'Een extra volle infill-laag'],
            ['Waarom print een slicer soms eerst een skirt?', 'Om de filamentstroom vooraf te controleren', 'Om de print af te koelen'],
            ['Wat bevat G-code?', 'Printerbewegingen en instellingen', 'Foto’s van de print'],
            ['Wat gebeurt er meestal als je meer infill kiest?', 'Meer materiaal en printtijd', 'Minder materiaal en printtijd'],
            ['Hoe kan PETG zich vaak verhouden tot PLA?', 'Het is vaak taaier en flexibeler', 'Het is altijd een metaal'],
            ['Wat kan vocht in filament veroorzaken?', 'Minder goede printkwaliteit', 'Een grotere bouwplaat'],
            ['Wat vormen de perimeters?', 'De buitenwanden van het onderdeel', 'De temperatuurinstelling'],
            ['Wat is een raft?', 'Een tijdelijke basis onder een model', 'Een soort nozzle'],
            ['Waarvoor kan een kalibratiekubus dienen?', 'Maatvoering en kwaliteit controleren', 'Filament opbergen'],
            ['Welke instellingen beïnvloeden de printtijd?', 'Laaghoogte en printsnelheid', 'De bestandsnaam'],
            ['Wat kan een koelventilator doen?', 'Verse lagen helpen afkoelen', 'Het filament naar de nozzle trekken'],
            ['Waarom laat een ontwerp soms speling tussen onderdelen?', 'Zodat bewegende delen vrij kunnen bewegen', 'Om het model zwaarder te maken'],
            ['Wat helpt een model betrouwbaar te slicen?', 'Een gesloten, printbaar 3D-model', 'Een schermafbeelding'],
            ['Hoe vind je een passende printtemperatuur?', 'Testen volgens materiaal en printer', 'Altijd dezelfde temperatuur voor elk materiaal'],
            ['Wat kan een grotere nozzle doen?', 'Bredere banen leggen', 'De bouwplaat groter maken'],
            ['Waarom kan een hol ontwerp handig zijn?', 'Het kan materiaal besparen', 'Het verdubbelt altijd de sterkte'],
            ['In welke richting wordt de print laag voor laag hoger?', 'De Z-richting', 'Alleen de X-richting'],
            ['Wat helpt een verwarmd printbed vooral bij?', 'Hechting van de eerste laag', 'Het slicen van het model'],
            ['Wat test een temperatuurtoren?', 'Verschillende nozzletemperaturen', 'Verschillende bestandsformaten'],
            ['Wat is een voordeel van een hol ontwerp?', 'Het kan materiaal besparen', 'Het maakt elk onderdeel waterdicht'],
            ['Wat kan een filament-op-sensor doen?', 'Detecteren dat filament op is', 'De kleur van filament veranderen'],
            ['Waarom kan een model in meerdere delen worden geprint?', 'Als het te groot is voor het printbed', 'Om de printer sneller te laten slicen'],
            ['Wat is een purge-lijn?', 'Een lijn om filament door de nozzle te laten stromen', 'Een lijn om het printbed te verwarmen'],
            ['Wat doet een kalibratiekubus?', 'Helpt afmetingen en printkwaliteit controleren', 'Meet hoeveel filament op de spoel zit'],
            ['Wat is een skirt ten opzichte van het model?', 'Een losse lijn eromheen', 'Een laag die onder het hele model zit'],
            ['Waardoor kan een print na het printen makkelijker loskomen?', 'Afkoelen', 'Meer infill toevoegen'],
            ['Waarvoor is de bouwruimte van een printer?', 'Om de maximale printafmetingen aan te geven', 'Om de nozzletemperatuur te tonen'],
            ['Wat doen perimeters samen?', 'De buitenwanden van een onderdeel vormen', 'De printkop smeren'],
            ['Waarom hebben bewegende onderdelen soms speling nodig?', 'Om ruimte te hebben om te bewegen', 'Om meer steunmateriaal te gebruiken'],
            ['Wat kan een slicer inschatten?', 'Printtijd en materiaalverbruik', 'De verkoopprijs van een product'],
            ['Wat kan nabewerking betekenen?', 'Een print na het printen gladmaken of afwerken', 'Het model vóór het slicen tekenen'],
            ['Wat kan een dunne wand doen met de printtijd?', 'Vaak sneller printen dan een massief deel', 'Altijd langer printen door meer infill'],
            ['Wat is een laaglijn?', 'Een zichtbare horizontale baan van een printlaag', 'Een markering op een filamentrol'],
            ['Waarom wordt filament soms droog bewaard?', 'Om vochtopname te beperken', 'Om het filament zachter te maken'],
            ['Wat kan een temperatuurlabel op een filamentrol aangeven?', 'Aanbevolen printinstellingen', 'Het maximale gewicht van het model'],
            ['Wat betekent een model arrangeren in de slicer?', 'Het op de bouwplaat positioneren', 'Het filament van kleur wisselen'],
            ['Wat kan een slechte hechting veroorzaken?', 'Dat de print loskomt van het bed', 'Dat het model automatisch groter wordt'],
            ['Wat is een voordeel van een brim?', 'Extra contact rond de onderkant', 'Een gladdere bovenkant van elke laag'],
            ['Wanneer kunnen supports nodig zijn?', 'Bij delen die geen steun van onderliggende lagen hebben', 'Bij elk plat model'],
            ['Wat is een infillpatroon?', 'De manier waarop interne vulling wordt gelegd', 'De volgorde van kleuren op de spoel'],
            ['Waarom kan koeling soms lager worden gezet?', 'Om lagen beter aan elkaar te laten hechten', 'Om de bouwplaat af te koelen'],
            ['Wat helpt een brede basis bij een model?', 'Een stabielere start op het printbed', 'Een hogere nozzletemperatuur'],
            ['Wat gebeurt er tijdens het slicen?', 'Het model wordt omgezet in printlagen en bewegingen', 'De printer snijdt het object uit filament'],
            ['Wat kan een grotere laaghoogte doen?', 'Minder lagen nodig maken', 'Meer fijne details aanbrengen'],
            ['Wat kan een grotere nozzle helpen printen?', 'Bredere filamentbanen', 'Kleinere details dan elke kleinere nozzle'],
            ['Waar ligt de Z-as bij 3D-printen voor?', 'De hoogte van de lagen', 'De kleur van het materiaal'],
            ['Waarom maken mensen een testprint?', 'Instellingen of ontwerp eerst controleren', 'De slicer op het internet aansluiten'],
            ['Wat is meestal nodig om een echt zwevend deel te printen?', 'Ondersteuning van supports of een brug', 'Een filamentspoel met meer materiaal']
        ].map(function (item) { return { question: item[0], answer: item[1], wrong: item[2] }; });
        function shuffled(list) {
            const copy = list.slice();
            for (let i = copy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [copy[i], copy[j]] = [copy[j], copy[i]];
            }
            return copy;
        }
        let factDeck = [];
        let roundQuestions = [];
        let previousRound = new Set();
        let questionIndex = 0;
        let score = 0;
        const welcome = document.getElementById('plazaQuizWelcome');
        const game = document.getElementById('plazaQuizGame');
        const results = document.getElementById('plazaQuizResults');
        const bestLabel = document.getElementById('plazaBestScore');
        function showNextFact() {
            if (!factDeck.length) factDeck = shuffled(factList);
            document.getElementById('plazaFactText').textContent = factDeck.pop();
        }
        function showBestScore() {
            let best = 0;
            try { best = Math.max(0, Math.min(20, Number(localStorage.getItem('printify_plaza_best')) || 0)); } catch (error) {}
            bestLabel.textContent = '🏆 Topscore: ' + best + ' / 20';
        }
        function startRound() {
            let availableQuestions = questionBank.filter(function (item) { return !previousRound.has(item.question); });
            if (availableQuestions.length < 20) availableQuestions = questionBank;
            roundQuestions = shuffled(availableQuestions).slice(0, 20);
            previousRound = new Set(roundQuestions.map(function (item) { return item.question; }));
            questionIndex = 0;
            score = 0;
            welcome.hidden = true;
            results.hidden = true;
            game.hidden = false;
            document.getElementById('plazaRoundScore').hidden = false;
            document.getElementById('plazaRoundScore').textContent = '⭐ Score: 0 / 20';
            renderQuestion();
        }
        function renderQuestion() {
            const item = roundQuestions[questionIndex];
            document.getElementById('plazaQuestionNumber').textContent = 'Vraag ' + (questionIndex + 1) + ' van 20';
            document.getElementById('plazaQuestion').textContent = item.question;
            document.getElementById('plazaQuizProgress').style.width = ((questionIndex + 1) * 5) + '%';
            document.getElementById('plazaFeedback').textContent = '';
            document.getElementById('plazaNextQuestion').hidden = true;
            document.getElementById('plazaNextQuestion').textContent = questionIndex === 19 ? 'Bekijk resultaat →' : 'Volgende vraag →';
            document.getElementById('plazaTipText').hidden = true;
            document.getElementById('plazaTipText').textContent = '';
            document.getElementById('plazaTip').hidden = false;
            const extraDistractors = [...new Set(questionBank.map(function (question) { return question.wrong; }))]
                .filter(function (answer) { return answer !== item.answer && answer !== item.wrong; });
            const choices = shuffled([
                { text: item.answer, correct: true },
                { text: item.wrong, correct: false },
                ...shuffled(extraDistractors).slice(0, 2).map(function (answer) { return { text: answer, correct: false }; })
            ]);
            const host = document.getElementById('plazaOptions');
            host.replaceChildren(...choices.map(function (choice) {
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = choice.text;
                button.addEventListener('click', function () {
                    host.querySelectorAll('button').forEach(function (option) {
                        option.disabled = true;
                        if (option.dataset.correct === 'true') option.classList.add('plaza-answer-correct');
                        else option.classList.add('plaza-answer-wrong');
                    });
                    document.getElementById('plazaTip').hidden = true;
                    if (choice.correct) score++;
                    document.getElementById('plazaRoundScore').textContent = '⭐ Score: ' + score + ' / 20';
                    document.getElementById('plazaFeedback').textContent = choice.correct
                        ? 'Goed! +1 punt. ' + item.answer + ' is hier het juiste antwoord.'
                        : 'Niet helemaal. Het juiste antwoord is: ' + item.answer + '. ' + item.wrong + ' past hier niet, omdat het een andere functie of stap beschrijft.';
                    document.getElementById('plazaFeedback').className = choice.correct ? 'quiz-correct' : 'quiz-hint';
                    document.getElementById('plazaNextQuestion').hidden = false;
                });
                button.dataset.correct = String(choice.correct);
                return button;
            }));
        }
        function nextQuestion() {
            questionIndex++;
            if (questionIndex < 20) { renderQuestion(); return; }
            game.hidden = true;
            results.hidden = false;
            document.getElementById('plazaFinalScore').textContent = score + ' / 20 goed';
            document.getElementById('plazaResultMessage').textContent = score === 20 ? 'Perfecte score! Jij bent een echte 3D-kenner.' : score >= 15 ? 'Geweldig gedaan! Je weet al veel van 3D-printen.' : score >= 10 ? 'Goed bezig! Nog een ronde en je leert weer iets nieuws.' : 'Leuke start! Speel nog een ronde en ontdek meer.';
            try {
                const oldBest = Number(localStorage.getItem('printify_plaza_best')) || 0;
                if (score > oldBest) localStorage.setItem('printify_plaza_best', String(score));
            } catch (error) {}
            showBestScore();
        }
        plazaQuiz.addEventListener('click', startRound);
        document.getElementById('plazaNewQuiz').addEventListener('click', startRound);
        document.getElementById('plazaNextQuestion').addEventListener('click', nextQuestion);
        document.getElementById('plazaTip').addEventListener('click', function () {
            const item = roundQuestions[questionIndex];
            const tips = [
                [/slicer|slicen/i, 'Denk aan de stap die een digitaal 3D-model omzet in lagen en printercommando’s.'],
                [/eerste laag|hechting|printbed/i, 'Denk aan wat ervoor zorgt dat het model tijdens het printen op zijn plek blijft.'],
                [/support|overhang|brug/i, 'Denk aan uitstekende delen die nog geen laag onder zich hebben.'],
                [/infill|vulling|hol/i, 'Denk aan de binnenkant van het model en hoeveel materiaal daar nodig is.'],
                [/nozzle|filament|FDM/i, 'Denk aan de route die het kunststof draad aflegt door de printerkop.'],
                [/temperatuur|koel|PETG|PLA/i, 'Denk aan hoe materiaal reageert op warmte en afkoeling.'],
                [/G-code|printerinstructies/i, 'Denk aan de opdrachten die de printer stap voor stap kan uitvoeren.'],
                [/laaghoogte|laaglijn|Z-as/i, 'Denk aan de dunne laagjes waaruit de hoogte en details van een print bestaan.'],
                [/skirt|brim|raft|purge/i, 'Denk aan hulpmiddelen die de start of hechting van de print ondersteunen.'],
                [/perimeter|buitenwand/i, 'Denk aan het verschil tussen de buitenkant en de binnenvulling van een model.'],
                [/printtijd|snelheid|grotere nozzle/i, 'Denk aan welke instellingen invloed hebben op het aantal banen en hoe snel die worden gelegd.'],
                [/kalibratie|testprint|temperatuurtoren/i, 'Denk aan een proef waarmee je de instellingen of nauwkeurigheid controleert.']
            ];
            const match = tips.find(function (entry) { return entry[0].test(item.question); });
            const tipText = document.getElementById('plazaTipText');
            tipText.textContent = match ? match[1] : 'Denk aan welke taak het genoemde onderdeel of de genoemde stap in het printproces heeft.';
            tipText.hidden = false;
        });
        document.getElementById('plazaNextFact').addEventListener('click', showNextFact);
        showBestScore();
        showNextFact();
    }

    document.querySelectorAll('.menu-scroll-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
                document.getElementById('shop-page').classList.add('active');
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 2. ZOEKEN & FILTERS
    // ==========================================
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categorySections = document.querySelectorAll('.category-section');

    let currentFilter = 'all';
    let searchQuery = '';
    const normalizeProductSearch = value => String(value || '').toLocaleLowerCase('nl-NL').replace(/\s+/g, '');

    function filterProducts() {
        categorySections.forEach(catSec => {
            const catGroup = catSec.getAttribute('data-category-group');
            let hasVisibleCardInGroup = false;

            const cardsInGroup = catSec.querySelectorAll('.product-card');
            cardsInGroup.forEach(card => {
                const name = normalizeProductSearch(card.getAttribute('data-name'));
                const desc = normalizeProductSearch(card.getAttribute('data-desc'));
                const category = card.getAttribute('data-category');

                const matchesSearch = name.includes(searchQuery) || desc.includes(searchQuery);
                const matchesFilter = (currentFilter === 'all' || category === currentFilter);

                if (matchesSearch && matchesFilter) {
                    card.style.display = 'flex';
                    hasVisibleCardInGroup = true;
                } else {
                    card.style.display = 'none';
                }
            });

            if (currentFilter !== 'all' && catGroup !== currentFilter) {
                catSec.style.display = 'none';
            } else if (!hasVisibleCardInGroup && searchQuery !== '') {
                catSec.style.display = 'none';
            } else {
                catSec.style.display = 'block';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = normalizeProductSearch(e.target.value);
            filterProducts();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterProducts();
        });
    });

    // ==========================================
    // 3. PRODUCT KAART SLIDER (Startscherm)
    // ==========================================
    document.querySelectorAll('.card-video-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const card = button.closest('.product-card');
            if (!card) return;

            isCurrentlySpiraal = false;
            if (modalSpiraalSizeWrapper) modalSpiraalSizeWrapper.style.display = 'none';

            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));
            const desc = card.getAttribute('data-desc');
            const categoryTag = card.querySelector('.category-tag');
            const photoList = (card.getAttribute('data-img') || '')
                .split(',').map(item => item.trim()).filter(Boolean);
            const videoPath = card.getAttribute('data-video');
            if (!videoPath) return;

            const mediaList = [...photoList, videoPath];
            const videoIndex = mediaList.length - 1;

            activeProductData = { name, price };
            modalProductTitle.textContent = name;
            modalProductPrice.textContent = `€ ${price.toFixed(2).replace('.', ',')}`;
            modalProductDesc.textContent = desc;
            modalCategoryTag.textContent = categoryTag ? categoryTag.textContent : '';
            if (modalColorInput) modalColorInput.value = '';

            currentMediaList = mediaList;
            currentMediaIndex = videoIndex;
            renderModalMedia();
            if (detailModal) detailModal.style.display = 'flex';
        });
    });

    document.querySelectorAll('.product-card').forEach(card => {
        const thumbContainer = card.querySelector('.product-card-thumb-container');
        const imgRaw = card.getAttribute('data-img');
        const productName = (card.getAttribute('data-name') || '').toLowerCase();
        if (!thumbContainer || !imgRaw) return;

        // Producten die absoluut geen slider op het startscherm mogen
        const noSliderProducts = [
            'kaartenhouder', 
            'kabel houder', 
            'kabelhouder', 
            'alles houder', 
            'alleshouder', 
            'haarborstel schoonmaker', 
            'haarborstelschoonmaker'
        ];
        
        if (noSliderProducts.some(p => productName.includes(p))) {
            return; 
        }

        const mediaList = imgRaw.split(',').map(item => item.trim()).filter(item => item.length > 0);
        if (mediaList.length <= 1) return;

        let currentIndex = 0;

        const prevBtn = document.createElement('button');
        prevBtn.className = 'card-slider-arrow card-prev';
        prevBtn.innerHTML = '❮';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'card-slider-arrow card-next';
        nextBtn.innerHTML = '❯';

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'card-dots-container';

        mediaList.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.className = `card-dot ${idx === 0 ? 'active' : ''}`;
            dotsContainer.appendChild(dot);
        });

        thumbContainer.appendChild(prevBtn);
        thumbContainer.appendChild(nextBtn);
        thumbContainer.appendChild(dotsContainer);

        const cardImg = thumbContainer.querySelector('img');

        function updateCardMedia() {
            if (!cardImg) return;
            const src = mediaList[currentIndex];
            cardImg.src = src;

            const dots = dotsContainer.querySelectorAll('.card-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
            updateCardMedia();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % mediaList.length;
            updateCardMedia();
        });
    });

    // ==========================================
    // 4. SPIRAAL FIDGET LOGICA
    // ==========================================
    const spiraalSelect = document.getElementById('spiraalMaatSelect');
    
    function updateSpiraalCardData(maat) {
        const card = document.getElementById('spiraalCard');
        if (!card) return;
        const priceDisplay = document.getElementById('spiraalPriceDisplay');
        const mainImg = card.querySelector('.product-card-thumb-container img');

        if (maat === 'Groot') {
            card.setAttribute('data-price', '2.50');
            card.setAttribute('data-name', 'Spiraal fidget (Groot)');
            card.setAttribute('data-img', "fotos/web-fotos/spiraal-fidget-groot.jpg");
            if (priceDisplay) priceDisplay.textContent = '€ 2,50';
            if (mainImg) mainImg.src = "fotos/web-fotos/spiraal-fidget-groot.jpg";
        } else if (maat === 'Middel') {
            card.setAttribute('data-price', '1.50');
            card.setAttribute('data-name', 'Spiraal fidget (Middel)');
            card.setAttribute('data-img', "fotos/web-fotos/spiraal-fidget-middel.jpg, fotos/web-fotos/spiraal-fidget-middel-2.jpg");
            if (priceDisplay) priceDisplay.textContent = '€ 1,50';
            if (mainImg) mainImg.src = "fotos/web-fotos/spiraal-fidget-middel.jpg";
        } else if (maat === 'Klein') {
            card.setAttribute('data-price', '0.50');
            card.setAttribute('data-name', 'Spiraal fidget (Klein)');
            card.setAttribute('data-img', "fotos/web-fotos/spiraal-fidget-klein.jpg");
            if (priceDisplay) priceDisplay.textContent = '€ 0,50';
            if (mainImg) mainImg.src = "fotos/web-fotos/spiraal-fidget-klein.jpg";
        }
    }

    if (spiraalSelect) {
        spiraalSelect.addEventListener('change', function (e) {
            e.stopPropagation();
            updateSpiraalCardData(this.value);
        });
    }

    // ==========================================
    // 5. WINKELWAGEN & KEUZE MENU
    // ==========================================
    const cartProductPrices = new Map(
        [...document.querySelectorAll('.product-card')].map(card => [
            card.getAttribute('data-name'),
            Number(card.getAttribute('data-price'))
        ]).filter(([name, price]) => name && Number.isFinite(price) && price >= 0)
    );
    cartProductPrices.set('Spiraal fidget (Groot)', 2.50);
    cartProductPrices.set('Spiraal fidget (Middel)', 1.50);
    cartProductPrices.set('Spiraal fidget (Klein)', 0.50);

    function normalizeDesignUrl(value) {
        try {
            const url = new URL(String(value || '').trim());
            return url.protocol === 'https:' && url.hostname && !url.username && !url.password ? url.href : '';
        } catch (e) { return ''; }
    }

    function escapeCartHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
        })[char]);
    }

    function sanitizeSavedCart(value) {
        if (!Array.isArray(value)) return [];
        return value.flatMap(item => {
            if (!item || typeof item !== 'object') return [];
            const name = typeof item.name === 'string' ? item.name : '';
            const isCustomPrint = item.type === 'custom-design';
            const designUrl = isCustomPrint ? normalizeDesignUrl(item.designUrl) : '';
            const canonicalPrice = isCustomPrint ? 0 : cartProductPrices.get(name);
            if (canonicalPrice === undefined || canonicalPrice === null || (isCustomPrint && (!designUrl || name !== 'Eigen ontwerp (3D-print)'))) return [];
            const quantity = Math.min(99, Math.max(1, Math.floor(Number(item.quantity) || 1)));
            const color = typeof item.color === 'string' ? item.color.slice(0, 80) : '';
            return [{ name, price: canonicalPrice, quantity, color, ...(isCustomPrint ? { type: 'custom-design', designUrl } : {}) }];
        });
    }

    let cart = [];
    try {
        const savedCart = localStorage.getItem('printify_cart') || localStorage.getItem('cart');
        if (savedCart) cart = sanitizeSavedCart(JSON.parse(savedCart));
    } catch (e) {
        cart = [];
    }
    window.cart = cart;

    const cartModal = document.getElementById('cartModal');
    const cartChoiceModal = document.getElementById('cartChoiceModal');
    const closeCartChoiceModal = document.getElementById('closeCartChoiceModal');
    const goToCartBtn = document.getElementById('goToCartBtn');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartCount = document.getElementById('cartCount');
    const cartCountMobile = document.getElementById('cartCountMobile');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalPrice = document.getElementById('cartTotalPrice');

    function syncCartStorage() {
        window.cart = cart;
        try {
            localStorage.setItem('printify_cart', JSON.stringify(cart));
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (e) {}
    }

    function updateCartUI() {
        syncCartStorage();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) cartCount.textContent = totalItems;
        if (cartCountMobile) cartCountMobile.textContent = totalItems;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p class="empty-cart-msg">Je winkelwagen is nog leeg.</p>';
            if (cartTotalPrice) cartTotalPrice.textContent = '€ 0,00';
            const subtotalDisp = document.getElementById('cartSubtotalDisplay');
            if (subtotalDisp) subtotalDisp.textContent = '€ 0,00';
            return;
        }

        let html = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            const priceLabel = item.type === 'custom-design' ? 'Prijs volgt na controle (nog niet in subtotaal)' : `€ ${item.price.toFixed(2).replace('.', ',')} per stuk`;
            const totalLabel = item.type === 'custom-design' ? 'Prijs volgt' : `€ ${itemTotal.toFixed(2).replace('.', ',')}`;
            html += `
                <div class="cart-item" data-price="${item.price}" style="display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid var(--border);">
                    <div>
                        <strong>${escapeCartHtml(item.name)}</strong> ${item.color ? `<br><small style="color:var(--text-muted);">Kleur: ${escapeCartHtml(item.color)}</small>` : ''}
                        ${item.designUrl ? `<br><a class="cart-design-link" href="${escapeCartHtml(item.designUrl)}" target="_blank" rel="noopener noreferrer">Bekijk ontwerp</a>` : ''}
                        <br><small style="color:#64748b;">${priceLabel}</small>
                    </div>
                    <div class="cart-item-controls" style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-weight:700;">${totalLabel}</span>
                        <button type="button" onclick="window.changeQuantity(${index}, -1)" style="width:26px; height:26px; padding:0; line-height:24px; border:1px solid var(--border); border-radius:4px; background:#f1f5f9; cursor:pointer; font-weight:bold;">-</button>
                        <span class="cart-item-qty" style="font-weight:700; min-width:18px; text-align:center;">${item.quantity}</span>
                        <button type="button" onclick="window.changeQuantity(${index}, 1)" style="width:26px; height:26px; padding:0; line-height:24px; border:1px solid var(--border); border-radius:4px; background:#f1f5f9; cursor:pointer; font-weight:bold;">+</button>
                    </div>
                </div>
            `;
        });

        cartItemsList.innerHTML = html;
        if (cartTotalPrice) cartTotalPrice.textContent = `€ ${totalPrice.toFixed(2).replace('.', ',')}`;

        // Eventuele displays bijwerken
        const subtotalDisp = document.getElementById('cartSubtotalDisplay');
        if (subtotalDisp) subtotalDisp.textContent = `€ ${totalPrice.toFixed(2).replace('.', ',')}`;
    }

    window.changeQuantity = function (index, change) {
        const safeIndex = Number(index);
        if (!Number.isInteger(safeIndex) || !cart[safeIndex]) return;
        cart[safeIndex].quantity += change < 0 ? -1 : 1;
        if (cart[safeIndex].quantity <= 0) {
            cart.splice(safeIndex, 1);
        } else {
            cart[safeIndex].quantity = Math.min(99, cart[safeIndex].quantity);
        }
        updateCartUI();
    };

    function addToCart(name, price, color = '', details = {}) {
        const customDesignUrl = details.type === 'custom-design' ? normalizeDesignUrl(details.designUrl) : '';
        const canonicalPrice = details.type === 'custom-design' ? 0 : cartProductPrices.get(name);
        if (canonicalPrice === undefined || canonicalPrice === null || (details.type === 'custom-design' && (!customDesignUrl || name !== 'Eigen ontwerp (3D-print)'))) return;
        color = typeof color === 'string' ? color.slice(0, 80) : '';
        const existingIndex = cart.findIndex(item => item.name === name && item.color === color && item.designUrl === customDesignUrl);
        if (existingIndex > -1) {
            cart[existingIndex].quantity = Math.min(99, cart[existingIndex].quantity + 1);
        } else {
            cart.push({ name, price: canonicalPrice, quantity: 1, color, ...(details.type === 'custom-design' ? { type: 'custom-design', designUrl: customDesignUrl } : {}) });
        }
        updateCartUI();
        
        if (cartChoiceModal) cartChoiceModal.style.display = 'flex';
    }

    if (goToCartBtn) {
        goToCartBtn.addEventListener('click', () => {
            if (cartChoiceModal) cartChoiceModal.style.display = 'none';
            if (cartModal) cartModal.style.display = 'flex';
        });
    }

    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            if (cartChoiceModal) cartChoiceModal.style.display = 'none';
        });
    }

    if (closeCartChoiceModal) {
        closeCartChoiceModal.addEventListener('click', () => {
            if (cartChoiceModal) cartChoiceModal.style.display = 'none';
        });
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (cartModal) cartModal.style.display = 'flex';
        });
    }
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            if (cartModal) cartModal.style.display = 'none';
        });
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));
            addToCart(name, price);
        });
    });

    const customDesignUrlInput = document.getElementById('customDesignUrl');
    const customPrintColorInput = document.getElementById('customPrintColor');
    const customPrintColorOtherInput = document.getElementById('customPrintColorOther');
    const customPrintStatus = document.getElementById('customPrintStatus');
    if (customPrintColorInput) customPrintColorInput.addEventListener('change', () => {
        if (customPrintColorOtherInput) {
            customPrintColorOtherInput.hidden = customPrintColorInput.value !== 'Anders';
            if (customPrintColorInput.value !== 'Anders') customPrintColorOtherInput.value = '';
        }
    });
    const addCustomPrintBtn = document.getElementById('addCustomPrintBtn');
    if (addCustomPrintBtn) addCustomPrintBtn.addEventListener('click', () => {
        const designUrl = normalizeDesignUrl(customDesignUrlInput.value);
        if (!designUrl) {
            customPrintStatus.textContent = 'Plak een geldige https-link naar het ontwerp.';
            customDesignUrlInput.focus();
            return;
        }
        const color = customPrintColorInput.value === 'Anders' ? customPrintColorOtherInput.value.trim() : customPrintColorInput.value;
        if (customPrintColorInput.value === 'Anders' && !color) {
            customPrintStatus.textContent = 'Vul de gewenste kleur in.';
            customPrintColorOtherInput.focus();
            return;
        }
        customPrintStatus.textContent = 'Ontwerp toegevoegd. We bekijken het gewicht en bevestigen de prijs met je.';
        addToCart('Eigen ontwerp (3D-print)', 0, color, { type: 'custom-design', designUrl });
    });

    // ==========================================
    // 6. DETAIL MODAL & MEDIA SLIDER (Uitgeklapt scherm)
    // ==========================================
    const detailModal = document.getElementById('productDetailModal');
    const closeDetailModal = document.getElementById('closeDetailModal');
    const modalMediaContainer = document.getElementById('modalMediaContainer');
    const thumbsContainer = document.getElementById('thumbsContainer');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductDesc = document.getElementById('modalProductDesc');
    const modalCategoryTag = document.getElementById('modalCategoryTag');
    const modalColorInput = document.getElementById('modalColorInput');
    const modalSpiraalSizeWrapper = document.getElementById('modalSpiraalSizeWrapper');
    const modalSpiraalSizeSelect = document.getElementById('modalSpiraalSizeSelect');
    const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');
    const modalShareBtn = document.getElementById('modalShareBtn');
    const prevImgBtn = document.getElementById('prevImgBtn');
    const nextImgBtn = document.getElementById('nextImgBtn');

    let currentMediaList = [];
    let currentMediaIndex = 0;
    let activeProductData = {};
    let isCurrentlySpiraal = false;

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (card.classList.contains('custom-design-card')) return;
            if (e.target.closest('.stop-modal-propagation') || e.target.closest('button') || e.target.closest('select') || e.target.closest('.card-slider-arrow')) return;

            isCurrentlySpiraal = card.hasAttribute('data-is-spiraal');
            
            if (isCurrentlySpiraal) {
                if (modalSpiraalSizeWrapper) modalSpiraalSizeWrapper.style.display = 'block';
                const currentMaatOnCard = spiraalSelect ? spiraalSelect.value : 'Groot';
                if (modalSpiraalSizeSelect) modalSpiraalSizeSelect.value = currentMaatOnCard;
            } else {
                if (modalSpiraalSizeWrapper) modalSpiraalSizeWrapper.style.display = 'none';
            }

            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));
            const desc = card.getAttribute('data-desc');
            const category = card.querySelector('.category-tag').textContent;
            const imgRaw = card.getAttribute('data-img');

            activeProductData = { name, price };
            modalProductTitle.textContent = name;
            modalProductPrice.textContent = `€ ${price.toFixed(2).replace('.', ',')}`;
            modalProductDesc.textContent = desc;
            modalCategoryTag.textContent = category;
            if (modalColorInput) modalColorInput.value = '';

            let rawList = imgRaw.split(',').map(item => item.trim()).filter(item => item.length > 0);
            
            // Toon alle foto's en video's voor ieder product
            currentMediaList = rawList;
            currentMediaIndex = 0;
            renderModalMedia();

            if (detailModal) detailModal.style.display = 'flex';
        });
    });

    if (modalSpiraalSizeSelect) {
        modalSpiraalSizeSelect.addEventListener('change', function () {
            const gekozenMaat = this.value;
            if (spiraalSelect) spiraalSelect.value = gekozenMaat;
            updateSpiraalCardData(gekozenMaat);

            const card = document.getElementById('spiraalCard');
            if (card) {
                const name = card.getAttribute('data-name');
                const price = parseFloat(card.getAttribute('data-price'));
                const imgRaw = card.getAttribute('data-img');

                activeProductData = { name, price };
                modalProductTitle.textContent = name;
                modalProductPrice.textContent = `€ ${price.toFixed(2).replace('.', ',')}`;

                currentMediaList = imgRaw.split(',').map(item => item.trim()).filter(item => item.length > 0);
                currentMediaIndex = 0;
                renderModalMedia();
            }
        });
    }

    function stopModalVideos() {
        if (!modalMediaContainer) return;
        const videos = modalMediaContainer.querySelectorAll('video');
        videos.forEach(v => {
            try {
                v.pause();
                v.removeAttribute('src');
                v.load();
            } catch (e) {}
        });
    }

    function openFullscreenMedia(source, isVideo) {
        const fullscreenOverlay = document.getElementById('fullscreenOverlay');
        const fullscreenImg = document.getElementById('fullscreenImg');
        const fullscreenVideo = document.getElementById('fullscreenVideo');
        if (!fullscreenOverlay) return;

        if (isVideo) {
            if (fullscreenImg) fullscreenImg.style.display = 'none';
            if (fullscreenVideo) {
                fullscreenVideo.style.display = 'block';
                fullscreenVideo.src = source;
                fullscreenVideo.muted = false;
                fullscreenVideo.autoplay = true;
                fullscreenVideo.controls = true;
                fullscreenVideo.play().catch(() => {});
            }
        } else {
            if (fullscreenVideo) {
                fullscreenVideo.pause();
                fullscreenVideo.style.display = 'none';
            }
            if (fullscreenImg) {
                fullscreenImg.style.display = 'block';
                fullscreenImg.src = source;
            }
        }
        fullscreenOverlay.style.display = 'flex';
    }

    function closeFullscreenOverlay() {
        const fullscreenOverlay = document.getElementById('fullscreenOverlay');
        const fullscreenVideo = document.getElementById('fullscreenVideo');
        if (fullscreenVideo) {
            try {
                fullscreenVideo.pause();
                fullscreenVideo.removeAttribute('src');
                fullscreenVideo.load();
            } catch (e) {}
            fullscreenVideo.style.display = 'none';
        }
        if (fullscreenOverlay) {
            fullscreenOverlay.style.display = 'none';
        }
    }

    function renderModalMedia() {
        if (!modalMediaContainer || currentMediaList.length === 0) return;
        const currentSource = currentMediaList[currentMediaIndex];

        stopModalVideos();
        const existingMedia = modalMediaContainer.querySelectorAll('img, video');
        existingMedia.forEach(el => el.remove());

        const isVideo = currentSource.endsWith('.mov') || currentSource.endsWith('.mp4');

        if (isVideo) {
            const video = document.createElement('video');
            video.controls = true;
            video.autoplay = true;
            video.muted = true;
            video.defaultMuted = true;
            video.loop = true;
            video.playsInline = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('muted', '');
            video.setAttribute('preload', 'auto');
            video.setAttribute('controlslist', 'nodownload');

            // Universele MP4 bron (werkt op Apple iOS/macOS, Windows, Android)
            const mp4Path = currentSource.replace(/\.mov$/, '.mp4');
            const sMp4 = document.createElement('source');
            sMp4.src = mp4Path;
            sMp4.type = 'video/mp4';
            video.appendChild(sMp4);

            // MOV als fallback voor QuickTime op macOS/iOS
            if (currentSource.includes('rol-fidget')) {
                const sMov = document.createElement('source');
                sMov.src = mp4Path.replace(/\.mp4$/, '.mov');
                sMov.type = 'video/quicktime';
                video.appendChild(sMov);
            }

            video.src = mp4Path;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.maxHeight = '320px';
            video.style.objectFit = 'contain';
            video.style.borderRadius = '8px';
            video.style.backgroundColor = '#0b1120';
            video.style.cursor = 'pointer';

            video.title = 'Video afspelen';

            modalMediaContainer.insertBefore(video, nextImgBtn);
            video.play().catch(() => {});
        } else {
            const img = document.createElement('img');
            img.src = currentSource;
            img.alt = activeProductData.name || 'Productfoto';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.maxHeight = '320px';
            img.style.objectFit = 'contain';
            img.style.borderRadius = '8px';
            img.style.cursor = 'zoom-in';
            img.style.backgroundColor = '#0b1120';
            
            img.addEventListener('click', () => {
                openFullscreenMedia(currentSource, false);
            });

            modalMediaContainer.insertBefore(img, nextImgBtn);
        }

        // Dynamische tip tekst afhankelijk van foto of video
        const tipEl = document.querySelector('.detail-img-wrapper .tip-text');
        if (tipEl) {
            tipEl.innerHTML = isVideo 
                ? '🎬 <strong>Video demo:</strong> Speelt automatisch af (gedempt). Zet geluid aan of pauzeer via de knoppen!' 
                : '💡 <strong>Tip:</strong> Klik op de foto om deze in het groot te bekijken!';
        }

        if (thumbsContainer) {
            let thumbsHtml = '';
            currentMediaList.forEach((src, idx) => {
                const itemIsVideo = src.endsWith('.mov') || src.endsWith('.mp4');
                const isActive = idx === currentMediaIndex;
                thumbsHtml += `
                    <div class="thumb-item ${isActive ? 'active' : ''}" onclick="window.selectMediaIndex(${idx})" style="width: 52px; height: 52px; border: 2px solid ${isActive ? 'var(--primary)' : 'var(--border)'}; border-radius: 6px; overflow: hidden; cursor: pointer; display: flex; align-items: center; justify-content: center; background: #0b1120; position: relative; transition: all 0.2s ease;">
                        ${itemIsVideo 
                            ? `<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100%; background: linear-gradient(135deg, #0f172a, #1e293b); color:#fff;">
                                 <span style="font-size:1.1rem; line-height:1; color:${isActive ? 'var(--primary)' : '#fff'};">▶</span>
                                 <span style="font-size:0.6rem; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; margin-top:2px; color:${isActive ? 'var(--primary)' : '#94a3b8'};">Video</span>
                               </div>` 
                            : `<img src="${src}" alt="" style="width:100%; height:100%; object-fit:cover;">`
                        }
                    </div>
                `;
            });
            thumbsContainer.innerHTML = thumbsHtml;
        }

        if (prevImgBtn && nextImgBtn) {
            const showArrows = currentMediaList.length > 1;
            prevImgBtn.style.display = showArrows ? 'block' : 'none';
            nextImgBtn.style.display = showArrows ? 'block' : 'none';
        }
    }

    window.selectMediaIndex = function (index) {
        currentMediaIndex = index;
        renderModalMedia();
    };

    if (prevImgBtn) {
        prevImgBtn.addEventListener('click', () => {
            currentMediaIndex = (currentMediaIndex - 1 + currentMediaList.length) % currentMediaList.length;
            renderModalMedia();
        });
    }
    if (nextImgBtn) {
        nextImgBtn.addEventListener('click', () => {
            currentMediaIndex = (currentMediaIndex + 1) % currentMediaList.length;
            renderModalMedia();
        });
    }

    if (closeDetailModal) {
        closeDetailModal.addEventListener('click', () => {
            stopModalVideos();
            if (detailModal) detailModal.style.display = 'none';
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailModal && detailModal.style.display === 'flex') {
            stopModalVideos();
            detailModal.style.display = 'none';
        }
    });

    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', () => {
            const color = modalColorInput ? modalColorInput.value.trim() : '';
            addToCart(activeProductData.name, activeProductData.price, color);
            stopModalVideos();
            if (detailModal) detailModal.style.display = 'none';
        });
    }

    if (modalShareBtn) {
        modalShareBtn.addEventListener('click', () => {
            const text = `Hé! Kijk eens naar dit toffe 3D-geprinte product van Printify 3D: *${activeProductData.name}* voor slechts € ${activeProductData.price.toFixed(2).replace('.', ',')}!\n\nBekijk hier de website: https://bit.ly/printify3d`;
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
        });
    }

    const fullscreenOverlay = document.getElementById('fullscreenOverlay');
    const closeFullscreen = document.getElementById('closeFullscreen');
    if (closeFullscreen) {
        closeFullscreen.addEventListener('click', closeFullscreenOverlay);
    }
    if (fullscreenOverlay) {
        fullscreenOverlay.addEventListener('click', (e) => {
            if (e.target === fullscreenOverlay) closeFullscreenOverlay();
        });
    }

    // Reviews modal listeners
    const reviewsModal = document.getElementById('reviewsModal');
    const openReviewsModalBtn = document.getElementById('openReviewsModalBtn');
    const closeReviewsModal = document.getElementById('closeReviewsModal');
    if (openReviewsModalBtn) {
        openReviewsModalBtn.addEventListener('click', () => {
            if (reviewsModal) reviewsModal.style.display = 'flex';
        });
    }
    if (closeReviewsModal) {
        closeReviewsModal.addEventListener('click', () => {
            if (reviewsModal) reviewsModal.style.display = 'none';
        });
    }

    // Email modal sluiten
    const emailChooserModal = document.getElementById('emailChooserModal');
    const closeEmailChooserModal = document.getElementById('closeEmailChooserModal');
    if (closeEmailChooserModal) {
        closeEmailChooserModal.addEventListener('click', () => {
            if (emailChooserModal) emailChooserModal.style.display = 'none';
        });
    }

    // Modal vensters sluiten bij klikken op achtergrond
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) cartModal.style.display = 'none';
        if (e.target === detailModal) {
            stopModalVideos();
            detailModal.style.display = 'none';
        }
        if (e.target === emailChooserModal) emailChooserModal.style.display = 'none';
        if (e.target === reviewsModal) reviewsModal.style.display = 'none';
        if (e.target === cartChoiceModal) cartChoiceModal.style.display = 'none';
    });

    // Initialiseer winkelwagen op basis van opgeslagen data
    updateCartUI();
});

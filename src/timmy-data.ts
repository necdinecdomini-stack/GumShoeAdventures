import type { Difficulty } from "./types";

export type TimmyExchange = {
  speaker: string;
  text: string;
};

export type TimmySection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  exchanges?: TimmyExchange[];
};

export type TimmyReport = {
  key: "timmy_police" | "timmy_fire" | "timmy_insurance" | "timmy_sal" | "timmy_bianchi" | "timmy_agnes" | "timmy_tony";
  code: string;
  label: string;
  agency: string;
  title: string;
  meta: string[];
  sections: TimmySection[];
  stamp: string;
};

export const timmyReports: TimmyReport[] = [
  {
    key: "timmy_police",
    code: "01",
    label: "Polizeibericht",
    agency: "Polizeibehörde Neuheim — Kriminalpolizei",
    title: "Polizeibericht",
    meta: [
      "Aktenzeichen: NPD-2026-1187",
      "Leitender Ermittler: Detective Luis Reyes",
      "Datum des Berichts: 5. Juli 2026",
    ],
    sections: [
      {
        paragraphs: [
          "In der Nacht des 13. Juni 2026, gegen 2:15 Uhr, brach ein Feuer im Restaurant „Timmy Two-Shoes’ Italian Kitchen“ in der Beaumont Avenue 341 aus. Als die Feuerwehr um 2:28 Uhr eintraf, hatte sich das Feuer bereits im gesamten Gebäude ausgebreitet. Das Gebäude wurde inzwischen als unbewohnbar eingestuft. Das Restaurant war zum Zeitpunkt des Brandes geschlossen und leer. Es gab keine Verletzten.",
          "Die Untersuchung des Brandinspektors ergab, dass das Feuer absichtlich gelegt wurde. Die Frontscheibe des Restaurants war von außen eingeschlagen worden, und die Holzmöbel aus dem Gastraum — Stühle, Tische und Sitzbänke — waren in die Mitte des Raums gezogen und zusammengestapelt worden. Das Feuer ging von diesem Stapel aus. Es wurden keine nennenswerten Rückstände eines Brandbeschleunigers am Brandort gefunden, obwohl die Intensität des Feuers mögliche Spuren zerstört haben könnte. Der Brandinspektor kam zum Schluss, dass die Art und Weise, wie die Möbel angeordnet und angezündet worden waren, nicht mit einem Unfall vereinbar ist und dass es sich um eine vorsätzliche Brandstiftung handelt.",
          "Das Restaurant gehört zu gleichen Teilen Timothy „Timmy“ Bianchi (60 %) und Samuel „Sal“ Montenegro (40 %). Beide Personen wurden im Rahmen dieser Ermittlung befragt.",
          "Herr Bianchi gibt an, in der Brandnacht zu Hause bei seiner Frau Rosa gewesen zu sein. Frau Bianchi hat dies bestätigt. Herr Bianchi war bei der Befragung kooperativ und wirkte sichtlich betroffen über den Verlust des Restaurants. Er sagte, das Geschäft sei „gut gelaufen“ und er habe „keine Ahnung, warum jemand so etwas tun würde.“ Auf die Frage, ob er Drohungen erhalten oder Streit mit jemandem gehabt habe, sagte Herr Bianchi nein, obwohl er vor seiner Antwort zögerte. Es liegen derzeit keine Beweise vor, die Herrn Bianchi mit dem Brand in Verbindung bringen, und er wird nicht als Verdächtiger betrachtet.",
          "Die Ermittlung hat sich stattdessen auf Herrn Montenegro konzentriert. Eine Überprüfung seines Hintergrunds ergab, dass Herr Montenegro ein Vorstrafenregister aus seiner Jugend und seinem frühen Erwachsenenalter hat, darunter Verurteilungen wegen Diebstahl, Brandstiftung und Scheckbetrug. Obwohl diese Vergehen schon einige Jahre zurückliegen, ist die frühere Verurteilung wegen Brandstiftung für den aktuellen Fall unmittelbar relevant.",
          "Eine Überprüfung von Herrn Montenegros Finanzen ergab erhebliche persönliche Schulden. Er schuldet derzeit ungefähr 180.000 $ an verschiedene Gläubiger, wobei der Großteil vermutlich auf Glücksspiel zurückzuführen ist. Er hat außerdem bei mindestens zwei privaten Geldgebern Geld geliehen, deren Identität nicht bestätigt werden konnte. Obwohl das Restaurant selbst stetige Einnahmen erwirtschaftet, haben Herrn Montenegros Spielverluste seinen Anteil am Geschäftsgewinn durchgehend überstiegen. Er befindet sich nach allen Erkenntnissen in ernsthaften finanziellen Schwierigkeiten.",
          "Fünf Monate vor dem Brand, Ende Januar 2026, beantragte Herr Montenegro eine Erhöhung der Feuerversicherung des Restaurants von 500.000 $ auf 2.000.000 $. Er teilte der Versicherung mit, die Erhöhung sei eine Reaktion auf einen Vandalismusvorfall am Restaurant Anfang desselben Monats. Die Versicherung akzeptierte diese Begründung und genehmigte die neue Police. Die Prämien wurden in den folgenden Monaten pünktlich bezahlt. Allerdings ist das Ausmaß der Erhöhung — ein Anstieg um 300 % — bemerkenswert, insbesondere angesichts der nachfolgenden Ereignisse.",
          "In den Wochen vor dem Brand berichteten Nachbarn, dass Herr Montenegro und Herr Bianchi mindestens einmal lautstark stritten. Herr Montenegro wollte das Restaurant verkaufen. Herr Bianchi weigerte sich. Der Streit wurde von einem Nachbarn als heftig beschrieben, wobei Herr Montenegro gerufen habe, er „brauche das Geld jetzt.“",
          "In der Brandnacht behauptet Herr Montenegro, in einer Bar namens „The Bitter Pickle“ in der 5th Street gewesen zu sein. Der diensthabende Barkeeper erinnert sich nicht, ihn an diesem Abend gesehen zu haben. Kein anderer Gast oder Zeuge hat sich gemeldet, um seine Anwesenheit dort zu bestätigen. Sein Alibi bleibt unbestätigt.",
          "Zur eingeschlagenen Frontscheibe: Nach unserer Einschätzung wurde die Scheibe vom Verdächtigen eingeschlagen, um die Brandstiftung wie das Werk eines fremden Eindringlings aussehen zu lassen. Als Miteigentümer verfügt Herr Montenegro über Schlüssel zum Restaurant und hätte sich keinen Zugang verschaffen müssen. Der vorgetäuschte Einbruch entspricht dem Versuch, den Verdacht von einer Person mit legitimem Zugang zum Gebäude abzulenken.",
          "Zusammenfassend: Herr Montenegro hatte das Motiv — er ist hoch verschuldet und hätte von einer Versicherungsauszahlung in Höhe von 2.000.000 $ profitiert, für eine Police, deren Erhöhung er selbst veranlasst hatte. Er hatte die Mittel — er besitzt Schlüssel zum Restaurant und hat eine Vorstrafe wegen Brandstiftung. Er hatte die Gelegenheit — er kann seinen Aufenthaltsort in der Brandnacht nicht nachweisen. Die physischen Beweise, die finanziellen Beweise und Herrn Montenegros eigene Vorgeschichte weisen alle in dieselbe Richtung.",
          "Am 28. Juni 2026 wurde Samuel „Sal“ Montenegro festgenommen und wegen schwerer Brandstiftung und Versicherungsbetrug angeklagt. Er wartet derzeit auf seinen Prozess. Herr Montenegro beteuert seine Unschuld.",
          "Die Versicherungsgesellschaft Atlantic Mutual hatte den Anspruch über 2.000.000 $ vor Herrn Montenegros Festnahme genehmigt. Ohne die in diesem Bericht beschriebenen Ermittlungsergebnisse wäre die Auszahlung erfolgt.",
          "Dieser Fall gilt als abgeschlossen.",
        ],
      },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 01",
  },
  {
    key: "timmy_fire",
    code: "02",
    label: "Brandermittlung",
    agency: "Feuerwehr Neuheim — Büro des Brandinspektors",
    title: "Brandermittlungsbericht",
    meta: [
      "Aktenzeichen: FIR-2026-0441",
      "Ermittlerin: Captain Maria Chen, Brandermittlung",
      "Datum des Brandes: Samstag, 13. Juni 2026, ungefähr 2:15 Uhr",
      "Ort: 341 Beaumont Avenue — „Timmy Two-Shoes’ Italian Kitchen“",
      "Datum des Berichts: 18. Juni 2026",
    ],
    sections: [
      {
        paragraphs: [
          "Am 13. Juni 2026 wurde ich gerufen, um einen Brand in der Beaumont Avenue 341 zu untersuchen, einem eingeschossigen Backsteingebäude, das als Restaurant betrieben wird. Die Feuerwehr traf um 2:28 Uhr am Brandort ein. Zu diesem Zeitpunkt hatte sich das Feuer bereits über den Großteil des Gebäudes ausgebreitet. Das Gebäude wurde als unbewohnbar eingestuft.",
          "Das Restaurant war zum Zeitpunkt des Brandes geschlossen und leer. Es gab keine Opfer.",
          "Bei der Untersuchung des Brandorts habe ich festgestellt, dass das Feuer im Gastraum entstanden ist, nahe der Mitte des Raumes. Die Möbel aus dem Gastraum — Holztische, Stühle und Sitzbänke — waren aus ihrer normalen Anordnung entfernt und in die Mitte des Raumes gezogen worden, wo sie zusammengestapelt waren. Das Feuer begann in diesem Stapel. Das Brandmuster auf dem Boden und die Überreste der Möbel bestätigen dies als den Entstehungsort.",
          "Die Frontscheibe des Restaurants war zerbrochen. Glasscherben wurden auf dem Boden innerhalb des Gebäudes gefunden, was darauf hinweist, dass die Scheibe von außen eingeschlagen wurde. Dies spricht für ein gewaltsames Eindringen. An den hinteren oder seitlichen Türen gab es keine Anzeichen eines Einbruchs.",
          "Es wurden keine nennenswerten Rückstände eines Brandbeschleunigers am Brandort gefunden. Angesichts der Intensität und Dauer des Feuers ist es jedoch möglich, dass ein verwendeter Brandbeschleuniger vollständig verbrannt ist. Das Fehlen von Rückständen schließt die Verwendung eines Brandbeschleunigers nicht aus. Es ist ebenso möglich, dass die gestapelten Möbel direkt ohne Brandbeschleuniger angezündet wurden, da eine große Menge trockenes Holz auf einem konzentrierten Haufen nach dem Entzünden leicht brennt.",
          "Im Rahmen der Standarduntersuchung habe ich auch die Elektrik und die Küche des Restaurants überprüft. Die Verkabelung des Gebäudes stammt aus den 1970er Jahren und entspricht in mehreren Bereichen nicht dem aktuellen Standard. Der Sicherungskasten zeigte jedoch keine Anzeichen von Versagen, Überhitzung oder Kurzschluss. Die Verkabelung hat diesen Brand nicht verursacht. Die Dunstabzugshaube in der Küche wies Fettablagerungen auf, und Unterlagen des Restaurants zeigen, dass es vor etwa sechs Monaten einen kleinen Fettbrand gab. Dies ist für den aktuellen Brand nicht relevant, da das Feuer nicht in der Küche entstanden ist.",
        ],
      },
      {
        heading: "Ergebnis",
        paragraphs: [
          "Dieses Feuer wurde absichtlich gelegt. Jemand hat die Frontscheibe eingeschlagen, um sich Zugang zu verschaffen, die Möbel zu einem konzentrierten Haufen in der Mitte des Gastraums zusammengeschoben und angezündet. Es handelte sich nicht um einen Unfall, einen elektrischen Defekt oder einen Küchenbrand. Es war Brandstiftung.",
          "Die Feststellung der Identität der verantwortlichen Person oder Personen liegt außerhalb des Rahmens dieses Berichts.",
          "— Captain Maria Chen, Brandermittlung, Feuerwehr Neuheim",
        ],
      },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 02",
  },
  {
    key: "timmy_insurance",
    code: "03",
    label: "Versicherungsbericht",
    agency: "Atlantic Mutual Insurance Company — Abteilung für Schadensprüfung",
    title: "Versicherungsbericht",
    meta: [
      "Aktenzeichen: CLM-2026-77831",
      "Ermittler: James Whitfield, leitender Schadensprüfer",
      "Versicherte: Timothy Bianchi & Salvatore Montenegro",
      "Datum des Berichts: 25. Juni 2026",
    ],
    sections: [
      {
        paragraphs: [
          "Dieser Bericht betrifft einen Feuerversicherungsanspruch im Zusammenhang mit der Zerstörung des Geschäftsgebäudes in der Beaumont Avenue 341, Neuheim, betrieben als „Timmy Two-Shoes’ Italian Kitchen.“ Der Brand ereignete sich am 13. Juni 2026. Das Gebäude wurde als unbewohnbar eingestuft.",
          "Das Gebäude ist versichert unter Policennummer ATM-4419207. Die Police wurde ursprünglich 2019 mit einer Deckungssumme von 500.000 $ abgeschlossen. Ende Januar 2026 wurde die Deckung auf 2.000.000 $ erhöht. Der Antrag auf Erhöhung wurde von Salvatore Montenegro eingereicht, der als 40 % Miteigentümer des Geschäfts eingetragen ist. Herr Montenegro gab damals an, die Erhöhung sei eine Reaktion auf einen Vandalismusvorfall am Restaurant Anfang desselben Monats, bei dem die Frontscheibe eingeschlagen und ein Fahrzeug des anderen Miteigentümers, Herrn Bianchi, beschädigt wurde. Ein Polizeibericht zu diesem Vorfall liegt vor (NPD-2026-0089). Die erhöhte Prämie wurde in allen fünf Monaten seit der Anpassung vollständig und pünktlich bezahlt.",
          "Die Deckungssumme von 2.000.000 $ liegt im üblichen Rahmen für ein Geschäftsgebäude dieser Größe und Lage. Die Bau- und Renovierungskosten im Gebiet der Beaumont Avenue sind in den letzten Jahren gestiegen, und die aktualisierte Bewertung ist nicht unangemessen.",
          "Der Bericht des Brandinspektors (FIR-2026-0441) hat ergeben, dass das Feuer absichtlich gelegt wurde. Der Bericht beschreibt ein gewaltsames Eindringen durch die Frontscheibe und Möbel, die in der Mitte des Gastraums umgestellt und gestapelt wurden, um als Brennmaterial zu dienen. Es wurden keine Rückstände eines Brandbeschleunigers gefunden. Der Brandinspektor hat das Feuer als Brandstiftung eingestuft.",
          "Die Frage, die dieses Büro zu klären hat, ist, ob die Feststellung der Brandstiftung die Gültigkeit des Anspruchs beeinflusst.",
          "Die Police von Herrn Bianchi und Herrn Montenegro deckt Brandschäden am versicherten Gebäude ab. Gemäß den Bedingungen der Police ist ein Brand, der durch eine Straftat verursacht wird, gedeckt, es sei denn, es kann nachgewiesen werden, dass der Versicherungsnehmer oder die Versicherungsnehmer selbst die Tat begangen oder veranlasst haben. Brandstiftung durch eine dritte Partei — ein Einbruch, ein Akt des Vandalismus oder eine andere externe Ursache — macht die Police nicht ungültig. Der Versicherungsnehmer ist in einem solchen Fall das Opfer, nicht der Täter.",
          "Zum Zeitpunkt dieses Berichts wurden diesem Büro keine Beweise vorgelegt, die darauf hinweisen, dass Herr Bianchi oder Herr Montenegro an der Brandstiftung beteiligt waren. Es wurden keine Strafanzeigen erstattet. Der Bericht des Brandinspektors identifiziert das Feuer als Brandstiftung, benennt aber keinen Verdächtigen.",
          "Es ist nicht die Aufgabe dieses Büros, eine strafrechtliche Ermittlung durchzuführen. Unsere Aufgabe ist es zu beurteilen, ob der Anspruch gemäß den Bedingungen der Police gültig ist. Auf Grundlage der derzeit verfügbaren Informationen war die Police in Kraft, die Prämien waren aktuell, die Deckungssumme ist angemessen, und die Erhöhung erfolgte als Reaktion auf einen dokumentierten Vorfall. Es liegen uns keine Beweise vor, dass die Versicherungsnehmer in schlechter Absicht gehandelt haben.",
        ],
      },
      {
        heading: "Empfehlung",
        paragraphs: [
          "Der Anspruch erscheint gültig. Ich empfehle, dass Atlantic Mutual mit der Bearbeitung des Anspruchs in Höhe von 2.000.000 $ fortfährt, vorbehaltlich einer abschließenden Standardprüfung und möglicher Erkenntnisse aus der laufenden polizeilichen Ermittlung.",
          "Sollte die polizeiliche Ermittlung Beweise erbringen, dass einer der Versicherungsnehmer an der Brandstiftung beteiligt war, müsste diese Empfehlung überprüft werden.",
          "— James Whitfield, Leitender Schadensprüfer, Atlantic Mutual Insurance Company",
        ],
      },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 03",
  },
  {
    key: "timmy_sal",
    code: "04",
    label: "Sal Montenegro",
    agency: "Polizeibehörde Neuheim — Kriminalpolizei",
    title: "Vernehmungsprotokoll — Salvatore „Sal“ Montenegro",
    meta: [
      "Aktenzeichen: NPD-2026-1187",
      "Vernehmung durchgeführt von: Detective Luis Reyes",
      "Datum: 17. Juni 2026",
      "Ort: Polizeibehörde Neuheim, Vernehmungsraum 2",
    ],
    sections: [
      {
        exchanges: [
          { speaker: "Det. Reyes", text: "Nennen Sie bitte für das Protokoll Ihren vollständigen Namen und Ihre Beziehung zum Gebäude in der Beaumont Avenue 341." },
          { speaker: "Montenegro", text: "Salvatore Montenegro. Sal. Mir gehören vierzig Prozent des Restaurants. Der Rest gehört Timmy." },
          { speaker: "Det. Reyes", text: "Wo waren Sie in der Nacht des 13. Juni?" },
          { speaker: "Montenegro", text: "Ich war im Bitter Pickle. Eine Bar in der 5th Street. Ich gehe da fast jeden Abend hin, nachdem wir den Laden dichtmachen." },
          { speaker: "Det. Reyes", text: "Der Barkeeper, der in der Nacht Dienst hatte, kann sich nicht erinnern, Sie gesehen zu haben." },
          { speaker: "Montenegro", text: "Es ist eine Bar, Detective. Da ist es dunkel und laut und der Typ schenkt Drinks für fünfzig Leute aus. Ich saß hinten. Ich hatte ein paar Bier. Ich habe mich nicht unterhalten. Vielleicht hat er mich gesehen, vielleicht nicht — das heißt nicht, dass ich nicht da war." },
          { speaker: "Det. Reyes", text: "Kann jemand anderes bestätigen, dass Sie dort waren?" },
          { speaker: "Montenegro", text: "Ich bin mit niemandem hingegangen. Ich war allein. Ich gehe fast jeden Abend allein hin." },
          { speaker: "Det. Reyes", text: "Reden wir über die Versicherung. Vor fünf Monaten haben Sie die Feuerversicherung des Restaurants von fünfhunderttausend auf zwei Millionen Dollar erhöht. Das ist eine erhebliche Erhöhung." },
          { speaker: "Montenegro", text: "Ja, weil jemand unsere Frontscheibe eingeschlagen und Timmys Auto zerkratzt hat. Erinnern Sie sich daran? Ich habe die Anzeige erstattet. Danach dachte ich, wir sollten besseren Versicherungsschutz haben. Das ist nicht verdächtig, das ist gesunder Menschenverstand." },
          { speaker: "Det. Reyes", text: "Manche Leute würden sagen, der Zeitpunkt sieht günstig aus." },
          { speaker: "Montenegro", text: "Günstig? Jemand hat unser Restaurant beschädigt. Was hätte ich tun sollen, warten, bis sie zurückkommen und etwas Schlimmeres machen? Ich habe die Versicherung erhöht, weil ich mir genau vor so etwas Sorgen gemacht habe, was dann auch passiert ist. Wenn überhaupt, dann hatte ich Recht damit." },
          { speaker: "Det. Reyes", text: "Sie haben erhebliche persönliche Schulden. Ungefähr hunderachtzigtausend Dollar, das meiste davon vom Glücksspiel. Das ist viel Geld." },
          { speaker: "Montenegro", text: "Ich werde hier nicht sitzen und so tun, als hätte ich kein Problem. Ja, ich spiele. Ja, ich habe Schulden. Aber das Restaurant macht gutes Geld. Regelmäßiges Geld. Ich habe meine Schulden abgezahlt. Langsam, aber ich zahle sie ab. Ich musste den Laden nicht niederbrennen für eine Versicherungsauszahlung. Das Geschäft war mein Einkommen. Warum sollte ich mein eigenes Einkommen zerstören?" },
          { speaker: "Det. Reyes", text: "Weil zwei Millionen Dollar Ihre Schulden mehrfach tilgen würden." },
          { speaker: "Montenegro", text: "Und dann? Dann habe ich kein Restaurant, kein Einkommen, kein Geschäft, und irgendwann ist das Geld aufgebraucht und ich stehe wieder vor dem Nichts. Ich bin ein Spieler, Detective, kein Idiot." },
          { speaker: "Det. Reyes", text: "Sie haben auch ein Vorstrafenregister. Diebstahl. Scheckbetrug. Und Brandstiftung." },
          { speaker: "Montenegro", text: "Als ich neunzehn war. Ich war ein Kind. Ich hing mit den falschen Leuten ab und habe dumme Sachen gemacht. Das ist über fünfzehn Jahre her. Seitdem war ich nicht mehr in Schwierigkeiten. Wenn Sie mich danach beurteilen wollen, wer ich mit neunzehn war, bitte, aber das bin ich nicht mehr." },
          { speaker: "Det. Reyes", text: "Es zeigt, dass Sie wissen, wie man ein Feuer legt." },
          { speaker: "Montenegro", text: "Das ist genau mein Punkt. Ich weiß, wie Feuer funktionieren. Ich bin seit vierzehn Jahren im Gastronomiegeschäft. Wenn ich das Versicherungsgeld hätte wollen — und das wollte ich nicht — aber wenn, dann fängt das Feuer in der Küche an. Fettbrand. Alte Kabel kurzschließen hinter der Fritteuse. Eine Pfanne mit Öl auf dem Herd stehen gelassen. So brennt ein Restaurant ab und niemand stellt Fragen. Niemand stapelt Möbel in der Mitte des Gastraums und klettert durch ein eingeschlagenes Fenster. Das ist kein Versicherungsbetrug. Das ist etwas anderes." },
          { speaker: "Det. Reyes", text: "Oder es ist jemand, der versucht, es wie etwas anderes aussehen zu lassen." },
          { speaker: "Montenegro", text: "Ich habe Schlüssel, Detective. Ich habe Schlüssel für die Vordertür, die Hintertür und das Büro. Wenn ich nachts um drei in dieses Restaurant hätte gehen wollen, hätte ich meine Schlüssel benutzt und wäre reingegangen, und niemand hätte je gewusst, dass ich da war. Warum sollte ich die Scheibe einschlagen? Um mehr Beweise zu schaffen? Um es offensichtlicher zu machen? Das ergibt keinen Sinn." },
          { speaker: "Det. Reyes", text: "Es ergibt Sinn, wenn man es wie einen Einbruch aussehen lassen will." },
          { speaker: "Montenegro", text: "Es ergibt Sinn, wenn es tatsächlich ein Einbruch war. Von jemandem, der keine Schlüssel hatte. Haben Sie das in Betracht gezogen?" },
          { speaker: "Det. Reyes", text: "Wir ziehen alle Möglichkeiten in Betracht." },
          { speaker: "Montenegro", text: "Tun Sie das? Denn es sieht so aus, als hätten Sie sich entschieden, dass ich es war, bevor Sie diesen Raum betreten haben." },
          { speaker: "Det. Reyes", text: "Möchten Sie noch etwas hinzufügen?" },
          { speaker: "Montenegro", text: "Ja. Ich war es nicht. Jemand ist in unser Restaurant eingebrochen, hat die Möbel aufgestapelt und angezündet. Das ist kein Betrug. Das ist eine Botschaft. Und anstatt herauszufinden, wer sie geschickt hat, sitzen Sie hier und reden mit mir." },
          { speaker: "Det. Reyes", text: "Die Vernehmung wird um 15:47 Uhr beendet." },
        ],
      },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 04",
  },
  {
    key: "timmy_bianchi",
    code: "05",
    label: "Timmy Bianchi",
    agency: "Polizeibehörde Neuheim — Kriminalpolizei",
    title: "Vernehmungsprotokoll — Timothy „Timmy“ Bianchi",
    meta: [
      "Aktenzeichen: NPD-2026-1187",
      "Vernehmung durchgeführt von: Detective Luis Reyes",
      "Datum: 15. Juni 2026",
      "Ort: Polizeibehörde Neuheim, Vernehmungsraum 2",
    ],
    sections: [
      {
        exchanges: [
          { speaker: "Det. Reyes", text: "Nennen Sie bitte für das Protokoll Ihren vollständigen Namen und Ihre Beziehung zum Gebäude in der Beaumont Avenue 341." },
          { speaker: "Bianchi", text: "Timothy Bianchi. Mir gehört das Restaurant. Sechzig Prozent. Sal gehört der Rest." },
          { speaker: "Det. Reyes", text: "Wo waren Sie in der Nacht des 13. Juni?" },
          { speaker: "Bianchi", text: "Zu Hause. Bei meiner Frau Rosa. Wir sind gegen elf ins Bett gegangen. Den Anruf wegen des Brandes habe ich kurz nach halb drei von der Alarmfirma bekommen." },
          { speaker: "Det. Reyes", text: "Und Ihre Frau kann das bestätigen?" },
          { speaker: "Bianchi", text: "Ja. Sie war da. Sie wird Ihnen dasselbe sagen." },
          { speaker: "Det. Reyes", text: "Wie lief das Geschäft?" },
          { speaker: "Bianchi", text: "Gut. Gut. Es lief gut." },
          { speaker: "Det. Reyes", text: "Die Finanzunterlagen zeigen regelmäßige Einnahmen. Keine größeren Probleme?" },
          { speaker: "Bianchi", text: "Nein. Keine Probleme. Wie gesagt, es lief gut." },
          { speaker: "Det. Reyes", text: "Und Ihr Geschäftspartner Sal — wie war das Verhältnis zwischen Ihnen beiden?" },
          { speaker: "Bianchi", text: "Gut." },
          { speaker: "Det. Reyes", text: "Nachbarn sagen, Sie haben sich ein paar Wochen vor dem Brand laut gestritten. Sal wollte das Restaurant verkaufen." },
          { speaker: "Bianchi", text: "Wir waren da unterschiedlicher Meinung. Das ist alles. Geschäftspartner sind manchmal unterschiedlicher Meinung. Es war nicht — hören Sie, Sal hat seine Probleme, das weiß jeder. Er wollte verkaufen, weil er Geld brauchte. Ich wollte nicht verkaufen, weil es mein Restaurant ist. Ich habe es aufgebaut. Wir haben uns darüber gestritten. Das war’s." },
          { speaker: "Det. Reyes", text: "Hat Sal Sie jemals bedroht?" },
          { speaker: "Bianchi", text: "Nein. So ist Sal nicht. Er hat Probleme, aber er ist kein gewalttätiger Mensch." },
          { speaker: "Det. Reyes", text: "Ich möchte Sie zu etwas anderem befragen. Im Januar dieses Jahres wurde die Frontscheibe Ihres Restaurants eingeschlagen und die Worte „pay up“ wurden in die Motorhaube Ihres Autos geritzt. Sie haben es als Vandalismus gemeldet. Sie sagten dem Beamten, es seien „wahrscheinlich Kinder“ gewesen." },
          { speaker: "Bianchi", text: "Ja. Das dachte ich." },
          { speaker: "Det. Reyes", text: "„Pay up“ ist eine seltsame Sache, die Kinder schreiben würden." },
          { speaker: "Bianchi", text: "[Pause] Kinder schreiben alle möglichen Sachen." },
          { speaker: "Det. Reyes", text: "Hat jemand Sie aufgefordert, etwas zu zahlen? Irgendwelche Schulden? Irgendwelche Streitigkeiten mit jemandem?" },
          { speaker: "Bianchi", text: "Nein." },
          { speaker: "Det. Reyes", text: "Sie haben gezögert." },
          { speaker: "Bianchi", text: "Ich habe nicht gezögert. Die Antwort ist nein." },
          { speaker: "Det. Reyes", text: "Herr Bianchi, haben Sie im letzten Jahr Drohungen erhalten? Telefonanrufe, Besuche, Briefe, irgendetwas?" },
          { speaker: "Bianchi", text: "[lange Pause] Nein. Nichts dergleichen." },
          { speaker: "Det. Reyes", text: "Sie scheinen unsicher zu sein." },
          { speaker: "Bianchi", text: "Ich bin nicht unsicher. Ich — es gab ein paar Anrufe. Vor ein paar Monaten. Jemand hat im Restaurant angerufen und nichts gesagt, einfach Stille am Telefon. Es ist vielleicht vier- oder fünfmal passiert. Es war seltsam, aber ich dachte, es war eine falsche Nummer oder so." },
          { speaker: "Det. Reyes", text: "Haben Sie es gemeldet?" },
          { speaker: "Bianchi", text: "Nein. Was hätte ich melden sollen? Dass jemand nicht am Telefon redet? Es hat nach einer Weile aufgehört. Ich habe es vergessen." },
          { speaker: "Det. Reyes", text: "Sonst noch etwas Ungewöhnliches? Besucher? Leute, die außerhalb der normalen Zeiten zum Restaurant kamen?" },
          { speaker: "Bianchi", text: "Nein. Nur die üblichen Gäste." },
          { speaker: "Det. Reyes", text: "Gibt es jemanden, der Ihrem Geschäft schaden oder Ihnen etwas antun wollen könnte?" },
          { speaker: "Bianchi", text: "[Pause] Nein. Ich habe keine Feinde. Ich betreibe ein Restaurant. Ich mache Pasta. Ich weiß nicht, warum jemand so etwas tun würde." },
          { speaker: "Det. Reyes", text: "Gibt es noch etwas, das Sie uns mitteilen möchten?" },
          { speaker: "Bianchi", text: "Nur, dass ich wissen will, wer das getan hat. Das Restaurant war mein Leben. Zwanzig Jahre in der Branche, zehn Jahre an diesem Standort. Es war alles, was ich hatte." },
          { speaker: "Det. Reyes", text: "Wir werden unser Bestes tun, Herr Bianchi. Vernehmung beendet um 11:20 Uhr." },
        ],
      },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 05",
  },
  {
    key: "timmy_agnes",
    code: "06",
    label: "Agnes Kowalski",
    agency: "Polizeibehörde Neuheim — Zeugenaussage",
    title: "Zeugenaussage — Agnes Kowalski",
    meta: [
      "Aktenzeichen: NPD-2026-1187",
      "Zeugin: Agnes Kowalski, 71 Jahre alt",
      "Adresse: 338 Beaumont Avenue (gegenüber vom Restaurant)",
      "Aufgenommen von: Officer Janet Park",
      "Datum: 21. Juni 2026",
    ],
    sections: [
      {
        paragraphs: [
          "Ich lebe seit zweiunddreißig Jahren in der Beaumont Avenue. Ich wohne genau gegenüber von Timmys Restaurant. Ich kenne Timmy, seit er den Laden aufgemacht hat — ein guter Mann, ein fleißiger Arbeiter. Sonntags hat er mir immer Reste vorbeigebracht. Ich kann nicht fassen, was passiert ist.",
          "In der Nacht des Brandes bin ich von den Sirenen aufgewacht. Aber wenn ich jetzt zurückdenke, habe ich früher in der Nacht tatsächlich etwas gesehen.",
          "Ich habe Schlafprobleme. Die meisten Nächte bin ich irgendwann wach und sitze am Fenster. In der Nacht saß ich gegen zwei Uhr morgens am Fenster, vielleicht ein bisschen früher. Ich sah ein Auto, das ich nicht kannte — eine große, dunkle Limousine, schwarz oder vielleicht dunkelblau — die auf der Straße geparkt war, ein Stück hinter dem Restaurant. Das war kein Auto aus der Nachbarschaft. Ich kenne die meisten Autos in dieser Straße und dieses gehörte nicht dazu.",
          "Ich sah, wie ein Mann auf der Fahrerseite ausstieg. Er trug dunkle Kleidung. Ich konnte sein Gesicht nicht sehen — es war zu dunkel und er war auf der anderen Straßenseite. Er ging zum Restaurant. Ob er reingegangen ist, weiß ich nicht. Ich habe kurz weggeschaut, und als ich wieder hinschaute, stand das Auto noch da, aber den Mann habe ich nicht mehr gesehen. Vielleicht zehn oder fünfzehn Minuten später hörte ich ein Geräusch — vielleicht brechendes Glas, ich bin mir nicht sicher — und dann glaube ich, dass ich Rauch gerochen habe, aber sicher war ich mir nicht. Ich bin wieder ins Bett gegangen. Die Sirenen haben mich später aufgeweckt.",
          "Jetzt möchte ich noch etwas erwähnen. In den Wochen vor dem Brand — vielleicht im letzten Monat oder so — sind mir einige Männer aufgefallen, die zum Restaurant kamen. Keine normalen Gäste. Das waren grob aussehende Männer in teuren Anzügen. Feinen Anzügen. Sie kamen vielleicht drei- oder viermal, soweit ich es gesehen habe, immer am Abend, und sie blieben nie lange. Einmal, vielleicht zwei Wochen vor dem Brand, hatte ich mein Fenster offen und konnte laute Stimmen hören. Sie schrien auf Italienisch. Ich konnte auch Timmys Stimme hören, ebenfalls auf Italienisch, aber er klang aufgeregt. Verängstigt sogar. Sie gingen nach ungefähr zehn Minuten. Ich dachte, es geht mich nichts an, also habe ich niemandem etwas gesagt.",
          "Noch eine Sache. Vor ein paar Tagen — vielleicht vier oder fünf Tage nach dem Brand — war ich draußen und habe meine Pflanzen gegossen. Timmy war auf der anderen Straßenseite mit Herrn Petrov vom Eisenwarengeschäft. Sie schauten sich das Gebäude an. Ich glaube, Timmy redete davon, aufzuräumen, was noch zu retten sei, solche Sachen. Ich habe nicht absichtlich zugehört, aber sie standen direkt da und ich hörte, wie Timmy so etwas sagte wie — ich versuche mich an die Worte zu erinnern — er sagte: „Naja, jetzt ist es hin. Ich wünschte, Sal und ich wären selbst auf die Idee gekommen — dann hätten wir wenigstens das Versicherungsgeld dafür.“ Und dann hat er gelacht und so etwas gesagt wie: „Sal hätte das wahrscheinlich auch hingekriegt. Was würde ich überhaupt mit ein paar Millionen Dollar machen? Zehn Millionen, das wäre was, davon könnte man sich zur Ruhe setzen.“ Und Herr Petrov hat auch gelacht. Ich fand es seltsam, darüber Witze zu machen. Sein Restaurant war gerade abgebrannt und er hat gelacht. Aber vielleicht gehen Männer so mit solchen Dingen um. Ich weiß es nicht.",
          "Das ist alles, was ich gesehen und gehört habe.",
          "— Agnes Kowalski",
        ],
      },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 06",
  },
  {
    key: "timmy_tony",
    code: "07",
    label: "Tony Marchetti",
    agency: "Polizeibehörde Neuheim — Zeugenaussage",
    title: "Zeugenaussage — Tony Marchetti",
    meta: [
      "Aktenzeichen: NPD-2026-1187",
      "Zeuge: Tony Marchetti, 54 Jahre alt",
      "Adresse / Geschäft: 343 Beaumont Avenue — „Tony’s Classic Barbershop“",
      "Aufgenommen von: Officer Janet Park",
      "Datum: 15. Juni 2026",
    ],
    sections: [
      {
        paragraphs: [
          "Klar, ja, ich gebe eine Aussage. Ich hab nichts zu verbergen.",
          "Erstmal — das Feuer hat meine Ostwand beschädigt. Rauchschäden, die Farbe ist im Eimer, die ganze Seite vom Laden riecht nach Asche. Meine Versicherung kümmert sich drum, aber es wird Wochen dauern, bis ich den Teil vom Laden wieder nutzen kann. Also ja, ich bin nicht gerade begeistert von der Sache.",
          "Aber hören Sie. Ich habe meinen Friseursalon seit neunzehn Jahren in der Beaumont Avenue. Neunzehn Jahre. Ich kenne diese Straße. Ich kenne diese Nachbarschaft. Ich weiß, wie die Dinge hier laufen.",
          "Manchmal hat man ein nettes kleines Geschäft, und gewisse Leute interessieren sich dafür. Sie kommen vorbei. Sehr höflich. Sehr freundlich. Sie erzählen einem, dass die Nachbarschaft unberechenbar sein kann, dass Sachen passieren — Unfälle, Einbrüche, Brände — und dass sie für eine angemessene Gebühr dafür sorgen können, dass das Geschäft sicher bleibt. Sie sind sehr professionell dabei. Verstehen Sie, was ich meine?",
          "Ich sage nicht, dass das bei Timmy passiert ist. Ich weiß nicht, was bei Timmy passiert ist. Das ist nicht meine Angelegenheit. Ich kümmere mich um meinen eigenen Kram und würde jedem anderen raten, dasselbe zu tun.",
          "Aber so viel sage ich: In dieser Nachbarschaft ist es klug, ein bisschen extra für besonderen Schutz zu bezahlen. Manche Leute zahlen und ihre Fenster gehen nie zu Bruch und ihre Autos werden nie zerkratzt und sie schlafen nachts gut. Manche Leute zahlen nicht und — naja. Sachen passieren. So ist das eben. Ich mache kein Urteil. Ich sage Ihnen einfach, wie es ist.",
          "Ich? Ich hatte nie ein einziges Problem. Nicht einmal in neunzehn Jahren. Keine eingeschlagene Scheibe, kein zerkratztes Auto, kein Brand, kein Einbruch, nichts. Neunzehn Jahre und nicht ein Vorfall. Machen Sie daraus, was Sie wollen.",
          "Timmy ist ein guter Mann. Stolz. Sehr stolz. Die Art Mensch, der sich nicht gern sagen lässt, was er zu tun hat. Das habe ich immer an ihm gemocht. Aber manchmal kostet Stolz mehr als Vernunft.",
          "Ob ich in der Brandnacht etwas gesehen habe? Nein. Ich wohne in Greenfield, nicht über dem Laden. Ich war zu Hause und habe geschlafen. Ich habe es erst am nächsten Morgen erfahren, als ich aufmachen wollte und die Feuerwehr gesehen habe.",
          "Das ist alles, was ich zu sagen habe.",
          "— Tony Marchetti",
        ],
      },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 07",
  },
];

export const timmyQuestions = [
  "Wo begann das Feuer, und wie wurde es gelegt? Was wurde als Brennmaterial benutzt?",
  "Welche Hinweise machen Sal Montenegro zum Hauptverdächtigen der Polizei? Nenne mindestens vier.",
  "In seiner Vernehmung nennt Sal mehrere Gründe, warum er es nicht gewesen sein kann. Welche findest du am überzeugendsten, und warum?",
  "Was deutet Tony Marchetti an, ohne es direkt zu sagen? Was könnte das mit dem Brand zu tun haben?",
  "Agnes Kowalski sah in den Wochen vor dem Brand Männer im Restaurant. Was beobachtete sie, und warum könnte das wichtig sein?",
  "Bei seiner Vernehmung verschweigt Timmy Bianchi offenbar etwas. Welche Anzeichen gibt es dafür, und was könnte er verbergen?",
  "Wie hängt der Vandalismus vom Januar — besonders die Worte „PAY UP“ — mit dem späteren Brand zusammen?",
  "Warum ist es wichtig, dass die Frontscheibe von außen eingeschlagen wurde? Welche verschiedenen Erklärungen gibt es dafür?",
  "Agnes hörte, wie Timmy nach dem Brand einen Witz über das Versicherungsgeld machte. Ist das verdächtig? Begründe deine Antwort.",
  "Schreibe dein Urteil in 120–180 Wörtern. Wer hat das Restaurant wahrscheinlich angezündet, und warum? Benutze mindestens vier konkrete Hinweise aus den Berichten.",
];

export const timmyReportsByDifficulty: Record<Difficulty, TimmyReport[]> = {
  "gumshoe": timmyReports,
  "officer": timmyReports,
  "lead-investigator": timmyReports,
};

export const timmyQuestionsByDifficulty: Record<Difficulty, string[]> = {
  "gumshoe": timmyQuestions,
  "officer": timmyQuestions,
  "lead-investigator": timmyQuestions,
};

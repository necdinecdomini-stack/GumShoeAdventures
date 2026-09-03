import type { MagyarReport } from "./magyarosaurus-data";
import type { Difficulty } from "./types";

export const magyarReportsDe: MagyarReport[] = [
  {
    key: "magyar_police",
    code: "01",
    label: "Polizei- und Tatortbericht",
    agency: "Polizeibehörde Neuheim — Dezernat für schwere Eigentumsdelikte",
    title: "Erster Polizei- und Tatortbericht",
    meta: [
      "Ort: Zentrale Fossiliengalerie, Neuheimer Naturkundemuseum",
      "Entdeckt: Dienstag, 06:40 Uhr",
      "Mutmaßlicher Tatzeitraum: Sonntag, 18:05 Uhr, bis Dienstag, 06:40 Uhr",
      "Berichterstattende Beamtin: Kriminalhauptkommissarin Marta Weiss",
    ],
    sections: [
      {
        paragraphs: [
          "Um 06:40 Uhr am Dienstag betrat die Museumsreinigungskraft Clara Hoff die Zentrale Fossiliengalerie und fand die Hauptausstellungsplattform leer vor. Das Metalltragegestell stand noch an seinem Platz, doch das vollständig montierte Skelett von Magyarosaurus Dacus war verschwunden. Hoff informierte den Nachtportier des Museums, der Direktor Tachkis verständigte. Um 06:48 Uhr wurde die Polizei gerufen.",
          "Das Museum beschreibt das verschwundene Exemplar als das einzige vollständige Magyarosaurus-Skelett der Welt. Magyarosaurus gehörte zur Familie der Sauropoden: derselben großen Familie wie die berühmten langhalsigen Riesen, war jedoch wesentlich kleiner. Das Museum hat noch keinen endgültigen Marktwert genannt. Der Versicherungswert beträgt 1,8 Millionen Kronen. Der wissenschaftliche und kulturelle Wert könnte höher sein.",
          "Das Museum schloss am Sonntag um 18:00 Uhr für Besucher und bleibt montags normalerweise geschlossen. Eine Galerieaufsicht vermerkte das Skelett bei der letzten Kontrolle am Sonntag gegen 17:45 Uhr als vorhanden. Kein Museumsmitarbeiter gibt an, es danach gesehen zu haben. Montags betritt das Reinigungspersonal die Fossiliengalerie nicht.",
          "Es gibt keine Spuren eines gewaltsamen Eindringens. Türen, Schlösser und erreichbare Fenster weisen keine neuen Schäden auf. Das Alarm- und Kameraaufzeichnungssystem wurde am Montag um 02:17 Uhr über ein autorisiertes Sicherheitskonto gelöscht. Es blieb deaktiviert, bis der Nachtportier das System am Dienstag um 06:12 Uhr neu startete, nachdem ihm eine Warnleuchte aufgefallen war. Weder die Polizei noch der private Alarmdienst des Museums erhielten eine Meldung. Aus dem deaktivierten Zeitraum sind keine brauchbaren Kameraaufzeichnungen erhalten.",
          "Die Diebe scheinen das Fossil vorsichtig entfernt zu haben. Das Hauptgestell aus Stahl wurde nicht beschädigt. Zwölf Halterungen waren geöffnet worden, und mehrere kleine Sicherungsstifte lagen gesammelt auf der Plattform, statt fallen gelassen worden zu sein. Die Halterungen tragen schwache Nummern von eins bis zwölf. Das deutet darauf hin, dass jemand wusste, wie die Ausstellung zusammengesetzt war. Unter Halterung sieben wurde ein blassgelber Splitter gefunden. Das Labor identifizierte ihn als modernes Epoxidharz — einen harten Kunststoff, der zur Reparatur von Fossilien und zur Befestigung in Ausstellungen verwendet wird.",
          "Die westliche Ladetür wurde um 02:31 Uhr von innen geöffnet und um 03:46 Uhr geschlossen. Da die Kameras nicht aufzeichneten, ist unbekannt, wie viele Personen und Fahrzeuge beteiligt waren. Streifenbeamte, Verkehrspolizei und Straßenkontrollstellen erhielten zwischen Sonntagabend und Dienstagmorgen keine Meldung über einen ungewöhnlichen Lastwagen oder eine übergroße Ladung.",
          "Die Polizei hat drei Personen von unmittelbarem Interesse ermittelt. Die Anthropologin Dr. Krisztina Green führt einen öffentlichen Streit mit Direktor Tachkis über die Einkaufspraxis des Museums und den Besitz umstrittener Funde. Der frühere Sicherheitschef James John Jameson wurde vor drei Wochen entlassen. Sein Sicherheitskonto wurde nie deaktiviert, und Zeugen hörten ihn sagen, er werde \u201ETachkis dafür bezahlen lassen\u201C. Direktor Tachkis kontrollierte die Galerie, die Erwerbsunterlagen und den leitenden Zugang zum Museum.",
          "Jede Person kann über erhebliche Teile des Tatzeitraums Rechenschaft ablegen. Keine von ihnen wurde von Sonntagabend bis Dienstagmorgen durchgehend beobachtet. Derzeit verfügt die Polizei nicht über genügend Beweise, um jemanden anzuklagen. Die Ermittlungen dauern an.",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / BERICHT 01",
  },
  {
    key: "magyar_security",
    code: "02",
    label: "Untersuchung des Sicherheitssystems",
    agency: "Nils Kappel, Labor für Gebäudesicherheit",
    title: "Untersuchung des Sicherheitssystems",
    meta: [
      "System: Vigilant 6, integriertes Alarm- und Kameraaufzeichnungssystem",
      "Verwendetes Konto: JAMESON-JJ-1, Leitender Sicherheitsadministrator",
      "Untersuchung abgeschlossen: Mittwoch, 14:20 Uhr",
    ],
    sections: [
      {
        paragraphs: [
          "Die Sicherheitsausrüstung des Museums funktionierte vor dem Vorfall ordnungsgemäß. Ich fand weder beschädigte Kabel noch ausgefallene Kameras, durchgebrannte Sicherungen oder defekte Alarmsensoren. Es handelte sich nicht um einen allgemeinen Systemausfall.",
          "Am Montag um 02:12 Uhr wurde am Personaleingang ein gültiger mechanischer Schlüssel akzeptiert. Um 02:17 Uhr gab jemand am Sicherheitsterminal im Keller den Benutzernamen JAMESON-JJ-1 und das korrekte Administratorpasswort ein. Der Benutzer wählte den Wartungsmodus, setzte die Alarmübermittlung aus und stoppte das Schreiben neuer Kameraaufnahmen in das Archiv. Diese drei Schritte wurden in der richtigen Reihenfolge ausgeführt. Bei einer anderen Reihenfolge hätte der Alarmdienst automatisch eine Warnung erhalten.",
          "Das Konto gehörte dem früheren Sicherheitschef James John Jameson. Sein Arbeitsverhältnis endete drei Wochen vor dem Diebstahl, doch das Konto blieb aktiv. Das System zeichnet normalerweise jeden Zugriff auf die Alarmanlage auf; sämtliche Dateien wurden jedoch gelöscht. Daher lässt sich nicht feststellen, wer die Aufnahmen gelöscht hat.",
          "Leitende Sicherheitspasswörter werden alle neunzig Tage geändert. Die Museumsrichtlinien verlangen außerdem, dass eine versiegelte Notfallkopie jedes Administratorpassworts im Safe des Direktors aufbewahrt wird. Dadurch kann der Direktor das System wiederherstellen, falls ein Sicherheitsbeamter abwesend oder verletzt ist. Laut Sicherheitsregister wurde Jamesons damaliges Passwort sechs Wochen vor seiner Entlassung in einen solchen Umschlag gelegt. Dem Labor wurde nicht gestattet, das Büro oder den Safe von Direktor Tachkis zu durchsuchen.",
          "Die Person am Terminal verstand das System. Der Wartungsmodus ist über die normale Wachoberfläche nicht erreichbar. Er erfordert ein zweites Menü und eine gesonderte Bestätigung. Das Kameraarchiv wurde gestoppt, ohne die Live-Monitore auszuschalten. Eine Wachperson, die nur kurz auf den Bildschirm blickte, hätte daher glauben können, die Aufzeichnung laufe weiter. Das war fachkundige Arbeit.",
          "Am Dienstag um 06:12 Uhr startete der Nachtportier die Kameraaufzeichnung neu, stellte die Alarmübermittlung jedoch nicht wieder her. Polizeitechniker stellten um 07:03 Uhr den vollständigen Betrieb wieder her. Es konnten keine gelöschten Aufnahmen wiederhergestellt werden, da während des fehlenden Zeitraums keine Aufnahmen erstellt worden waren.",
          "Meine Schlussfolgerung lautet, dass das System absichtlich von jemandem deaktiviert wurde, der sowohl über gültige Sicherheitsinformationen als auch über genaue Kenntnisse der Museumsabläufe verfügte. Die vorhandenen elektronischen Beweise können diese Person nicht identifizieren.",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / BERICHT 02",
  },
  {
    key: "magyar_acquisition",
    code: "03",
    label: "Erwerbs- und Lieferakte",
    agency: "Neuheimer Naturkundemuseum — Registerkopien",
    title: "Erwerbs- und Lieferakte",
    meta: [
      "Status: Ausgewählte Unterlagen",
    ],
    sections: [
      {
        heading: "Ausgewählte Registereinträge",
        paragraphs: [
          "Die folgenden Einträge wurden aus der offiziellen Erwerbsakte des Museums kopiert. Leere Felder und fehlende Anlagen sind genau so vermerkt, wie sie in der Akte erschienen.",
        ],
      },
      {
        heading: "3. Februar — Bekanntgabe des Erwerbs",
        paragraphs: [
          "Direktor Tachkis gibt bekannt, dass das Museum das einzige bekannte vollständige Skelett von Magyarosaurus dacus von einem privaten europäischen Händler erworben hat. Das Exemplar stammt aus dem Hațeg-Becken. Kaufpreis: 240.000 Kronen aus dem Sonderfonds für Erwerbungen.",
        ],
      },
      {
        heading: "20. Februar — Technische Unterlagen eingegangen",
        paragraphs: [
          "Ein Paket mit detaillierten Fotografien, Maßen und Montagezeichnungen geht direkt im Büro des Direktors ein. Das Begleitschreiben erklärt, die Unterlagen seien für die Versicherungsplanung und die Vorbereitung der Galerie bestimmt. Ein weiterer Empfänger ist nicht aufgeführt.",
        ],
      },
      {
        heading: "18. März — Warnung des Sammlungsregisters",
        paragraphs: [
          "Die Sammlungsregistrarin fordert die ursprüngliche Ausgrabungsgeschichte, die Ausfuhrgenehmigung und die vollständige Besitzkette an. Direktor Tachkis schreibt: \u201EDer Händler garantiert die Rechtmäßigkeit. Die restlichen Unterlagen folgen. Vorbereitung nicht verzögern.\u201C",
        ],
      },
      {
        heading: "12. April, 22:40 Uhr — Wareneingang",
        paragraphs: [
          "Am westlichen Ladeeingang werden zwölf nummerierte Kisten erfasst. Beschreibung: \u201EMagyarosaurus Dacus, vollständig montiertes Exemplar, für den Transport zerlegt.\u201C Bruttogewicht: 1.840 Kilogramm. Entgegengenommen und unterzeichnet von Direktor Tachkis. Name des Transportunternehmens: leer. Fahrzeugkennzeichen: leer. Unterschrift eines zweiten Mitarbeiters: leer.",
        ],
      },
      {
        heading: "13.–16. April — Installation",
        paragraphs: [
          "Die Zentrale Fossiliengalerie wird für eine private Installation geschlossen. Vier Zeitarbeiter werden als \u201ESpezialauftragnehmer\u201C eingetragen. Ihre Namen und ihr Arbeitgeber sind nicht vermerkt. Das reguläre Konservierungsteam des Museums ist als \u201Enicht erforderlich\u201C gekennzeichnet.",
        ],
      },
      {
        heading: "22. April — Abschließender Zustandsbericht",
        paragraphs: [
          "Die Akte enthält ein Deckblatt, jedoch keinen ausgefüllten Bericht, keine Fotografien und keine Zustandsliste für die einzelnen Knochen. Eine Bleistiftnotiz lautet: \u201EArbeitskopie verbleibt beim Direktor.\u201C",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / BERICHT 03",
  },
  {
    key: "magyar_tachkis",
    code: "04",
    label: "Befragung: Direktor Tachkis",
    agency: "Kriminalhauptkommissarin Marta Weiss",
    title: "Befragung: Direktor Tachkis",
    meta: [
      "Status: Aufgezeichnet am Dienstag, 10:35 Uhr",
    ],
    sections: [
      {
        exchanges: [
          { speaker: "Weiss", text: "Beschreiben Sie für das Protokoll Ihre Stellung." },
          { speaker: "Tachkis", text: "Ich leite das Neuheimer Naturkundemuseum seit neunzehn Jahren. Als ich kam, war die Hälfte der Galerien geschlossen, und das Dach tropfte auf die Mineraliensammlung. Heute genießen wir internationales Ansehen. Diese Veränderung kam nicht von selbst." },
          { speaker: "Weiss", text: "Wann haben Sie das Magyarosaurus-Skelett zuletzt gesehen?" },
          { speaker: "Tachkis", text: "Am Sonntagnachmittag gegen halb sechs. Ich ging vor dem Abendessen des Kuratoriums durch die Galerie. Es war unversehrt." },
          { speaker: "Weiss", text: "Wo waren Sie danach?" },
          { speaker: "Tachkis", text: "Das Abendessen des Kuratoriums begann um sieben. Ich blieb bis kurz vor Mitternacht. Mein Fahrer brachte mich nach Hause. Am Montag nahm ich an einer Sitzung der städtischen Finanzverwaltung teil, gab ein Radiointerview und verbrachte den Abend mit dem stellvertretenden Bürgermeister Falk in der Oper. Es gibt Zeugen und Kameras. Mir ist klar, dass es Zeiträume gibt, in denen ich nicht fotografiert wurde. Für gewöhnlich lade ich keine Fotografen in mein Schlafzimmer ein." },
          { speaker: "Weiss", text: "Wie schwierig wäre es, das Skelett zu entfernen?" },
          { speaker: "Tachkis", text: "Für Amateure äußerst schwierig. Es kam in zwölf nummerierten Kisten an und wurde abschnittsweise zusammengesetzt. Ein fachkundiges Team mit dem Montageplan könnte es wieder zerlegen. Dafür wären dennoch Zeit, Sorgfalt und ein geeignetes Transportmittel erforderlich." },
          { speaker: "Weiss", text: "Wer verfügte über den Montageplan?" },
          { speaker: "Tachkis", text: "Die zuständigen Abteilungen. Die Sicherheitsabteilung hätte für die Notfallplanung grundlegende Informationen benötigt. Im Büro der Registrarin sollte sich die Erwerbsakte befinden. Sicherheitschef Jameson kannte die Galerie mit Sicherheit besser als die meisten anderen." },
          { speaker: "Weiss", text: "Jamesons Konto hat das System deaktiviert." },
          { speaker: "Tachkis", text: "Dann schlage ich vor, Sie fragen Jameson nach dem Grund. Er wurde wegen wiederholter Widersetzlichkeit entlassen. Drei Abende später stand er in einer Kneipe und verkündete, er werde mich dafür bezahlen lassen. Ich weise die Polizei nur ungern auf einen früheren Mitarbeiter hin, aber das Offensichtliche nicht zu sehen, wäre unverantwortlich." },
          { speaker: "Weiss", text: "Er sagt, damit sei eine Klage gemeint gewesen." },
          { speaker: "Tachkis", text: "Vielleicht war es so. Wütende Männer können mehrere Dinge gleichzeitig meinen." },
          { speaker: "Weiss", text: "Nach den Museumsrichtlinien liegt eine Notfallkopie seines Passworts in Ihrem Safe." },
          { speaker: "Tachkis", text: "Ebenso wie Notfallkopien aller leitenden Sicherheitspasswörter. Sie sind versiegelt und werden kontrolliert. Die Richtlinie besteht, weil ein Museum nicht jedes Mal hilflos werden darf, wenn ein Mitarbeiter nicht verfügbar ist. Ich habe Jamesons derzeitiges Passwort nie benutzt." },
          { speaker: "Weiss", text: "Und Dr. Green?" },
          { speaker: "Tachkis", text: "Dr. Green ist eine außergewöhnliche Paläontologin, eine begabte Forscherin und ein anstrengender Mensch. Sie hat mich der Korruption, der Bevorzugung bestimmter Personen, der Missachtung örtlicher Wissenschaftler und des Kaufs von Objekten ohne Rücksicht auf ihre Herkunft beschuldigt. Keine dieser Anschuldigungen hat zu einer Strafanklage geführt. Sie glaubt, der Magyarosaurus sollte diesem Museum nicht gehören. Menschen können sich einreden, dass das Wegnehmen eines Gegenstands dasselbe sei wie seine Rückgabe." },
          { speaker: "Weiss", text: "Worin genau bestand ihr Einwand gegen dieses Exemplar?" },
          { speaker: "Tachkis", text: "In Eigentumsfragen und der Berufsethik. Sie sollte in dieser Woche unsere Vortragsreihe leiten, und das Skelett war ihr Mittelpunkt. Sein Verlust ist eine Katastrophe für das Museum und für mich persönlich." },
          { speaker: "Weiss", text: "Könnte das Museum einen Abguss einsetzen und die Vorträge fortsetzen?" },
          { speaker: "Tachkis", text: "Nein. Fehlende oder schwache Teile eines montierten Fossils können mit Gips oder Harz gestützt werden, aber es gibt kein vollständiges Duplikat des Skeletts. Ein einzigartiges Objekt lässt sich nicht einfach durch geschickte Bemalung ersetzen." },
          { speaker: "Weiss", text: "Wissen Sie, warum in Ihrem Lieferprotokoll weder ein Transportunternehmen noch eine zweite Unterschrift aufgeführt ist?" },
          { speaker: "Tachkis", text: "Es traf spät ein, nach einer erschöpfenden internationalen Reise. Ich übernahm persönlich die Verantwortung, statt es bis zum Morgen auf einer Ladeplattform stehen zu lassen. Wenn es jetzt als Beweis gegen mich gilt, ein unersetzliches Fossil vor Verzögerungen zu schützen, ist Kompetenz zu einer gefährlichen Gewohnheit geworden." },
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / BERICHT 04",
  },
  {
    key: "magyar_green",
    code: "05",
    label: "Befragung: Dr. Krisztina Green",
    agency: "Kriminalhauptkommissarin Marta Weiss",
    title: "Befragung: Dr. Krisztina Green",
    meta: [
      "Status: Aufgezeichnet am Dienstag, 13:10 Uhr",
    ],
    sections: [
      {
        exchanges: [
          { speaker: "Weiss", text: "Welche berufliche Verbindung haben Sie zu dem verschwundenen Skelett?" },
          { speaker: "Green", text: "Ich bin Wirbeltierpaläontologin. Spezialisiert auf die \u201EDinosaurierzeitalter\u201C. Genauer gesagt: Meine Forschung befasst sich mit den Inseln des urzeitlichen Tethys-Ozeans und den Tieren, die dort ungewöhnlich klein wurden. Magyarosaurus ist eines der deutlichsten Beispiele. Dieses Exemplar ist für mich besonders wichtig, da ich zu dem Team gehörte, das es ursprünglich entdeckt hat." },
          { speaker: "Weiss", text: "Sie haben Direktor Tachkis öffentlich der Korruption beschuldigt." },
          { speaker: "Green", text: "Unter anderem. Bitte verkürzen Sie eine ausführliche Kritik nicht zu einem dramatischen Zeitungswort. Mein Hauptanliegen ist die Provenienz — also die Dokumentation darüber, woher ein Gegenstand stammt, wem er gehörte und ob er rechtmäßig verkauft werden durfte. Tachkis betrachtet Provenienz als Unannehmlichkeit. Er kauft zuerst und stellt Fragen, wenn die Journalisten eintreffen. Außerdem bevorzugt er persönliche Favoriten, ignoriert örtliche Fachleute und erlaubt wohlhabenden Spendern, zu beeinflussen, welche Regionen und nationalen Geschichten Beachtung finden." },
          { speaker: "Weiss", text: "Glaubten Sie, der Magyarosaurus sei aus seinem Herkunftsland gestohlen worden?" },
          { speaker: "Green", text: "Ich glaube, das Museum hatte nicht nachgewiesen, dass sein Kauf ethisch und rechtmäßig war. Das ist nicht dieselbe Behauptung. Die Ausgrabungsgeschichte war unvollständig. Die Ausfuhrdokumente wurden mir nie zugänglich gemacht. Ganz zu schweigen von den Gerüchten meines früheren Grabungsleiters darüber, dass rumänische Regierungsbeamte beim Kauf des Skeletts plötzlich ordentlich abkassierten." },
          { speaker: "Weiss", text: "Stellen Sie die Echtheit des Skeletts infrage?" },
          { speaker: "Green", text: "Nein. Ich habe keinen Grund dazu. Ich war dabei, als es mühsam ausgegraben wurde. Mein Problem war die Art, wie das Exemplar erworben wurde, nicht die Frage, ob es existierte." },
          { speaker: "Weiss", text: "Erzählen Sie mir von der Vortragsreihe dieser Woche." },
          { speaker: "Green", text: "Sie war für Schüler, die Öffentlichkeit und Gastwissenschaftler gedacht. Das Dienstagsprogramm begann mit dem Inselzwergwuchs der späten Kreidezeit. Später planten wir eine Demonstration der Radiokarbondatierung mit einem Stück mittelalterlichen Holzes. Danach hätten wir an einem Knochensplitter gezeigt, warum die Radiokarbondatierung bei Dinosauriern nicht funktioniert. Am Mittwoch und Donnerstag sollten Fachleute über Konservierung, die Montage von Skeletten und die genaue Anatomie von Magyarosaurus sprechen." },
          { speaker: "Weiss", text: "Hätten die Gastwissenschaftler das Skelett berührt?" },
          { speaker: "Green", text: "Nicht unvorsichtig. Die Öffentlichkeit wäre hinter der Absperrung geblieben. Eine kleinere Fachgruppe hatte die Erlaubnis, den Ausstellungsbereich zusammen mit Museumsmitarbeitern zu betreten. Es war keine zerstörende Probenentnahme geplant. Und bevor Sie fragen: Einen Splitter zu Demonstrationszwecken zu entnehmen, der wiederverwendet werden kann, ist nicht zerstörerisch. Das ist gewöhnliche wissenschaftliche Arbeit, wenn ein einzigartiges Exemplar verfügbar wird." },
          { speaker: "Weiss", text: "Wäre das ausführlicher als ein gewöhnlicher Museumsbesuch?" },
          { speaker: "Green", text: "Deutlich. Fachleute, die nur wenige Zentimeter entfernt stehen, können winzige anatomische Fehler, ungewöhnliche Reparaturen oder moderne Materialien bemerken, die ein Besucher hinter Glas niemals sehen würde. Das bedeutet nicht, dass wir mit etwas Unehrlichem rechneten. Wir glaubten, wir kämen, um ein Fossil zu untersuchen, nicht um zu prüfen, ob das Museum darüber gelogen hatte." },
          { speaker: "Weiss", text: "Hat Tachkis sich gegen die Veranstaltung gewehrt?" },
          { speaker: "Green", text: "Öffentlich unterstützte er sie. Sie brachte seinem Museum Ansehen. Sein Büro war bei den praktischen Vorbereitungen langsam — Schlüssel, Versicherungsformulare, Zugangszeiten —, aber sein Büro ist bei allem langsam, wozu kein Fotograf gehört. Ich fand das nicht ungewöhnlich." },
          { speaker: "Weiss", text: "Wo waren Sie während des mutmaßlichen Tatzeitraums?" },
          { speaker: "Green", text: "Ich hielt am Sonntag einen Universitätsvortrag und kehrte kurz nach elf nach Hause zurück. Am Montag arbeitete ich von acht Uhr morgens bis halb sechs mit Studenten und aß anschließend bis neun Uhr mit meinen Doktoranden. Danach war ich allein in meinem Büro. Ich kann nicht beweisen, dass ich jede Minute dort blieb. Ich kann auch keine zwölf Kisten über eine Feuertreppe hinuntertragen." },
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / BERICHT 05",
  },
  {
    key: "magyar_lectures",
    code: "06",
    label: "Vortragsreihe: Programm",
    agency: "Bildungsabteilung des Neuheimer Museums",
    title: "Vortragsreihe: Programm und Planungshinweis",
    meta: [
      "Status: Öffentliches Programm mit interner Anlage",
    ],
    sections: [
      {
        heading: "Ein kleiner Riese aus einem verlorenen Meer — Drei Tage mit Magyarosaurus dacus",
      },
      {
        heading: "Dienstag",
        paragraphs: [
          "09:00 Uhr — Eröffnungsworte von Direktor Tachkis",
          "10:00 Uhr — Dr. Krisztina Green: Inseln des Tethys-Ozeans",
          "13:00 Uhr — Kohlenstoffuhren: Datierung mittelalterlichen Holzes",
          "15:30 Uhr — Der kleine Titan: geführter Galerievortrag",
        ],
      },
      {
        heading: "Mittwoch",
        paragraphs: [
          "10:00 Uhr — Eine Dinosaurierausstellung bauen",
          "13:00 Uhr — Fossil, Stein und Reparatur: Museumskonservierung",
          "16:00 Uhr — Gesprächsrunde der Gastwissenschaftler",
        ],
      },
      {
        heading: "Donnerstag",
        paragraphs: [
          "09:30 Uhr — Magyarosaurus vermessen",
          "12:00 Uhr — Zwergwuchs, Nahrung und Überleben auf Inseln",
          "15:00 Uhr — Wem gehört die Vergangenheit? Museen, Staaten und private Sammler",
        ],
      },
      {
        heading: "Interner Planungshinweis",
        paragraphs: [
          "Neun Gastwissenschaftler haben um unmittelbaren fachlichen Zugang zur Magyarosaurus-Ausstellung gebeten. Am Dienstag um 07:00 Uhr sollen Museumsmitarbeiter die vordere Absperrung entfernen und die Westseite der Plattform aufschließen. Die Gruppe darf unter Aufsicht der Registrarin tragbare Lampen, Lupen, Lineale und Fotokameras benutzen. Bohren, Schneiden oder die Entnahme von Material sind nicht erlaubt. Direktor Tachkis hat den Zugang genehmigt, sofern Öffentlichkeit und Presse außerhalb der Galerie bleiben, bis die morgendliche Untersuchung abgeschlossen ist.",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / BERICHT 06",
  },
  {
    key: "magyar_jameson",
    code: "07",
    label: "Befragung: Jameson",
    agency: "Kriminalhauptkommissarin Marta Weiss",
    title: "Befragung: James John Jameson",
    meta: [
      "Status: Aufgezeichnet am Dienstag, 16:45 Uhr",
    ],
    sections: [
      {
        exchanges: [
          { speaker: "Weiss", text: "Ihr früheres Sicherheitskonto wurde am Montagmorgen um 02:17 Uhr benutzt." },
          { speaker: "Jameson", text: "Dann hat jemand meinen Namen benutzt. Ich war sechsundvierzig Kilometer nördlich von Neuheim. Ihre Leute wissen das bereits. Es gibt eine Mautkamera und einen Tankstellenangestellten, der sich an mich erinnert, weil meiner Schwester in seiner Toilette schlecht war." },
          { speaker: "Weiss", text: "Ihr Konto hätte bei Ihrer Entlassung deaktiviert werden müssen." },
          { speaker: "Jameson", text: "Richtig. Ich sagte es der Personalabteilung beim Hinausgehen. Dort hieß es, das Formular sei nach oben weitergeleitet worden. Ich hatte wohl kaum die Befugnis, wieder in das Sicherheitsbüro zu gehen und mein eigenes Konto zu deaktivieren." },
          { speaker: "Weiss", text: "Kannte sonst jemand Ihr Passwort?" },
          { speaker: "Jameson", text: "Nicht von mir. Aber von jedem leitenden Passwort liegt eine Notfallkopie in Tachkis' Safe. Seine Regel. Vor Jahren brach ein Sicherheitschef während eines Hochwasseralarms zusammen, und niemand konnte das Steuerungsmenü erreichen. Tachkis vergaß diese Blamage nie. Danach verlangte er Kopien von allem." },
          { speaker: "Weiss", text: "Man hörte Sie sagen, Sie würden Tachkis dafür bezahlen lassen." },
          { speaker: "Jameson", text: "Ja. In einer Kneipe, betrunken und laut genug, um die ganze Straße zu unterrichten. Ich hatte an diesem Nachmittag eine Klage wegen unrechtmäßiger Kündigung eingereicht. Ich meinte, er werde meinen Lohnausfall, meine Anwaltskosten und, falls das Glück mir hold wäre, genug Schadenersatz zahlen, um an seinem Frühstück zu ersticken." },
          { speaker: "Weiss", text: "Warum wurden Sie entlassen?" },
          { speaker: "Jameson", text: "Offizielle Antwort: Widersetzlichkeit und mangelnde Zusammenarbeit mit dem Direktor. Tatsächliche Antwort: Ich hörte auf, so zu tun, als wäre jeder dumme Befehl brillant. Tachkis verringerte das Nachtpersonal, ignorierte Wartungswarnungen und führte Leute durch den Ladeeingang, ohne ihre Namen in das Buch einzutragen. Wenn ich mich beschwerte, nannte er es \u201Enotwendige Diskretion\u201C." },
          { speaker: "Weiss", text: "Was für Leute?" },
          { speaker: "Jameson", text: "Händler. Spender. Auftragnehmer. Männer in guten Mänteln, die nicht wollten, dass Wachleute fragten, was sich in ihren Kisten befand. Museen brauchen manchmal Privatsphäre. Sie brauchen kein Mysterium. Ich schrieb drei Vermerke darüber. Zwei verschwanden aus meiner Akte." },
          { speaker: "Weiss", text: "Betraf eine dieser Lieferungen den Magyarosaurus?" },
          { speaker: "Jameson", text: "Der Dinosaurier kam im April nachts an. Mir wurde gesagt, ich solle nicht dabei sein. Das war merkwürdig, weil das Objekt mehr wert war als das Gebäude. Tachkis sagte, der Transportversicherer habe sein eigenes Team gestellt. Am nächsten Morgen sah ich die Galerietüren verschlossen und zwölf saubere Kisten darin aufgestapelt. Keine Versandmarkierungen. Keine Zollsiegel. Nur Nummern." },
          { speaker: "Weiss", text: "Könnten Sie die Ausstellung auseinanderbauen?" },
          { speaker: "Jameson", text: "Mit dem Plan, ja. Ohne ihn, langsam. Die Knochen befanden sich in zwölf passgenauen Abschnitten. Das Gestell verwendete Sicherungsstifte statt dauerhafter Bolzen, damit das Exemplar zu Ausstellungen reisen konnte. Wer es nahm, wusste, wo sich die Entriegelungen befanden. Und das lernt man nicht, indem man von hinter der öffentlichen Absperrung aus hinsieht." },
          { speaker: "Weiss", text: "Sie hatten dieses Wissen und ein aktives Konto." },
          { speaker: "Jameson", text: "Ebenso wie der Mann, der mein Passwort in seinem Safe verwahrte, jeden Auftragnehmer genehmigte und für jede Kiste unterschrieb. Aber ich bin derjenige, der in einer Kneipe herumgebrüllt hat. Also stehen wir nun hier." },
          { speaker: "Weiss", text: "Beschuldigen Sie Tachkis, den Diebstahl organisiert zu haben?" },
          { speaker: "Jameson", text: "Ich beschuldige ihn, das Museum wie sein privates Königreich zu führen. Ich weiß nicht, wer das Skelett gestohlen hat. Wenn ich es wüsste, würde ich es klar sagen." },
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / BERICHT 07",
  },
  {
    key: "magyar_personnel",
    code: "08",
    label: "Personalakte und Alibis",
    agency: "Kriminalbeamter Emil Brandt",
    title: "Personalakte, Klage und Überprüfung des Alibis",
    meta: [
      "Status: Überprüfungsvermerk",
    ],
    sections: [
      {
        paragraphs: [
          "Ich untersuchte die Unterlagen zu James John Jamesons Entlassung, seiner öffentlichen Äußerung gegen Direktor Tachkis und seinem Aufenthaltsort zur Zeit der Deaktivierung des Sicherheitssystems.",
          "Jameson reichte am Freitag vor dem Diebstahl um 12:42 Uhr eine Klage wegen unrechtmäßiger Kündigung ein. Der Gerichtsbeamte, der Eingangsstempel und die Zahlungsquittung bestätigen das Datum. Die Klage verlangt Wiedereinstellung, Lohnausfall, Anwaltskosten und Schadenersatz. Zwei Zeugen aus der Gaststätte Zur Königslaterne geben an, Jameson habe später gesagt: \u201EIch lasse Tachkis bezahlen, selbst wenn es ihn jede Krone kostet, die er besitzt.\u201C Beide Zeugen verstanden, dass er über die Klage sprach. Keiner hörte ihn das Museum, den Dinosaurier oder einen Diebstahl erwähnen.",
          "Das Kündigungsformular war unvollständig. Der Abschnitt COMPUTER- UND ALARMZUGANG enthält keine Unterschrift. Die Personalabteilung nahm an, die Museumssicherheit werde das Konto deaktivieren. Der kommissarische Sicherheitsleiter nahm an, die Personalabteilung habe dies bereits getan. Das Konto blieb aufgrund eines Verwaltungsfehlers aktiv. Es gibt keinen Beleg dafür, dass Jameson zwischen seiner Entlassung und Montag um 02:17 Uhr auf ein Museumssystem zugriff.",
          "Am Montag um 02:06 Uhr fotografierte eine Mautkamera Jamesons Auto auf der Fahrt nach Norden am Marden-Tor, sechsundvierzig Kilometer vom Museum entfernt. Um 02:33 Uhr zeichnete eine Tankstellenkamera Jameson, sein Auto und seine Schwester in Nord-Marden auf. Der Tankstellenangestellte bestätigt, dass Jameson wartete, während seine Schwester sich von ihrem Unwohlsein erholte. Die normale Fahrzeit vom Marden-Tor zum Museum beträgt mindestens vierzig Minuten. Die Fahrt vom Museum zur Tankstelle dauert mindestens fünfzig Minuten. Jameson konnte um 02:17 Uhr nicht am Museumsterminal gewesen sein.",
          "Um 03:18 Uhr sah ein Nachbar, wie Jameson seiner Schwester in ihre Wohnung half. Das erklärt nicht jede Stunde zwischen Sonntagabend und Dienstagmorgen. Bei Durchsuchungen von Jamesons Wohnung und Auto wurden weder Fossilienmaterial, Museumswerkzeuge, ungewöhnlich viel Bargeld, Kistenfragmente noch Verbindungen zu bekannten Kunstdieben gefunden.",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / BERICHT 08",
  },
  {
    key: "magyar_voss",
    code: "09",
    label: "Aussage: Helena Voss",
    agency: "Polizeibehörde Neuheim",
    title: "Aussage: Helena Voss, Sammlungsregistrarin",
    meta: [
      "Position: Leitende Sammlungsregistrarin, seit elf Jahren",
      "Aussage aufgenommen: Mittwoch, 09:05 Uhr",
    ],
    sections: [
      {
        paragraphs: [
          "Meine Aufgabe ist es, die rechtlichen und wissenschaftlichen Unterlagen des Museums zu führen. Dazu gehören Kaufdokumente, Besitzgeschichte, Lieferprotokolle und Zustandsberichte. Ich entscheide nicht, was das Museum kauft. Direktor Tachkis trifft gemeinsam mit dem Kuratorium die endgültigen Erwerbsentscheidungen.",
          "Dr. Green beschwert sich seit mehreren Jahren über unsere Unterlagen. Sie kann unhöflich sein und spricht manchmal, als beweise jede Meinungsverschiedenheit Unehrlichkeit. Dennoch sind mehrere ihrer Beschwerden berechtigt. Wichtige Erwerbungen sind eingetroffen, bevor ihre Ausfuhr- oder Besitzdokumente vollständig waren. Direktor Tachkis sagt, seltene Objekte wechselten schnell den Besitzer und übermäßige Vorsicht ermögliche es reicheren Museen, sie uns wegzunehmen. Er hat Bemerkenswertes für Neuheim erreicht, aber seine Methoden erschweren meine Arbeit.",
          "Die Magyarosaurus-Akte war besonders unvollständig. Vor der Lieferung erhielt das Büro des Direktors Fotografien, genaue Maße und vorgeschlagene Montagezeichnungen. Ich bat um Kopien und erhielt die Auskunft, ich würde sie nach der Ankunft des Exemplars bekommen. Ich erhielt lediglich eine reduzierte Auswahl an Fotografien.",
          "Die Lieferung fand spät am 12. April statt. Normalerweise wären ich oder ein Museumskonservator beim Öffnen jeder Kiste anwesend, würden jeden Gegenstand mit der Packliste vergleichen und vorhandene Risse oder Reparaturen dokumentieren. Direktor Tachkis wies uns an, nicht teilzunehmen. Er sagte, der Transportversicherer verlange sein eigenes Spezialistenteam und zu viele Personen würden die Gefahr erhöhen. Ich widersprach schriftlich. Er überstimmte mich.",
          "Am nächsten Morgen sah ich zwölf Kisten aus hellem Holz in der verschlossenen Galerie. Sie waren sauber und lediglich mit Nummern markiert. Ich sah weder den Namen eines Transportunternehmens noch ein Zollsiegel oder eine Länderkennzeichnung. Vier mir unbekannte Arbeiter waren anwesend. Direktor Tachkis stellte sie als Installationsspezialisten vor, nannte mir jedoch nicht ihre Namen. Die Galerie blieb drei Tage lang geschlossen.",
          "Als sie wieder öffnete, wirkte das Skelett ausgezeichnet. Ich bin Registrarin, keine Dinosaurierspezialistin. Ich hatte keinen Grund, es für falsch zu erklären. Ich war besorgt, weil der Zustandsbericht nicht fertiggestellt worden war. Das ausgestellte Exemplar sollte fast vollständig aus ursprünglichem Fossilienmaterial bestehen, was außergewöhnlich ist … und den fehlenden Bericht umso schwerwiegender machte.",
          "Mitarbeiter durften das Skelett nach der Installation weder berühren noch bewegen. Es wurde mit Luft und langen Bürsten gereinigt, während die öffentliche Absperrung an ihrem Platz blieb. Direktor Tachkis bewahrte die von ihm so genannten \u201EArbeitsunterlagen zur Konservierung\u201C in seinem Büro auf. Ich bat wiederholt darum. Er sagte immer, die Akte werde nach dem nächsten großen Projekt vervollständigt.",
          "Die Vortragsreihe wäre die erste Gelegenheit gewesen, bei der mehrere externe Fachleute gemeinsam den Ausstellungsbereich betraten. Am Freitag forderte ich den vollständigen Zustandsbericht erneut an, weil ich Fragen zu reparierten Knochen und Montagematerialien erwartete. Direktor Tachkis sagte, er werde die privaten Unterlagen am Montag mitbringen. Er tat es nicht. Ich nahm an, er habe es vergessen.",
          "Ich kann nicht sagen, dass Direktor Tachkis etwas gestohlen hat. Ich kann sagen, dass er persönlich den Kauf, die technischen Informationen, die nächtliche Lieferung, das externe Installationsteam und die fehlenden Unterlagen kontrollierte. Eine solche Konzentration der Kontrolle war selbst bei einer bedeutenden Erwerbung ungewöhnlich.",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / BERICHT 09",
  },
  {
    key: "magyar_grissom",
    code: "10",
    label: "Reggie 'Ears' Grissom",
    agency: "Reggie 'Ears' Grissom, Investigativreporter",
    title: "Private Hintergrundnotizen: Direktor Tachkis",
    meta: [
      "Status: Nicht zur Veröffentlichung",
    ],
    sections: [
      {
        paragraphs: [
          "Bones.",
          "Du hast gefragt, woher der Museumskönig sein Geld bekommt. Kurze Antwort: nicht durch die Leitung eines Museums.",
          "Tachkis gibt ein jährliches Museumsgehalt von 7.200 Kronen an. Rechnet man offizielle Vortragshonorare, Aufwandsentschädigungen des Kuratoriums und die beiden kleinen Bücher hinzu, die niemand liest, kann ich ihn großzügig auf 8.500 bringen. Anständiges Geld. Bequemes Geld. Kein Palast-auf-dem-Hügel-Geld.",
          "Sein Haus am Adlerhang kostete 43.000 Kronen. Die Grundbücher weisen keine Hypothek aus. Der Anwalt des Verkäufers sagt, die erste Zahlung sei in Form von Barzertifikaten über eine Privatbank eingegangen. Tachkis ließ das Anwesen sofort umbauen: importierter Stein, neues Gewächshaus, Weinkeller. Die Handwerker wurden pünktlich bezahlt, was ihn bereits von einem Großteil der ehrbaren Elite Neuheims unterscheidet.",
          "Dann wäre da der Bellmann-Roadster: 9.600 Kronen. Privatloge in der Oper. Mitgliedschaft im Crown Club. Schneider in der Lindenstraße. Abendessen, bei denen der Wein mehr kostet, als eine Museumswache in einer Woche verdient. Für Fotografen sieht er nicht bloß reich aus. Er gibt sein Geld wie ein Reicher aus, wenn er glaubt, niemand Nützliches sehe hin.",
          "Ich fragte nach einer Erbschaft. Seine Eltern waren Lehrer. Sein Vater hinterließ Schulden. Eine Tante starb vor vier Jahren und hinterließ ihm ungefähr 800 Kronen und einen Schrank, den niemand wollte. Tachkis sagte einem anderen Reporter, alte Familienanlagen finanzierten ihn. Ich fand weder ein Familienunternehmen noch einen Treuhandfonds oder nennenswerten Besitz. Vielleicht wächst der Geldbaum dort, wo die Akten nicht hinsehen können.",
          "Er behauptet außerdem, mit dem Kauf und Verkauf von Gemälden Geld zu verdienen. Möglich. Hinter den Worten \u201Eprivater Kunstverkauf\u201C kann man eine Elefantenherde verstecken. Ich fand keine öffentliche Auktion, deren Erlös groß genug gewesen wäre, um das Haus zu erklären. Drei Händler kennen ihn. Zwei wollten nicht reden. Der dritte lachte und fragte, ob Museen inzwischen Prämien für verschwundene Unterlagen zahlten.",
          "Der Dinosaurier ist nicht die einzige Erwerbung mit einem schmutzigen Schatten. Ich fand vier Gegenstände, die über Händler gekauft worden waren, welche die früheren Eigentümer nicht nennen wollten. In zwei Fällen protestierten örtliche Forscher, das Material habe sein Herkunftsland ohne Genehmigung verlassen. Keine Anklage hatte Bestand. Tachkis besaß immer einen Brief, in dem stand, irgendjemand irgendwo habe versichert, alles sei rechtmäßig. Das Kuratorium akzeptierte den Brief, die Ausstellung wurde eröffnet, die Besucherzahlen stiegen, und jeder wichtige Mensch gratulierte jedem anderen wichtigen Menschen.",
          "Deshalb überlebt er. Er ist gut in seinem Beruf. Er verwandelte ein staubiges Provinzmuseum in einen Ort, den ausländische Zeitungen erwähnen. Mächtige Leute genießen das Ergebnis und fragen nicht, wie die Vitrinen gefüllt wurden.",
          "Ich kann nichts beweisen. Offensichtlich.",
          "Trotzdem: Ein Mann, der 8.500 Kronen verdient, gibt nicht beiläufig mehr als 60.000 aus, sofern das Geld nicht durch eine andere Tür hereinkommt.",
          "Finde die andere Tür.",
          "—Ears",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / BERICHT 10",
  },
  {
    key: "magyar_beggar",
    code: "11",
    label: "Der Bettlerkönig",
    agency: "Von Hand an Bones übergeben",
    title: "Nachricht des Bettlerkönigs",
    meta: [
      "Status: Unbestätigte Quelleninformation",
    ],
    sections: [
      {
        paragraphs: [
          "Bones,",
          "Habe gehört, du siehst dich im Museumsgeschäft um.",
          "Ein paar meiner Leute könnten da hineingeraten sein. Jede Menge Be- und Entladen und Herumfahren für eine Gruppe Profis. Bar bezahlt. Schwere, unmarkierte Kisten aus dem Museum hinaus. Schwere, unmarkierte Kisten in das Museum hinein. Glatt. Leise.",
          "Außerdem. Angeblich hat letzten Frühling jemand eine Fälschung dieses Dinosauriers in Auftrag gegeben. Der, der zum Verschwinden gebracht wurde.",
          "Dachte, du könntest den Tipp gebrauchen.",
          "Viel Glück.",
          "— Bettlerkönig",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / BERICHT 11",
  },
];

export const magyarReportsDeByDifficulty: Record<Difficulty, MagyarReport[]> = {
  "gumshoe": magyarReportsDe,
  "officer": magyarReportsDe,
  "lead-investigator": magyarReportsDe,
};

export type TimmySection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type TimmyReport = {
  key: "timmy_fire" | "timmy_insurance" | "timmy_police" | "timmy_agnes" | "timmy_tony" | "timmy_vandalism";
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
    key: "timmy_fire",
    code: "01",
    label: "Brandermittlung",
    agency: "Feuerwehr der Stadt Millbrook · Büro des Brandinspektors",
    title: "Bericht der Brandermittlung",
    meta: ["Aktenzeichen: FIR-2026-0441", "Ermittlerin: Captain Maria Chen", "Brand: Samstag, 13. Juni 2026, ungefähr 2:15 Uhr", "Ort: 341 Beaumont Avenue"],
    sections: [
      { heading: "Zusammenfassung", paragraphs: ["Am 13. Juni wurde ich gerufen, um einen Brand in der Beaumont Avenue 341 zu untersuchen. Das Gebäude ist ein kleines Restaurant aus Backstein mit einem Stockwerk. Als die Feuerwehr um 2:28 Uhr ankam, hatte das Feuer schon den größten Teil des vorderen Bereichs zerstört. Das Restaurant war geschlossen und leer."] },
      { heading: "Wo hat das Feuer angefangen?", paragraphs: ["Ich habe den Brandort untersucht und festgestellt, dass das Feuer am Haupteingang begonnen hat. Das Brandmuster an Boden und Wänden zeigt: Das Feuer begann an der Eingangstür und breitete sich nach innen zur Küche und zum Gastraum aus. Es hat nicht in der Küche angefangen. Es hat nicht am Sicherungskasten angefangen."] },
      { heading: "Was hat das Feuer verursacht?", paragraphs: ["Proben aus dem Eingangsbereich wurden im Labor getestet. Das Ergebnis: Es wurde Benzin gefunden. Das Muster auf dem Boden zeigt, dass jemand ungefähr zwei bis drei Liter Benzin vor die Eingangstür und an die Vorderwand gegossen hat.", "Dieses Feuer wurde absichtlich gelegt."] },
      { heading: "Weitere Hinweise", bullets: ["Das Gebäude hat alte Kabel aus den 1970er Jahren. Einige Kabel sind nicht mehr auf dem neuesten Stand. Aber der Sicherungskasten zeigte keine Zeichen von Überhitzung oder Problemen. Die alten Kabel haben diesen Brand nicht verursacht.", "Die Dunstabzugshaube in der Küche hatte Fettablagerungen. Vor ungefähr sechs Monaten gab es einen kleinen Fettbrand in der Küche. Aber das jetzige Feuer hat nicht in der Küche angefangen. Das Fett hat mit diesem Brand nichts zu tun."] },
      { heading: "Ergebnis", paragraphs: ["Dieser Brand war Brandstiftung. Benzin wurde als Brandbeschleuniger benutzt. Das Feuer wurde am Haupteingang gelegt. Dass das Benzin an der Eingangstür war — und nicht an einem Ort, wo es wie ein Unfall aussehen würde — zeigt, dass die Person, die das Feuer gelegt hat, nicht versucht hat, die Brandstiftung zu verstecken.", "— Captain Maria Chen, Brandermittlung"] },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 01",
  },
  {
    key: "timmy_insurance",
    code: "02",
    label: "Versicherungsbericht",
    agency: "Atlantic Mutual Insurance Company · Abteilung für Schadensprüfung",
    title: "Bericht der Versicherung",
    meta: ["Aktenzeichen: CLM-2026-77831", "Ermittler: James Whitfield", "Versicherter: Timothy ‚Timmy‘ Bianchi", "Bericht: 2. Juli 2026"],
    sections: [
      { heading: "Hintergrund", paragraphs: ["Timmy Two-Shoes' Italian Kitchen hatte eine Feuerversicherung bei Atlantic Mutual. Die Versicherung wurde 2019 abgeschlossen. Die Versicherungssumme betrug 500.000 $.", "Ende Januar 2026, ungefähr fünf Monate vor dem Brand, wurde die Versicherungssumme auf 2.000.000 $ erhöht. Den Antrag stellte Salvatore ‚Sal‘ DiMarco, der 40 % des Restaurants besitzt. Herr DiMarco sagte, er habe die Erhöhung beantragt, weil Anfang Januar 2026 das Restaurant beschädigt worden war: Die Fensterscheibe wurde eingeschlagen und das Auto von Herrn Bianchi wurde zerkratzt. Es gibt einen Polizeibericht dazu."] },
      { heading: "Überprüfung", bullets: ["Die Erhöhung wurde normal beantragt und genehmigt. Die höhere Versicherungsprämie wurde in allen fünf Monaten vor dem Brand pünktlich und vollständig bezahlt.", "Der Grund für die Erhöhung — der Vandalismus — ist im Polizeibericht dokumentiert. Es ist normal, dass ein Geschäftsinhaber nach so einem Vorfall seine Versicherung erhöht.", "Die Versicherungssumme von 2.000.000 $ ist ein normaler Betrag für ein Geschäftsgebäude dieser Größe und an dieser Adresse, besonders weil Bau- und Renovierungskosten gestiegen sind."] },
      { heading: "Bewertung", paragraphs: ["Natürlich muss jeder größere Brand in einem versicherten Gebäude gründlich geprüft werden. Aber unsere Untersuchung hat keinen Hinweis gefunden, dass die Versicherungserhöhung in schlechter Absicht gemacht wurde. Die Erhöhung kam nach einem Vandalismusvorfall, der Zeitpunkt war sinnvoll, und alle Zahlungen wurden pünktlich gemacht.", "Der Brandbericht bestätigt, dass das Feuer absichtlich mit Benzin gelegt wurde. Aber Brandstiftung bedeutet nicht automatisch Versicherungsbetrug — es gibt viele Gründe, warum jemand ein Feuer legen könnte, die nichts mit der Versicherung zu tun haben."] },
      { heading: "Empfehlung", paragraphs: ["Der Anspruch erscheint begründet. Die Versicherung war gültig, die Zahlungen waren aktuell, und wir haben keinen Beweis gefunden, dass die Erhöhung etwas mit dem Brand zu tun hatte.", "Ich empfehle, dass Atlantic Mutual den Anspruch bearbeitet und auszahlt — 2.000.000 $, nach einer letzten Überprüfung.", "— James Whitfield, Schadensprüfer"] },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 02",
  },
  {
    key: "timmy_police",
    code: "03",
    label: "Polizeiermittlung",
    agency: "Polizei Millbrook · Kriminalpolizei",
    title: "Polizeibericht des Ermittlers",
    meta: ["Aktenzeichen: MPD-2026-1187", "Ermittler: Detective Luis Reyes", "Bericht: 10. Juli 2026"],
    sections: [
      { heading: "Zusammenfassung", paragraphs: ["Am 13. Juni 2026 wurde das Restaurant ‚Timmy Two-Shoes' Italian Kitchen‘ in der Beaumont Avenue 341 durch einen Brand zerstört. Der Brandinspektor hat festgestellt, dass es Brandstiftung war. Dieser Bericht fasst die Ermittlung zusammen."] },
      { heading: "1. Timothy ‚Timmy‘ Bianchi — Besitzer (60 %)", paragraphs: ["Herr Bianchi ist der Hauptbesitzer des Restaurants. Er sagt, er war in der Brandnacht zu Hause bei seiner Frau Rosa. Frau Bianchi hat das bestätigt. Handydaten zeigen, dass sein Telefon die ganze Nacht an seiner Heimatadresse war. Sein Alibi ist bestätigt.", "Herr Bianchi war bei der Befragung kooperativ, aber er wirkte nervös. Als wir ihn fragten, wie das Geschäft lief, sagte er: ‚Alles war in Ordnung‘ und ‚Es lief ganz gut.‘ Die Finanzunterlagen zeigen etwas anderes — das Restaurant machte Verluste.", "Als wir ihn fragten, ob er Feinde habe oder ob ihn jemand bedroht habe, sagte Herr Bianchi: ‚Nein.‘ Er wartete mehrere Sekunden, bevor er antwortete."] },
      { heading: "2. Salvatore ‚Sal‘ DiMarco — Geschäftspartner (40 %)", paragraphs: ["Herr DiMarco ist der kleinere Geschäftspartner. Eine Überprüfung seiner Finanzen hat gezeigt, dass Herr DiMarco große Privatschulden hat — ungefähr 180.000 $ bei verschiedenen Gläubigern. Unsere Quellen sagen, dass der größte Teil dieser Schulden vom Glücksspiel kommt. Herr DiMarco hat auch von mindestens zwei privaten Geldverleihern Geld geliehen, deren Namen wir nicht herausfinden konnten.", "Das Restaurant selbst verlor seit acht Monaten Geld. Der Umsatz war ungefähr 30 % niedriger als im Vorjahr. Trotzdem hat Herr DiMarco Ende Januar 2026 beantragt, die Feuerversicherung von 500.000 $ auf 2.000.000 $ zu erhöhen. Er sagte der Versicherung, die Erhöhung sei wegen des Vandalismus am Restaurant. Die Versicherung hat das akzeptiert und den Anspruch genehmigt.", "Herr DiMarco sagt, er war in der Brandnacht in einer Bar namens ‚The Green Lantern‘ in der 5th Street. Der Barkeeper kann sich nicht erinnern, ihn an dem Abend gesehen zu haben. Kein anderer Zeuge hat bestätigt, dass er dort war. Sein Alibi ist nicht bestätigt.", "Nachbarn berichten, dass Herr DiMarco und Herr Bianchi ungefähr drei Wochen vor dem Brand laut gestritten haben. Herr DiMarco wollte das Restaurant verkaufen. Herr Bianchi wollte das nicht."] },
      { heading: "Festnahme", paragraphs: ["Aufgrund der Beweise — die Spielschulden, die sinkenden Einnahmen, die Versicherungserhöhung, das fehlende Alibi und der Streit über den Verkauf — wurde Salvatore DiMarco am 28. Juni 2026 festgenommen. Er wird wegen schwerer Brandstiftung und Versicherungsbetrug angeklagt.", "Die Versicherung hatte den Anspruch über 2.000.000 $ genehmigt. Ohne diese Ermittlung wäre das Geld ausgezahlt worden.", "Herr DiMarco sagt, er ist unschuldig.", "— Detective Luis Reyes, Kriminalpolizei"] },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 03",
  },
  {
    key: "timmy_agnes",
    code: "04",
    label: "Agnes Kowalski",
    agency: "Polizei Millbrook · Zeugenaussage",
    title: "Aussage von Agnes Kowalski",
    meta: ["Aktenzeichen: MPD-2026-1187", "Zeugin: Agnes Kowalski, 71", "Adresse: 338 Beaumont Avenue", "Aufgenommen: 14. Juni 2026"],
    sections: [
      { paragraphs: ["Ich lebe seit zweiunddreißig Jahren in der Beaumont Avenue. Ich wohne genau gegenüber von Timmys Restaurant. Ich kenne Timmy, seit er den Laden 2016 aufgemacht hat.", "In der Nacht des Brandes bin ich von den Sirenen aufgewacht. Aber jetzt, wo ich darüber nachdenke — ich habe vorher etwas gesehen. Ich kann oft nicht schlafen, und deshalb saß ich gegen zwei Uhr nachts am Fenster, vielleicht ein bisschen früher. Ich sah ein dunkles Auto — ein großes Auto, wie eine Limousine, schwarz oder dunkelblau — auf der anderen Straßenseite geparkt, ein Stück hinter dem Restaurant. Ich hatte dieses Auto noch nie gesehen.", "Ich sah, wie ein Mann aus dem Auto ausstieg und zum Restaurant ging. Ich konnte sein Gesicht nicht sehen. Er trug dunkle Kleidung. Ich habe mir nichts dabei gedacht. Manchmal laufen Leute nachts durch die Beaumont Avenue.", "In den Wochen vor dem Brand habe ich einige Männer bemerkt, die zum Restaurant kamen. Sie kamen vielleicht drei- oder viermal, soweit ich es gesehen habe. Es waren grob aussehende Männer in schicken Anzügen. Einmal — ich glaube, es war vielleicht zwei Wochen vor dem Brand — hatte ich mein Fenster offen und konnte sie schreien hören. Sie schrien auf Italienisch. Timmy schrie zurück, auch auf Italienisch, aber er klang verängstigt. Sie gingen nach ungefähr zehn Minuten.", "Ungefähr eine Woche nach dem Brand war ich draußen, und Timmy redete mit Herrn Petrov vom Eisenwarengeschäft. Ich habe nicht absichtlich zugehört, aber Timmy sagte so etwas wie: ‚Sal wäre fast damit durchgekommen. Manchmal frage ich mich, was ich mit zehn Millionen Dollar machen würde.‘ Dann hat er gelacht. Ich weiß nicht, was er damit meinte. Es war eine seltsame Sache. Vielleicht war es ein Witz.", "Das ist alles, was ich gesehen und gehört habe.", "— Agnes Kowalski"] },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 04",
  },
  {
    key: "timmy_tony",
    code: "05",
    label: "Tony Marchetti",
    agency: "Polizei Millbrook · Zeugenaussage",
    title: "Aussage von Tony Marchetti",
    meta: ["Aktenzeichen: MPD-2026-1187", "Zeuge: Tony Marchetti, 54", "Geschäft: Tony's Classic Barbershop", "Aufgenommen: 15. Juni 2026"],
    sections: [
      { paragraphs: ["Ja klar, ich gebe eine Aussage. Das Feuer hat meine Wand beschädigt — die ganze Ostseite von meinem Laden hat Rauchschäden und die Farbe ist kaputt. Die Versicherung bezahlt es, Gott sei Dank.", "Hören Sie, ich habe meinen Friseurladen seit neunzehn Jahren in der Beaumont Avenue. Ich weiß, wie die Dinge hier in der Nachbarschaft laufen. Manchmal hat man ein nettes Geschäft, und bestimmte Leute kommen vorbei. Sie sind sehr höflich. Sie sagen dir, dass die Nachbarschaft gefährlich sein kann und dass sie für eine kleine Gebühr dafür sorgen können, dass deinem Laden nichts passiert. Verstehen Sie?", "Ich sage nicht, dass das mit Timmy passiert ist. Ich weiß nicht, was mit Timmy passiert ist. Ich kümmere mich um meinen eigenen Kram.", "Aber ich sage Ihnen eins: In dieser Nachbarschaft ist es schlau, ein bisschen extra für besonderen Schutz zu bezahlen. Manche Leute bezahlen und alles ist gut. Manche Leute bezahlen nicht und… naja. Sachen passieren. Fenster gehen kaputt. Autos werden zerkratzt. So läuft das hier.", "Ich? Ich hatte nie ein Problem. Nicht einmal in neunzehn Jahren. Meine Fenster wurden nie eingeschlagen. Mein Auto wurde nie zerkratzt. Ich schlafe nachts sehr gut. Ziehen Sie Ihre eigenen Schlüsse.", "Timmy ist ein guter Mann. Ein stolzer Mann. Manchmal haben es stolze Männer schwer in dieser Nachbarschaft. Mehr sage ich nicht.", "Ob ich in der Brandnacht etwas gesehen habe? Nein. Ich habe geschlafen. Ich wohne in Greenfield, nicht über dem Laden. Ich habe es erst am nächsten Morgen erfahren.", "— Tony Marchetti"] },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 05",
  },
  {
    key: "timmy_vandalism",
    code: "06",
    label: "Früherer Vorfall",
    agency: "Polizei Millbrook · Streifendienst",
    title: "Vandalismus am Restaurant",
    meta: ["Aktenzeichen: MPD-2026-0089", "Beamter: Officer David Kemp", "Vorfall: 8. Januar 2026", "Ort: 341 Beaumont Avenue"],
    sections: [
      { heading: "Was ist passiert?", paragraphs: ["Am 8. Januar 2026 gegen 7:15 Uhr morgens rief Herr Timothy Bianchi bei der Polizei Millbrook an. Er meldete Vandalismus an seinem Restaurant."] },
      { heading: "Festgestellte Schäden", bullets: ["Die Fensterscheibe vorne am Restaurant war eingeschlagen worden. Das Glas war von außen zerbrochen. Ein großer Stein lag drinnen im Restaurant neben dem Fenster.", "Auf der Motorhaube von Herrn Bianchis Auto — einem silbernen Honda Civic — waren die Worte ‚PAY UP‘ tief in den Lack geritzt."] },
      { heading: "Aussage des Besitzers", paragraphs: ["Herr Bianchi sagte, er kam gegen 7:00 Uhr morgens zum Restaurant, um das Mittagessen vorzubereiten. Dabei entdeckte er das kaputte Fenster und den Schaden an seinem Auto. Er habe in der Nacht nichts gehört oder gesehen.", "Als wir ihn fragten, ob er wisse, wer das getan haben könnte, sagte Herr Bianchi: ‚Wahrscheinlich nur Kinder.‘", "Als wir ihn fragten, ob er Drohungen bekommen habe, sagte Herr Bianchi: ‚Nein.‘", "Als wir ihn fragten, ob die Worte ‚PAY UP‘ etwas für ihn bedeuten, sagte Herr Bianchi: ‚Nein. Wie gesagt, wahrscheinlich Kinder.‘"] },
      { heading: "Ermittlung", paragraphs: ["In diesem Teil der Beaumont Avenue gibt es keine Kameras. Kein Zeuge hat sich gemeldet. Auf dem Stein gab es keine Fingerabdrücke.", "Dieser Fall wird als Vandalismus eingestuft — keine Verdächtigen. Status: Nicht aktiv.", "— Officer David Kemp, Streifendienst"] },
    ],
    stamp: "TIMMY TWO-SHOES / BERICHT 06",
  },
];

export const timmyQuestions = [
  "Wo begann das Feuer, und wodurch wurde es verursacht?",
  "Welche zwei möglichen Unfallursachen schließt Captain Chen aus?",
  "Warum wurde die Versicherungssumme erhöht? Welche Beweise sprechen dafür, dass die Erhöhung normal war?",
  "Welche Hinweise machen Sal DiMarco verdächtig? Nenne mindestens vier.",
  "Welche Hinweise sprechen gegen die Theorie, dass Timmy selbst das Feuer gelegt hat?",
  "Was sah Agnes Kowalski in der Brandnacht? Was konnte sie nicht erkennen?",
  "Was deutet Tony Marchetti an, ohne es direkt zu sagen?",
  "Wie hängt der Vandalismus vom Januar mit dem späteren Brand zusammen?",
  "Warum ist der Ort des Benzins wichtig? Welche Art von Nachricht könnte der Täter senden wollen?",
  "Schreibe dein Urteil in 120–180 Wörtern. Wer hat das Restaurant wahrscheinlich angezündet, und warum? Benutze mindestens vier konkrete Hinweise.",
];

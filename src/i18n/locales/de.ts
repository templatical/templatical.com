import type { MessageSchema } from '..';

const de: MessageSchema = {
    a11y: {
        skipToContent: 'Zum Inhalt springen',
        switchToLight: 'Zum hellen Modus wechseln',
        switchToDark: 'Zum dunklen Modus wechseln',
        switchToAuto: 'Zum Systemdesign wechseln',
        switchToLanguage: 'Sprache auf {language} wechseln',
        mobileMenu: 'Navigationsmenü',
        mainNav: 'Hauptnavigation',
        footerNav: 'Fußzeile',
        codeExample: 'Codebeispiel',
    },
    nav: {
        features: 'Funktionen',
        faq: 'FAQ',
        changelog: 'Changelog',
        docs: 'Dokumentation',
        playground: 'Playground',
        getStarted: 'Loslegen',
        openMenu: 'Menü öffnen',
        closeMenu: 'Menü schließen',
    },
    github: {
        star: 'Star',
        starAction: 'Templatical auf GitHub mit einem Stern markieren',
        starActionWithCount: 'Templatical auf GitHub mit einem Stern markieren — {count} Stars',
    },
    heroEditor: {
        error: {
            message: 'Live-Vorschau nicht verfügbar — öffne stattdessen den {playground}.',
            playgroundLabel: 'Playground',
        },
        previewAlt:
            'Templatical-Editor: Drag-and-Drop-E-Mail-Builder mit Symbolleiste, Canvas und Inspektor-Bereichen',
        mergeTagModal: {
            title: 'Merge-Tag einfügen',
            description:
                'Verbinde den Editor über den onRequest-Callback mit deinen Daten. Wähle einen Tag aus.',
            cancel: 'Abbrechen',
            close: 'Schließen',
            demoNote: 'Demo-Liste — deine App liefert die echten Werte.',
            consumerInfo:
                'Dieses Modal gehört zu deiner App, nicht zum SDK. Der Editor ruft onRequest auf — du holst Tags aus deiner API, zeigst beliebige UI und löst mit dem gewählten Tag auf.',
            docsLink: 'Zur Dokumentation',
        },
        mergeTags: {
            firstName: { label: 'Vorname', description: 'Vorname des Empfängers' },
            lastName: { label: 'Nachname', description: 'Nachname des Empfängers' },
            email: { label: 'E-Mail-Adresse', description: 'E-Mail des Empfängers' },
            company: { label: 'Unternehmen', description: 'Workspace- oder Firmenname' },
            unsubscribeUrl: {
                label: 'Abmeldelink',
                description: 'Pro Empfänger generierter Abmeldelink',
            },
        },
        user: {
            you: 'Sie',
        },
        demo: {
            templateName: 'Willkommens-E-Mail',
            eyebrow: 'Mit einem Backend verbunden',
            description:
                'Einiges von dem, was Sie hier sehen — Speichern, Versionsverlauf, Kommentare, gespeicherte Blöcke und Testversand — läuft über ein Backend, das Sie selbst implementieren. Diese Demo nutzt den Session-Speicher Ihres Browsers, es verlässt also nichts diese Seite.',
            docsLink: 'So funktionieren die Provider',
            reset: 'Demo zurücksetzen',
            resetting: 'Wird zurückgesetzt…',
        },
        mjml: {
            show: 'MJML anzeigen',
            hide: 'MJML ausblenden',
            heading: 'Gerendertes Ergebnis',
            note:
                'Das Rendern zu MJML braucht überhaupt keinen Provider — es läuft im Browser. Einen Render-Provider ergänzen Sie für HTML-Ausgabe oder um die Umwandlung in Ihr Backend zu verlagern.',
            error: 'Die Vorlage konnte gerade nicht gerendert werden.',
        },
        seed: {
            reviewerName: 'Sam Okafor',
            threadBody:
                'Dieser Button trägt die ganze E-Mail — geht das direkter?',
            replyBody: 'Sehe ich auch so. Etwas Auffordernderes, und in der Markenfarbe.',
        },
    },
    footer: {
        groups: {
            product: 'Produkt',
            resources: 'Ressourcen',
            compare: 'Vergleich',
        },
        features: 'Funktionen',
        faq: 'FAQ',
        changelog: 'Changelog',
        comparisonBeefree: 'vs. Beefree SDK',
        comparisonUnlayer: 'vs. Unlayer',
        comparisonStripo: 'vs. Stripo Plugin',
        comparisonTopol: 'vs. Topol Plugin',
        comparisonChamaileon: 'vs. Chamaileon SDK',
        comparisonGrapesjs: 'vs. GrapesJS',
        comparison: 'vs. Easy Email Pro',
        documentation: 'Dokumentation',
        playground: 'Playground',
        github: 'GitHub',
        copyright: '© {year} Templatical. Open Source unter FSL-1.1-MIT.',
    },
    home: {
        meta: {
            title: 'Templatical — Open-Source E-Mail-Editor SDK',
            description:
                'Betten Sie einen Open-Source-Drag-and-Drop-E-Mail-Editor in Ihre App ein — mit MJML-Export, Merge-Tags, benutzerdefinierten Blöcken, vollständigem Theming und mehr.',
        },
        hero: {
            headline: 'Ein Open-Source-Drag-and-Drop-E-Mail-Editor-SDK.',
            subheadline:
                'Benutzerdefinierte Blöcke, vollständiges Theming, Merge-Tags und Anzeigebedingungen — alles im Open-Source-SDK enthalten. In jede App mit einem init()-Aufruf einbinden.',
            ctaPrimary: 'Playground öffnen',
            ctaSecondary: 'Dokumentation lesen',
            frameworkNote: 'Funktioniert in React, Svelte, Angular, Vue und Vanilla JS — ein init()-Aufruf, keine Runtime-Dependencies.',
            badges: [
                'TypeScript-first',
                'Auf MJML aufgebaut',
                'FSL-1.1-MIT (auto-MIT)',
                'Framework-neutral',
                'Shadow DOM',
                'Kein Lizenzschlüssel',
            ],
        },
        comparison: {
            eyebrow: 'Warum Templatical',
            headline: 'Alles enthalten, nichts hinter Bezahlschranken',
            subheadline:
                'Selbst bauen kostet ein Quartal Engineering. SaaS-Builder verlangen pro Sitz und sperren die wichtigen Features hinter Upgrades. Templatical enthält sie — Open Source, selbst gehostet, sofort einbettbar.',
            youBuildLabel: 'Müssten Sie selbst bauen',
            paywalledLabel: 'Hinter Bezahlschranke oder eingeschränkt',
            sdkLabel: 'Im Open-Source-SDK enthalten',
            cloudLabel: 'Mit Templatical Cloud kommend',
            cloudBadge: 'In Entwicklung',
            cloudMore: 'Mehr unter cloud.templatical.com',
            compareLink: 'Im Vergleich mit Easy Email Pro',
            recommendedLabel: 'Empfohlen',
            columns: {
                diy: {
                    title: 'Selbst bauen',
                    description:
                        'Ein Open-Source-Web-Builder-Framework mit einem MJML-Plugin kombinieren oder React-Email-Komponenten selbst zusammenstellen.',
                    tradeOffs: [
                        'Die Editor-UX selbst — Drag-and-Drop, Verschachtelung, Spalten, Undo/Redo',
                        'Block-Level-Merge-Tag-Scoping',
                        'Anzeigebedingungen mit Live-Vorschau',
                        'Custom-Block-SDK mit API-gestützten Datenquellen',
                        'Editor-zu-Medien-Bibliothek-Integration — Picker, Image-Block-Hook, Ersetzen-Flow',
                        'Eine Bibliothek gespeicherter Blöcke — auswählen, benennen, Vorschau, positioniert einfügen',
                        'Ein Dialog für Testversand — Empfängerauswahl, Vorschau, Sende- und Fehlerzustände',
                        'Vorschau-Auflösung — echte Daten statt Merge-Tags, ohne die gespeicherten Inhalte anzufassen',
                        'Dark-Mode-Vorschau-Parität zur gesendeten E-Mail',
                        'Theme-Tokens für konsistentes Branding',
                        'MJML-Output, überall renderbar',
                        'E-Mail-Client-Kompatibilität — Outlook 2007–365, Gmail-Clipping, Apple Mail',
                        'Barrierefreiheit — Tastaturnavigation, ARIA, Screenreader',
                        'Stil-Isolation — Host-CSS-Resets und Design-System-Globals dringen in den Editor ein',
                        'Laufende Wartung — jede E-Mail-Client-Änderung ist ein Regressions-Risiko',
                    ],
                },
                hosted: {
                    title: 'SaaS-Builder',
                    description:
                        'Eine gehostete Editor-Komponente einbinden, die auf eine Render-API des Anbieters zeigt.',
                    tradeOffs: [
                        'Custom Blocks nur in höheren Tarifen',
                        'Anzeigebedingungen nur in höheren Tarifen',
                        'Custom-Theming und Design-Tokens nur in höheren Tarifen',
                        'White-Label und Marken-Entfernung nur Enterprise',
                        'Custom-Merge-Tag-Syntax (Liquid, Handlebars) hinter Bezahlschranke',
                        'Template- und Block-Defaults nur in höheren Tarifen',
                        'Medien-Bibliothek — an den Speicher des Anbieters gebunden',
                        'Wiederverwendbare gespeicherte Blöcke nur in Bezahltarifen — auch selbst gehostet',
                        'Preise skalieren pro Sitz oder Endnutzer',
                        'Closed Source — kein Audit, Fork oder Erweitern',
                        'Output an die Render-API des Anbieters gekoppelt',
                        'Lizenzschlüssel wird gegen die Server des Anbieters geprüft — Features je nach Tarif remote freigeschaltet',
                        'Keine CSS-Isolation — Host-Styles greifen in den eingebetteten Editor durch',
                    ],
                },
                templatical: {
                    title: 'Templatical',
                    description:
                        'Ein speziell entwickeltes Open-Source-SDK für E-Mail-Editoren. Erlebnis besitzen, in Tagen statt Quartalen ausliefern, niemals an einer Bezahlschranke für Kernfunktionen anstoßen.',
                    sdk: [
                        'Custom Blocks mit API-gestützten Datenquellen',
                        'Block-Level-Merge-Tags mit Scoping',
                        'Anzeigebedingungen für dynamische Inhalte',
                        'Pluggbare Medien-Bibliothek — eigener Speicher (S3, Cloudinary, Ihr CMS)',
                        'Gespeicherte Blöcke — Nutzer speichern Blockgruppen und verwenden sie wieder, in Ihrem Speicher',
                        'Speichern und Laden gegen Ihren eigenen Speicher — Autosave, Speicherstatus, Cmd/Ctrl+S',
                        'Versionsverlauf — durchsuchen, in der Vorschau ansehen und wiederherstellen, in Ihrem Speicher',
                        'Review-Kommentare in Threads, verankert an Blöcken, auf Ihrem Speicher und Ihren Identitäten',
                        'Testversand aus dem Editor — über Ihren ESP und Ihre Domain zugestellt',
                        'Vorschauen von Ihrem Backend aufgelöst — echte Daten, Logik-Zweige ausgewertet',
                        'Vollständiges Theming über Design-Tokens, Dark Mode inklusive',
                        'Standardmäßig White-Label — Ihre UI, Ihre Marke',
                        'MJML-Output — im Browser, auf Ihrem Server, überall rendern',
                        'Eingebaute WCAG-Barrierefreiheits-Prüfung mit Auto-Fixes',
                        'Style-isoliert — Shadow-DOM-Mount hält Host-CSS draußen',
                        'Kein Lizenzschlüssel, kein Aktivierungsaufruf — nichts, was wir aus der Ferne abschalten könnten',
                    ],
                    cloud: [
                        'KI-Umschreiben, KI-Chat, MCP-Integration',
                        'Echtzeit-Kollaboration mit Block-Level-Sperrung',
                        'Multi-Tenancy und API-Zugriff',
                    ],
                },
            },
        },
        independence: {
            eyebrow: 'Unabhängig zur Laufzeit',
            headline: 'Nichts zu aktivieren. Nichts zu widerrufen.',
            subheadline:
                'Kein Lizenzschlüssel, keine Client-ID, kein Aktivierungsaufruf. Das Open-Source-SDK fragt nie einen Server, welche Funktionen Sie nutzen dürfen — einmal installiert, läuft es unverändert weiter, auch wenn dieses Projekt morgen verschwindet.',
            claims: [
                'Kein Lizenzschlüssel und keine Client-ID in der gesamten API',
                'Keine Berechtigungsprüfung — Funktionen werden nie aus der Ferne freigeschaltet oder entzogen',
                'Keine Telemetrie, keine Analytics, keine Nutzungsberichte',
                'Ihre Vorlagen bleiben in Ihrer App, bis Sie sie an Ihr eigenes Backend senden',
            ],
        },
        aiSkill: {
            eyebrow: 'Neu · Open Source',
            headline: 'Gestalten Sie eine E-Mail, indem Sie sie beschreiben',
            subheadline:
                'Bringen Sie Templaticals quelloffenen Skill in Claude Code, Cursor oder einen beliebigen KI-Coding-Agenten. Beschreiben Sie die gewünschte Kampagne — er baut eine komplette E-Mail, die Sie im echten Editor ansehen und von Hand bearbeiten und anschließend als versandfertiges MJML oder HTML für jeden Anbieter exportieren. Kein Backend, kein API-Schlüssel, nichts wird an uns gesendet.',
            examplePrompt:
                '„Gib mir eine Produktlaunch-E-Mail für eine Outdoor-Marke — Hero-Bild, kurze Einleitung und einen ‚Jetzt shoppen‘-Button in Waldgrün.“',
            commandCaption: 'In Claude Code hinzufügen',
            copyLabel: 'Kopieren',
            copiedLabel: 'Kopiert',
            altInstall:
                'Oder kopieren Sie den Skill-Ordner in einen beliebigen Agenten — Cursor, Claude Desktop und mehr.',
            ctaPrimary: 'Zum Skill-Leitfaden',
            ctaSecondary: 'Skill auf GitHub ansehen',
            cloudNote:
                'Lieber gehostete KI? Templatical Cloud bietet KI-Chat direkt im Editor und einen gehosteten MCP-Server.',
            cloudNoteLink: 'Cloud entdecken',
        },
        cta: {
            headline: 'Starten Sie noch heute mit E-Mail-Vorlagen',
            subheadline:
                'Open Source. Für immer kostenlos. Heute selbst hosten, später optional in den Managed-Tarif wechseln.',
            ctaPrimary: 'Loslegen',
            ctaSecondary: 'Auf GitHub ansehen',
            ctaTertiary: 'Sponsor',
        },
        migration: {
            text: 'Schon auf einem gehosteten E-Mail-Builder oder mit rohem HTML unterwegs? Kostenlose Importer für Ihre bestehenden Vorlagen.',
            sourcesLabel: 'Migrationsanleitungen',
            fromBeefree: 'Von BeeFree',
            fromUnlayer: 'Von Unlayer',
            fromHtml: 'Von HTML',
        },
        close: {
            headline: 'Diese Woche einen E-Mail-Editor ausliefern',
            subheadline:
                'Ein npm install. Ein init()-Aufruf. JSON rein, MJML raus — überall rendern, kostenlos.',
            copyLabel: 'Kopieren',
            copiedLabel: 'Kopiert',
            ctaPrimary: 'Playground öffnen',
            ctaSecondary: 'Auf GitHub bewerten',
        },
    },
    features: {
        meta: {
            title: 'Funktionen — Templatical',
            description:
                'Open-Source-Drag-and-Drop-E-Mail-Editor-SDK. Eigene Blöcke, vollständiges Theming, MJML-Ausgabe. Selbst hosten — kostenlos. FSL-1.1-MIT, nach zwei Jahren MIT.',
        },
        hero: {
            eyebrow: 'Open-Source-SDK',
            headline: 'Was andere Editoren hinter Schranken halten — bei uns in Ihrem Repo. Open Source.',
            subheadline:
                'Die Power-Features und eine saubere Basis — alles enthalten, alles offen. Portables JSON rein, MJML raus, keine Nutzungsstufe im Weg.',
            pricingPill: 'Open Source · FSL-1.1-MIT · Kostenlos selbst hosten',
        },
        examplesLabel: 'Beispiele für {title}',
        variants: {
            static: 'Statisch',
            apiBacked: 'API-basiert',
            predefined: 'Vordefiniert',
            customPicker: 'Eigener Picker',
            browserLocal: 'Browser-lokal',
            tokens: 'Theme-Tokens',
            brandDefaults: 'Marken-Standards',
            fromEditor: 'Aus dem Editor',
            headless: 'Headless',
            perRecipient: 'Pro Empfänger',
            audiencePicker: 'Zielgruppen-Picker',
            yourEndpoint: 'Ihr Endpunkt',
            restrictedRecipients: 'Eingeschränkte Empfänger',
            yourApi: 'Ihre API',
            readOnly: 'Schreibgeschützt',
            composedRestore: 'Kein atomares Restore',
        },
        backend: {
            eyebrow: 'Ihr Backend anbinden',
            headline: 'Sechs Schlüssel. Dieselbe Form. Fehlend, bis Sie einen übergeben.',
            subheadline:
                'Speichern, Versionsverlauf, Kommentare, gespeicherte Blöcke, Testversand und Rendering sind jeweils ein Konfigurationsschlüssel mit Methoden, die Sie implementieren. Lassen Sie einen Schlüssel weg, und das Feature ist verschwunden — nicht deaktiviert, und seine UI wird nie geladen. Übergeben Sie false statt einer Methode, und der Editor blendet dieses Bedienelement aus, statt es nur auszugrauen.',
        },
        templates: {
            eyebrow: 'Persistenz',
            title: 'Speichern und Laden, gegen Ihren eigenen Speicher',
            description:
                'Geben Sie dem Editor einen Ort zum Speichern, und er bekommt die passende Oberfläche dazu: einen inline bearbeitbaren Namen, einen Speichern-Button, eine Statusanzeige, Cmd/Ctrl+S, optionales Autosave und eine Warnung vor dem Schließen des Tabs bei ungespeicherten Änderungen.',
            outcome: 'Der komplette Lebenszyklus des Speicherns, mit Ihrer API als einzigem Speicher.',
            features: [
                'Drei Methoden sind die gesamte Integration — load, create, save',
                'Debounced Autosave pausiert bei einem Undo, sodass ein Redo nie mit einem Schreibvorgang um die Wette läuft',
                'Die Vorlagen-ID gehört Ihnen — ein Datenbankschlüssel, ein Slug, eine Dokument-ID',
                'Diese ID ist der Verknüpfungsschlüssel: Versionsverlauf und Kommentare knüpfen daran an',
                'onSaved trägt den Auslöser — manual, autosave, rename, restore oder api',
                'Ein fehlgeschlagenes Speichern lässt den Editor-Zustand unangetastet; nichts wird als gespeichert markiert, was es nicht ist',
                'Lassen Sie den Schlüssel weg, und speichern Sie stattdessen selbst über onChange',
            ],
            docsLabel: 'Speichern- & Laden-Referenz',
        },
        versionHistory: {
            eyebrow: 'Verlauf',
            title: 'Frühere Versionen durchsuchen, in der Vorschau ansehen und wiederherstellen',
            description:
                'Ein Verlaufs-Bedienelement im Header blättert durch frühere Zustände zurück, zeigt einen davon auf dem Canvas in der Vorschau — mit eigenem Banner — und stellt ihn hinter einer Bestätigung wieder her. Vier Methoden gegen Ihren eigenen Speicher.',
            outcome: 'Ein Undo, das die Sitzung überdauert, ohne dass dafür eine eigene UI gebaut werden muss.',
            features: [
                'Provider mit vier Methoden — list, get, create, restore',
                'Der Inhalt zu einer gelisteten Version ist ein Hinweis pro Eintrag: Liefern Sie ihn bei aktuellen Versionen gleich mit, beim Rest genügt ein Round-Trip',
                'Kein atomarer restore-Endpunkt? Setzen Sie ihn aus get plus save zusammen',
                'Die Bestätigung, bevor eine Wiederherstellung ungespeicherte Arbeit verwirft, ist Aufgabe des Editors, nicht Ihre',
                'Automatische Versionen gehören dem, der save implementiert — der Seite, die weiß, was Speicher kostet',
                'Übergeben Sie create: false, und das Bedienelement verschwindet, statt auszugrauen',
            ],
            docsLabel: 'Versionsverlauf-Referenz',
        },
        comments: {
            eyebrow: 'Review',
            title: 'Review in Threads, verankert an Blöcken',
            description:
                'Ein Review-Panel mit Threads und Antworten, ein Zähler-Badge auf jedem kommentierten Block, sowie Resolve/Reopen. Fünf Methoden, dazu der Schlüssel user auf oberster Ebene — denn ohne Autor meldet sich das Feature selbst als nicht verfügbar, statt einen anonymen Kommentar zu schreiben.',
            outcome: 'Stakeholder-Review im Editor, auf Ihrem Speicher und mit Ihren eigenen Identitäten.',
            features: [
                'Provider mit fünf Methoden — list, create, update, delete, setResolved',
                'user.id entscheidet, was eine Sitzung bearbeiten oder löschen darf',
                'setResolved erhält den Zielzustand, keinen Toggle, sodass zwei Klicks ihn nicht invertieren können',
                'Kommentare verankern sich an einem Block oder an der gesamten Vorlage',
                'Ein optionales subscribe trägt einen Echtzeit-Transport, falls vorhanden — alles funktioniert auch ohne ihn',
                'Übergeben Sie create: false für einen schreibgeschützten Review-Durchlauf',
            ],
            docsLabel: 'Kommentar-Referenz',
        },
        customBlocks: {
            eyebrow: 'Erweiterbarkeit',
            title: 'Benutzerdefinierte Blöcke mit API-Daten',
            description:
                'Registrieren Sie eigene Blocktypen — statische Templates oder Live-Daten aus Ihrer API zur Preview-Zeit. Eingebaut, nicht aufgesetzt.',
            outcome: 'CRM-bewusste Blöcke, die Ihr Team ohne Engineering-Tickets einsetzt.',
            features: [
                'Pro-Feld-Konfiguration: Text, Bild, Farbe, Auswahl, wiederholbare Arrays',
                'Statisches Template oder Live-API-Abruf zur Preview-Zeit',
                'Liquid-Templates mit Bedingungen und integrierten Filtern',
                'Typsichere Block-Factories mit vollständigen TypeScript-Typen',
            ],
            docsLabel: 'Block-API ansehen',
        },
        mergeTags: {
            eyebrow: 'Personalisierung',
            title: 'Merge-Tags mit flexibler Syntax',
            description:
                'Handlebars, Liquid, JS Template Literals oder Ihre eigene Syntax — mit lesbaren Labels direkt im Editor. Keine herstellergebundene Syntax.',
            outcome: 'Bauen Sie eine CRM-bewusste Tag-Auswahl an einem Nachmittag, nicht in einem Sprint.',
            features: [
                'Eingebaute Syntaxen plus Hook für Ihre eigene',
                'Lesbare Labels werden direkt im Editor gerendert',
                'Inline-Autovervollständigung — tippen Sie das Syntax-Zeichen, um passende Tags vorzuschlagen',
                'Optionale Beispielwerte erscheinen in Vorschauen anstelle des Labels',
                'Optionaler onRequest-Hook ersetzt den Picker durch Ihre CRM-UI',
                'Round-Trip-sicher — JSON speichert das kanonische Token',
            ],
            docsLabel: 'Merge-Tag-Referenz',
        },
        displayConditions: {
            eyebrow: 'Targeting',
            title: 'Anzeigebedingungen',
            description:
                'Blöcke basierend auf Empfänger-Attributen ein- oder ausblenden, mit Live-Preview im Editor. Eingebaut, kein kostenpflichtiges Add-on.',
            outcome: 'Personalisierung ohne separaten Targeting-Dienst.',
            features: [
                'Pro-Block-Regeln basierend auf Empfänger-Attributen',
                'Live-Preview während der Bearbeitung',
                'allowCustom: true erlaubt eigene Bedingungen inline',
                'Wrapper sind beliebige Zeichenketten — jede Syntax, die Ihr ESP beim Versand auswertet',
            ],
            docsLabel: 'Bedingungen-Guide',
        },
        theming: {
            eyebrow: 'Branding',
            title: 'Theming und Marken-Standards',
            description:
                '27 OKLch-Tokens, eigene Schriften, Dark Mode, komplette Theme-Overrides. Jede Oberfläche tokenisiert — und derselbe init()-Aufruf setzt die Standards, mit denen jede neue Vorlage und jeder neue Block startet.',
            outcome: 'Der Editor sieht aus wie Ihr Produkt, und jeder neue Block startet markenkonform.',
            features: [
                '27 OKLch-Design-Tokens für jede Oberfläche',
                'Light- und Dark-Theme-Overrides über denselben theme.dark-Schlüssel',
                'Eigene Schriften via --tpl-font-sans und --tpl-font-mono',
                'Tailwind 4 mit `tpl:`-Prefix — kein Preflight, keine Style-Leaks',
                'Standards pro Blocktyp: button, divider, spacer, image, social',
                'Vorlagenstandards: Breite, Hintergrund, Schriftfamilie',
            ],
            docsLabel: 'Theming- & Standards-Referenz',
        },
        cssIsolation: {
            eyebrow: 'Integration',
            title: 'In jede Seite einbinden — Host-CSS kann nicht eingreifen',
            description:
                'Der Editor wird standardmäßig in einem Shadow DOM gemountet. Die Stylesheets Ihrer App, das Preflight Ihres Design-Systems und CMS-Template-Resets enden an der Grenze — sie greifen nicht in Toolbar, Sidebar oder Canvas durch.',
            outcome: 'In jedes Framework, CMS oder Legacy-Projekt einbetten — ohne Resets, ohne !important-Schlachten, ohne Überraschungen nach einem Design-System-Update.',
            features: [
                'Standardmäßig Shadow-DOM-Mount — kein Host-CSS dringt ein',
                'Editor-Styles dringen auch nicht nach außen (tpl:-Tailwind-Prefix im Light-DOM-Modus)',
                'Brand-Projektion über die Shadow-Grenze hinweg via --tpl-user-*-CSS-Variablen',
                'Per shadowDom: false bei Bedarf auf Light-DOM-Mount umstellen',
                'Multi-Instanz-sicher — jeder Editor erhält eine eigene Shadow Root',
            ],
            docsLabel: 'Stil-Isolations-Guide',
        },
        accessibility: {
            eyebrow: 'Qualität',
            title: 'Eingebaute Vorlagen-Prüfung',
            description:
                '30 deterministische Regeln laufen während der Bearbeitung — sichtbar in einem eigenen Sidebar-Tab und als Inline-Badges auf dem Canvas. Barrierefreiheit, Struktur und Links, mit konfigurierbarer Schwere und ohne KI-Raten.',
            outcome: 'Alt-Texte, Kontrast, defekte Links und fehlerhafte Struktur vor dem Versand erkennen — nicht danach.',
            features: [
                'Live-Prüfungen: Fehler, Warnungen, Hinweise — in der Sidebar gruppiert',
                'Inline-Badges auf dem Canvas mit Sprung-zu-Stelle und Auto-Fix wo sicher',
                '20 Barrierefreiheits-Regeln: Alt-Texte, Kontrast, Überschriften-Reihenfolge, Touch-Targets',
                '5 Link-Regeln: javascript:-URLs, fehlerhafte mailto und tel, Staging-Hosts',
                '5 Struktur-Regeln: doppelte IDs, leere Sections, Spalten-Unstimmigkeiten',
                'Pro Regel Schwere überschreibbar, Schwellenwerte konfigurierbar',
                'Lokale-bewusste Wörterbücher für vagen Text',
                'Dieselbe Engine läuft eigenständig — Templates in CI, beim Speichern oder vor dem Versand prüfen',
            ],
            docsLabel: 'Prüfungs-Referenz',
        },
        mediaLibrary: {
            eyebrow: 'Assets',
            title: 'Pluggbare Medien-Bibliothek',
            description:
                'Ein einziger onRequestMedia-Hook lässt den Editor Ihren Medienbrowser öffnen — S3, Cloudinary, Ihr eigenes CMS, alles. Kein Anbieter-Speicher, keine Asset-Egress-Gebühren, kein Lock-in.',
            outcome: 'Nutzen Sie die Asset-Pipeline, die Sie ohnehin betreiben — durchgängig.',
            features: [
                'Ein async-Hook gibt { url, alt } zurück — beliebiges Backend',
                'Wird aus Bild-Blöcken, Bild-Feldern und der Toolbar ausgelöst',
                'Kontextsensibler accept-Hinweis — der Editor sagt, was er erwartet',
                'Kein Upload läuft über Templatical — Ihr Speicher, Ihre Auth',
                'Cloud-Build ergänzt einen Managed-Medienbrowser auf Wunsch',
            ],
            docsLabel: 'Medien-Bibliothek-Referenz',
        },
        savedBlocks: {
            eyebrow: 'Wiederverwendung',
            title: 'Gespeicherte Blöcke, in Ihrem Speicher',
            description:
                'Nutzer wählen eine Gruppe von Blöcken aus, benennen sie und fügen sie in jede andere Vorlage ein. Der Editor liefert das gesamte Erlebnis — Auswahl-Sitzung, durchsuchbare Bibliothek, Live-Vorschau, positioniertes Einfügen. Sie implementieren vier Methoden gegen Ihre eigene API.',
            outcome: 'Eine Blockbibliothek, die Ihre Nutzer selbst füllen — in Ihrem Backend.',
            features: [
                'Provider mit vier Methoden — list, create, update, delete',
                'Statt einer Funktion false übergeben, und der Editor blendet das Bedienelement aus',
                'Flags pro Eintrag sperren einzelne Einträge schreibgeschützt',
                'Freitext-Kategorien, abgeleitet aus dem, was die Einträge tragen',
                'Suche und Kategoriefilter laufen im Editor, nicht in Ihrer API',
                'Mitgelieferter browserlokaler Provider für Demos — eine Zeile, kein Backend',
            ],
            docsLabel: 'Referenz für gespeicherte Blöcke',
        },
        agentSkill: {
            eyebrow: 'KI',
            title: 'E-Mail beschreiben, Vorlage erhalten',
            description:
                'Ein Open-Source-Agent-Skill bringt Claude Code, Cursor oder jedem KI-Coding-Agenten bei, Templatical-Vorlagen aus einem Prompt zu bauen — gegen das Block-Schema validiert, bevor Sie sie überhaupt sehen. Kein Backend, kein API-Key, nichts wird an uns gesendet.',
            outcome: 'Ein erster Entwurf in einem Satz, danach bearbeiten wie jede andere Vorlage.',
            features: [
                'Läuft auf dem Agenten, den Sie bereits nutzen — das Modell ist die Inferenz',
                'Jede generierte Vorlage wird schema-validiert und qualitätsgeprüft',
                'Der Live-Modus zeigt und bearbeitet im echten Editor und gleicht ab',
                'Importiert bestehende Unlayer-, BeeFree- oder HTML-Vorlagen',
                'Ohne Installation — Abhängigkeiten sind mitgeliefert, funktioniert offline',
            ],
            docsLabel: 'Agent-Skill-Guide',
            prompts: [
                {
                    label: 'Von Null',
                    text: '„Eine Produkt-Launch-E-Mail für unseren neuen Pro-Tarif — Hero, drei Feature-Abschnitte und ein Button zum Changelog."',
                },
                {
                    label: 'Migrieren',
                    text: '„Importiere diesen Unlayer-Export und baue die reine Bild-Kopfzeile als echten Text neu auf."',
                },
                {
                    label: 'Live verfeinern',
                    text: '„Zeig es live. Der CTA ist zu unauffällig — nimm die Akzentfarbe und rück ihn über die Falz."',
                },
                {
                    label: 'Feinschliff',
                    text: '„Behebe die Barrierefreiheits-Warnungen und kürze den Preheader auf 90 Zeichen."',
                },
            ],
        },
        logicTags: {
            eyebrow: 'Dynamische Inhalte',
            title: 'Schleifen und Bedingungen mitten im Text',
            description:
                'Registrieren Sie den Kontrollfluss Ihrer Template-Sprache — Liquid, Handlebars, was Sie ohnehin versenden — und Redakteure fügen ihn per Picker ein. Tags erscheinen als gestaltete Pills im Rich Text und gehen unverändert in die Ausgabe.',
            outcome: 'Redakteure schreiben bedingte Texte, ohne Ihre Syntax zu lernen.',
            features: [
                'Umschließt einen Satzteil, während Anzeigebedingungen einen ganzen Block umschließen',
                'Einzelne Tags und Paare zum Öffnen/Schließen, im Picker gruppiert',
                'Ein Paar umschließt die aktuelle Auswahl — kein manuelles Schluss-Tag',
                'Auch in Eingabefeldern: Button-Text, URLs, Alt-Texte',
                'Geht unverändert in das gerenderte MJML',
                'Oder per onRequest-Hook an Ihren eigenen Picker übergeben',
            ],
            docsLabel: 'Logik-Tags-Referenz',
        },
        previewResolution: {
            eyebrow: 'Vorschau',
            title: 'Vorschauen mit echten Daten, aufgelöst von Ihrem Backend',
            description:
                'Der Editor erkennt Merge- und Logik-Tags — er wertet sie nie aus. Übergeben Sie einen resolvePreview-Callback, und was ohnehin Ihre Sendungen rendert, rendert auch Ihre Vorschauen: Zweige ausgewertet, Daten eingesetzt.',
            outcome: 'Eine Vorschau, die der zugestellten E-Mail per Konstruktion entspricht statt sie anzunähern.',
            features: [
                'Ihre Engine, Ihre Daten, Ihre Template-Sprache — nichts im Browser nachzubauen',
                'Wertet Logik aus, die Beispielwerte strukturell nicht können — Bedingungen fallen auf den zutreffenden Zweig zusammen',
                'Löst im Testversand-Dialog für den ausgewählten Empfänger auf',
                'Reine Anzeige — aufgelöste Inhalte erreichen nie getContent(), Export oder einen Versand',
                'Fällt bei Ausfall des Resolvers sichtbar auf die unaufgelöste Vorlage zurück, nie auf eine leere Vorschau',
                'Läuft nie während der Bearbeitung — im Editor steht immer das Tag, das Sie eingefügt haben',
            ],
            docsLabel: 'Guide zur Vorschau-Darstellung',
        },
        testEmail: {
            eyebrow: 'Zustellung',
            title: 'Testversand über Ihre eigene Infrastruktur',
            description:
                'Nutzer schicken sich die Vorlage, die sie gerade bearbeiten, selbst zu — und sie geht über Ihren ESP, Ihre Domain, Ihre Reputation raus. Der Editor liefert Auslöser, Dialog, Vorschau und Sendezustände. Sie implementieren eine Methode.',
            outcome: 'Eine echte Posteingangs-Prüfung, bevor etwas in eine Kampagne geht — ohne Anbieter dazwischen.',
            features: [
                'Eine send-Methode ist die gesamte Integration',
                'Ohne den Schlüssel fehlt das Feature vollständig — kein Button, kein geladener Code',
                'Der Dialog zeigt genau das, was versendet wird — Desktop oder Mobil',
                'Anzeigebedingungen werden berücksichtigt, die Vorschau zeigt nie Inhalte, die der Empfänger nicht bekommt',
                'Eine Empfängerliste formt das Feld um — Freitext, schreibgeschützt oder Auswahlliste',
                'Mit einer Fehlermeldung abbrechen: sie erscheint inline, der Dialog bleibt für einen neuen Versuch offen',
            ],
            docsLabel: 'Testversand-Referenz',
        },
        mjmlOutput: {
            eyebrow: 'Ausgabe',
            title: 'JSON rein, MJML raus',
            description:
                'Vorlagen sind portables JSON, das Sie speichern, wo Sie möchten. Die Ausgabe ist MJML, gerendert von einem Paket, das Sie installieren — im Browser, auf Ihrem Server, in einem Queue-Worker. Kein gehosteter Render-Dienst liegt dazwischen.',
            outcome: 'Die Ausgabe gehört Ihnen. Versenden Sie über jeden Anbieter, so lange Sie möchten.',
            features: [
                'MJML ist ein offener Standard mit Implementierungen in mehreren Sprachen',
                'Rendern im Browser, auf Ihrem Server oder in einem Hintergrund-Job',
                'Custom Blocks werden über einen Callback aufgelöst, den Sie bereitstellen',
                'Nichts ruft nach Hause — keine Render-API, keine Kosten pro Rendering',
                'Der Renderer ist MIT-lizenziert und wird separat installiert',
                'Kein `render`-Schlüssel nötig für `toMjml()` — einen ergänzen Sie für `toHtml()` oder um die Umwandlung in Ihr Backend zu verlagern',
            ],
            docsLabel: 'So funktioniert das Rendering',
        },
        programmaticTemplates: {
            eyebrow: 'Headless',
            title: 'Vorlagen ohne Editor bauen',
            description:
                'Jeder Blocktyp hat eine Factory-Funktion im Types-Paket — MIT, kein Editor, kein DOM. Stellen Sie eine Vorlage im Skript zusammen, legen Sie eine Startbibliothek an oder generieren Sie eine pro Kunde aus Ihren eigenen Daten.',
            outcome: 'Vorlagen als Daten — per Code so einfach erzeugt wie von Hand.',
            features: [
                'Eine Factory pro Blocktyp, jede mit sinnvollen Standardwerten',
                'Die Factories erzeugen die IDs, der Inhalt ist also konstruktionsbedingt valide',
                'Läuft überall — Build-Skript, Server, Queue-Worker, Test',
                'Erzeugt dasselbe JSON, das der Editor liest und schreibt',
                'MIT-lizenziert und ohne Laufzeit-Abhängigkeiten',
            ],
            docsLabel: 'Guide zu programmatischen Vorlagen',
        },
        supporting: {
            eyebrow: 'Die Essentials',
            headline: 'Alles andere, was Sie erwarten — richtig gemacht.',
            subheadline:
                'Einsatzbereites Mounting, framework-unabhängig, jede Sprache, die Sie brauchen. Plus die Politur — Dark Mode, Rückgängig/Wiederholen, responsive Vorschau.',
        },
        supportingItems: {
            blocks: {
                title: 'Blöcke von Anfang an',
                description: 'Zwölf Blocktypen zum Hineinziehen — Titel, Absatz, Bild, Button, Section, Trennlinie, Abstand, Social-Icons, Menü, Tabelle, Video und rohes HTML — plus alle eigenen Typen, die Sie registrieren.',
            },
            framework: {
                title: 'Framework-Integration ohne Aufwand',
                description: 'Ein init()-Aufruf zum Einbinden, einer zum Entfernen. Erstklassige Beispiele für React, Vue, Svelte, Angular und Vanilla JS.',
            },
            darkMode: {
                title: 'Dark Mode',
                description: 'Erstklassiger Dark Mode mit Auto-Erkennung oder manuellem Umschalter. Beide Themes sind durchdacht, kein Nachgedanke.',
            },
            i18n: {
                title: 'Internationalisierung',
                description: 'Sieben Sprachen eingebaut — Englisch, Deutsch, Portugiesisch (BR), Spanisch, Katalanisch, Französisch und Niederländisch — im Editor und in der Medien-Bibliothek. Für jede weitere Sprache genügt eine Datei.',
            },
            undoRedo: {
                title: 'Rückgängig / Wiederholen',
                description: 'Vollständiger Verlauf. Debounced, um schnelle Änderungen zu sinnvollen Undo-Schritten zu gruppieren.',
            },
            responsivePreview: {
                title: 'Responsive Vorschau',
                description: 'Wechseln Sie Desktop-, Tablet- und Mobile-Ansichten, um zu sehen, wie jede E-Mail auf jedem Gerät rendert.',
            },
        },
        migration: {
            eyebrow: 'Schmerzlose Migration',
            title: 'Schon in einem anderen Editor? Bringen Sie Ihre Vorlagen mit.',
            description:
                'Importieren Sie bestehende Vorlagen aus großen Hosted-Editoren — oder jede HTML-E-Mail, die Sie schon haben. Kostenlose, quelloffene Migrations-Tools, kein manuelles Nachbauen, kein Vendor-Lock-in.',
            features: [
                'Bestehende JSON-Vorlagen direkt importieren',
                'Rohes HTML konvertieren — MJML, Mailchimp, SendGrid, handgeschrieben',
                'Automatisches Block-Mapping und Stil-Erhalt',
                'Kostenlose und Open-Source Migrations-Tools',
            ],
            guideCtaBeefree: 'Von BeeFree migrieren',
            guideCtaUnlayer: 'Von Unlayer migrieren',
            guideCtaHtml: 'Von HTML migrieren',
        },
        cta: {
            eyebrow: 'Loslegen',
            headline: 'Wählen Sie Ihren Startpunkt.',
            install: {
                title: 'SDK installieren',
                description:
                    'Paket hinzufügen, mit einem init()-Aufruf einbinden, ausliefern. Erstklassige Beispiele für jedes große Framework.',
                cta: 'Zur Installations-Anleitung',
            },
            migrate: {
                title: 'Vorlagen migrieren',
                description:
                    'Schon in einem Hosted-Editor — oder mit einem Ordner voller HTML-E-Mails? Importieren Sie sie mit automatischem Block-Mapping, ohne manuelles Nachbauen.',
                ctaBeefree: 'Von BeeFree',
                ctaUnlayer: 'Von Unlayer',
                ctaHtml: 'Von HTML',
            },
        },
    },
    alternatives: {
        topol: {
            meta: {
                title: 'Eine Open-Source-Alternative zu Topol Plugin — Templatical',
                description:
                    'Ein belegter Direktvergleich: Preise pro Nutzer, domaingebundene API-Schlüssel, wer den Editor betreibt und woran die Ausgabe hängt.',
            },
            hero: {
                eyebrow: 'Vergleich',
                headline: 'Eine Open-Source-Alternative zu Topol Plugin',
                subheadline:
                    'Beide bringen einen Drag-and-Drop-E-Mail-Editor in Ihr Produkt. Topol ist unter den gehosteten Buildern am großzügigsten dabei, was pro Tarif enthalten ist — es bleiben die Fragen, wer den Editor betreibt, ob Ihre Rechnung mit Ihren Nutzern wächst und wem die Ausgabe gehört. Alles Folgende ist anhand öffentlicher Quellen überprüfbar.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            table: {
                heading: 'Templatical vs. Topol Plugin',
                colFeature: 'Merkmal',
                colThem: 'Topol Plugin',
                colUs: 'Templatical',
                notDocumented: 'Nicht dokumentiert',
                rows: {
                    pricing: {
                        label: 'Preise',
                        us: 'Kostenlos, in jeder Ausbaustufe',
                        them: '14 Tage Testphase, danach 70, 140 oder 300 $ pro Monat',
                    },
                    users: {
                        label: 'Endnutzer-Limits',
                        us: 'Keine. Der Editor kennt und zählt Ihre Nutzer nicht.',
                        them: '50, 100 oder 500 Nutzer enthalten; darüber 1,60, 1,40 oder 0,70 $ je weiterem Nutzer und Monat',
                    },
                    domains: {
                        label: 'Domain-Bindung',
                        us: 'Keine. Betreiben Sie ihn, wo Sie möchten.',
                        them: 'Der API-Schlüssel ist an angegebene Domains gebunden und funktioniert auf keiner anderen',
                    },
                    hosting: {
                        label: 'Wer den Editor betreibt',
                        us: 'Sie. Der Editor liegt in Ihrem Bundle und läuft in Ihrer Seite',
                        them: 'Topol. Das npm-Paket lädt zur Laufzeit deren Loader-Skript nach',
                    },
                    activation: {
                        label: 'Aktivierung zur Laufzeit',
                        us: 'Keine. Kein API-Schlüssel, keine Domain-Bindung, kein Aufruf an uns.',
                        them: 'Ein API-Schlüssel, gebunden an Ihre registrierten Domains',
                    },
                    whiteLabel: {
                        label: 'White-Labeling',
                        us: 'Standard. Es gibt kein Branding zu entfernen.',
                        them: 'In jedem Tarif enthalten',
                    },
                    customBlocks: {
                        label: 'Eigene Blöcke',
                        us: 'Unbegrenzt, in Ihrem eigenen Code definiert',
                        them: 'In jedem Tarif enthalten',
                    },
                    storage: {
                        label: 'Bildspeicher',
                        us: 'Ihrer. Der Editor ruft Ihren onRequestMedia-Hook auf.',
                        them: 'Unbegrenzt, von ihnen gehostet; eigener Cloud-Speicher in höheren Tarifen',
                    },
                    frameworks: {
                        label: 'Framework-Unterstützung',
                        us: 'Ein init()-Aufruf — React, Vue, Svelte, Angular und Vanilla JS',
                        them: 'Offizielle Pakete für React, Vue und Svelte',
                    },
                    source: {
                        label: 'Quellcode-Zugang',
                        us: 'Vollständiger Quellcode in einem öffentlichen Repository',
                        them: 'Das Loader-Paket ist Apache-2.0; der davon geladene Editor ist nicht veröffentlicht',
                    },
                    licence: {
                        label: 'Lizenz',
                        us: 'FSL-1.1-MIT, zwei Jahre nach jedem Release automatisch MIT',
                        them: 'Kommerzielles Abonnement',
                    },
                    output: {
                        label: 'Ausgabeformat',
                        us: 'MJML und JSON',
                        them: 'HTML und deren eigenes JSON. MJML ist ihre interne Render-Engine, nicht etwas, das Sie erhalten',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Passt am besten',
                headline: 'Wofür Sie sich entscheiden sollten',
                subheadline:
                    'Die Tabelle liefert die Details, hier steht die Entscheidung. Wenn ein Punkt in der rechten Spalte für Sie eine Anforderung ist, kaufen Sie deren Produkt — dann ist es die bessere Wahl, und das sollen Sie ruhig wissen.',
                usTitle: 'Templatical, wenn',
                themTitle: 'Topol Plugin, wenn',
                us: {
                    cost: 'Der Editor nicht pro Endnutzer abgerechnet werden soll. Templatical rechnet sie nicht ab.',
                    domains: 'Sie den Editor auf mehr als einer Domain betreiben oder auf Domains, die Sie nicht vorab registrieren können.',
                    ownership: 'Der Editor in Ihrem eigenen Bundle laufen soll, statt zur Laufzeit von einem Anbieter-Loader nachgeladen zu werden.',
                    output: 'Sie das exportierte Artefakt besitzen wollen. Templatical liefert Ihnen MJML — einen offenen Standard mit einer MIT-lizenzierten Implementierung, die Sie selbst betreiben können; Topol kompiliert intern über MJML, liefert Ihnen aber HTML und eigenes JSON.',
                    source: 'Sie den vollständigen Quellcode wollen und eine Lizenz, die zwei Jahre nach jedem Release zu MIT wird.',
                },
                them: {
                    operated: 'Sie den Editor lieber von jemand anderem betreiben lassen, inklusive Hosting und Verfügbarkeit.',
                    storage: 'Sie Bildspeicher mitgeliefert haben wollen. Topol hostet ihn für Sie; Templatical hat keinen und erwartet, dass Sie ihn beisteuern.',
                    comments: 'Sie Kommentare zu Vorlagen direkt im Editor wollen, ohne dafür etwas bauen zu müssen. Topol bietet das ab dem Business-Tarif (300 $/Monat); Templatical liefert Kommentare als Open-Source-Provider, den Sie gegen Ihren eigenen Speicher und Ihre Identitäten implementieren — mehr Aufwand als ein Tarif-Feature, das Sie einfach einschalten.',
                    templates: 'Sie eine fertige Vorlagen-Bibliothek wollen, mit der Ihre Nutzer sofort starten können.',
                    support: 'Sie einen kommerziellen Anbieter hinter dem Editor wollen, mit E-Mail-Support zu Geschäftszeiten, statt eines Open-Source-Projekts.',
                },
            },
            close: {
                headline: 'Probieren Sie es aus, bevor Sie all das abwägen',
                body: 'Der Playground startet den echten Editor ohne Anmeldung. Wenn er nicht zu Ihrem Produkt passt, ist der Rest ohnehin belanglos.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            footnote: {
                verified:
                    'Geprüft am 8. August 2026 gegen {\'@\'}topol.io/editor 0.3.0 in der auf npm veröffentlichten Fassung sowie gegen die an diesem Tag auf topol.io angegebenen Tarife. Preise und Funktionen ändern sich — aktuelle Konditionen finden Sie auf deren Website.',
                notDocumented:
                    '„Nicht dokumentiert“ bedeutet, dass wir zum Prüfdatum keinen Hinweis auf die Funktion in der öffentlichen Dokumentation oder im Marketing gefunden haben — nicht, dass sie unmöglich umzusetzen wäre.',
                trademark:
                    'Topol ist eine Marke des jeweiligen Inhabers. Diese Seite wird von Templatical gepflegt und steht weder in Verbindung mit dem Anbieter noch wird sie von ihm unterstützt.',
                sourcesLabel: 'Quellen',
                stale: 'Diese Seite ist eine Momentaufnahme, kein dauerhafter Anspruch — auch das, was Topol Plugin laut uns besser macht. Falls hier etwas veraltet oder falsch ist,',
                staleCta: 'melden Sie es uns',
            },
        },
        grapesjs: {
            meta: {
                title: 'Templatical vs. GrapesJS — E-Mail-Editor oder Web-Builder-Framework',
                description:
                    'Ein belegter Vergleich zweier Open-Source-Projekte: ein spezialisiertes E-Mail-Editor-SDK gegen ein allgemeines Web-Builder-Framework mit E-Mail-Plugins.',
            },
            hero: {
                eyebrow: 'Vergleich',
                headline: 'Templatical und GrapesJS sind beide Open Source',
                subheadline:
                    'Es geht hier also nicht um Lizenzen oder Kosten — beide sind kostenlos, beide laufen in Ihrem eigenen Bundle, und beide können MJML ausgeben. Die eigentliche Frage ist, ob Sie einen E-Mail-Editor wollen oder ein Framework, auf dem Sie einen bauen. Alles Folgende ist anhand öffentlicher Quellen überprüfbar.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            table: {
                heading: 'Templatical vs. GrapesJS',
                colFeature: 'Merkmal',
                colThem: 'GrapesJS',
                colUs: 'Templatical',
                notDocumented: 'Nicht dokumentiert',
                rows: {
                    cost: {
                        label: 'Kosten',
                        us: 'Kostenlos',
                        them: 'Kostenlos — genauso',
                    },
                    licence: {
                        label: 'Lizenz',
                        us: 'FSL-1.1-MIT, zwei Jahre nach jedem Release automatisch MIT',
                        them: 'BSD-3-Clause — heute freizügiger als unsere, ohne Einschränkung und ohne Wartezeit',
                    },
                    runs: {
                        label: 'Wer den Editor betreibt',
                        us: 'Sie, in Ihrem eigenen Bundle',
                        them: 'Sie, in Ihrem eigenen Bundle — genauso',
                    },
                    source: {
                        label: 'Quellcode-Zugang',
                        us: 'Vollständiger Quellcode in einem öffentlichen Repository',
                        them: 'Vollständiger Quellcode in einem öffentlichen Repository — genauso',
                    },
                    builtFor: {
                        label: 'Gebaut für',
                        us: 'E-Mails, und sonst nichts',
                        them: 'Allgemeines Web-Building — Seiten, Apps, beliebige HTML-Dokumente; Newsletter sind einer der beworbenen Einsatzzwecke',
                    },
                    emailSupport: {
                        label: 'E-Mail-Unterstützung',
                        us: 'Nativ. Das Blockmodell ist das E-Mail-Modell.',
                        them: 'Über grapesjs-mjml — ein offizielles Plugin aus der GrapesJS-Organisation, das 20 MJML-Komponenten abdeckt',
                    },
                    output: {
                        label: 'MJML-Ausgabe',
                        us: 'Eingebaut, über den MIT-Renderer',
                        them: 'Über das Plugin grapesjs-mjml verfügbar',
                    },
                    mergeTags: {
                        label: 'Merge-Tags',
                        us: 'Eingebaut — Picker, Live-Labels, austauschbare Syntax',
                        them: 'Bauen Sie selbst',
                    },
                    conditions: {
                        label: 'Anzeigebedingungen',
                        us: 'Eingebaut, mit Live-Vorschau',
                        them: 'Bauen Sie selbst',
                    },
                    savedBlocks: {
                        label: 'Wiederverwendbare gespeicherte Blöcke',
                        us: 'Eingebaut, über einen Speicher-Provider, den Sie stellen',
                        them: 'Der Block Manager ist eine von Entwicklern definierte Palette; dass Endnutzer eigene Gruppen speichern, bauen Sie selbst',
                    },
                    testSend: {
                        label: 'Testversand',
                        us: 'Eingebaut, über einen Provider, den Sie stellen',
                        them: 'Bauen Sie selbst',
                    },
                    linting: {
                        label: 'Qualitätsprüfung für Vorlagen',
                        us: '30 Regeln für Barrierefreiheit, Struktur und Links, MIT',
                        them: 'Bauen Sie selbst',
                    },
                    clientCompat: {
                        label: 'E-Mail-Client-Kompatibilität',
                        us: 'Von MJML getragen — Outlook, Gmail-Clipping, Apple Mail',
                        them: 'Genauso, über grapesjs-mjml — es kompiliert ebenfalls mit MJML',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Passt am besten',
                headline: 'Wofür Sie sich entscheiden sollten',
                subheadline:
                    'Keines von beiden ist die günstige Option — beide sind kostenlos. Es geht darum, wofür Sie Entwicklungszeit ausgeben wollen. Wenn ein Punkt in der rechten Spalte für Sie eine Anforderung ist, nehmen Sie GrapesJS; dann ist es die bessere Wahl, und das sollen Sie ruhig wissen.',
                usTitle: 'Templatical, wenn',
                themTitle: 'GrapesJS, wenn',
                us: {
                    purpose: 'Sie gezielt einen E-Mail-Editor bauen und wollen, dass die E-Mail-spezifischen Funktionen bereits existieren.',
                    features: 'Sie Merge-Tags, Anzeigebedingungen, gespeicherte Blöcke, Testversand und Barrierefreiheits-Prüfung wollen, ohne jedes davon selbst zu bauen.',
                    previews: 'Sie E-Mail-spezifische Vorschauen wollen — mobil und Desktop, Dark Mode, Merge-Tags mit Beispielwerten aufgelöst — statt einer generischen Canvas-Vorschau.',
                    dropIn: 'Sie einen init()-Aufruf zum Einbinden wollen statt einer Canvas, um die herum Sie einen Editor bauen.',
                    defaults: 'Sie sinnvolle E-Mail-Voreinstellungen ab Werk wollen statt eines leeren Frameworks zum Konfigurieren.',
                },
                them: {
                    scope: 'Sie mehr als E-Mails brauchen — Landingpages, App-Oberflächen, beliebige HTML-Dokumente. Templatical macht E-Mails und sonst nichts.',
                    freedom: 'Sie Layout-Freiheit jenseits von MJML wollen — und in Kauf nehmen, dass Sie damit die E-Mail-Client-Kompatibilität selbst verantworten, denn genau die liefert das MJML-Plugin.',
                    licence: 'Sie eine freizügigere Lizenz brauchen. BSD-3-Clause hat keine Wettbewerbsklausel und keine Zwei-Jahres-Wartezeit; unsere schon.',
                    control: 'Sie das Editor-Framework selbst kontrollieren wollen statt ein fertiges Produkt zu nutzen.',
                    reuse: 'Sie GrapesJS bereits anderswo einsetzen und lieber einen Editor über alle Oberflächen hinweg hätten.',
                },
            },
            close: {
                headline: 'Auf grapesjs-mjml? Nehmen Sie Ihre Vorlagen mit',
                body: 'Wenn Ihr GrapesJS-Setup bereits MJML ausgibt, ist das genau das Format, in dem Templatical nativ arbeitet — eine Evaluierung kann also mit Ihren echten Designs starten.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            migration: {
                label: 'Zur MJML-Migrationsanleitung',
            },
            footnote: {
                verified:
                    'Geprüft am 8. August 2026 gegen grapesjs 0.23.4 und grapesjs-mjml 1.0.8 in den auf npm veröffentlichten Fassungen. Diese Seite vergleicht das Open-Source-Framework; GrapesJS vertreibt zusätzlich Studio SDK, einen kommerziellen eingebetteten Editor, dessen Preise nur auf Anfrage verfügbar sind und der deshalb hier nicht verglichen wird.',
                notDocumented:
                    '„Bauen Sie selbst“ heißt, dass die Funktion nicht ab Werk mitgeliefert wird — nicht, dass sie schwierig oder nicht unterstützt wäre. GrapesJS ist ein Framework, und darauf zu bauen ist der Sinn der Sache.',
                trademark:
                    'GrapesJS ist eine Marke des jeweiligen Inhabers. Diese Seite wird von Templatical gepflegt und steht weder in Verbindung mit dem Anbieter noch wird sie von ihm unterstützt.',
                sourcesLabel: 'Quellen',
                stale: 'Diese Seite ist eine Momentaufnahme, kein dauerhafter Anspruch — auch das, was GrapesJS laut uns besser macht. Falls hier etwas veraltet oder falsch ist,',
                staleCta: 'melden Sie es uns',
            },
        },
        chamaileon: {
            meta: {
                title: 'Eine Open-Source-Alternative zu Chamaileon SDK — Templatical',
                description:
                    'Ein belegter Direktvergleich: doppelte Abrechnung nach Nutzern und Exporten, ein Editor im iframe, Pflicht-Token und woran die Ausgabe hängt.',
            },
            hero: {
                eyebrow: 'Vergleich',
                headline: 'Eine Open-Source-Alternative zu Chamaileon SDK',
                subheadline:
                    'Beide bringen einen Drag-and-Drop-E-Mail-Editor in Ihr Produkt. Chamaileon betreibt seinen Editor in einem iframe, den es selbst ausliefert, rechnet Nutzer und Exporte gleichzeitig ab und braucht zum Start ein Token. Alles Folgende ist anhand öffentlicher Quellen überprüfbar.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            table: {
                heading: 'Templatical vs. Chamaileon SDK',
                colFeature: 'Merkmal',
                colThem: 'Chamaileon SDK',
                colUs: 'Templatical',
                notDocumented: 'Nicht dokumentiert',
                rows: {
                    pricing: {
                        label: 'Preise',
                        us: 'Kostenlos, in jeder Ausbaustufe',
                        them: 'Kostenloser Starter, danach 200 oder 600 $ pro Monat, dazu Enterprise',
                    },
                    metering: {
                        label: 'Was abgerechnet wird',
                        us: 'Nichts. Kein Zähler für Nutzer, Vorlagen oder Exporte.',
                        them: 'Zwei Zähler gleichzeitig — monatlich aktive Nutzer und Generator-Aufrufe',
                    },
                    users: {
                        label: 'Monatlich aktive Nutzer',
                        us: 'Unbegrenzt',
                        them: '10 in Starter, 200 in Standard, 1.000 in Scale',
                    },
                    exports: {
                        label: 'Export-Grenzen',
                        us: 'Keine. Rendern Sie so oft Sie möchten.',
                        them: 'Generator-Aufrufe: 100, 500 oder 15.000 pro Monat. Jeder HTML-Export zählt als einer, und sie rechnen mit 2–3 pro Kampagne für Review und QA',
                    },
                    mount: {
                        label: 'Wie er eingebunden wird',
                        us: 'In Ihrer Seite, in einem Shadow Root, den Sie kontrollieren',
                        them: 'In einem iframe, den sie ausliefern, nach dem Laden der Konfiguration von ihren Servern',
                    },
                    activation: {
                        label: 'Aktivierung zur Laufzeit',
                        us: 'Keine. Kein Token, kein Konfigurations-Abruf, kein Aufruf an uns.',
                        them: 'Ein Access-Token, das Sie erzeugen und etwa alle 24 Stunden erneuern',
                    },
                    whiteLabel: {
                        label: 'White-Labeling',
                        us: 'Standard. Es gibt kein Branding zu entfernen.',
                        them: 'In jedem Tarif enthalten',
                    },
                    headless: {
                        label: 'Headless-Rendering',
                        us: 'Der MIT-Renderer läuft überall, ohne Dienst und ohne Limit',
                        them: 'Über deren API verfügbar; jeder Export zählt gegen die Generator-Aufrufe',
                    },
                    source: {
                        label: 'Quellcode-Zugang',
                        us: 'Vollständiger Quellcode in einem öffentlichen Repository',
                        them: 'Der npm-Shim steht unter eigenen Bedingungen; der davon geladene Editor ist nicht veröffentlicht',
                    },
                    licence: {
                        label: 'Lizenz',
                        us: 'FSL-1.1-MIT, zwei Jahre nach jedem Release automatisch MIT',
                        them: 'Kommerzielles Abonnement',
                    },
                    output: {
                        label: 'Ausgabeformat',
                        us: 'MJML und JSON',
                        them: 'HTML und deren eigenes JSON',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Passt am besten',
                headline: 'Wofür Sie sich entscheiden sollten',
                subheadline:
                    'Die Tabelle liefert die Details, hier steht die Entscheidung. Wenn ein Punkt in der rechten Spalte für Sie eine Anforderung ist, kaufen Sie deren Produkt — dann ist es die bessere Wahl, und das sollen Sie ruhig wissen.',
                usTitle: 'Templatical, wenn',
                themTitle: 'Chamaileon SDK, wenn',
                us: {
                    metering: 'Sie nicht zwei Zähler laufen haben wollen — einen dafür, wie viele Menschen den Editor öffnen, und einen für jeden Export.',
                    mount: 'Der Editor in Ihrer eigenen Seite laufen und mit Ihren eigenen Tokens gestaltbar sein soll, statt in einem fremd ausgelieferten iframe.',
                    ownership: 'Der Editor ohne Token und ohne Konfigurations-Abruf bei Dritten starten muss.',
                    output: 'Sie portable Ausgabe wollen. Templatical exportiert MJML — einen offenen Standard mit einer MIT-lizenzierten Implementierung, die Sie selbst betreiben können.',
                    source: 'Sie den vollständigen Quellcode wollen und eine Lizenz, die zwei Jahre nach jedem Release zu MIT wird.',
                },
                them: {
                    modular: 'Sie die Bestandteile einzeln einbetten wollen — Editor, Vorschau, Galerie, Variablen-Editor — statt einer einzigen Editor-Komponente.',
                    brand: 'Sie viele Marken verwalten und ein Brand-Design-System wollen, das Schriften, Farben und Logos über alle hinweg durchsetzt.',
                    operated: 'Sie den Editor lieber von jemand anderem betreiben lassen, inklusive Hosting und Verfügbarkeit.',
                    gallery: 'Sie eine Asset-Galerie als Teil des SDK wollen. Chamaileon bringt eine mit; Templatical erwartet, dass Sie den Picker stellen.',
                    support: 'Sie einen kommerziellen Anbieter mit benanntem technischem Ansprechpartner in deren Enterprise-Tarif wollen statt eines Open-Source-Projekts.',
                },
            },
            close: {
                headline: 'Probieren Sie es aus, bevor Sie all das abwägen',
                body: 'Der Playground startet den echten Editor ohne Anmeldung. Wenn er nicht zu Ihrem Produkt passt, ist der Rest ohnehin belanglos.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            footnote: {
                verified:
                    'Geprüft am 8. August 2026 gegen {\'@\'}chamaileon-sdk/plugins 1.1.5 in der auf npm veröffentlichten Fassung sowie gegen die an diesem Tag auf chamaileon.io angegebenen Tarife. Preise und Funktionen ändern sich — aktuelle Konditionen finden Sie auf deren Website.',
                notDocumented:
                    '„Nicht dokumentiert“ bedeutet, dass wir zum Prüfdatum keinen Hinweis auf die Funktion in der öffentlichen Dokumentation oder im Marketing gefunden haben — nicht, dass sie unmöglich umzusetzen wäre.',
                trademark:
                    'Chamaileon ist eine Marke des jeweiligen Inhabers. Diese Seite wird von Templatical gepflegt und steht weder in Verbindung mit dem Anbieter noch wird sie von ihm unterstützt.',
                sourcesLabel: 'Quellen',
                stale: 'Diese Seite ist eine Momentaufnahme, kein dauerhafter Anspruch — auch das, was Chamaileon SDK laut uns besser macht. Falls hier etwas veraltet oder falsch ist,',
                staleCta: 'melden Sie es uns',
            },
        },
        stripo: {
            meta: {
                title: 'Eine Open-Source-Alternative zu Stripo Plugin — Templatical',
                description:
                    'Ein belegter Direktvergleich: Wie Stripo die Nutzung abrechnet, was an welchen Tarif gebunden ist, wer den Editor betreibt und woran die Ausgabe hängt.',
            },
            hero: {
                eyebrow: 'Vergleich',
                headline: 'Eine Open-Source-Alternative zu Stripo Plugin',
                subheadline:
                    'Beide bringen einen Drag-and-Drop-E-Mail-Editor in Ihr Produkt. Sie unterscheiden sich darin, wer den Editor betreibt und woran Ihre Rechnung hängt — Stripo zählt die E-Mails, die Ihre Nutzer gestalten. Alles Folgende ist anhand öffentlicher Quellen überprüfbar.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            table: {
                heading: 'Templatical vs. Stripo Plugin',
                colFeature: 'Merkmal',
                colThem: 'Stripo Plugin',
                colUs: 'Templatical',
                notDocumented: 'Nicht dokumentiert',
                rows: {
                    pricing: {
                        label: 'Preise',
                        us: 'Kostenlos, in jeder Ausbaustufe',
                        them: 'Kostenlos, danach 100 oder 550 $ pro Monat, dazu Enterprise',
                    },
                    metering: {
                        label: 'Was abgerechnet wird',
                        us: 'Nichts. Kein Zähler für Vorlagen, Nutzer oder Exporte.',
                        them: 'Pro Monat gestaltete Unique-E-Mails: 100 kostenlos, 400 in Startup, 15.000 in Business',
                    },
                    overage: {
                        label: 'Bei Überschreitung',
                        us: 'Nicht zutreffend',
                        them: '0,50 $ je weiterer Unique-E-Mail in Startup, 0,10 $ in Business',
                    },
                    branding: {
                        label: 'Branding entfernen',
                        us: 'Standard. Es gibt kein Branding zu entfernen.',
                        them: 'Ab Startup (100 $/Monat); der kostenlose Tarif trägt Stripo-Branding',
                    },
                    customBlocks: {
                        label: 'Eigene Blöcke',
                        us: 'Unbegrenzt, in Ihrem eigenen Code definiert',
                        them: 'Ab Business (550 $/Monat)',
                    },
                    storage: {
                        label: 'Bildspeicher',
                        us: 'Ihrer. Der Editor ruft Ihren onRequestMedia-Hook auf.',
                        them: '30 GB kostenlos, 200 GB in Startup, ab Business unbegrenzt',
                    },
                    hosting: {
                        label: 'Wer den Editor betreibt',
                        us: 'Sie. Der Editor liegt in Ihrem Bundle und läuft in Ihrer Seite',
                        them: 'Stripo. Die Serverkomponenten laufen auf deren Infrastruktur; Selbst-Hosting ist eine Enterprise-Option',
                    },
                    source: {
                        label: 'Quellcode-Zugang',
                        us: 'Vollständiger Quellcode in einem öffentlichen Repository',
                        them: 'Nicht veröffentlicht',
                    },
                    licence: {
                        label: 'Lizenz',
                        us: 'FSL-1.1-MIT, zwei Jahre nach jedem Release automatisch MIT',
                        them: 'Kommerzielles Abonnement',
                    },
                    support: {
                        label: 'Dedizierter Support',
                        us: 'Community, über GitHub',
                        them: 'Dedizierter Slack-Kanal in Enterprise',
                    },
                    output: {
                        label: 'Ausgabeformat',
                        us: 'MJML und JSON',
                        them: 'HTML und CSS, im Austausch mit Ihrer Plattform',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Passt am besten',
                headline: 'Wofür Sie sich entscheiden sollten',
                subheadline:
                    'Die Tabelle liefert die Details, hier steht die Entscheidung. Wenn ein Punkt in der rechten Spalte für Sie eine Anforderung ist, kaufen Sie deren Produkt — dann ist es die bessere Wahl, und das sollen Sie ruhig wissen.',
                usTitle: 'Templatical, wenn',
                themTitle: 'Stripo Plugin, wenn',
                us: {
                    metering: 'Sie keinen Monatszähler dafür wollen, wie viele E-Mails Ihre Nutzer gestalten dürfen.',
                    cost: 'Sie eigene Blöcke und Ausgabe ohne Fremd-Branding wollen, ohne dass beides in getrennten Bezahltarifen liegt.',
                    ownership: 'Der Editor in Ihrem eigenen Bundle laufen soll, ohne dass es dafür einen Enterprise-Vertrag braucht.',
                    output: 'Sie portable Ausgabe wollen. Templatical exportiert MJML — einen offenen Standard mit einer MIT-lizenzierten Implementierung, die Sie selbst betreiben können.',
                    source: 'Sie den vollständigen Quellcode wollen und eine Lizenz, die zwei Jahre nach jedem Release zu MIT wird.',
                },
                them: {
                    templates: 'Sie eine große Bibliothek fertiger und premium Vorlagen wollen, mit der Ihre Nutzer starten können.',
                    operated: 'Sie den Editor lieber von jemand anderem betreiben lassen, inklusive Hosting und Speicher.',
                    modules: 'Sie AMP und interaktive Module von einem Anbieter gepflegt haben wollen, statt sie selbst zu bauen.',
                    tooling: 'Sie eingebaute Bildbearbeitung und Stock-Inhalte zusammen mit dem Editor wollen.',
                    support: 'Sie einen kommerziellen Anbieter mit dediziertem Support-Kanal wollen statt eines Open-Source-Projekts.',
                },
            },
            close: {
                headline: 'Probieren Sie es aus, bevor Sie all das abwägen',
                body: 'Der Playground startet den echten Editor ohne Anmeldung. Wenn er nicht zu Ihrem Produkt passt, ist der Rest ohnehin belanglos.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            footnote: {
                verified:
                    'Geprüft am 8. August 2026 gegen die auf stripo.email veröffentlichten Tarife und den Tarifvergleich in deren Support-Center. Preise und Funktionen ändern sich — aktuelle Konditionen finden Sie auf deren Website.',
                notDocumented:
                    '„Nicht dokumentiert“ bedeutet, dass wir zum Prüfdatum keinen Hinweis auf die Funktion in der öffentlichen Dokumentation oder im Marketing gefunden haben — nicht, dass sie unmöglich umzusetzen wäre.',
                trademark:
                    'Stripo ist eine Marke des jeweiligen Inhabers. Diese Seite wird von Templatical gepflegt und steht weder in Verbindung mit dem Anbieter noch wird sie von ihm unterstützt.',
                sourcesLabel: 'Quellen',
                stale: 'Diese Seite ist eine Momentaufnahme, kein dauerhafter Anspruch — auch das, was Stripo Plugin laut uns besser macht. Falls hier etwas veraltet oder falsch ist,',
                staleCta: 'melden Sie es uns',
            },
        },
        unlayer: {
            meta: {
                title: 'Eine Open-Source-Alternative zu Unlayer — Templatical',
                description:
                    'Ein belegter Direktvergleich: Hosting-Modell, Domain- und Tarif-Grenzen, Portabilität der Ausgabe und wie Sie bestehende Unlayer-Vorlagen migrieren.',
            },
            hero: {
                eyebrow: 'Vergleich',
                headline: 'Eine Open-Source-Alternative zu Unlayer',
                subheadline:
                    'Beide bringen einen Drag-and-Drop-E-Mail-Editor in Ihr Produkt. Sie unterscheiden sich darin, wer den Editor betreibt, wie weit Sie ihn erweitern können, bevor eine Grenze greift, und ob die Ausgabe Ihnen gehört. Alles Folgende ist anhand öffentlicher Quellen überprüfbar.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            table: {
                heading: 'Templatical vs. Unlayer',
                colFeature: 'Merkmal',
                colThem: 'Unlayer',
                colUs: 'Templatical',
                notDocumented: 'Nicht dokumentiert',
                rows: {
                    pricing: {
                        label: 'Preise',
                        us: 'Kostenlos, in jeder Ausbaustufe',
                        them: 'Kostenlose Stufe, danach 250, 750 oder 2.000 $ pro Monat, dazu Enterprise',
                    },
                    domains: {
                        label: 'Domain-Grenzen',
                        us: 'Keine. Betreiben Sie ihn auf so vielen Domains, wie Sie möchten.',
                        them: '1 Domain in Free und Launch, 3 in Scale und Optimize',
                    },
                    customTools: {
                        label: 'Eigene Blocktypen',
                        us: 'Unbegrenzt, in Ihrem eigenen Code definiert',
                        them: 'Begrenzte Custom Tools: 1 in Launch, 3 in Scale, 5 in Optimize',
                    },
                    savedBlocks: {
                        label: 'Wiederverwendbare gespeicherte Blöcke',
                        us: 'Unbegrenzt, gespeichert wo Sie möchten',
                        them: 'Custom Blocks ab Scale (750 $/Monat)',
                    },
                    whiteLabel: {
                        label: 'White-Labeling',
                        us: 'Standard. Es gibt kein Branding zu entfernen.',
                        them: 'Ab Launch (250 $/Monat)',
                    },
                    hosting: {
                        label: 'Wer den Editor betreibt',
                        us: 'Sie. Der Editor liegt in Ihrem Bundle und läuft in Ihrer Seite',
                        them: 'Unlayer. Das Embed lädt den Editor von deren CDN; Selbst-Hosting ist eine Enterprise-Option',
                    },
                    activation: {
                        label: 'Aktivierung zur Laufzeit',
                        us: 'Keine. Keine Projekt-ID, keine Domain-Freigabe, kein Aufruf an uns.',
                        them: 'Eine Projekt-ID mit freigegebenen Domains für den Produktivbetrieb',
                    },
                    source: {
                        label: 'Quellcode-Zugang',
                        us: 'Vollständiger Quellcode in einem öffentlichen Repository',
                        them: 'Der React-Wrapper ist MIT; der davon geladene Editor ist nicht veröffentlicht',
                    },
                    licence: {
                        label: 'Lizenz',
                        us: 'FSL-1.1-MIT, zwei Jahre nach jedem Release automatisch MIT',
                        them: 'Kommerzielles Abonnement',
                    },
                    scope: {
                        label: 'Umfang',
                        us: 'Nur E-Mails',
                        them: 'E-Mails, Seiten, Popups und Dokumente',
                    },
                    amp: {
                        label: 'AMP-E-Mail',
                        us: 'Nicht unterstützt und nicht geplant',
                        them: 'Ab Optimize (2.000 $/Monat)',
                    },
                    output: {
                        label: 'Ausgabeformat',
                        us: 'MJML und JSON',
                        them: 'HTML und deren eigenes Design-JSON',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Passt am besten',
                headline: 'Wofür Sie sich entscheiden sollten',
                subheadline:
                    'Die Tabelle liefert die Details, hier steht die Entscheidung. Wenn ein Punkt in der rechten Spalte für Sie eine Anforderung ist, kaufen Sie deren Produkt — dann ist es die bessere Wahl, und das sollen Sie ruhig wissen.',
                usTitle: 'Templatical, wenn',
                themTitle: 'Unlayer, wenn',
                us: {
                    cost: 'Der Editor weder nach Tarif abgerechnet noch durch die Zahl Ihrer Domains begrenzt sein soll.',
                    extensibility: 'Sie mehr als eine Handvoll eigener Blocktypen erwarten. Templatical begrenzt sie nicht; Unlayer erlaubt je nach Tarif 1 bis 5.',
                    ownership: 'Der Editor in Ihrem eigenen Bundle laufen soll, ohne dass es dafür einen Enterprise-Vertrag braucht.',
                    output: 'Sie portable Ausgabe wollen. Templatical exportiert MJML — einen offenen Standard mit einer MIT-lizenzierten Implementierung, die Sie selbst betreiben können; eine Unlayer-Vorlage ist deren Design-JSON, gerendert von deren Engine.',
                    source: 'Sie den vollständigen Quellcode wollen und eine Lizenz, die zwei Jahre nach jedem Release zu MIT wird.',
                },
                them: {
                    scope: 'Sie neben E-Mails auch Seiten, Popups und Dokumente brauchen. Templatical ist auf E-Mails beschränkt und soll es bleiben.',
                    operated: 'Sie den Editor lieber von jemand anderem betreiben lassen, inklusive Hosting und Verfügbarkeit.',
                    amp: 'Sie AMP-E-Mails versenden. Templatical unterstützt AMP nicht und hat es auch nicht vor.',
                    tooling: 'Sie einen eingebauten Bildeditor und Stock-Bilder wollen. Unlayer liefert Stock-Bilder in jedem Tarif und den Bildeditor ab Launch (250 $/Monat).',
                    support: 'Sie einen kommerziellen Anbieter hinter dem Editor wollen, mit einem dedizierten Customer Success Manager in deren Enterprise-Tarif.',
                },
            },
            close: {
                headline: 'Schon auf Unlayer? Nehmen Sie Ihre Vorlagen mit',
                body: 'Templatical liefert einen MIT-lizenzierten Konverter für Unlayer-Vorlagen — eine Evaluierung startet also mit Ihren echten Designs statt mit einer leeren Seite.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            migration: {
                label: 'Zur Unlayer-Migrationsanleitung',
            },
            footnote: {
                verified:
                    'Geprüft am 8. August 2026 gegen react-email-editor 2.0.0 in der auf npm veröffentlichten Fassung sowie gegen die an diesem Tag auf unlayer.com angegebenen Tarife. Preise und Funktionen ändern sich — aktuelle Konditionen finden Sie auf deren Website.',
                notDocumented:
                    '„Nicht dokumentiert“ bedeutet, dass wir zum Prüfdatum keinen Hinweis auf die Funktion in der öffentlichen Dokumentation oder im Marketing gefunden haben — nicht, dass sie unmöglich umzusetzen wäre.',
                trademark:
                    'Unlayer ist eine Marke des jeweiligen Inhabers. Diese Seite wird von Templatical gepflegt und steht weder in Verbindung mit dem Anbieter noch wird sie von ihm unterstützt.',
                sourcesLabel: 'Quellen',
                stale: 'Diese Seite ist eine Momentaufnahme, kein dauerhafter Anspruch — auch das, was Unlayer laut uns besser macht. Falls hier etwas veraltet oder falsch ist,',
                staleCta: 'melden Sie es uns',
            },
        },
        beefree: {
            meta: {
                title: 'Eine Open-Source-Alternative zu Beefree SDK — Templatical',
                description:
                    'Ein belegter Direktvergleich: Hosting-Modell, Preise pro Nutzer, was der Editor zur Laufzeit braucht und wie Sie bestehende BeeFree-Vorlagen migrieren.',
            },
            hero: {
                eyebrow: 'Vergleich',
                headline: 'Eine Open-Source-Alternative zu Beefree SDK',
                subheadline:
                    'Beide bringen einen Drag-and-Drop-E-Mail-Editor in Ihr Produkt. Sie unterscheiden sich darin, wer den Editor betreibt, was er zum Start braucht und ob Ihre Rechnung mit Ihren Nutzern wächst. Alles Folgende ist anhand öffentlicher Quellen überprüfbar.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            table: {
                heading: 'Templatical vs. Beefree SDK',
                colFeature: 'Merkmal',
                colThem: 'Beefree SDK',
                colUs: 'Templatical',
                notDocumented: 'Nicht dokumentiert',
                rows: {
                    pricing: {
                        label: 'Preise',
                        them: 'Kostenlose Stufe, danach 400 bis 6.000 $ pro Monat',
                        us: 'Kostenlos, in jeder Ausbaustufe',
                    },
                    users: {
                        label: 'Endnutzer-Limits',
                        them: 'Abgerechnet: 10 Nutzer in Free, 100 in Essentials, 800 in Core, darüber unbegrenzt',
                        us: 'Keine. Der Editor kennt und zählt Ihre Nutzer nicht.',
                    },
                    hosting: {
                        label: 'Wer den Editor betreibt',
                        them: 'Beefree. Das npm-Paket lädt den Editor zur Laufzeit von deren CDN; Selbst-Hosting ist eine Enterprise-Option',
                        us: 'Sie. Der Editor liegt in Ihrem Bundle und läuft in Ihrer Seite',
                    },
                    activation: {
                        label: 'Aktivierung zur Laufzeit',
                        them: 'Erforderlich. Ihr Backend tauscht Client-ID und Secret gegen ein Token, das nach 5 Minuten abläuft; ohne dieses startet der Editor nicht',
                        us: 'Keine. Keine Zugangsdaten, kein Token, kein Aufruf an uns.',
                    },
                    savedBlocks: {
                        label: 'Wiederverwendbare gespeicherte Blöcke',
                        them: 'Abgerechnete „Hosted Rows“, unter Core nicht enthalten: 100, 250, dann 1.000',
                        us: 'Unbegrenzt, gespeichert wo Sie möchten',
                    },
                    htmlImport: {
                        label: 'HTML-Import',
                        them: '2 $ pro Import oder 2.000 $ pro Jahr für unbegrenzt, unterhalb der oberen Stufen',
                        us: 'Enthalten, unbegrenzt, MIT-lizenziert',
                    },
                    source: {
                        label: 'Quellcode-Zugang',
                        them: 'Das Loader-Paket ist Apache-2.0; der davon geladene Editor ist nicht veröffentlicht',
                        us: 'Vollständiger Quellcode in einem öffentlichen Repository',
                    },
                    licence: {
                        label: 'Lizenz',
                        them: 'Kommerzielles Abonnement',
                        us: 'FSL-1.1-MIT, zwei Jahre nach jedem Release automatisch MIT',
                    },
                    assets: {
                        label: 'Asset-Verwaltung',
                        them: 'Gehosteter File Manager in jedem Tarif; eigener Speicher dahinter in Bezahltarifen; ein eigener Picker statt deren UI erfordert den Tarif ab 3.000 $/Monat',
                        us: 'Gar kein File Manager — der Editor ruft Ihren onRequestMedia-Hook auf: beliebiger Picker, beliebiger Speicher, in jeder Ausbaustufe',
                    },
                    scope: {
                        label: 'Umfang',
                        them: 'E-Mails, Landingpages und Popups',
                        us: 'Nur E-Mails',
                    },
                    output: {
                        label: 'Ausgabeformat',
                        them: 'HTML und JSON',
                        us: 'MJML und JSON',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Passt am besten',
                headline: 'Wofür Sie sich entscheiden sollten',
                subheadline:
                    'Die Tabelle liefert die Details, hier steht die Entscheidung. Wenn ein Punkt in der rechten Spalte für Sie eine Anforderung ist, kaufen Sie deren Produkt — dann ist es die bessere Wahl, und das sollen Sie ruhig wissen.',
                usTitle: 'Templatical, wenn',
                themTitle: 'Beefree SDK, wenn',
                us: {
                    cost: 'Der Editor nicht teurer werden soll, wenn Sie Nutzer hinzufügen. Templatical rechnet sie nicht ab.',
                    runtime: 'Der Editor ohne Token von Dritten starten muss — offline, air-gapped oder einfach unabhängig davon, ob jemand anderes erreichbar ist.',
                    ownership: 'Der Editor in Ihrem eigenen Bundle laufen soll, ohne dass es dafür einen Enterprise-Vertrag braucht.',
                    source: 'Sie den vollständigen Quellcode wollen und eine Lizenz, die zwei Jahre nach jedem Release zu MIT wird.',
                    output: 'Sie portable Ausgabe wollen. Templatical exportiert MJML — einen offenen Standard mit einer MIT-lizenzierten Implementierung, die Sie selbst betreiben können; eine Beefree-Vorlage ist deren JSON, gerendert von deren Engine.',
                },
                them: {
                    scope: 'Sie neben E-Mails auch Landingpages und Popups brauchen. Templatical ist auf E-Mails beschränkt und soll es bleiben.',
                    operated: 'Sie den Editor lieber von jemand anderem betreiben lassen — gehostet, automatisch skalierend, mit einer Verfügbarkeitszusage.',
                    catalog: 'Sie Ihren Nutzern von Tag eins an einen großen Katalog fertiger Vorlagen anbieten wollen.',
                    support: 'Sie einen kommerziellen Anbieter mit bezahltem Support-Vertrag wollen statt eines Open-Source-Projekts.',
                    files: 'Sie einen File Manager ab Werk wollen. Beefree liefert ihn in jedem Tarif mit; Templatical hat keinen und erwartet, dass Sie den Picker beisteuern.',
                },
            },
            close: {
                headline: 'Schon auf BeeFree? Nehmen Sie Ihre Vorlagen mit',
                body: 'Templatical liefert einen MIT-lizenzierten Konverter für BeeFree-Vorlagen — eine Evaluierung startet also mit Ihren echten Designs statt mit einer leeren Seite.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            migration: {
                label: 'Zur BeeFree-Migrationsanleitung',
            },
            footnote: {
                verified:
                    'Geprüft am 8. August 2026 gegen {\'@\'}beefree.io/sdk 11.6.1 in der auf npm veröffentlichten Fassung sowie gegen die an diesem Tag auf developers.beefree.io angegebenen Tarife. Preise und Funktionen ändern sich — aktuelle Konditionen finden Sie auf deren Website.',
                notDocumented:
                    '„Nicht dokumentiert“ bedeutet, dass wir zum Prüfdatum keinen Hinweis auf die Funktion in der öffentlichen Dokumentation oder im Marketing gefunden haben — nicht, dass sie unmöglich umzusetzen wäre.',
                trademark:
                    'BeeFree und Beefree SDK sind Marken des jeweiligen Inhabers. Diese Seite wird von Templatical gepflegt und steht weder in Verbindung mit dem Anbieter noch wird sie von ihm unterstützt.',
                sourcesLabel: 'Quellen',
                stale: 'Diese Seite ist eine Momentaufnahme, kein dauerhafter Anspruch — auch das, was Beefree SDK laut uns besser macht. Falls hier etwas veraltet oder falsch ist,',
                staleCta: 'melden Sie es uns',
            },
        },
        easyEmailPro: {
            meta: {
                title: 'Eine Open-Source-Alternative zu Easy Email Pro — Templatical',
                description:
                    'Ein belegter Direktvergleich: Lizenzierung, Framework-Unterstützung, Installationsgröße und was jeder Editor zur Laufzeit tut.',
            },
            hero: {
                eyebrow: 'Vergleich',
                headline: 'Eine Open-Source-Alternative zu Easy Email Pro',
                subheadline:
                    'Beide binden einen Drag-and-Drop-E-Mail-Editor in Ihr Produkt ein, beide erzeugen MJML. Sie unterscheiden sich bei Lizenzierung, Framework-Bindung und dem, was der Editor zur Laufzeit tut. Alles Folgende ist anhand öffentlicher Quellen überprüfbar.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            table: {
                heading: 'Templatical vs. Easy Email Pro',
                colFeature: 'Merkmal',
                colThem: 'Easy Email Pro',
                colUs: 'Templatical',
                notDocumented: 'Nicht dokumentiert',
                rows: {
                    licensing: {
                        label: 'Lizenzierung',
                        them: 'Kommerzielles Abonnement, 99–499 $ pro Monat',
                        us: 'FSL-1.1-MIT, zwei Jahre nach jedem Release automatisch MIT. Kostenlos.',
                    },
                    source: {
                        label: 'Quellcode-Zugang',
                        them: 'UI-Code-Repository ab dem Enterprise-Tarif',
                        us: 'Vollständiger Quellcode in einem öffentlichen Repository',
                    },
                    framework: {
                        label: 'Framework',
                        them: 'Nur React',
                        us: 'React, Vue, Svelte, Angular und Vanilla JS',
                    },
                    uiFramework: {
                        label: 'Benötigtes UI-Framework',
                        them: 'Peer-Dependency auf {\'@\'}arco-design/web-react',
                        us: 'Keines',
                    },
                    footprint: {
                        label: 'Installationsgröße',
                        them: 'Rund 62 MB entpackt über vier Pakete',
                        us: '10,3 MB, keine Runtime-Dependencies',
                    },
                    activation: {
                        label: 'Aktivierung zur Laufzeit',
                        them: 'Eine Client-ID steuert den Funktionsumfang, wird beim Start geprüft und hat ein Ablaufdatum; Funktionen außerhalb Ihres Tarifs lösen einen Fehler aus',
                        us: 'Keine. Kein Lizenzschlüssel, keine Client-ID, kein Aktivierungsaufruf.',
                    },
                    agents: {
                        label: 'KI-Agenten-Unterstützung',
                        them: 'Developer-MCP-Service ab dem Enterprise-Tarif',
                        us: 'MCP-Server und Agent Skill, MIT, enthalten',
                    },
                    linting: {
                        label: 'Qualitätsprüfung für Vorlagen',
                        them: 'Nicht dokumentiert',
                        us: '30 Regeln für Barrierefreiheit, Struktur und Links, MIT',
                    },
                    importers: {
                        label: 'Migrations-Importer',
                        them: 'Nicht dokumentiert',
                        us: 'Konverter für BeeFree, Unlayer und HTML, MIT',
                    },
                    isolation: {
                        label: 'Stil-Isolation',
                        them: 'Nicht dokumentiert',
                        us: 'Shadow DOM standardmäßig, in beide Richtungen',
                    },
                    output: {
                        label: 'Ausgabeformat',
                        them: 'MJML',
                        us: 'MJML',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Passt am besten',
                headline: 'Wofür Sie sich entscheiden sollten',
                subheadline:
                    'Die Tabelle liefert die Details, hier steht die Entscheidung. Wenn ein Punkt in der rechten Spalte für Sie eine Anforderung ist, kaufen Sie deren Produkt — dann ist es die bessere Wahl, und das sollen Sie ruhig wissen.',
                usTitle: 'Templatical, wenn',
                themTitle: 'Easy Email Pro, wenn',
                us: {
                    framework: 'Ihre App nicht auf React läuft oder Sie eine Integration wollen, die einen späteren Framework-Wechsel übersteht.',
                    cost: 'Der Editor nichts kosten soll — ohne Abrechnung pro Sitz oder pro Endnutzer, während Sie wachsen.',
                    runtime: 'Der Editor ohne Lizenzschlüssel und ohne Aufruf an einen Anbieter beim Start laufen muss — offline, air-gapped oder einfach unabhängig davon, ob es uns noch gibt.',
                    source: 'Sie den vollständigen Quellcode wollen und eine Lizenz, die zwei Jahre nach jedem Release zu MIT wird.',
                },
                them: {
                    react: 'Ihr Produkt auf React läuft, Portabilität keine Rolle spielt und Sie eine idiomatische Hooks-API einem imperativen init()-Aufruf vorziehen.',
                    blockStudio: 'Ihre Nutzer eigene Blöcke visuell zusammenstellen sollen, ohne dass Entwickler Code schreiben.',
                    amp: 'Sie AMP-E-Mails versenden. Templatical unterstützt AMP nicht und hat es auch nicht vor.',
                    support: 'Sie einen kommerziellen Anbieter mit bezahltem Support-Vertrag hinter dem Editor wollen statt eines Open-Source-Projekts.',
                },
            },
            close: {
                headline: 'Probieren Sie es aus, bevor Sie all das abwägen',
                body: 'Der Playground startet den echten Editor ohne Anmeldung. Wenn er nicht zu Ihrem Produkt passt, ist der Rest ohnehin belanglos.',
                ctaPrimary: 'Playground öffnen',
                ctaSecondary: 'Dokumentation lesen',
            },
            footnote: {
                verified:
                    'Geprüft am 7. August 2026 gegen easy-email-pro-core 1.59.9 in der auf npm veröffentlichten Fassung sowie gegen die an diesem Tag auf easyemail.pro angegebenen Preise. Preise und Funktionen ändern sich — aktuelle Konditionen finden Sie auf deren Website.',
                notDocumented:
                    '„Nicht dokumentiert“ bedeutet, dass wir zum Prüfdatum keinen Hinweis auf die Funktion in der öffentlichen Dokumentation oder im Marketing gefunden haben — nicht, dass sie unmöglich umzusetzen wäre.',
                trademark:
                    'Easy Email Pro ist eine Marke des jeweiligen Inhabers. Diese Seite wird von Templatical gepflegt und steht weder in Verbindung mit dem Anbieter noch wird sie von ihm unterstützt.',
                sourcesLabel: 'Quellen',
                stale: 'Diese Seite ist eine Momentaufnahme, kein dauerhafter Anspruch — auch das, was Easy Email Pro laut uns besser macht. Falls hier etwas veraltet oder falsch ist,',
                staleCta: 'melden Sie es uns',
            },
        },
    },
    faq: {
        meta: {
            title: 'FAQ — Templatical',
            description:
                'Antworten zu Lizenzierung, kommerzieller Nutzung, Framework-Support, Migrationswegen und der Cloud-Variante.',
        },
        hero: {
            eyebrow: 'FAQ',
            headline: 'Häufig gestellte Fragen',
            subheadline:
                'Lizenzierung, kommerzielle Nutzung, Framework-Support, Migrationswege und die Cloud-Variante.',
        },
        items: {
            free: {
                question: 'Ist Templatical wirklich kostenlos?',
                answer: 'Ja. Das Editor-SDK ist unter der FSL-1.1-MIT-Lizenz (Functional Source License) lizenziert — kostenlos nutzbar in jedem Projekt ohne Nutzungsgrenzen oder Kosten pro Nutzer. Jede Version wird automatisch zwei Jahre nach Veröffentlichung zu MIT, ohne dass eine Aktion erforderlich ist.',
            },
            commercial: {
                question: 'Kann ich es in kommerziellen Produkten verwenden?',
                answer: 'Ja — bezahltes SaaS, interne Tools, On-Premise-Software, Agentur-Builds, alles. Die einzige Einschränkung: Sie dürfen Templatical nicht umbenennen und als konkurrierendes gehostetes E-Mail-Editor-SaaS verkaufen. Die Einbettung in ein CRM, eine transaktionale E-Mail-API, ein Newsletter-Tool oder jedes Produkt, in dem der Editor eine Funktion unter mehreren ist, ist vollständig erlaubt. Und die Einschränkung läuft aus: Jedes Release wird zwei Jahre nach Erscheinen zu reinem MIT.',
            },
            packages: {
                question: 'Welche Pakete sind MIT und welche FSL?',
                answer: 'Sechs der neun Pakete sind heute reines MIT: Types, Renderer, Quality sowie der BeeFree-, Unlayer- und HTML-Importer. Editor, Core und Media-Library sind FSL-1.1-MIT. Die Aufteilung bedeutet, dass alles, was Sie in ein Backend oder eine Codegen-Pipeline einbauen, von Tag eins an vollständig permissiv ist.',
            },
            branding: {
                question: 'Muss ich „Powered by Templatical" anzeigen?',
                answer: 'Nein. Der Editor zeigt standardmäßig einen kleinen Footer-Credit an, der jedoch opt-out ist — übergeben Sie branding: false an init(), um ihn auszublenden. Es gibt kein erzwungenes Header-Logo oder andere Branding-Elemente in der Editor-UI.',
            },
            frameworks: {
                question: 'Welche Frameworks werden unterstützt?',
                answer: 'Templatical funktioniert in React, Svelte, Angular, Vue und Vanilla JS. Das veröffentlichte Paket ist vollständig in sich geschlossen — Vue ist intern gebündelt, daher installieren Konsumenten ein Paket ohne Peer-Dependencies und mounten den Editor mit einem einzigen init()-Aufruf in beliebige DOM-Elemente.',
            },
            migrate: {
                question: 'Wie migriere ich von einem anderen Editor?',
                answer: 'Wir bieten kostenlose, MIT-lizenzierte Migrations-Tools für BeeFree, Unlayer, rohes HTML und MJML. Sie importieren Ihre bestehenden Vorlagen direkt und übernehmen Block-Mapping, Stil-Erhaltung und Merge-Tag-Konvertierung automatisch. Migrationsanleitungen für jedes Quellformat finden Sie in der Dokumentation.',
            },
            data: {
                question: 'Wohin gehen meine Vorlagendaten?',
                answer: 'Nirgendwohin. Das SDK läuft vollständig im Browser — keine Telemetrie, keine Remote-Aufrufe, keine Analytics. Ihre Vorlagen verlassen Ihre App nur, wenn Sie sie an Ihr eigenes Backend speichern.',
            },
            cssIsolation: {
                question: 'Übernimmt der Editor das CSS meiner App?',
                answer: 'Nein. Der Editor wird standardmäßig in einem Shadow DOM gemountet, sodass Host-Stylesheets an der Grenze stoppen. Ihr body font-family, das box-sizing-Reset Ihres Design-Systems, das Preflight Ihres Frameworks — nichts davon erreicht den Editor. Wenn Ihr Theme angewendet werden soll, setzen Sie --tpl-user-*-CSS-Variablen am Container; sie werden über die Shadow-Grenze hinweg vererbt. Per shadowDom: false können Sie auf Light-DOM-Mount umstellen.',
            },
            hosted: {
                question: 'Wie schneidet das gegenüber einem gehosteten SaaS-E-Mail-Builder ab?',
                answer:
                    'Gehostete Builder liefern einen schlüsselfertigen Editor und einen gefüllten Vorlagenkatalog, aber der Editor hängt an deren Preisen — Custom Blocks, White-Label, fortgeschrittenes Theming und eigene Merge-Tag-Syntax brauchen meist einen höheren Tarif, und die meisten rechnen Ihre Endnutzer oder Ihre Exporte ab. Templatical ist das eingebettete, selbst hostbare Gegenteil: Ihre Kunden sehen Ihre Marke, nichts wird pro Sitz abgerechnet, und Sie liefern MJML aus, das Sie überall rendern können. Wenn Sie vor allem einen gehosteten Editor mit einer großen fertigen Vorlagen-Bibliothek wollen, sind Sie mit einem SaaS-Builder schneller. Belegte Direktvergleiche mit Beefree SDK, Unlayer, Stripo, Topol, Chamaileon, Easy Email Pro und GrapesJS sind in der Fußzeile verlinkt.',
            },
            paid: {
                question: 'Gibt es eine kostenpflichtige Version, und ist sie erforderlich?',
                answer: 'Nein, kostenpflichtig ist nicht erforderlich. Das Open-Source-SDK ist vollständig eigenständig — jede Editor-Funktion (Custom Blocks, Merge-Tags, Anzeigebedingungen, Theming, MJML-Output) ist enthalten und kostenlos selbst hostbar. Templatical Cloud ist ein separates, optionales Managed-Abo, das infrastrukturabhängige Funktionen ergänzt — Echtzeit-Kollaboration, KI-Umschreiben und KI-Chat, gehostete Medien, Multi-Tenancy, API-Zugriff. Diese benötigen Backend-Dienste, die wir betreiben, und werden daher als kostenpflichtiges Managed-Tier statt als selbst hostbarer Code ausgeliefert.',
            },
        },
        stillAsking: {
            eyebrow: 'Noch Fragen?',
            headline: 'Antwort nicht gefunden?',
            description:
                'Fragen Sie die Community auf GitHub Discussions oder tauchen Sie in die Dokumentation für die tiefere API-Referenz ein.',
            discussionsCta: 'Auf GitHub Discussions fragen',
            docsCta: 'Zur Dokumentation',
        },
    },
    changelog: {
        meta: {
            title: 'Changelog — Templatical',
            description:
                'Jedes Templatical-Release: neue Funktionen, Fehlerbehebungen und Breaking Changes, jeweils mit den betroffenen Paketen.',
        },
        hero: {
            eyebrow: 'Changelog',
            headline: 'Was veröffentlicht wurde — und wann',
            subheadline:
                'Templatical erscheint in kurzen Abständen. Jedes Release steht hier mit den Paketen, die es verändert hat — alle Pakete teilen sich eine Versionsnummer.',
        },
        levels: {
            major: 'Breaking',
            minor: 'Funktion',
            patch: 'Fix',
        },
        emptyVersion:
            'Keine für Nutzer sichtbaren Änderungen — veröffentlicht, damit alle Pakete auf derselben Version bleiben.',
        versionNotes: 'Vollständige Notizen zu {version} lesen',
        showingLatest: 'Die {count} neuesten Releases.',
        fullHistory: {
            eyebrow: 'Alle Releases',
            headline: 'Suchen Sie eine ältere Version?',
            description:
                'Das Changelog in der Dokumentation enthält die vollständige Historie bis zum ersten Release, jeweils mit den kompletten Notizen.',
            docsCta: 'Vollständiges Changelog',
            releasesCta: 'GitHub Releases',
        },
        unavailable: {
            headline: 'Changelog derzeit nicht verfügbar',
            description:
                'Die Release-Daten konnten beim Erstellen dieser Seite nicht geladen werden. Das vollständige Changelog finden Sie jederzeit in der Dokumentation.',
            cta: 'Changelog in der Dokumentation öffnen',
        },
    },
};

export default de;

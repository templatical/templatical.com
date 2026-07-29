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
    },
    footer: {
        features: 'Funktionen',
        faq: 'FAQ',
        changelog: 'Changelog',
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
            frameworkNote: 'Funktioniert in React, Svelte, Angular, Vue und Vanilla JS — ein init()-Aufruf, keine Peer-Dependencies.',
            badges: [
                'TypeScript-first',
                'Auf MJML aufgebaut',
                'FSL-1.1-MIT (auto-MIT)',
                'Framework-neutral',
                'Shadow DOM',
                'Keine Telemetrie',
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
                        'Vollständiges Theming über Design-Tokens, Dark Mode inklusive',
                        'Standardmäßig White-Label — Ihre UI, Ihre Marke',
                        'MJML-Output — im Browser, auf Ihrem Server, überall rendern',
                        'Eingebaute WCAG-Barrierefreiheits-Prüfung mit Auto-Fixes',
                        'Style-isoliert — Shadow-DOM-Mount hält Host-CSS draußen',
                    ],
                    cloud: [
                        'KI-Umschreiben, KI-Chat, MCP-Integration',
                        'Echtzeit-Kollaboration mit Block-Level-Sperrung',
                        'Snapshots und Versionshistorie',
                        'Multi-Tenancy und API-Zugriff',
                    ],
                },
            },
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
        homeFaq: {
            eyebrow: 'Häufige Fragen',
            headline: 'Was Entwickler zuerst fragen',
            items: [
                {
                    question: 'Was bedeutet FSL-1.1-MIT für die kommerzielle Nutzung?',
                    answer:
                        'Sie dürfen Templatical kommerziell nutzen, in Ihr Produkt einbetten, Kunden dafür Geld berechnen und es selbst hosten — alles ab heute, kostenlos. Die einzige Einschränkung: Sie dürfen Templatical nicht als konkurrierendes E-Mail-Editor-Produkt weiterverkaufen. Nach zwei Jahren konvertiert jedes Release automatisch zu reinem MIT.',
                },
                {
                    question: 'Wie schneidet das gegenüber einem gehosteten SaaS-E-Mail-Builder ab?',
                    answer:
                        'Gehostete Builder liefern einen schlüsselfertigen Editor und einen vorgefertigten Vorlagenkatalog, sperren den Editor aber hinter ihrer UI und ihren Preisen — Custom Blocks, White-Label, erweitertes Theming und Custom-Merge-Tag-Syntax sind meist hinter Upgrade-Screens. Templatical ist das eingebettete, selbst hostbare Gegenteil: Ihre Kunden sehen Ihre Marke, Sie zahlen nichts pro Sitz, und Sie geben MJML aus, das Sie überall rendern können. Wenn Ihr Produkt einen Editor braucht, der sich wie Teil Ihrer App anfühlt, passt Templatical. Wenn Sie hauptsächlich einen gehosteten Editor mit einer großen vorgefertigten Vorlagenbibliothek wollen, ist ein SaaS-Builder schneller.',
                },
                {
                    question: 'Was enthält Templatical Cloud im Vergleich zum Open-Source-SDK?',
                    answer:
                        'Das Open-Source-SDK enthält jede Editor-Funktion — Custom Blocks, Merge-Tags, Anzeigebedingungen, Theming, MJML-Output — kostenlos und selbst hostbar. Templatical Cloud ist ein separates, kostenpflichtiges Managed-Abo für infrastrukturabhängige Funktionen: Echtzeit-Kollaboration, KI-Umschreiben und KI-Chat, Snapshots, Kommentare, Multi-Tenancy, gehostete Medien. Diese benötigen Backend-Dienste, die wir betreiben, und werden daher als Managed-Tier statt als selbst hostbarer Code ausgeliefert.',
                },
            ],
            seeAll: 'Alle Fragen ansehen',
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
                'Open-Source-Drag-and-Drop-E-Mail-Editor-SDK. Eigene Blöcke, vollständiges Theming, MJML-Ausgabe. Selbst hosten — kostenlos. MIT-lizenziert.',
        },
        hero: {
            eyebrow: 'Open-Source-SDK',
            headline: 'Was andere Editoren hinter Schranken halten — bei uns in Ihrem Repo. MIT-lizenziert.',
            subheadline:
                'Sechs Power-Features und eine saubere Basis — alles enthalten, alles offen. Portables JSON rein, MJML raus, keine Nutzungsstufe im Weg.',
            pricingPill: 'Open Source · MIT · Kostenlos selbst hosten',
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
                description: 'Fünf Sprachen eingebaut — Englisch, Deutsch, Portugiesisch (BR), Spanisch und Katalanisch — im Editor und in der Medien-Bibliothek. Für jede weitere Sprache genügt eine Datei.',
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
                answer: 'Ja — bezahltes SaaS, interne Tools, On-Premise-Software, Agentur-Builds, alles. Die einzige Einschränkung: Sie dürfen Templatical nicht umbenennen und als konkurrierendes gehostetes E-Mail-Editor-SaaS verkaufen. Die Einbettung in ein CRM, eine transaktionale E-Mail-API, ein Newsletter-Tool oder jedes Produkt, in dem der Editor eine Funktion unter mehreren ist, ist vollständig erlaubt.',
            },
            packages: {
                question: 'Welche Pakete sind MIT und welche FSL?',
                answer: 'Vier der sieben Pakete sind heute reines MIT: Types, Renderer sowie der BeeFree- und der Unlayer-Importer. Editor, Core und Media-Library sind FSL-1.1-MIT. Die Aufteilung bedeutet, dass alles, was Sie in ein Backend oder eine Codegen-Pipeline einbauen, von Tag eins an vollständig permissiv ist.',
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
            paid: {
                question: 'Gibt es eine kostenpflichtige Version, und ist sie erforderlich?',
                answer: 'Nein, kostenpflichtig ist nicht erforderlich. Das Open-Source-SDK ist vollständig eigenständig — jede Editor-Funktion (Custom Blocks, Merge-Tags, Anzeigebedingungen, Theming, MJML-Output) ist enthalten und kostenlos selbst hostbar. Templatical Cloud ist ein separates, optionales Managed-Abo, das infrastrukturabhängige Funktionen ergänzt — Echtzeit-Kollaboration, KI-Umschreiben und KI-Chat, Snapshots, Kommentare, gehostete Medien, Multi-Tenancy, API-Zugriff. Diese benötigen Backend-Dienste, die wir betreiben, und werden daher als kostenpflichtiges Managed-Tier statt als selbst hostbarer Code ausgeliefert.',
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

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
    },
    footer: {
        features: 'Funktionen',
        faq: 'FAQ',
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
                'Überall renderbar',
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
                        'Dark-Mode-Vorschau-Parität zur gesendeten E-Mail',
                        'Theme-Tokens für konsistentes Branding',
                        'MJML-Output, überall renderbar',
                        'E-Mail-Client-Kompatibilität — Outlook 2007–365, Gmail-Clipping, Apple Mail',
                        'Barrierefreiheit — Tastaturnavigation, ARIA, Screenreader',
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
                        'Preise skalieren pro Sitz oder Endnutzer',
                        'Closed Source — kein Audit, Fork oder Erweitern',
                        'Output an die Render-API des Anbieters gekoppelt',
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
                        'Vollständiges Theming über Design-Tokens, Dark Mode inklusive',
                        'Standardmäßig White-Label — Ihre UI, Ihre Marke',
                        'MJML-Output — im Browser, auf Ihrem Server, überall rendern',
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
        cta: {
            headline: 'Starten Sie noch heute mit E-Mail-Vorlagen',
            subheadline:
                'Open Source. Für immer kostenlos. Heute selbst hosten, später optional in den Managed-Tarif wechseln.',
            ctaPrimary: 'Loslegen',
            ctaSecondary: 'Auf GitHub ansehen',
            ctaTertiary: 'Sponsor',
        },
        migration: {
            text: 'Schon auf einem gehosteten E-Mail-Builder? Kostenlose Importer für Ihre bestehenden Vorlagen.',
            cta: 'Migrationsanleitungen ansehen',
            sources: 'BeeFree · Unlayer · MJML',
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
                'Fünf Power-Features und eine saubere Basis — alles enthalten, alles offen. Portables JSON rein, MJML raus, keine Nutzungsstufe im Weg.',
            pricingPill: 'Open Source · MIT · Kostenlos selbst hosten',
        },
        examplesLabel: 'Beispiele für {title}',
        variants: {
            static: 'Statisch',
            apiBacked: 'API-basiert',
            predefined: 'Vordefiniert',
            customPicker: 'Eigener Picker',
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
                'Eigene Wrapper — Ihr ESP wertet Liquid beim Versand aus',
            ],
            docsLabel: 'Bedingungen-Guide',
        },
        theming: {
            eyebrow: 'Branding',
            title: 'Vollständiges Theming via Design-Tokens',
            description:
                '27 OKLch-Tokens, eigene Schriften, Dark Mode, komplette Theme-Overrides. Jede Oberfläche tokenisiert — nicht nur die im Marketing-Screenshot.',
            outcome: 'Der Editor sieht ab Tag eins aus wie Ihr Produkt.',
            features: [
                '27 OKLch-Design-Tokens für jede Oberfläche',
                'Light- und Dark-Theme-Overrides über denselben theme.dark-Schlüssel',
                'Eigene Schriften via --tpl-font-sans und --tpl-font-mono',
                'Tailwind 4 mit `tpl:`-Prefix — kein Preflight, keine Style-Leaks',
            ],
            docsLabel: 'Theming-Referenz',
        },
        defaults: {
            eyebrow: 'Standards',
            title: 'Template- & Block-Standards',
            description:
                'Definieren Sie Ihre Marke einmal. Neue Templates und Blöcke übernehmen Ihre Standards automatisch — Farben, Schriften, Abstände, Layout.',
            outcome: 'Markenkonsistenz ohne Copy-Paste-Steuer.',
            features: [
                'Marken-Standards einmal beim init() setzen',
                'Standards pro Blocktyp: button, divider, spacer, image, social',
                'Vorlagenstandards: Breite, Hintergrund, Schriftfamilie',
                'Pro Vorlage überschreiben via templateDefaults',
            ],
            docsLabel: 'Standards-Referenz',
        },
        supporting: {
            eyebrow: 'Die Essentials',
            headline: 'Alles andere, was Sie erwarten — richtig gemacht.',
            subheadline:
                'Einsatzbereites Mounting, portables JSON, MJML-Ausgabe, framework-unabhängig. Plus die Politur — Dark Mode, i18n, Rückgängig/Wiederholen.',
        },
        supportingItems: {
            framework: {
                title: 'Framework-Integration ohne Aufwand',
                description: 'Ein init()-Aufruf zum Einbinden, einer zum Entfernen. Erstklassige Beispiele für React, Vue, Svelte, Angular und Vanilla JS.',
            },
            output: {
                title: 'JSON rein, MJML raus',
                description: 'Templates sind portables JSON. Ausgabe ist MJML — rendern Sie im Browser oder auf Ihrem Server, versenden Sie über jeden Anbieter. Kein gehosteter Render-Dienst erforderlich.',
            },
            darkMode: {
                title: 'Dark Mode',
                description: 'Erstklassiger Dark Mode mit Auto-Erkennung oder manuellem Umschalter. Beide Themes sind durchdacht, kein Nachgedanke.',
            },
            i18n: {
                title: 'Internationalisierung',
                description: 'Englisch und Deutsch eingebaut. Laden Sie eigene Übersetzungen für jede Sprache.',
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
                'Importieren Sie bestehende Vorlagen und Konfigurationen aus großen Hosted-Editoren. Kostenlose Open-Source-Migrations-Tools — kein manuelles Nachbauen, kein Vendor-Lock-in.',
            features: [
                'Bestehende JSON-Vorlagen direkt importieren',
                'Automatisches Block-Mapping und Konvertierung',
                'Stile, Layouts und Merge-Tags beibehalten',
                'Kostenlose und Open-Source Migrations-Tools',
            ],
            guideCta: 'Zum Migrations-Guide',
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
                    'Schon in einem Hosted-Editor? Importieren Sie bestehende Vorlagen und Konfigurationen — automatisches Block-Mapping, kein manuelles Nachbauen.',
                cta: 'Zum Migrations-Guide',
            },
        },
    },
    faq: {
        meta: {
            title: 'FAQ — Templatical',
            description:
                'Antworten zu Lizenzierung, kommerzieller Nutzung, Framework-Support, BeeFree-Migration und der Cloud-Variante.',
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
                answer: 'Drei der sechs Pakete sind heute reines MIT: Types, Renderer und der BeeFree-Importer. Editor, Core und Media-Library sind FSL-1.1-MIT. Die Aufteilung bedeutet, dass alles, was Sie in ein Backend oder eine Codegen-Pipeline einbauen, von Tag eins an vollständig permissiv ist.',
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
                answer: 'Wir bieten kostenlose, MIT-lizenzierte Migrations-Tools für BeeFree, Unlayer und MJML. Sie importieren Ihre bestehenden Vorlagen direkt und übernehmen Block-Mapping, Stil-Erhaltung und Merge-Tag-Konvertierung automatisch. Migrationsanleitungen für jedes Quellformat finden Sie in der Dokumentation.',
            },
            data: {
                question: 'Wohin gehen meine Vorlagendaten?',
                answer: 'Nirgendwohin. Das SDK läuft vollständig im Browser — keine Telemetrie, keine Remote-Aufrufe, keine Analytics. Ihre Vorlagen verlassen Ihre App nur, wenn Sie sie an Ihr eigenes Backend speichern.',
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
};

export default de;

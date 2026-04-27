import type { MessageSchema } from '..';

const de: MessageSchema = {
    a11y: {
        skipToContent: 'Zum Inhalt springen',
        switchToLight: 'Zum hellen Modus wechseln',
        switchToDark: 'Zum dunklen Modus wechseln',
        switchToLanguage: 'Sprache auf {language} wechseln',
        mobileMenu: 'Navigationsmenü',
        mainNav: 'Hauptnavigation',
        footerNav: 'Fußzeile',
        terminal: 'Terminal',
        yes: 'Ja',
        no: 'Nein',
    },
    nav: {
        features: 'Funktionen',
        docs: 'Dokumentation',
        playground: 'Playground',
        getStarted: 'Loslegen',
        openMenu: 'Menü öffnen',
        closeMenu: 'Menü schließen',
    },
    github: {
        star: 'Star',
    },
    footer: {
        product: 'Produkt',
        resources: 'Ressourcen',
        legal: 'Rechtliches',
        features: 'Funktionen',
        documentation: 'Dokumentation',
        playground: 'Playground',
        github: 'GitHub',
        privacy: 'Datenschutz',
        terms: 'Nutzungsbedingungen',
        copyright: '© {year} Templatical. Open Source unter FSL-1.1-MIT.',
    },
    home: {
        meta: {
            title: 'Templatical — Open-Source E-Mail-Editor SDK',
            description:
                'Die Open-Source-Alternative zu BeeFree. Betten Sie einen Drag-and-Drop E-Mail-Editor in Ihre App ein — mit MJML-Export, Merge-Tags, benutzerdefinierten Blöcken und mehr.',
        },
        hero: {
            badge: 'Jetzt Open Source',
            badgeCta: 'Auf GitHub ansehen',
            headline: 'Ein Open-Source-E-Mail-Editor mit den Funktionen, die andere Editoren hinter einer Paywall verstecken.',
            subheadline:
                'Benutzerdefinierte Blöcke, vollständiges Theming, erweiterte Merge-Tags und Anzeigebedingungen — bei Templatical Open Source, anderswo nur in kostenpflichtigen Tarifen. In jede App mit einem init()-Aufruf einbinden. JSON rein, MJML raus.',
            ctaPrimary: 'Live testen',
            ctaSecondary: 'Vergleichen',
        },
        trustedBy: {
            eyebrow: 'Vertraut von Entwicklern',
            headline: 'Genutzt von Teams, die bessere E-Mail-Erlebnisse schaffen',
        },
        features: {
            eyebrow: 'Power-Features',
            headline: 'Kostenpflichtig anderswo. Open Source hier.',
            subheadline:
                'Die Funktionen, nach denen Entwickler zuerst greifen — und die normalerweise hinter einer Paywall liegen — sind im Open-Source-SDK enthalten.',
            supportingEyebrow: 'Und das Selbstverständliche',
            supportingHeadline: 'Alles, was Sie sonst noch erwarten',
        },
        bentoItems: {
            customBlocks: {
                title: 'Benutzerdefinierte Blöcke mit API-Daten',
                description:
                    'Registrieren Sie eigene Blocktypen — statische Templates oder Live-Daten aus Ihrer API zur Preview-Zeit. Anderswo kostenpflichtig, hier Open Source.',
            },
            mergeTags: {
                title: 'Merge-Tags mit flexibler Syntax',
                description:
                    'Handlebars, Liquid, JS Template Literals oder Ihre eigene Syntax — mit lesbarer Label-Ersetzung direkt im Editor. Bauen Sie in Minuten eine CRM-bewusste Tag-Auswahl.',
            },
            displayConditions: {
                title: 'Anzeigebedingungen',
                description:
                    'Blöcke basierend auf Empfänger-Attributen ein- oder ausblenden, mit Live-Preview im Editor. Eingebaut, kein Zusatzdienst.',
            },
            theming: {
                title: 'Vollständiges Theming via Design-Tokens',
                description:
                    '27 OKLch-Tokens, eigene Schriften, Dark Mode, komplette Theme-Overrides. Kein CSS-Hack, kein kostenpflichtiger Tarif — Ihre Marke wird zum Standard des Editors.',
            },
            defaults: {
                title: 'Template- & Block-Standards',
                description:
                    'Definieren Sie Ihre Marke einmal. Neue Templates und Blöcke übernehmen Ihre Standards automatisch — Farben, Schriften, Abstände, Layout. Konsistent ohne Copy-Paste.',
            },
            framework: {
                title: 'Framework-Integration ohne Aufwand',
                description:
                    'Ein init()-Aufruf zum Einbinden, einer zum Entfernen. Erstklassige Beispiele für React, Vue, Svelte, Angular und Vanilla JS. Kein Framework-Lock-in.',
            },
            output: {
                title: 'JSON rein, MJML raus',
                description:
                    'Templates sind portables JSON. Ausgabe ist MJML — rendern Sie im Browser oder auf Ihrem Server, versenden Sie über jeden Anbieter. Keine Vendor-Render-API.',
            },
            cloud: {
                title: 'Cloud (in Entwicklung)',
                description:
                    'Echtzeit-Zusammenarbeit mit Block-Locking, KI-Rewrite, KI-Chat, Kommentare und Snapshots — kommen als Templatical Cloud-Tarif. Die Implementierung ist offener Code; Sie können den Managed-Tarif nutzen oder selbst hosten.',
            },
        },
        steps: {
            eyebrow: 'So funktioniert es',
            headline: 'In drei Schritten zum produktionsreifen E-Mail-Editor',
            subheadline:
                'Von null zum voll funktionsfähigen E-Mail-Editor in Minuten, nicht Monaten.',
            install: {
                title: 'SDK installieren',
                description:
                    'Fügen Sie Templatical mit einer einzigen Paketinstallation zu Ihrem Projekt hinzu. Funktioniert mit jedem JavaScript-Framework.',
            },
            configure: {
                title: 'Editor einbinden',
                description:
                    'Initialisieren Sie den Editor mit Ihrer Konfiguration. Richten Sie Blöcke, Merge-Tags, Theming und Event-Handler ein.',
            },
            build: {
                title: 'Exportieren & Senden',
                description:
                    'Ihre Nutzer erstellen Vorlagen visuell. Exportieren Sie als HTML oder MJML und versenden Sie über Ihren bevorzugten E-Mail-Dienst.',
            },
        },
        comparison: {
            eyebrow: 'Warum diese Zeilen zählen',
            headline: 'Anderswo Paywall. Hier Open Source.',
            subheadline:
                'Benutzerdefinierte Blöcke, vollständiges Theming, erweiterte Merge-Tags, Anzeigebedingungen. Bei Beefree erst ab Superpowers ($2.500/Monat). Bei Unlayer ab Scale ($750/Monat), Custom CSS ab Optimize ($2.000/Monat). Bei GrapesJS existieren mehrere davon nicht von Haus aus — Sie bauen sie selbst. Bei Templatical sind sie Teil des Open-Source-SDK — kein Tarif, keine Paywall.',
            migrationNote:
                'Bereits auf BeeFree? Migrieren Sie in Minuten mit unseren kostenlosen Import-Tools.',
            seeFullComparison: 'Vollständigen Vergleich ansehen',
            featureColumn: 'Funktion',
            rows: {
                openSource: 'Open Source',
                yourData: 'Ihre Daten, Ihre Server',
                pricing: 'Preisgestaltung',
                dragAndDrop: 'Drag-and-Drop Editor',
                customBlocks: 'Benutzerdefinierte Blöcke',
                mjmlSupport: 'MJML-Unterstützung',
                mergeTags: 'Merge-Tags',
                displayConditions: 'Anzeigebedingungen',
                darkMode: 'Dark Mode',
                undoRedo: 'Rückgängig / Wiederholen',
                responsivePreview: 'Responsive Vorschau',
                migrationTools: 'Kostenlose Migrations-Tools',
                vendorLockIn: 'Kein Vendor Lock-In',
                landingPageBuilder: 'Landing-Page-Builder',
                communityDriven: 'Community-getrieben',
            },
            templaticalValues: {
                pricing: 'Kostenlos & Open Source',
            },
            beefreeValues: {
                pricing: 'Bezahlt pro Nutzung',
            },
        },
        cloud: {
            headline: 'Managed Hosting benötigt?',
            description:
                'Templatical Cloud bietet Team-Zusammenarbeit, API-Zugriff, Multi-Tenancy und verwaltete Infrastruktur — damit Sie sich auf Ihr Produkt konzentrieren können.',
            cta: 'Templatical Cloud testen',
        },
        cta: {
            headline: 'Starten Sie noch heute mit E-Mail-Vorlagen',
            subheadline:
                'Open Source, für immer kostenlos. Starten Sie mit der Dokumentation, geben Sie dem Repo einen Stern oder unterstützen Sie die Entwicklung.',
            ctaPrimary: 'Loslegen',
            ctaSecondary: 'Auf GitHub ansehen',
            ctaTertiary: 'Sponsor',
        },
    },
    features: {
        meta: {
            title: 'Funktionen — Templatical',
            description:
                'Benutzerdefinierte Blöcke, flexible Merge-Tags, Anzeigebedingungen, vollständiges Theming, Template-Standards — Open Source. Plus Framework-Integration, MJML-Ausgabe und die Cloud-Stufe in Entwicklung.',
        },
        hero: {
            eyebrow: 'Power-Features',
            headline: 'Die Funktionen, die andere Editoren hinter Paywalls verstecken — hier Open Source.',
            subheadline:
                'Fünf Power-Features und ein sauberer Satz an Standard-Funktionen. Kein Tarif, keine Paywall, keine Vendor-Render-API.',
        },
        docsLink: 'Zur Dokumentation',
        examplesLabel: 'Beispiele für {title}',
        variants: {
            static: 'Statisch',
            apiBacked: 'API-basiert',
            predefined: 'Vordefiniert',
            customPicker: 'Eigener Picker',
        },
        customBlocks: {
            eyebrow: 'Power-Feature · 1',
            title: 'Benutzerdefinierte Blöcke mit API-Daten',
            description:
                'Registrieren Sie eigene Blocktypen — statische Templates oder Live-Daten aus Ihrer API zur Preview-Zeit. Anderswo kostenpflichtig, hier Open Source.',
            features: [
                'Pro-Feld-Konfiguration: Text, Bild, Farbe, Auswahl, wiederholbar',
                'Statisches Template oder Live-API-Abruf zur Preview-Zeit',
                'Pflichtfelder mit Validierung; optionale Read-only-Felder',
                'Liquid-Templates mit Bedingungen und integrierten Filtern',
                'Wiederholbare Feldgruppen für Sammlungen wie Produktraster',
                'Eigenes SVG-Icon pro Block in der Editor-Sidebar',
                'Typsichere Block-Factories mit TypeScript-Typen',
            ],
        },
        mergeTags: {
            eyebrow: 'Power-Feature · 2',
            title: 'Merge-Tags mit flexibler Syntax',
            description:
                'Handlebars, Liquid, JS Template Literals oder Ihre eigene Syntax — mit lesbarer Label-Ersetzung direkt im Editor. Bauen Sie in Minuten eine CRM-bewusste Tag-Auswahl.',
            features: [
                'Eingebaute Syntaxen plus Hook für Ihre eigene',
                'Lesbare Labels werden direkt im Editor gerendert',
                'Type-Ahead-Picker basierend auf Ihrer Datenstruktur',
                'Optionaler onRequest-Hook ersetzt den Picker durch Ihre CRM-UI',
                'Logik-Tags für verzweigten Inhalt nach Plan oder Rolle',
                'Eingebaute Liquid-Filter: default, upcase, escape',
                'Round-Trip-sicher — JSON speichert das kanonische Token',
            ],
        },
        displayConditions: {
            eyebrow: 'Power-Feature · 3',
            title: 'Anzeigebedingungen',
            description:
                'Blöcke basierend auf Empfänger-Attributen ein- oder ausblenden, mit Live-Preview im Editor. Eingebaut, kein Zusatzdienst.',
            features: [
                'Pro-Block-Regeln basierend auf Empfänger-Attributen',
                'Bedingungen nach Zielgruppe, Segment oder Rolle gruppieren',
                'Live-Preview während der Bearbeitung',
                'allowCustom: true erlaubt eigene Bedingungen inline',
                'Benutzerdefinierte Vor-/Nach-Wrapper für anbieterspezifische Syntax',
                'Wrapper geben Liquid aus — Ihr ESP wertet beim Versand aus',
                'Kein externer Dienst oder kostenpflichtiges Add-on nötig',
            ],
        },
        theming: {
            eyebrow: 'Power-Feature · 4',
            title: 'Vollständiges Theming via Design-Tokens',
            description:
                '27 OKLch-Tokens, eigene Schriften, Dark Mode, komplette Theme-Overrides. Kein CSS-Hack, kein kostenpflichtiger Tarif — Ihre Marke wird zum Standard des Editors.',
            features: [
                '27 OKLch-Design-Tokens für jede Oberfläche',
                'Light- und Dark-Theme-Overrides über denselben theme.dark-Schlüssel',
                'Eigene Schriften via --tpl-font-sans und --tpl-font-mono',
                'Radius, Schatten, Abstände — jede Oberfläche tokenisiert',
                'uiTheme: auto, light oder dark mit Systempräferenz-Erkennung',
                'Dark Mode erstklassig mit Auto-Erkennung oder manuellem Umschalter',
                'Tailwind 4 mit `tpl:`-Prefix — kein Preflight, keine Style-Leaks',
            ],
        },
        defaults: {
            eyebrow: 'Power-Feature · 5',
            title: 'Template- & Block-Standards',
            description:
                'Definieren Sie Ihre Marke einmal. Neue Templates und Blöcke übernehmen Ihre Standards automatisch — Farben, Schriften, Abstände, Layout. Konsistent ohne Copy-Paste.',
            features: [
                'Marken-Standards einmal beim init() setzen',
                'Standards pro Blocktyp: button, divider, spacer, image, social',
                'Vorlagenstandards: Breite, Hintergrund, Schriftfamilie',
                'Neue Templates erben Farben, Schriften, Abstände, Layout',
                'Neue Blöcke übernehmen dieselben Standards automatisch',
                'Vordefinierte Presets — corporate, playful, minimal',
                'Pro Vorlage überschreiben via templateDefaults',
            ],
        },
        supporting: {
            eyebrow: 'Und das Selbstverständliche',
            headline: 'Alles, was Sie sonst noch erwarten',
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
                description: 'Templates sind portables JSON. Ausgabe ist MJML — rendern Sie im Browser oder auf Ihrem Server, versenden Sie über jeden Anbieter. Keine Vendor-Render-API.',
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
            beefreeImport: {
                title: 'BeeFree-Import',
                description: 'Importieren Sie BeeFree JSON-Vorlagen direkt via das templatical/import-beefree-Paket. Automatisches Block-Mapping mit detailliertem Konvertierungsbericht.',
            },
        },
        migration: {
            eyebrow: 'Einfache Migration',
            title: 'In Minuten von BeeFree wechseln',
            description:
                'Nutzen Sie bereits BeeFree? Unsere kostenlosen Migrations-Tools importieren Ihre bestehenden Vorlagen und Konfigurationen. Kein manuelles Nachbauen nötig.',
            features: [
                'BeeFree JSON-Vorlagen direkt importieren',
                'Automatisches Block-Mapping und Konvertierung',
                'Stile, Layouts und Merge-Tags beibehalten',
                'Kostenlose und Open-Source Migrations-Tools',
            ],
        },
        faq: {
            headline: 'Häufig gestellte Fragen',
            items: {
                free: {
                    question: 'Ist Templatical wirklich kostenlos?',
                    answer: 'Ja. Das Editor-SDK ist unter der FSL-1.1-MIT-Lizenz (Functional Source License) lizenziert — kostenlos nutzbar in jedem Projekt ohne Nutzungsgrenzen oder Kosten pro Nutzer. Die Lizenz wird nach zwei Jahren zu MIT. Unterstützende Pakete wie der Renderer und BeeFree-Importer sind MIT-lizenziert.',
                },
                commercial: {
                    question: 'Kann ich es in kommerziellen Produkten verwenden?',
                    answer: 'Ja. Die FSL-1.1-MIT-Lizenz erlaubt kommerzielle Nutzung. Sie können Templatical in Ihr SaaS-Produkt einbetten, damit Ihre Kunden E-Mail-Vorlagen erstellen können.',
                },
                beefree: {
                    question: 'Wie vergleicht es sich mit BeeFree?',
                    answer: 'Templatical bietet ähnliche Drag-and-Drop-Bearbeitungsfunktionen mit vollem Zugriff auf den Quellcode. Es gibt keine nutzungsbasierten Preisüberraschungen, und Ihre Vorlagendaten verlassen nie Ihre Infrastruktur. Außerdem bieten wir kostenlose Migrations-Tools zum Import Ihrer bestehenden BeeFree-Vorlagen.',
                },
                frameworks: {
                    question: 'Welche Frameworks werden unterstützt?',
                    answer: 'Templatical funktioniert mit jedem Framework. Intern mit Vue gebaut, bietet es eine framework-unabhängige JavaScript-API via npm oder als eigenständiges Script-Tag. Nutzen Sie es mit React, Angular, Svelte oder purem HTML.',
                },
                migrate: {
                    question: 'Wie migriere ich von BeeFree?',
                    answer: 'Wir bieten kostenlose, MIT-lizenzierte Migrations-Tools, die Ihre BeeFree JSON-Vorlagen direkt importieren. Die Tools übernehmen Block-Mapping, Stil-Erhaltung und Merge-Tag-Konvertierung automatisch.',
                },
                paid: {
                    question: 'Gibt es eine kostenpflichtige Version?',
                    answer: 'Templatical Cloud bietet Team-Zusammenarbeit, KI-Funktionen, API-Zugriff und Multi-Tenancy für Teams, die eine verwaltete Lösung wünschen. Das Open-Source SDK bleibt kostenlos.',
                },
            },
        },
    },
};

export default de;

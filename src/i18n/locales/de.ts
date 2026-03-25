import type { MessageSchema } from '..';

const de: MessageSchema = {
    a11y: {
        skipToContent: 'Zum Inhalt springen',
        switchToLight: 'Zum hellen Modus wechseln',
        switchToDark: 'Zum dunklen Modus wechseln',
        switchToLanguage: 'Sprache auf {language} wechseln',
        mobileMenu: 'Navigationsmenü',
        terminal: 'Terminal',
    },
    nav: {
        features: 'Funktionen',
        community: 'Community',
        docs: 'Dokumentation',
        playground: 'Playground',
        getStarted: 'Loslegen',
        openMenu: 'Menü öffnen',
        closeMenu: 'Menü schließen',
    },
    footer: {
        product: 'Produkt',
        resources: 'Ressourcen',
        legal: 'Rechtliches',
        features: 'Funktionen',
        community: 'Community',
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
            headline: 'Der Open-Source E-Mail-Editor für Ihre App',
            subheadline:
                'Ein einsatzbereites Drag-and-Drop E-Mail-Editor SDK. Erstellen, anpassen und exportieren Sie produktionsreife E-Mail-Vorlagen. Die Open-Source-Alternative zu BeeFree.',
            ctaPrimary: 'Playground testen',
            ctaSecondary: 'Dokumentation lesen',
        },
        trustedBy: {
            eyebrow: 'Vertraut von Entwicklern',
            headline: 'Genutzt von Teams, die bessere E-Mail-Erlebnisse schaffen',
        },
        features: {
            eyebrow: 'Alles was Sie brauchen',
            headline: 'Ein komplettes E-Mail-Editor SDK',
            subheadline:
                'Alles, was Sie brauchen, um einen professionellen E-Mail-Editor in Ihre Anwendung einzubetten — kein Vendor Lock-in, keine Preise pro Nutzer.',
        },
        bentoItems: {
            editor: {
                title: 'Drag-and-Drop Editor',
                description:
                    '13 Blocktypen einschließlich Text, Bilder, Buttons und mehrspaltige Sektionen mit 5 Layout-Optionen. Ihre Nutzer erstellen E-Mails ohne Code.',
            },
            export: {
                title: 'MJML-Export',
                description:
                    'Exportieren Sie Vorlagen als MJML — der Industriestandard für responsives E-Mail-Markup. Konvertieren Sie auf Ihrem Server mit jeder MJML-Bibliothek zu HTML.',
            },
            mergeTags: {
                title: 'Merge-Tags',
                description:
                    '5 Syntax-Vorlagen direkt verfügbar: Liquid, Handlebars, Mailchimp, AMPscript und Django. Oder definieren Sie Ihre eigene Syntax.',
            },
            customBlocks: {
                title: 'Benutzerdefinierte Blöcke',
                description:
                    'Definieren Sie eigene Blocktypen mit benutzerdefinierten Feldern (Text, Bild, Farbe, Auswahl, wiederholbar) und HTML-Vorlagen. Laden Sie Felddaten von Ihrer API.',
            },
            theming: {
                title: 'Theming & Dark Mode',
                description:
                    '27 semantische Farb-Tokens, um Ihre Marke abzubilden. Integrierter Dark Mode mit automatischer Erkennung. Volle i18n-Unterstützung mit Englisch und Deutsch.',
            },
            displayConditions: {
                title: 'Anzeigebedingungen',
                description:
                    'Bedingte Inhaltsblöcke, die je nach Regeln ein- oder ausgeblendet werden. Umschließen Sie Blöcke mit benutzerdefiniertem Code für dynamische E-Mail-Personalisierung.',
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
            eyebrow: 'Warum Templatical?',
            headline: 'Die Open-Source-Alternative zu BeeFree',
            subheadline:
                'Nutzen Sie bereits BeeFree? Wechseln Sie zu Templatical und besitzen Sie Ihren E-Mail-Editor. Kein Vendor Lock-in, keine Nutzungsgrenzen, keine Überraschungen.',
            migrationNote:
                'Bereits auf BeeFree? Migrieren Sie in Minuten mit unseren kostenlosen Import-Tools.',
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
                'Open Source, für immer kostenlos. Starten Sie mit der Dokumentation oder erkunden Sie den Code auf GitHub.',
            ctaPrimary: 'Loslegen',
            ctaSecondary: 'Auf GitHub ansehen',
        },
    },
    features: {
        meta: {
            title: 'Funktionen — Templatical',
            description:
                'Drag-and-Drop Editor, MJML-Export, Merge-Tags, benutzerdefinierte Blöcke, Anzeigebedingungen, Theming, Dark Mode und BeeFree-Import. Alles im Open-Source SDK.',
        },
        hero: {
            eyebrow: 'Funktionen',
            headline: 'Alles was Sie brauchen, um E-Mails zu erstellen',
            subheadline:
                'Ein vollständiges E-Mail-Editor SDK, das Ihre Entwickler lieben und Ihre Nutzer intuitiv finden werden.',
        },
        editor: {
            eyebrow: 'Visueller Editor',
            title: 'Drag-and-Drop E-Mail-Erstellung',
            description:
                'Ein intuitiver blockbasierter Editor, mit dem Ihre Nutzer schöne, responsive E-Mails ohne Programmierkenntnisse erstellen können.',
            features: [
                'Blockbasiertes Bearbeiten mit Drag-and-Drop',
                'Responsive Desktop- und Mobile-Vorschau',
                'Rückgängig/Wiederholen mit vollständiger Historie',
                '13 Blocktypen einschließlich mehrspaltiger Sektionen',
            ],
        },
        dx: {
            eyebrow: 'Entwicklererfahrung',
            title: 'Von Entwicklern für Entwickler gebaut',
            description:
                'Erstklassige TypeScript-Unterstützung, umfassende Events-API und tiefgreifende Anpassungsoptionen. In Minuten integrieren, monatelang anpassen.',
            features: [
                'Vollständige TypeScript-Unterstützung mit detaillierten Typdefinitionen',
                'Umfangreiche Events-API für Editor-Lebenszyklus und Benutzeraktionen',
                'Framework-unabhängig — nutzbar via npm oder Script-Tag in jeder App',
                'IIFE- und ES-Modul-Builds für flexible Integration',
            ],
        },
        output: {
            eyebrow: 'Ausgabe & Export',
            title: 'MJML-basierte E-Mail-Ausgabe',
            description:
                'Exportieren Sie Vorlagen als MJML — der Industriestandard für responsives E-Mail-Markup. Serverseitige HTML-Konvertierung mit dem enthaltenen Renderer-Paket.',
            features: [
                'MJML-Export für zuverlässiges Cross-Client-Rendering',
                'Serverseitige HTML-Konvertierung via @templatical/renderer',
                'Automatische responsive Layouts in jeder Vorlage',
                'Saubere, optimierte Ausgabe ohne unnötiges Markup',
            ],
        },
        extensibility: {
            eyebrow: 'Erweiterbarkeit',
            title: 'Machen Sie es zu Ihrem',
            description:
                'Erweitern Sie den Editor mit benutzerdefinierten Blöcken, dynamischen Merge-Tags, anschließbarer Medienintegration und Anzeigebedingungen.',
            features: [
                'Benutzerdefinierte Blocktypen mit eigener UI',
                'Konfigurierbare Merge-Tags für dynamische Inhalte',
                'Anschließbare Medienintegration über onRequestMedia-Callback',
                'Anzeigebedingungen für bedingte E-Mail-Inhalte',
            ],
        },
        moreFeatures: {
            eyebrow: 'Und mehr',
            headline: 'Weitere Funktionen',
            subheadline:
                'Jede Funktion, die Sie brauchen, um einen produktionsreifen E-Mail-Editor auszuliefern.',
        },
        moreItems: {
            themeCustomization: {
                title: 'Theme-Anpassung',
                description: '27 semantische Farb-Tokens für jede Oberfläche. Passen Sie den Editor an das Erscheinungsbild Ihres Produkts an.',
            },
            darkMode: {
                title: 'Dark Mode',
                description: 'Integrierter Dark Mode mit automatischer Systemerkennung oder manuellem Umschalter.',
            },
            i18n: {
                title: 'Internationalisierung',
                description: 'Mehrsprachige Editor-UI mit integrierten Übersetzungen. Laden Sie eigene Übersetzungen für jede Sprache.',
            },
            undoRedo: {
                title: 'Rückgängig / Wiederholen',
                description: 'Vollständiger Verlauf mit bis zu 50 Snapshots. Debounced, um schnelle Änderungen zu gruppieren.',
            },
            responsivePreview: {
                title: 'Responsive Vorschau',
                description: 'Wechseln Sie zwischen Desktop-, Tablet- und Mobile-Ansichten, um E-Mails auf jedem Gerät zu sehen.',
            },
            beefreeImport: {
                title: 'BeeFree-Import',
                description: 'Importieren Sie BeeFree JSON-Vorlagen direkt. Automatisches Block-Mapping mit detailliertem Konvertierungsbericht.',
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
    community: {
        meta: {
            title: 'Community — Templatical',
            description:
                'Treten Sie der Templatical-Community bei. Auf GitHub beitragen, auf Discord chatten und auf X für Updates folgen.',
        },
        hero: {
            eyebrow: 'Community',
            headline: 'Treten Sie der Templatical-Community bei',
            subheadline:
                'Verbinden Sie sich mit anderen Entwicklern, tragen Sie zum Projekt bei und helfen Sie, die Zukunft der Open-Source E-Mail-Tools zu gestalten.',
        },
        github: {
            title: 'GitHub',
            description:
                'Geben Sie dem Repo einen Stern, melden Sie Probleme, reichen Sie Pull Requests ein und erkunden Sie den Quellcode. Die gesamte Entwicklung findet öffentlich statt.',
            cta: 'Auf GitHub ansehen',
        },
        discord: {
            title: 'Discord',
            description:
                'Chatten Sie mit dem Team und anderen Entwicklern. Holen Sie sich Hilfe, teilen Sie was Sie bauen und diskutieren Sie neue Funktionen.',
            cta: 'Discord beitreten',
        },
        twitter: {
            title: 'X / Twitter',
            description:
                'Folgen Sie uns für Release-Ankündigungen, Tipps und Updates zum Projekt.',
            cta: 'Auf X folgen',
        },
        contributing: {
            eyebrow: 'Open Source',
            headline: 'Zu Templatical beitragen',
            subheadline:
                'Templatical wird von der Community gebaut. Ob Sie einen Tippfehler korrigieren, eine Funktion hinzufügen oder die Dokumentation verbessern — jeder Beitrag zählt.',
            cta: 'Beitragsrichtlinien lesen',
        },
    },
};

export default de;

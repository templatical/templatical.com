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
    },
    footer: {
        product: 'Produkt',
        resources: 'Ressourcen',
        legal: 'Rechtliches',
        features: 'Funktionen',
        faq: 'FAQ',
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
            eyebrow: 'Vergleich',
            headline: 'Templatical im Vergleich',
            subheadline:
                'Ein ehrlicher, direkter Vergleich von Templatical mit Beefree, Unlayer und GrapesJS — einschließlich der Fälle, in denen die anderen die bessere Wahl sind.',
            tabsLabel: 'Vergleichen mit',
            factsLabels: {
                license: 'Lizenz',
                pricing: 'Preise',
                selfHost: 'Selbst hostbar',
            },
            templaticalWinsLabel: 'Wo Templatical überzeugt',
            competitorWinsLabel: 'Wo {name} überzeugt',
            pickCompetitorLabel: 'Wann {name} die bessere Wahl ist',
            pickUsLabel: 'Wann Templatical die bessere Wahl ist',
            migrationCta: 'Bereits auf {name}?',
            migrationLink: 'Migrationsanleitung ansehen',
            seeFullComparison: 'Vollständigen Vergleich ansehen',
            cloudSectionLabel: 'Mehr mit Templatical Cloud',
            cloudSectionStatus: 'In Entwicklung',
            cloudIntro:
                'Diese Funktionen kommen als Templatical-Cloud-Variante. Der Feature-Code ist heute bereits Open Source unter FSL-1.1-MIT — nutzen Sie die verwaltete Cloud, sobald sie verfügbar ist, oder hosten Sie denselben Code selbst.',
            cloudFeatures: [
                'KI-Umschreibung und KI-Chat',
                'Echtzeit-Zusammenarbeit mit Block-Level-Locking',
                'Kommentare und Review-Threads',
                'Snapshots und Versionshistorie',
                'Gespeicherte Module über Vorlagen hinweg',
                'Gehostete Medienbibliothek',
                'Design-zu-Vorlage-Konvertierung',
                'Versand von Test-E-Mails',
                'MCP-Integration',
                'API-Zugriff und Multi-Tenancy',
            ],
            cloudVsLabel: 'Wie {name} damit umgeht',
            cloudLearnMore: 'Mehr über Templatical Cloud erfahren',
            trademarkNote:
                'Vergleiche basieren auf öffentlich verfügbaren Informationen zum Zeitpunkt der Erstellung und können sich ändern. Produktnamen und Marken gehören ihren jeweiligen Inhabern.',
            tabs: {
                beefree: {
                    name: 'Beefree SDK',
                    positioning:
                        'Ausgereifter gehosteter Editor mit breitem Funktionsumfang — positioniert für finanzierte Startups und Enterprises.',
                    facts: {
                        license: 'Closed Source',
                        pricing: 'Kostenlose Stufe + bezahlte Tarife',
                        selfHost: 'Nur gehostet',
                    },
                    templaticalWins: [
                        'Vollständig selbst hostbar — Beefree wird als gehosteter Editor ausgeliefert.',
                        'MJML-Ausgabe, die Sie überall rendern können — keine Abhängigkeit von einer gehosteten Render-API.',
                        'Offene API für Custom Blocks auf jeder Stufe — Beefree behält Custom Blocks höheren bezahlten Tarifen vor.',
                        'Kostenlos und bleibt es; FSL-1.1-MIT-lizenziert (automatisch MIT nach 2 Jahren).',
                        'End-to-End TypeScript-Typen, nicht nur SDK-Type-Defs.',
                    ],
                    competitorWins: [
                        'Großer Katalog vorgefertigter Templates als Add-on verfügbar.',
                        'E-Mail-, Page-, Popup- und Document-Builder in einem Produkt.',
                        'Mehrsprachige Editor-UI standardmäßig dabei.',
                        'Etabliertes kommerzielles Produkt mit langer Erfolgsgeschichte im E-Mail-Editor-Bereich.',
                    ],
                    cloudVsCompetitor:
                        'Beefree behält diese Funktionen höheren bezahlten Tarifen vor — Echtzeit-Zusammenarbeit, KI-Schreiben, Bildgenerierung und Alt-Text verteilen sich über bezahlte Tarife.',
                    verdict: {
                        competitor:
                            'Wählen Sie Beefree, wenn Sie einen schlüsselfertigen gehosteten Editor, mehrere Builder-Produkte und eine umfangreiche Vorlagenbibliothek benötigen.',
                        us: 'Wählen Sie Templatical, wenn Sie Ihren Editor wirklich besitzen möchten — offener Code, MJML-Ausgabe und Premium-Funktionen ohne Paywalls.',
                    },
                },
                unlayer: {
                    name: 'Unlayer',
                    positioning:
                        'Einfacher React-Drop-in um einen gehosteten Editor. Ein schneller Weg zu einem eingebetteten Editor in einer React-App.',
                    facts: {
                        license: 'Wrapper MIT, Editor closed',
                        pricing: 'Kostenlose Stufe + bezahlte Tarife',
                        selfHost: 'Nur gehostet',
                    },
                    templaticalWins: [
                        'Vollständig selbst hostbar — Unlayers Editor läuft als gehostete Komponente.',
                        'MJML-Ausgabe, die Sie überall rendern können — keine Abhängigkeit von einer gehosteten Render-API.',
                        'Custom Blocks, Custom CSS und Themes im OSS-SDK — Unlayer behält diese höheren bezahlten Tarifen vor.',
                        'Aus jedem Framework einbettbar, nicht React-gekoppelt.',
                        'Mehrsprachige i18n von Haus aus; Unlayer behält Lokalisierung höheren bezahlten Tarifen vor.',
                    ],
                    competitorWins: [
                        'Schneller React-Drop-in — eine Komponente, keine Infra zu betreiben.',
                        'E-Mail-, Page-, Popup- und Document-Builder in einem Produkt.',
                        'Niedrigerer Einstiegspreis als Beefree.',
                        'Etabliertes kommerzielles Produkt mit beträchtlichem Kundenstamm.',
                    ],
                    cloudVsCompetitor:
                        'Unlayers Zusammenarbeit ist auf Team-Ebene statt auf Block-Ebene, und KI-gestütztes Schreiben ist höheren bezahlten Tarifen vorbehalten.',
                    verdict: {
                        competitor:
                            'Wählen Sie Unlayer, wenn Sie einen schnellen eingebetteten Editor in React wollen und mit einem gehosteten Setup zufrieden sind.',
                        us: 'Wählen Sie Templatical, wenn Sie echte Ownership wollen — selbst hostbar, MJML-Ausgabe, framework-neutral.',
                    },
                },
                grapesjs: {
                    name: 'GrapesJS + MJML',
                    positioning:
                        'Open-Source-Web-Builder-Framework, auf dem Sie mit dem MJML-Plugin einen E-Mail-Editor aufbauen können.',
                    facts: {
                        license: 'BSD-3-Clause',
                        pricing: 'Kostenlos',
                        selfHost: 'Ja',
                    },
                    templaticalWins: [
                        'E-Mail-fokussiertes Produkt, von Grund auf für E-Mail entwickelt.',
                        'Eingebaute Merge-Tags, Anzeigebedingungen, Dark Mode und Theming — in GrapesJS typischerweise selbst zu konfigurieren.',
                        'Offene API für Custom Blocks mit API-gestützten Datenquellen — Ihre Domain-Entitäten werden zu Drag-and-Drop-Blöcken erster Klasse.',
                        'Gebündelter, meinungsstarker Feature-Set statt eines Build-it-yourself-Setups.',
                    ],
                    competitorWins: [
                        'Vollständig BSD-3-Clause — keinerlei FSL-Vorbehalt.',
                        'Großes Plugin-Ökosystem und aktive Community.',
                        'Allgemein genug, um Pages, Popups und Dokumente auf derselben Engine zu bauen.',
                        'Vanilla-JavaScript-Core — keine Vue-Runtime-Abhängigkeit, hilfreich wenn Richtlinien das untersagen.',
                        'Für immer kostenlos, kein Managed-Tier-Pfad geplant.',
                    ],
                    cloudVsCompetitor:
                        'GrapesJS Core enthält nichts davon. Sie würden es aus Drittanbieter-Plugins beziehen oder selbst entwickeln.',
                    verdict: {
                        competitor:
                            'Wählen Sie GrapesJS, wenn Sie ein allgemeines Web-Builder-Framework wollen und bereit sind, Ihren E-Mail-Funktionsumfang selbst darauf aufzubauen.',
                        us: 'Wählen Sie Templatical, wenn Sie einen fokussierten E-Mail-Editor wollen — mit Merge-Tags, Anzeigebedingungen und Theming sofort einsatzbereit.',
                    },
                },
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
                'Lizenzierung, kommerzielle Nutzung, Framework-Support und wie Templatical mit anderen E-Mail-Editoren vergleicht.',
        },
        headline: 'Häufig gestellte Fragen',
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
            beefree: {
                question: 'Wie vergleicht es sich mit BeeFree?',
                answer: 'Templatical bietet ähnliche Drag-and-Drop-Bearbeitungsfunktionen mit vollem Zugriff auf den Quellcode. Es gibt keine nutzungsbasierten Preisüberraschungen, und Ihre Vorlagendaten verlassen nie Ihre Infrastruktur. Außerdem bieten wir kostenlose Migrations-Tools zum Import Ihrer bestehenden BeeFree-Vorlagen.',
            },
            frameworks: {
                question: 'Welche Frameworks werden unterstützt?',
                answer: 'Templatical funktioniert mit jedem Framework. Intern mit Vue gebaut, bietet es eine framework-unabhängige JavaScript-API via npm oder als eigenständiges Script-Tag. Nutzen Sie es mit React, Angular, Svelte oder purem HTML.',
            },
            migrate: {
                question: 'Wie migriere ich von einem anderen Editor?',
                answer: 'Wir bieten kostenlose, MIT-lizenzierte Migrations-Tools für BeeFree, Unlayer und MJML. Sie importieren Ihre bestehenden Vorlagen direkt und übernehmen Block-Mapping, Stil-Erhaltung und Merge-Tag-Konvertierung automatisch. Migrationsanleitungen für jedes Quellformat finden Sie in der Dokumentation.',
            },
            paid: {
                question: 'Gibt es eine kostenpflichtige Version, und ist sie erforderlich?',
                answer: 'Das OSS-SDK ist vollständig eigenständig — kein Backend erforderlich, und es bleibt kostenlos. Templatical Cloud ist eine optionale verwaltete Variante mit KI-Umschreibung, Echtzeit-Zusammenarbeit, Kommentaren, Snapshots, gespeicherten Modulen, API-Zugriff und Multi-Tenancy. Der Code der Cloud-Funktionen ist ebenfalls unter FSL-1.1-MIT offen, sodass Sie ihn selbst hosten können, anstatt unseren verwalteten Dienst zu nutzen.',
            },
        },
    },
};

export default de;

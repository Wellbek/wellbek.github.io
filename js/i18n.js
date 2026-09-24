// =============================================================================
// i18n - German and Korean translations.
// English is the source language and lives in the markup (index.html) and the
// JOURNEY data (main.js); this file only holds the other languages.
// Technologies, product names, people, places and paper titles stay in English
// in every language.
// =============================================================================

export const LANGS = ['en', 'de', 'ko'];

// Keys are referenced from the markup via data-i18n="key" (innerHTML is
// replaced) and from main.js via t(key). Keys used only by main.js also carry
// an English entry, since there is no markup to read it from.
export const STRINGS = {
  en: {
    'list.work': 'work experience',
    'list.edu': 'education',
    'list.act': 'activities and societies',
    'contact.default': 'contact me',
    'contact.hover': 'Copy wellmeyer.louis@gmail.com',
    'contact.click': '[click]',
    'contact.copied': '[copied]',
    'theme.toDark': 'Switch to dark theme',
    'theme.toLight': 'Switch to light theme',
    'detail.addImage': '// add image',
  },

  de: {
    'profile.sub': 'KI • Data Engineering • IT-Projektmanagement • Enterprise-Plattformen',
    'profile.loc': 'Seoul, KR · zuvor Aachen, DE',
    'profile.langs': 'Deutsch (Muttersprache), Englisch (fließend), Koreanisch (Grundwissen)',
    'about.lede': 'Mein Name ist Louis, und ich bin Software- und Data Scientist sowie Engineer mit Leidenschaft für Systeme-Design, insbesondere Systeme mit komplexen und datenintensiven Workloads. Meine Berufserfahrung umfasst KI, Data Engineering, Enterprise-Software und technisches Projektmanagement in Forschung, Industrie und internationalen Organisationen.',
    'about.body': 'Beim <a href="https://greenclimate.fund/" target="_blank" rel="noopener noreferrer" class="hi">Green Climate Fund</a> war ich als Technical Business Partner tätig, leitete bereichsübergreifende Initiativen zur digitalen Transformation und entwickelte KI-gestützte Anwendungen, Enterprise-Plattformen und arbeitete an großskalige Daten-Pipelines. Zuvor habe ich Analyseplattformen gebaut, an der RWTH Aachen Data Science und Programmierung unterrichtet und Enterprise-Software von Grund auf neu entwickelt. Derzeit absolviere ich meinen M.Sc. in Data Science an der KAIST und forsche im <span class="hi">System Analytics Lab</span> bei Professor <a href="mailto:hyshin@kaist.edu" class="hi">Dr. Hayong Shin</a> zu Reinforcement Learning für Logistik/Fertigungs-Scheduling, mit Fokus auf Policy-Optimierung und modernen LLM-Post-Training-Methoden (TRPO, PPO, GRPO und Varianten).',
    'fact.role': 'rolle',
    'fact.interests': 'interessen',
    'fact.stack': 'stack',
    'fact.experience': 'erfahrung',
    'fact.current': 'aktuell',
    'fact.previous': 'zuvor',
    'fact.languages': 'sprachen',
    'fact.setup': 'Coding-Setup',
    'fact.interests.v': 'Scheduling, Simulation, Reinforcement Learning, LLMs',
    'fact.experience.v': '4 Jahre Erfahrung in Data Engineering, Full-Stack-Entwicklung, Lehre und Projektmanagement',
    'fact.languages.v': 'Deutsch (Muttersprache), Englisch (fließend), Koreanisch (Grundwissen)',

    'col.journey': 'Erfahrung<br>&amp; Ausbildung',
    'tab.chart': 'Kalendar',
    'tab.list': 'Liste',
    'freelance': 'Freelance &amp; Side-Projects',
    'now': 'jetzt',
    'journey.hint': '// Zelle anklicken für mehr Details',
    'legend.edu': 'Ausbildung',
    'list.work': 'Berufserfahrung',
    'list.edu': 'Ausbildung',
    'list.act': 'Volunteering & Aktivitäten',

    'col.research': 'Forschung',
    'pub.thesis': 'Bachelorarbeit · RWTH SE',
    'pub.hpc.meta': 'Seminar · RWTH HPC',
    'pub.vr.meta': 'Seminar · RWTH VR',
    'pub.voice.abs': 'Sprachgesteuerte Dateneingabe in Webapplikationen (und im MontiGem-Framework), mit LLMs für Intent-Erkennung und Slot Filling.',
    'pub.hpc.abs': 'Vergleiche von Regressionstest-Frameworks für HPC hinsichtlich Korrektheit, Overhead und Skalierbarkeit in multi-cluster Umgebungen.',
    'pub.vr.abs': 'Überblick über Techniken zur Simulation variabler Steifigkeit virtueller Objekte mit Haptic-Jamming-Interfaces - Partikel-, Schicht- und hybride Ansätze.',
    'pub.read': '&rarr; Paper lesen',
    'pub.code': '&rarr; Code',

    'col.projects': 'Eigene<br>Projekte',
    'proj.thinkslides.name': 'Multi-Agent-Präsentationsgenerierung',
    'proj.thinkslides.desc': 'App die PowerPoint-Präsentationen über einen ReAct-Agenten/Orchestra erzeugt, der Gedanken + Tool Calls per SSE streamt. Stack aus 5 Sub-Services.',
    'proj.nasa.name': 'Wartungsvorhersage für NASA-Triebwerke',
    'proj.nasa.desc': 'Data-Science-Projekt über den gesamten Lebenszyklus zur Wartungsvorhersage und RUL-Modellierung von NASA-Raketentriebwerken.',
    'proj.greenlense.name': 'Agentic Produkt-Insights-API - Finalist Hack Seoul 2025 (AngelHack x Coupang)',
    'proj.greenlense.desc': 'Agentic KI-API für Produkt-Insights in 36 Stunden gebaut - Finalist bei Hack Seoul 2025.',
    'proj.wellm.name': 'Neovim-Plugin für LLM-Integration',
    'proj.wellm.desc': 'Vollständig asynchrone Streaming-LLM-Integration für Neovim - native Function Calling, Contextreduction-Methoden',
    'proj.construction.name': 'Bildklassifikator für Baustellen - ohne Deep Learning',
    'proj.construction.desc': 'Klassifikation Arbeiter vs. Fahrzeug aus HOG-Form- und Farbhistogramm-Features mit korrelationsbasiertem Pruning - Random Forest erreicht 90 % gegenüber 80 % einer linearen SVM.',
    'proj.private': '&rarr; privates Repo - Zugang auf Anfrage',
    'more.label': '// außerdem gebaut',
    'more.github': '&rarr; mehr auf github.com/wellbek',
    'mini.psp': 'Ein einfaches Betriebssystem in C für einen Mikrocontroller - abgeschlossen mit Snake.',
    'mini.weather.name': 'Wetter-App',
    'mini.weather': 'Plattformübergreifende Flutter-Wetter-App mit Live-Tracking.',
    'mini.portfolio.name': 'Portfolio (diese Seite)',
    'mini.portfolio': 'Diese Seite',
    'mini.physics': 'Eigene Physics-Engine in Godot und ein 3D-Tower-Defense-Spiel.',
    'mini.watt': '48h RWTH Game Jam 2024 - Platz 2 im 4er-Team.',
    'mini.tft': 'Mein TFT-Replikat in Godot mit Steamworks-Multiplayer.',
    'mini.cs': 'Konsolenbasierter externer CSGO-Skin-/Knifechanger in C++.',
    'mini.kart': 'Von Mario Kart inspiriertes Unity-Rennspiel mit 4-Spieler-Splitscreen.',
    'mini.fleeting': '48h RWTH Winter Game Jam 2025 - Platz 7 im 5er-Team.',

    'col.certs': 'Zertifikate',
    'cert.intro': 'Freiwilliger Universitätskurs während der Schulzeit',

    'contact.default': 'Kontakt',
    'contact.hover': 'wellmeyer.louis@gmail.com kopieren',
    'contact.click': '[klick]',
    'contact.copied': '[kopiert]',
    'theme.toDark': 'Zum dunklen Design wechseln',
    'theme.toLight': 'Zum hellen Design wechseln',
    'detail.addImage': '// bild hinzufügen',
  },

  ko: {
    'profile.sub': 'AI 시스템 • 데이터 엔지니어링 • IT 프로젝트 관리 • 엔터프라이즈 플랫폼',
    'profile.loc': 'Seoul, KR · 이전 Aachen, DE',
    'profile.langs': '독일어 (모국어), 영어 (유창), 한국어 (중급)',
    'about.lede': '안녕하세요, Louis입니다. 복잡하고 데이터 집약적인 워크로드를 다루는 대규모 시스템 설계에 열정을 가진 소프트웨어·데이터 사이언티스트이자 엔지니어입니다. 연구 기관, 산업계, 국제기구를 아우르며 AI, 데이터 엔지니어링, 엔터프라이즈 소프트웨어, 기술 프로젝트 관리 분야의 경험을 쌓아 왔습니다.',
    'about.body': '<a href="https://greenclimate.fund/" target="_blank" rel="noopener noreferrer" class="hi">Green Climate Fund</a>에서 Technical Business Partner로 근무하며 부서 간 디지털 전환 이니셔티브를 이끌었고, AI 기반 애플리케이션, 엔터프라이즈 플랫폼, 대규모 기후 데이터 파이프라인을 개발했습니다. 그 이전에는 분석 플랫폼을 구축하고, RWTH Aachen에서 데이터 사이언스를 가르쳤으며, 엔터프라이즈 소프트웨어를 처음부터 다시 구축했습니다. 현재 KAIST에서 데이터사이언스 석사 과정을 밟으며 <a href="mailto:hyshin@kaist.edu" class="hi">Dr. Hayong Shin</a> 교수님의 <span class="hi">System Analytics Lab</span>에서 제조 스케줄링을 위한 강화학습을 연구하고 있으며, 정책 최적화와 최신 LLM post-training 기법(TRPO, PPO, GRPO 및 그 변형)에 집중하고 있습니다.',
    'fact.role': '역할',
    'fact.interests': '관심 분야',
    'fact.stack': '기술 스택',
    'fact.experience': '경력',
    'fact.current': '현재',
    'fact.previous': '이전',
    'fact.languages': '언어',
    'fact.setup': '주 개발 환경',
    'fact.interests.v': '스케줄링, 시뮬레이션, 강화학습, LLM',
    'fact.experience.v': '데이터 엔지니어링, 풀스택 개발, 교육, 프로젝트 관리 분야 4년 경력',
    'fact.languages.v': '독일어 (모국어), 영어 (유창), 한국어 (중급)',

    'col.journey': '경력<br>&amp; 학력',
    'tab.chart': '차트',
    'tab.list': '목록',
    'freelance': '프리랜스 &amp; 사이드 프로젝트',
    'now': '현재',
    'journey.hint': '// 블록을 클릭하면 상세 정보가 표시됩니다',
    'legend.edu': '학력',
    'list.work': '경력',
    'list.edu': '학력',
    'list.act': '활동 및 동아리',

    'col.research': '연구',
    'pub.thesis': '학사 논문 · RWTH SE',
    'pub.hpc.meta': '세미나 · RWTH HPC',
    'pub.vr.meta': '세미나 · RWTH VR',
    'pub.voice.abs': 'MontiGem 프레임워크에서 LLM으로 의도 파악과 slot filling을 수행하여, 자연어 음성으로 정형 데이터를 입력하는 방법을 제시합니다.',
    'pub.hpc.abs': 'HPC용 회귀 테스트 프레임워크를 비교 분석하고, 병렬 환경에서의 정확성, 오버헤드, 확장성을 평가합니다.',
    'pub.vr.abs': 'haptic jamming 인터페이스로 가상 객체의 다양한 강성을 시뮬레이션하는 기법을 개관합니다 - 입자, 레이어, 하이브리드 방식.',
    'pub.read': '&rarr; 논문 읽기',
    'pub.code': '&rarr; 코드',

    'col.projects': '사이드<br>프로젝트',
    'proj.thinkslides.name': '멀티 에이전트 프레젠테이션 생성',
    'proj.thinkslides.desc': 'ReAct 에이전트가 사고 과정과 tool call을 SSE로 스트리밍하며 브랜드에 맞춘 PowerPoint를 생성하는 멀티 테넌트 앱. 5개 서비스로 구성된 스택.',
    'proj.nasa.name': 'NASA 엔진 유지보수 예측',
    'proj.nasa.desc': 'NASA 로켓 엔진의 유지보수 시점을 예측하고 RUL(잔여 수명)을 모델링하는 전체 데이터 사이언스 라이프사이클 프로젝트.',
    'proj.greenlense.name': '에이전틱 제품 인사이트 API - Hack Seoul 2025 결선 진출 (AngelHack x Coupang)',
    'proj.greenlense.desc': '36시간 만에 에이전틱 AI 제품 인사이트 API 구축 - Hack Seoul 2025 결선 진출.',
    'proj.wellm.name': 'Neovim LLM 통합 플러그인',
    'proj.wellm.desc': 'Neovim을 위한 완전 비동기 스트리밍 LLM 통합 - 네이티브 function calling, symbol outline 주입으로 컨텍스트 약 90% 절감.',
    'proj.construction.name': '건설 현장 이미지 분류기 - 딥러닝 없이',
    'proj.construction.desc': 'HOG 형태 특징과 색상 히스토그램 특징(상관관계 기반 pruning)으로 작업자와 차량을 분류 - random forest 90%, 선형 SVM 80% 달성.',
    'proj.private': '&rarr; 비공개 저장소 - 요청 시 접근 가능',
    'more.label': '// 그 밖의 프로젝트',
    'more.github': '&rarr; github.com/wellbek에서 더 보기',
    'mini.psp': '마이크로컨트롤러용 C 기반 기본 OS - 마무리는 Snake 게임.',
    'mini.weather.name': '날씨 앱',
    'mini.weather': '실시간 추적 기능을 갖춘 크로스 플랫폼 Flutter 날씨 앱.',
    'mini.portfolio.name': '포트폴리오 (이 사이트)',
    'mini.portfolio': '이 사이트 - 터미널 감성, 절차적으로 생성되는 ASCII boid 군집.',
    'mini.physics': '3D 타워 디펜스 게임을 구동하는 Godot 커스텀 물리 엔진.',
    'mini.watt': '48시간 RWTH Game Jam 2024 - 4인 팀으로 2위.',
    'mini.tft': 'Steamworks 멀티플레이어를 지원하는 Godot 기반 나만의 TFT.',
    'mini.cs': 'C++로 만든 콘솔 기반 외부 CSGO 스킨/나이프 체인저.',
    'mini.kart': '4인 분할 화면을 지원하는 Mario Kart 스타일의 Unity 레이싱 게임.',
    'mini.fleeting': '48시간 RWTH Winter Game Jam 2025 - 5인 팀으로 7위.',

    'col.certs': '자격증',
    'cert.intro': '고등학교 재학 중 자발적으로 수강한 대학 강좌',

    'contact.default': '연락하기',
    'contact.hover': 'wellmeyer.louis@gmail.com 복사',
    'contact.click': '[클릭]',
    'contact.copied': '[복사됨]',
    'theme.toDark': '다크 테마로 전환',
    'theme.toLight': '라이트 테마로 전환',
    'detail.addImage': '// 이미지 추가',
  },
};

// Translated fields for the JOURNEY entries in main.js, keyed by entry id.
// Any field left out falls back to the English value.
export const JOURNEY_I18N = {
  de: {
    gym: {
      role: 'Präsident der Robotik-AG',
      short: 'Robotik',
      bullets: [
        'Leitete wöchentliche Robotik-Sessions für bis zu 20 Schülerinnen und Schüler und vermittelte Grundlagen in Programmierung und Technik bis hin zu autonomen Robotersystemen.',
        'Koordinierte bundesweite Robotik-Wettbewerbe mit Schulen aus ganz Deutschland.',
      ],
    },
    bsc: {
      role: 'B.Sc. Informatik',
      short: 'B.Sc. Informatik @ RWTH Aachen',
      bullets: [
        'Grundlagen in Mathematik, Algorithmen, Softwaretechnik, Datenbanken, Betriebssystemen und verteilten Systemen.',
        'Schwerpunkte auf Machine Learning, Data Science, Webtechnologien und Softwarearchitektur durch vertiefende Kurse und Projekte.',
        'Anwendung von Software-Engineering-Prinzipien in kollaborativen Full-Stack-Entwicklungsprojekten.',
        'Einblicke in die Betriebswirtschaft durch Wahlfächer in Rechnungswesen und Entscheidungstheorie.',
        'Abschlussarbeit: "Enabling Voice Input for Data Entry through LLMs in MontiGem" am Lehrstuhl für Software Engineering der RWTH.',
      ],
    },
    ta: {
      role: 'Tutor für Data Science',
      bullets: [
        'Unterrichtete und betreute mehrmals pro Woche sehr internationale Gruppen von bis zu 40 Studierenden verschiedener Fachrichtungen.',
        'Leitete Programmierkurse in Python mit Fokus auf datengetriebene Anwendungen und großskalige Datenanalyse mit Pandas.',
        'Individuelle Betreuung, Code-Reviews und Feedback zu Abgaben.',
      ],
    },
    ra: {
      role: 'Wissenschaftliche Hilfskraft Data Engineering',
      bullets: [
        'Entwarf und deployte containerisierte Analyse-Engines und RESTful APIs (Python/Flask + Docker) zur Echtzeitanalyse großer Studierendendaten mehrerer deutscher Universitäten.',
        'Verbesserte die Analyse-Pipeline mit Multiprocessing-basiertem Load Balancing und beschleunigte die Datenverarbeitung um bis zu 5×.',
      ],
    },
    oelmuehle: {
      role: 'Praktikant Full-Stack-Entwicklung',
      bullets: [
        'Konzipierte und entwickelte das Firmen-Intranet mit Angular und FastAPI komplett neu, nach Analyse der bestehenden PHP-Multi-Page-Codebasis.',
        'Optimierte die Daten-Pipeline für die direkte Anbindung an Microsoft-NAV-Datenbanken und ermöglichte so Echtzeit-Datenfeedback.',
        'Führte GitHub zur Versionskontrolle ein und baute eine CI/CD-Pipeline mit GitHub Actions.',
      ],
    },
    gcf: {
      role: 'Praktikant Technical Business Partner',
      company: 'Praktikum in der IT-Abteilung des Green Climate Fund (GCF) // IT-Projektmanagement, KI & Data Engineering',
      bullets: [
        'Leitete parallel das Management von 18+ abteilungsübergreifenden IT-Initiativen, übersetzte organisatorische Bedürfnisse in technische Anforderungen und richtete technische Lösungen in enger Zusammenarbeit mit Stakeholdern und globalen Technologieanbietern an den operativen Geschäftszielen aus.',
        'Wirkte an der Entwicklung und Standardisierung interner Betriebsabläufe gemäß internationalen IT-Standards (z. B. ISO 16326) mit.',
        'Plante und realisierte über 4+ Monate die erste Tech & AI Exhibition des GCF beim Board 44, koordinierte 8 Abteilungen, 4 Stände und 16+ Initiativen und band Board-Mitglieder, akkreditierte Institutionen und Ländervertreter zu KI-Governance, Datenschutz, digitaler Teilhabe und organisatorischer Effizienz ein.',
        'Entwarf und implementierte Daten-Pipelines und Analysemodelle für klimabezogene Prognosen und Vulnerabilitätsbewertungen von Ländern (Microsoft Fabric, Kerchunk/NetCDF-Indexierung, NLP).',
        'Führte groß angelegte Datenmigrationen und -bereinigungen durch, inklusive automatisierter Validierung zur Sicherung von Datenqualität und Zuverlässigkeit.',
        'Unterstützte KI- und Automatisierungsinitiativen zur Verbesserung interner Workflows und der operativen Effizienz mit Asana, n8n, Azure, Microsoft Copilot und der Microsoft Power Platform.',
        'Konzipierte und implementierte eine KI-gestützte Longlisting-Solution, die die Prozesseffizienz um mehr als das 3-Fache steigerte, bei gleichbleibender Qualität und Konsistenz der Bewertung.',
        'Entwickelte Enterprise-Plattformen für Finanzen und HR mit Next.js, TypeScript, PostgreSQL, Azure und SAML/SCIM, darunter eine mehrjährige Budgetplanungsplattform mit Genehmigungs-Workflows sowie SSO- und DocuSign-Integration und ein internes Award- und Nominierungssystem mit rollenbasiertem Zugriff und Dashboards.',
      ],
    },
    kaist: {
      role: 'M.S. Data Science',
      bullets: [
        'Graduate School of Data Science im Department of Industrial & Systems Engineering des Korea Advanced Institute of Science & Technology.',
        'Forschung zu Reinforcement Learning für Fertigungs-Scheduling im System Analytics Lab, betreut von Professor Dr. Hayong Shin.',
        'Fokus auf Policy-Optimierung und moderne LLM-Post-Training-Methoden (TRPO, PPO, GRPO und Varianten).',
        'Simulationsbasierte Evaluation gelernter Scheduling-Policies gegenüber klassischen Dispatching- und Optimierungs-Baselines.',
      ],
    },
    mr: {
      role: 'Aktivitäten & Vereine',
      bullets: [
        'Der einzige Robotik-Club der KAIST (<a href="https://mr.kaist.ac.kr/" target="_blank" rel="noopener noreferrer" class="hi">mr.kaist.ac.kr</a>) mit über 40 Jahren Erfahrung in studentisch gebauten Robotersystemen - zweibeinige Roboter, Roboterhände, Unterwasserdrohnen und aufgabenorientierte Manipulatoren.',
        'Schwerpunkt auf Sim2Real-Transfer für die Robotersteuerung: Training und Validierung von Policies in MuJoCo und NVIDIA Omniverse Isaac Sim vor dem Deployment auf echter Hardware.',
        'Der Club richtet seit 2022 einen extern gesponserten, hochschulübergreifenden Robotik-Wettbewerb für Studierende aus - neben eigenen Projekten und Ausstellungen.',
      ],
    },
    freelance: {
      role: 'Freelance & Nebenprojekte',
      company: 'Eigeninitiativ · parallel zum formalen Werdegang',
      bullets: [
        'Neben Studium und Vollzeitstellen übernehme ich kontinuierlich Freelance-Aufträge und baue Nebenprojekte - von Wartung, laufenden Erweiterungen und Bugfixes für Enterprise-Plattformen über Open-Source-Beiträge bis hin zu Hobby-Entwicklung, Competitive Programming und Hackathons.',
        '(Einige meiner "mehr oder weniger" abgeschlossenen Arbeiten stehen in der Spalte Eigene Projekte.)',
      ],
    },
  },

  ko: {
    gym: {
      role: '로보틱스 동아리 회장',
      short: '로보틱스',
      bullets: [
        '최대 20명의 학생을 대상으로 매주 로보틱스 세션을 이끌며, 프로그래밍과 공학 기초부터 자율 로봇 시스템까지 지도',
        '독일 전역의 학교가 참여하는 전국 규모 로보틱스 대회 운영',
      ],
    },
    bsc: {
      role: '컴퓨터공학 학사 (B.Sc.)',
      short: 'RWTH Aachen 컴퓨터공학 학사',
      bullets: [
        '수학, 알고리즘, 소프트웨어 공학, 데이터베이스, 운영체제, 분산 시스템의 기초 확립',
        '심화 과목과 프로젝트를 통해 머신러닝, 데이터 사이언스, 웹 기술, 소프트웨어 아키텍처에 집중',
        '협업 기반 풀스택 개발 프로젝트에서 소프트웨어 공학 원칙 적용',
        '회계 및 의사결정 이론 선택 과목을 통해 비즈니스 도메인 학습',
        '졸업 논문: RWTH Chair of Software Engineering에서 "Enabling Voice Input for Data Entry through LLMs in MontiGem" 수행',
      ],
    },
    ta: {
      role: '데이터 사이언스 조교',
      bullets: [
        '다양한 국적과 전공의 학생 최대 40명으로 구성된 그룹을 주 여러 차례 지도 및 멘토링',
        '데이터 기반 애플리케이션과 Pandas를 활용한 대규모 데이터 분석 중심의 Python 프로그래밍 수업 진행',
        '개별 지도, 코드 리뷰 및 과제 피드백 제공',
      ],
    },
    ra: {
      role: '데이터 엔지니어링 연구 보조원',
      bullets: [
        '여러 독일 대학의 대규모 학생 데이터를 실시간으로 분석하기 위한 컨테이너 기반 분석 엔진과 RESTful API(Python/Flask + Docker) 설계 및 배포',
        'multiprocessing 기반 로드 밸런싱으로 분석 파이프라인을 리팩터링하여 데이터 처리 속도 최대 5배 향상',
      ],
    },
    oelmuehle: {
      role: '풀스택 개발 인턴',
      bullets: [
        '레거시 PHP 멀티 페이지 애플리케이션 코드베이스를 분석한 뒤, Angular와 FastAPI로 사내 인트라넷을 처음부터 전면 재설계 및 재구축',
        'Microsoft NAV 데이터베이스와 직접 연동하도록 데이터 파이프라인을 리팩터링하여 실시간 데이터 피드백 구현',
        '버전 관리를 위해 GitHub를 도입하고 GitHub Actions 기반 CI/CD 파이프라인 구축',
      ],
    },
    gcf: {
      role: 'Technical Business Partner 인턴',
      company: 'Green Climate Fund (GCF) IT 부서 인턴 // IT 프로젝트 관리, AI & 데이터 엔지니어링',
      bullets: [
        '18개 이상의 부서 간 IT 이니셔티브를 동시에 관리하며, 조직의 요구를 기술 요구사항으로 전환하고 이해관계자 및 글로벌 기술 벤더와의 긴밀한 협업을 통해 기술 솔루션을 운영상의 비즈니스 목표에 맞게 정렬',
        '국제 IT 표준(예: ISO 16326)에 부합하는 내부 운영 절차의 개발 및 표준화에 기여',
        'Board 44에서 열린 GCF 최초의 Tech & AI Exhibition을 4개월 이상 기획·실행하며 8개 부서, 4개 부스, 16개 이상의 이니셔티브를 조율하고, 이사회 구성원, 인증 기관 및 각국 대표와 AI 거버넌스, 데이터 보호, 디지털 형평성, 조직 효율성을 주제로 교류',
        '기후 관련 예측 및 국가별 취약성 평가를 위한 데이터 파이프라인과 분석 모델 설계 및 구현 (Microsoft Fabric, Kerchunk/NetCDF 인덱싱, NLP)',
        '데이터 품질과 신뢰성을 보장하는 자동 검증 프로세스를 포함하여 대규모 데이터 마이그레이션 및 데이터 정제 수행',
        'Asana, n8n, Azure, Microsoft Copilot, Microsoft Power Platform을 활용해 내부 워크플로와 운영 효율을 개선하는 AI 및 자동화 이니셔티브 지원',
        'AI 기반 롱리스팅(longlisting) 솔루션을 설계·구현하여 평가 품질과 일관성을 유지하면서 프로세스 효율을 3배 이상 향상',
        'Next.js, TypeScript, PostgreSQL, Azure, SAML/SCIM으로 재무 및 HR 엔터프라이즈 플랫폼 개발 - 승인 워크플로와 SSO 및 DocuSign 연동을 갖춘 다년도 예산 편성 플랫폼, 역할 기반 접근 제어와 대시보드를 갖춘 사내 시상·추천 시스템 포함',
      ],
    },
    kaist: {
      role: '데이터사이언스 석사 (M.S.)',
      short: 'KAIST 데이터사이언스 석사',
      bullets: [
        'Korea Advanced Institute of Science & Technology, Department of Industrial & Systems Engineering 소속 Graduate School of Data Science',
        'System Analytics Lab에서 Dr. Hayong Shin 교수님의 지도 하에 제조 스케줄링을 위한 강화학습 연구',
        '정책 최적화와 최신 LLM post-training 기법(TRPO, PPO, GRPO 및 그 변형)에 집중',
        '학습된 스케줄링 정책을 고전적인 디스패칭 및 최적화 베이스라인과 비교하는 시뮬레이션 기반 평가',
      ],
    },
    mr: {
      role: '활동 및 동아리',
      bullets: [
        'KAIST 유일의 로보틱스 동아리(<a href="https://mr.kaist.ac.kr/" target="_blank" rel="noopener noreferrer" class="hi">mr.kaist.ac.kr</a>)로, 이족 보행 로봇, 로봇 핸드, 수중 드론, 작업 지향형 매니퓰레이터 등 40년 이상 학생이 직접 만든 로봇 시스템의 역사를 보유',
        'MuJoCo와 NVIDIA Omniverse Isaac Sim에서 정책을 학습·검증한 뒤 실제 하드웨어에 배포하는 로봇 제어용 Sim2Real 전이에 집중',
        '자체 프로젝트 및 전시 활동과 함께, 외부 후원을 받는 대학 간 학생 로보틱스 대회를 2022년부터 개최',
      ],
    },
    freelance: {
      role: '프리랜스 & 사이드 프로젝트',
      company: '자기주도 · 정규 경력과 병행',
      bullets: [
        '학업 및 정규직 업무와 병행하여 꾸준히 프리랜스 업무와 사이드 프로젝트를 진행하고 있습니다 - 엔터프라이즈 플랫폼 유지보수, 지속적인 기능 개선 및 버그 수정, 오픈 소스 기여부터 취미 개발, 경쟁 프로그래밍, 해커톤까지.',
        '("어느 정도" 완성된 작업 일부는 사이드 프로젝트 칼럼에서 볼 수 있습니다.)',
      ],
    },
  },
};

// Generic (non-technology) tags; everything else stays as written.
export const TAG_I18N = {
  de: {
    'Robotics': 'Robotik', 'Teaching': 'Lehre', 'Competitive': 'Wettbewerbe',
    'Computer Science': 'Informatik', 'Research': 'Forschung',
    'Software Engineering': 'Softwaretechnik', 'Business & Finance': 'Wirtschaft & Finanzen',
    'Project Management': 'Projektmanagement', 'Simulation': 'Simulation',
    'Side Projects': 'Nebenprojekte',
  },
  ko: {
    'Robotics': '로보틱스', 'Teaching': '교육', 'Competitive': '대회',
    'Computer Science': '컴퓨터공학', 'Bachelor': '학사', 'Research': '연구',
    'Software Engineering': '소프트웨어 공학', 'Business & Finance': '경영 & 재무',
    'Data Science': '데이터 사이언스', 'Data Engineering': '데이터 엔지니어링',
    'Project Management': '프로젝트 관리', 'Agile': '애자일',
    'Scheduling': '스케줄링', 'Simulation': '시뮬레이션', 'Reinforcement Learning': '강화학습',
    'Freelance': '프리랜스', 'Side Projects': '사이드 프로젝트', 'Hackathons': '해커톤',
    'Open Source': '오픈 소스',
  },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_DE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

// "Jul 2025 - Jul 2026" -> "Jul 2025 - Jul 2026" (de) / "2025.07 - 2026.07" (ko)
export function localizePeriod(period, lang) {
  if (lang === 'en') return period;
  return period
    .replace(/\b([A-Z][a-z]{2}) (\d{4})\b/g, (m, mon, year) => {
      const i = MONTHS.indexOf(mon);
      if (i < 0) return m;
      return lang === 'ko' ? `${year}.${String(i + 1).padStart(2, '0')}` : `${MONTHS_DE[i]} ${year}`;
    })
    .replace(/\bpresent\b/, lang === 'ko' ? '현재' : 'heute');
}

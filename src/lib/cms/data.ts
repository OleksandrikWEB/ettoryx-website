import type {
  Service,
  Product,
  CaseStudy,
  TeamMember,
  JobListing,
  Testimonial,
  Stat,
} from "./types";

export const services: Service[] = [
  {
    slug: "crm-development",
    icon: "Users",
    title: { uk: "Розробка CRM", en: "CRM Development" },
    short: {
      uk: "Кастомні CRM-системи, що впорядковують продажі, клієнтів і команди в єдиному просторі.",
      en: "Custom CRM systems that unify sales, clients and teams in a single workspace.",
    },
    problem: {
      uk: "Розрізнені таблиці, втрачені ліди й відсутність прозорості в роботі відділу продажів.",
      en: "Scattered spreadsheets, lost leads and zero transparency across the sales floor.",
    },
    solution: {
      uk: "Ми будуємо CRM під ваші процеси: воронки, автоматизації, аналітика та інтеграції з поточними сервісами.",
      en: "We build a CRM around your process: pipelines, automations, analytics and integrations with your current stack.",
    },
    process: [
      { title: { uk: "Дискавері", en: "Discovery" }, description: { uk: "Аналіз процесів і болей команди.", en: "Mapping your workflows and pain points." } },
      { title: { uk: "Архітектура", en: "Architecture" }, description: { uk: "Модель даних, ролі, інтеграції.", en: "Data model, roles and integrations." } },
      { title: { uk: "Розробка", en: "Build" }, description: { uk: "Ітеративна розробка з демо щотижня.", en: "Iterative delivery with weekly demos." } },
      { title: { uk: "Запуск", en: "Launch" }, description: { uk: "Міграція даних, навчання, підтримка.", en: "Data migration, onboarding and support." } },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
    faq: [
      { question: { uk: "Скільки триває впровадження?", en: "How long does implementation take?" }, answer: { uk: "Типовий MVP — 6–10 тижнів залежно від складності процесів.", en: "A typical MVP takes 6–10 weeks depending on process complexity." } },
      { question: { uk: "Чи можна мігрувати наявні дані?", en: "Can you migrate our existing data?" }, answer: { uk: "Так, ми переносимо дані з таблиць та інших CRM без втрат.", en: "Yes, we migrate data from spreadsheets and other CRMs without loss." } },
    ],
    relatedCases: ["fintech-crm", "logistics-platform"],
    seo: {
      title: { uk: "Розробка CRM-систем | ettoryx", en: "CRM Development | ettoryx" },
      description: { uk: "Кастомні CRM-рішення під ваші бізнес-процеси.", en: "Custom CRM solutions tailored to your business processes." },
    },
  },
  {
    slug: "erp-development",
    icon: "Boxes",
    title: { uk: "Розробка ERP", en: "ERP Development" },
    short: {
      uk: "Системи управління ресурсами, що з’єднують склад, фінанси та виробництво.",
      en: "Resource-planning systems connecting inventory, finance and operations.",
    },
    problem: { uk: "Дані розкидані між відділами, а рішення ухвалюються наосліп.", en: "Data siloed across departments and decisions made blind." },
    solution: { uk: "Єдина ERP-платформа з реальними даними та автоматизованими процесами.", en: "A unified ERP platform with real-time data and automated workflows." },
    process: [
      { title: { uk: "Аудит", en: "Audit" }, description: { uk: "Опис поточних процесів і ресурсів.", en: "Documenting current processes and resources." } },
      { title: { uk: "Модулі", en: "Modules" }, description: { uk: "Дизайн модулів під потреби.", en: "Designing modules around your needs." } },
      { title: { uk: "Інтеграція", en: "Integration" }, description: { uk: "З’єднання з наявними системами.", en: "Connecting with existing systems." } },
      { title: { uk: "Масштабування", en: "Scale" }, description: { uk: "Розширення й підтримка.", en: "Rollout and ongoing support." } },
    ],
    technologies: ["Next.js", "Python", "PostgreSQL", "RabbitMQ", "Kubernetes"],
    faq: [
      { question: { uk: "Чи підтримуєте кілька складів?", en: "Do you support multiple warehouses?" }, answer: { uk: "Так, мультисклад і мультивалютність підтримуються.", en: "Yes, multi-warehouse and multi-currency are supported." } },
    ],
    relatedCases: ["logistics-platform"],
    seo: {
      title: { uk: "Розробка ERP-систем | ettoryx", en: "ERP Development | ettoryx" },
      description: { uk: "ERP-платформи для управління ресурсами компанії.", en: "ERP platforms to manage your company resources." },
    },
  },
  {
    slug: "website-development",
    icon: "Globe",
    title: { uk: "Розробка вебсайтів", en: "Website Development" },
    short: {
      uk: "Преміальні корпоративні сайти та лендинги на WordPress і Lovable.",
      en: "Premium corporate sites and landing pages on WordPress & Lovable.",
    },
    problem: { uk: "Застарілий сайт, що не конвертує й повільно вантажиться.", en: "An outdated site that neither converts nor loads fast." },
    solution: { uk: "Сучасні швидкі сайти з фокусом на конверсію та SEO.", en: "Modern, fast websites focused on conversion and SEO." },
    process: [
      { title: { uk: "Дизайн", en: "Design" }, description: { uk: "UX/UI прототип і дизайн-система.", en: "UX/UI prototype and design system." } },
      { title: { uk: "Верстка", en: "Build" }, description: { uk: "Адаптивна верстка з анімаціями.", en: "Responsive build with animations." } },
      { title: { uk: "SEO", en: "SEO" }, description: { uk: "Технічне SEO та швидкість.", en: "Technical SEO and performance." } },
      { title: { uk: "Запуск", en: "Launch" }, description: { uk: "Публікація та аналітика.", en: "Publishing and analytics." } },
    ],
    technologies: ["WordPress", "Lovable", "Next.js", "Tailwind", "Vercel"],
    faq: [
      { question: { uk: "WordPress чи кастом?", en: "WordPress or custom?" }, answer: { uk: "Обираємо стек під ваші цілі й бюджет.", en: "We choose the stack based on your goals and budget." } },
    ],
    relatedCases: ["saas-marketing-site"],
    seo: {
      title: { uk: "Розробка вебсайтів | ettoryx", en: "Website Development | ettoryx" },
      description: { uk: "Корпоративні сайти на WordPress та Lovable.", en: "Corporate websites on WordPress & Lovable." },
    },
  },
  {
    slug: "cross-platform-apps",
    icon: "Smartphone",
    title: { uk: "Кросплатформні застосунки", en: "Cross-platform Apps" },
    short: {
      uk: "Мобільні та десктопні застосунки з єдиною кодовою базою.",
      en: "Mobile and desktop apps from a single codebase.",
    },
    problem: { uk: "Дорога окрема розробка під iOS, Android і десктоп.", en: "Costly separate builds for iOS, Android and desktop." },
    solution: { uk: "Одна кодова база — усі платформи, менші витрати.", en: "One codebase across platforms and lower costs." },
    process: [
      { title: { uk: "Прототип", en: "Prototype" }, description: { uk: "Клікабельний прототип.", en: "Clickable prototype." } },
      { title: { uk: "Розробка", en: "Build" }, description: { uk: "React Native / Flutter.", en: "React Native / Flutter." } },
      { title: { uk: "Тестування", en: "QA" }, description: { uk: "Тести на реальних пристроях.", en: "Testing on real devices." } },
      { title: { uk: "Реліз", en: "Release" }, description: { uk: "Публікація в сторах.", en: "Store publishing." } },
    ],
    technologies: ["React Native", "Flutter", "Expo", "Firebase"],
    faq: [
      { question: { uk: "iOS і Android одночасно?", en: "iOS and Android at once?" }, answer: { uk: "Так, релізимо на обидві платформи паралельно.", en: "Yes, we ship to both platforms in parallel." } },
    ],
    relatedCases: ["fintech-crm"],
    seo: {
      title: { uk: "Кросплатформні застосунки | ettoryx", en: "Cross-platform Apps | ettoryx" },
      description: { uk: "Мобільні застосунки з єдиною кодовою базою.", en: "Mobile apps from a single codebase." },
    },
  },
  {
    slug: "digital-ecosystems",
    icon: "Network",
    title: { uk: "Цифрові екосистеми", en: "Digital Ecosystems" },
    short: {
      uk: "Зв’язані продукти, API та сервіси, що працюють як одне ціле.",
      en: "Connected products, APIs and services working as one.",
    },
    problem: { uk: "Розрізнені інструменти, що не спілкуються між собою.", en: "Disconnected tools that never talk to each other." },
    solution: { uk: "Архітектура екосистеми з єдиним API-шаром і SSO.", en: "Ecosystem architecture with a unified API layer and SSO." },
    process: [
      { title: { uk: "Стратегія", en: "Strategy" }, description: { uk: "Мапа продуктів і потоків.", en: "Product and data-flow map." } },
      { title: { uk: "API-шар", en: "API layer" }, description: { uk: "Єдиний контракт даних.", en: "A single data contract." } },
      { title: { uk: "Інтеграції", en: "Integrations" }, description: { uk: "З’єднання сервісів.", en: "Wiring services together." } },
      { title: { uk: "Оркестрація", en: "Orchestration" }, description: { uk: "Моніторинг і масштаб.", en: "Monitoring and scale." } },
    ],
    technologies: ["GraphQL", "gRPC", "Kafka", "Kubernetes", "Keycloak"],
    faq: [
      { question: { uk: "Чи інтегруєте legacy?", en: "Do you integrate legacy?" }, answer: { uk: "Так, обгортаємо legacy сервіси адаптерами.", en: "Yes, we wrap legacy services with adapters." } },
    ],
    relatedCases: ["logistics-platform"],
    seo: {
      title: { uk: "Цифрові екосистеми | ettoryx", en: "Digital Ecosystems | ettoryx" },
      description: { uk: "Зв’язані продукти та сервіси в єдиній екосистемі.", en: "Connected products and services in one ecosystem." },
    },
  },
  {
    slug: "ai-automation",
    icon: "Sparkles",
    title: { uk: "AI-автоматизація та інтеграція", en: "AI Automation & Integration" },
    short: {
      uk: "Впровадження ШІ в процеси: асистенти, аналітика, автоматизація рутини.",
      en: "Embedding AI into your processes: assistants, analytics and routine automation.",
    },
    problem: { uk: "Команда витрачає години на рутинні задачі.", en: "Your team burns hours on repetitive tasks." },
    solution: { uk: "AI-агенти й автоматизації, що беруть рутину на себе.", en: "AI agents and automations that take the routine off your plate." },
    process: [
      { title: { uk: "Кейси", en: "Use cases" }, description: { uk: "Пошук найцінніших сценаріїв.", en: "Finding the highest-value scenarios." } },
      { title: { uk: "Пілот", en: "Pilot" }, description: { uk: "Швидкий пілот на реальних даних.", en: "Fast pilot on real data." } },
      { title: { uk: "Інтеграція", en: "Integration" }, description: { uk: "Вбудова в поточні системи.", en: "Embedding into current systems." } },
      { title: { uk: "Оптимізація", en: "Optimize" }, description: { uk: "Моніторинг якості та вартості.", en: "Monitoring quality and cost." } },
    ],
    technologies: ["OpenAI", "LangChain", "Python", "Vector DB", "n8n"],
    faq: [
      { question: { uk: "Мої дані в безпеці?", en: "Is my data safe?" }, answer: { uk: "Так, підтримуємо приватні розгортання й контроль даних.", en: "Yes, we support private deployments and data control." } },
    ],
    relatedCases: ["saas-marketing-site"],
    seo: {
      title: { uk: "AI-автоматизація | ettoryx", en: "AI Automation | ettoryx" },
      description: { uk: "Впровадження та інтеграція ШІ у ваші процеси.", en: "AI implementation and integration into your processes." },
    },
  },
];

export const products: Product[] = [
  {
    slug: "crm",
    name: "ettoryx CRM",
    icon: "Users",
    category: { uk: "CRM", en: "CRM" },
    short: {
      uk: "Власна CRM-система ettoryx для управління продажами та клієнтами.",
      en: "ettoryx's own CRM system for managing sales and clients.",
    },
    value: { uk: "Швидший цикл угоди на 35%", en: "35% faster deal cycle" },
    // TODO: replace with real product URL when public
    url: "https://crm.kdnx.cloud/",
    isMock: true,
  },
  {
    slug: "layout",
    name: "ettoryx Layout",
    icon: "LayoutGrid",
    category: { uk: "Layout", en: "Layout" },
    short: {
      uk: "Конструктор інтерфейсів і дизайн-систем для швидкого старту продуктів.",
      en: "A UI and design-system builder to launch products faster.",
    },
    value: { uk: "Прототип за години, не тижні", en: "Prototype in hours, not weeks" },
    url: "#",
    isMock: true,
  },
  {
    slug: "ai-automation",
    name: "ettoryx AI",
    icon: "Sparkles",
    category: { uk: "AI Automation", en: "AI Automation" },
    short: {
      uk: "Платформа AI-агентів для автоматизації бізнес-процесів.",
      en: "An AI-agent platform for business-process automation.",
    },
    value: { uk: "До 60% рутини — автоматично", en: "Up to 60% of routine automated" },
    url: "#",
    isMock: true,
  },
  {
    slug: "saas",
    name: "ettoryx SaaS",
    icon: "Cloud",
    category: { uk: "SaaS", en: "SaaS" },
    short: {
      uk: "Готова SaaS-основа: білінг, ролі, мультитенант з коробки.",
      en: "A ready SaaS foundation: billing, roles and multi-tenancy out of the box.",
    },
    value: { uk: "Запуск SaaS удвічі швидше", en: "Launch your SaaS twice as fast" },
    url: "#",
    isMock: true,
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "fintech-crm",
    title: { uk: "CRM для фінтех-стартапу", en: "CRM for a fintech startup" },
    client: "NovaPay (mock)",
    category: { uk: "CRM розробка", en: "CRM development" },
    industry: { uk: "Фінтех", en: "Fintech" },
    result: { uk: "+35% до конверсії продажів", en: "+35% sales conversion" },
    challenge: {
      uk: "Команда продажів працювала в таблицях і втрачала до 20% лідів.",
      en: "The sales team worked in spreadsheets and lost up to 20% of leads.",
    },
    solution: {
      uk: "Ми побудували кастомну CRM з автоматизованими воронками та скорингом лідів.",
      en: "We built a custom CRM with automated pipelines and lead scoring.",
    },
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    metrics: [
      { label: { uk: "Конверсія", en: "Conversion" }, value: "+35%" },
      { label: { uk: "Втрачені ліди", en: "Lost leads" }, value: "-90%" },
      { label: { uk: "Час на угоду", en: "Deal time" }, value: "-40%" },
    ],
    testimonial: {
      quote: { uk: "ettoryx зібрали нам систему, якою команда користується щодня із задоволенням.", en: "ettoryx built us a system the team actually loves using daily." },
      author: "Olena K. (mock)",
      role: { uk: "COO, NovaPay", en: "COO, NovaPay" },
    },
    seo: {
      title: { uk: "Кейс: CRM для фінтеху | ettoryx", en: "Case: Fintech CRM | ettoryx" },
      description: { uk: "Як ми підняли конверсію продажів на 35%.", en: "How we lifted sales conversion by 35%." },
    },
  },
  {
    slug: "logistics-platform",
    title: { uk: "ERP-платформа для логістики", en: "ERP platform for logistics" },
    client: "TransLine (mock)",
    category: { uk: "ERP розробка", en: "ERP development" },
    industry: { uk: "Логістика", en: "Logistics" },
    result: { uk: "-28% операційних витрат", en: "-28% operating costs" },
    challenge: {
      uk: "Розрізнені склади й ручний облік уповільнювали доставку.",
      en: "Siloed warehouses and manual tracking slowed deliveries.",
    },
    solution: {
      uk: "Єдина ERP з реальним обліком запасів і маршрутизацією.",
      en: "A unified ERP with real-time inventory and routing.",
    },
    technologies: ["Python", "PostgreSQL", "RabbitMQ", "Kubernetes"],
    metrics: [
      { label: { uk: "Витрати", en: "Costs" }, value: "-28%" },
      { label: { uk: "Швидкість доставки", en: "Delivery speed" }, value: "+22%" },
      { label: { uk: "Помилки обліку", en: "Tracking errors" }, value: "-95%" },
    ],
    seo: {
      title: { uk: "Кейс: ERP для логістики | ettoryx", en: "Case: Logistics ERP | ettoryx" },
      description: { uk: "Як ми скоротили операційні витрати на 28%.", en: "How we cut operating costs by 28%." },
    },
  },
  {
    slug: "saas-marketing-site",
    title: { uk: "Сайт і AI-асистент для SaaS", en: "Website & AI assistant for SaaS" },
    client: "Cloudset (mock)",
    category: { uk: "Веб + AI", en: "Web + AI" },
    industry: { uk: "SaaS", en: "SaaS" },
    result: { uk: "+52% до заявок з сайту", en: "+52% inbound leads" },
    challenge: {
      uk: "Повільний сайт і перевантажена підтримка.",
      en: "A slow website and an overwhelmed support team.",
    },
    solution: {
      uk: "Швидкий сайт на Next.js та AI-асистент для першої лінії підтримки.",
      en: "A fast Next.js website and an AI assistant for first-line support.",
    },
    technologies: ["Next.js", "Tailwind", "OpenAI", "Vercel"],
    metrics: [
      { label: { uk: "Заявки", en: "Leads" }, value: "+52%" },
      { label: { uk: "Швидкість", en: "Load time" }, value: "0.9s" },
      { label: { uk: "Тикети підтримки", en: "Support tickets" }, value: "-40%" },
    ],
    seo: {
      title: { uk: "Кейс: сайт і AI для SaaS | ettoryx", en: "Case: SaaS site & AI | ettoryx" },
      description: { uk: "Як ми збільшили заявки на 52%.", en: "How we grew inbound leads by 52%." },
    },
  },
];

export const team: TeamMember[] = [
  {
    slug: "oleksandr-hoian",
    name: "Oleksandr Hoian",
    role: { uk: "Співзасновник і CEO", en: "Co-Founder & CEO" },
    bio: { uk: "Веде продуктове бачення, стратегію та партнерства з клієнтами.", en: "Drives product vision, strategy and client partnerships." },
    leadership: true,
    linkedin: "#",
    photo: "/team/oleksandr.png",
  },
  {
    slug: "mykola-plikhtiak",
    name: "Mykola Plikhtiak",
    role: { uk: "Співзасновник і CTO", en: "Co-Founder & CTO" },
    bio: { uk: "Архітектор масштабованих систем та AI-рішень.", en: "Architect of scalable systems and AI solutions." },
    leadership: true,
    linkedin: "#",
    photo: "/team/mykola.png",
  },
  {
    slug: "jane-doe",
    name: "Jane Doe",
    role: { uk: "Senior Frontend Developer", en: "Senior Frontend Developer" },
    bio: { uk: "Спеціалізується на React, Next.js та дизайн-системах.", en: "Specializes in React, Next.js and design systems." },
    leadership: false,
    linkedin: "#",
  },
  {
    slug: "john-smith",
    name: "John Smith",
    role: { uk: "Lead Backend Engineer", en: "Lead Backend Engineer" },
    bio: { uk: "Будує надійні API та розподілені системи.", en: "Builds reliable APIs and distributed systems." },
    leadership: false,
    linkedin: "#",
  },
  {
    slug: "maria-santos",
    name: "Maria Santos",
    role: { uk: "Head of Design", en: "Head of Design" },
    bio: { uk: "Веде UX/UI напрямок і дизайн-систему компанії.", en: "Leads the UX/UI direction and the company design system." },
    leadership: false,
    linkedin: "#",
  },
];

export const jobs: JobListing[] = [
  {
    slug: "senior-frontend-developer",
    title: { uk: "Senior Frontend Developer", en: "Senior Frontend Developer" },
    department: { uk: "Інженерія", en: "Engineering" },
    format: { uk: "Віддалено", en: "Remote" },
    location: { uk: "Україна / ЄС", en: "Ukraine / EU" },
    description: {
      uk: "Ми шукаємо досвідченого frontend-розробника для роботи над продуктами та клієнтськими проєктами.",
      en: "We are looking for an experienced frontend developer to work on our products and client projects.",
    },
    requirements: {
      uk: ["5+ років з React", "Досвід із Next.js та TypeScript", "Розуміння UX і дизайн-систем", "Англійська Upper-Intermediate+"],
      en: ["5+ years with React", "Experience with Next.js and TypeScript", "Strong UX and design-system sense", "Upper-Intermediate+ English"],
    },
    offer: {
      uk: ["Гнучкий графік", "Медичне страхування", "Бюджет на навчання", "Сучасний стек"],
      en: ["Flexible schedule", "Health insurance", "Learning budget", "Modern stack"],
    },
    seo: {
      title: { uk: "Вакансія: Senior Frontend | ettoryx", en: "Job: Senior Frontend | ettoryx" },
      description: { uk: "Приєднуйтесь до команди ettoryx.", en: "Join the ettoryx team." },
    },
    datePosted: "2026-06-01",
  },
  {
    slug: "backend-engineer",
    title: { uk: "Backend Engineer", en: "Backend Engineer" },
    department: { uk: "Інженерія", en: "Engineering" },
    format: { uk: "Гібрид", en: "Hybrid" },
    location: { uk: "Київ", en: "Kyiv" },
    description: {
      uk: "Розробка надійних API та інтеграцій для наших продуктів.",
      en: "Building reliable APIs and integrations for our products.",
    },
    requirements: {
      uk: ["3+ роки з Node.js або Python", "Досвід із PostgreSQL", "Розуміння мікросервісів"],
      en: ["3+ years with Node.js or Python", "Experience with PostgreSQL", "Understanding of microservices"],
    },
    offer: {
      uk: ["Конкурентна ЗП", "Оплачувані відпустки", "Профільні конференції"],
      en: ["Competitive salary", "Paid vacations", "Industry conferences"],
    },
    seo: {
      title: { uk: "Вакансія: Backend Engineer | ettoryx", en: "Job: Backend Engineer | ettoryx" },
      description: { uk: "Приєднуйтесь до команди ettoryx.", en: "Join the ettoryx team." },
    },
    datePosted: "2026-06-10",
  },
  {
    slug: "product-designer",
    title: { uk: "Product Designer", en: "Product Designer" },
    department: { uk: "Дизайн", en: "Design" },
    format: { uk: "Віддалено", en: "Remote" },
    location: { uk: "Будь-де", en: "Anywhere" },
    description: {
      uk: "Створення преміальних інтерфейсів для B2B-продуктів.",
      en: "Crafting premium interfaces for B2B products.",
    },
    requirements: {
      uk: ["Портфоліо B2B/SaaS", "Figma на високому рівні", "Досвід із дизайн-системами"],
      en: ["B2B/SaaS portfolio", "Advanced Figma skills", "Design-system experience"],
    },
    offer: {
      uk: ["Творча свобода", "Сучасні інструменти", "Дружня команда"],
      en: ["Creative freedom", "Modern tooling", "A friendly team"],
    },
    seo: {
      title: { uk: "Вакансія: Product Designer | ettoryx", en: "Job: Product Designer | ettoryx" },
      description: { uk: "Приєднуйтесь до команди ettoryx.", en: "Join the ettoryx team." },
    },
    datePosted: "2026-06-15",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: {
      uk: "ettoryx перетворили хаос у продажах на керовану систему. Рекомендуємо.",
      en: "ettoryx turned our sales chaos into a system we can actually run. Highly recommended.",
    },
    author: "Olena K. (mock)",
    role: { uk: "COO", en: "COO" },
    company: "NovaPay",
  },
  {
    quote: {
      uk: "Професійна команда, що розуміє бізнес, а не лише код.",
      en: "A professional team that understands the business, not just the code.",
    },
    author: "Mark T. (mock)",
    role: { uk: "CEO", en: "CEO" },
    company: "Cloudset",
  },
  {
    quote: {
      uk: "Доставили вчасно й у бюджеті. Комунікація — на найвищому рівні.",
      en: "Delivered on time and on budget. Communication was top-notch.",
    },
    author: "Serhii P. (mock)",
    role: { uk: "Product Lead", en: "Product Lead" },
    company: "TransLine",
  },
];

export const stats: Stat[] = [
  { value: 120, suffix: "+", label: { uk: "Реалізованих проєктів", en: "Projects delivered" } },
  { value: 8, suffix: " ", label: { uk: "Років на ринку", en: "Years on the market" } },
  { value: 40, suffix: "+", label: { uk: "Інженерів у команді", en: "Engineers on the team" } },
  { value: 98, suffix: "%", label: { uk: "Задоволених клієнтів", en: "Client satisfaction" } },
];

export const techStack: string[] = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL",
  "Docker", "Kubernetes", "AWS", "Vercel", "GraphQL", "Tailwind CSS",
];

export const clientLogos: string[] = [
  "NovaPay", "Cloudset", "TransLine", "Meridian", "Vertex", "Northwind",
];

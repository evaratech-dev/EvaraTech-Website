/**
 * Slugs with a bespoke mechanism drawing. Kept here rather than in the
 * illustration registry because that module is client-only, and a server
 * component cannot call into it.
 */
export const illustratedSlugs = new Set([
  "evaratank",
  "evaradeep",
  "evaraflow",
  "evaravalve",
  "evaraphase",
  "evaraamp",
  "evaratds",
  "evararain",
]);

/**
 * Products with no photo-real render yet. Their pages stay reachable, but they
 * are kept off the product row, footer and any other listing until one exists.
 */
export const unlistedProductSlugs = new Set(["evaraphase"]);

/** Every product below has a generated page at /products/[slug]. */
export const builtProductSlugs = new Set([
  "evaratank",
  "evaradeep",
  "evaraflow",
  "evaravalve",
  "evaraphase",
  "evaraamp",
  "evaratds",
  "evararain",
]);

/**
 * The scale of the problem EvaraTech exists to solve.
 * Sources cited in the AIC-IIITH deck: CSE, CPHEEO, NITI Aayog.
 */
export const problemScale = {
  lossLow: 40,
  lossHigh: 60,
  claim:
    "India loses 40 to 60% of its urban water supply to leakage, theft and analog billing errors.",
  sources: ["CSE", "CPHEEO", "NITI Aayog", "Global Water Forum"],
  causes: [
    {
      label: "Physical leakage",
      detail:
        "Pipes leak silently underground. Without night-flow analysis nobody notices until the road caves in.",
      device: "EvaraFlow",
    },
    {
      label: "Unmetered & analog billing",
      detail:
        "Dials read by hand once a month. No trend, no anomaly detection, no accountability.",
      device: "EvaraFlow",
    },
    {
      label: "Overflow & dry-run waste",
      detail:
        "Tanks overflow onto walls; pumps burn out running into empty wells. Both are invisible today.",
      device: "EvaraTank",
    },
    {
      label: "Blind groundwater draw",
      detail:
        "Borewells are pumped without knowing what's left, so recharge goes unnoticed and motors fail.",
      device: "EvaraDeep",
    },
  ],
};

/** Pricing and named competitors, from the AIC-IIITH competitive slide. */
export const marketPosition = {
  pricePoint: "₹15K",
  competitors: [
    {
      name: "EvaraTech",
      price: "₹15K",
      easyInstall: true,
      realtimeLeak: true,
      noCivilWork: true,
      mlAnalytics: true,
      isUs: true,
    },
    {
      name: "Kritsnam Tech",
      price: "₹45K",
      easyInstall: false,
      realtimeLeak: false,
      noCivilWork: false,
      mlAnalytics: false,
      isUs: false,
    },
    {
      name: "Flow Smart",
      price: "₹30K",
      easyInstall: true,
      realtimeLeak: true,
      noCivilWork: "partial" as const,
      mlAnalytics: false,
      isUs: false,
    },
  ],
  serviceableMarket: "₹4,000 Cr",
  threeYearTarget: "₹400 Cr",
};

export const team = [
  {
    name: "Ritik Pradip Yelekar",
    role: "Founder & CEO",
    bio: "M.S. Research IIIT-H, B.E. Electronics SVPCET. IoT-water researcher and patent holder; previously CTO at Hydroeverse.",
    focus: ["Product vision", "Water-IoT research", "Patents & IP", "Partnerships"],
    quote: "I have watched tanks overflow onto the street in a city that trucks water in. That gap is what we close.",
  },
  {
    name: "Aditya Bhagwan Deole",
    role: "Co-Founder & CTO",
    bio: "B.Tech. Embedded systems, firmware and sensor hardware, with 3+ years of development experience.",
    focus: ["Firmware", "Sensor hardware", "Edge AI", "Connectivity"],
    quote: "Every device has to survive a rooftop monsoon and a two-week blackout. Nothing ships until it does.",
  },
  {
    name: "Dr. Sachin Chaudhari",
    role: "Technical Advisor & Co-founder",
    bio: "Associate Professor, Signal Processing & Communications Research Center, IIIT Hyderabad. Guides the sensing and signal work behind every device.",
    focus: ["Signal processing", "Sensing research", "Academic pipeline", "Validation"],
    quote: "Good water data is a signal-processing problem before it is a software problem.",
  },
  {
    name: "Jagan Mohan Reddy",
    role: "Hardware Lead",
    bio: "Electronics engineer specialising in PCB design, sensor integration and field deployment.",
    focus: ["PCB design", "Sensor integration", "Field installs", "Manufacturing"],
    quote: "If an installer can fit it in ten minutes without a manual, the board is finished.",
  },
];

/** The road from a research bench to the field, in the order it happened. */
/** The road from a research bench to the field, in the order it happened. */
export const journey = [
  { year: "2022", title: "The patent", detail: "Indian Patent 202241055442 granted for IoT borewell and tank water-level tracking, assigned jointly with IIIT Hyderabad." },
  { year: "2023", title: "First devices in the field", detail: "EvaraFlow retrofits go live on real analog meters. Night-flow analysis finds its first silent leaks." },
  { year: "2025", title: "Rashtrapati Nilayam", detail: "Stepwells, borewells and rainfall at the Presidential Residence monitored through a full year of seasons." },
  { year: "Oct 2025", title: "EvaraTech Private Limited", detail: "Incorporated 10 October 2025 in Hyderabad." },
  { year: "2026", title: "The TTDF pilot", detail: "5G NB-IoT smart water monitoring: nine nodes live across the IIIT Hyderabad campus, with the Rudraram village deployment next." },
];

export const research = {
  headline: "Built inside a research lab, not a garage.",
  detail:
    "EvaraTech came out of the IIIT Hyderabad Smart City Research Center. The core patent is assigned jointly with IIIT Hyderabad, and product development runs on a direct research-to-product pipeline with the university.",
  patent: "Indian Patent No. 202241055442 (Granted)",
  patentTitle:
    "System and Method for Automatically Tracking Water Level in a Borewell using IoT",
  designs: ["383622-001", "406097-001", "437876-001", "444652-001"],
};

export const roadmap = [
  { phase: "Now", title: "Scale pilots", detail: "Buildings, campuses and lakes" },
  { phase: "Next", title: "Smart campuses & institutions", detail: "Universities and government facilities" },
  { phase: "Then", title: "Municipal & smart city", detail: "City-wide water intelligence" },
  { phase: "Later", title: "AI automation", detail: "Predictive and autonomous control" },
  { phase: "Horizon", title: "National expansion", detail: "Pan-India partnerships" },
];

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  oneLine: string;
  problem: string;
  howItWorks: string;
  /** Ordered teardown of the operating principle. Drives the product page. */
  mechanism?: { step: string; detail: string }[];
  /** What the device is for, in the customer's words. */
  applications?: string[];
  /** Headline capabilities, as published on the product sheet. */
  features?: { title: string; detail: string }[];
  specs: { label: string; value: string }[];
  image?: string;
  /** Additional real photography, including field installs. */
  gallery?: string[];
  price?: string;
  hasSpecSheet: boolean;
  accent: "water" | "teal" | "leaf" | "navy";
};

export const company = {
  name: "EvaraTech",
  legalName: "EvaraTech Private Limited",
  founded: "10 October 2025",
  hq: "Hyderabad, Telangana, India",
  sector: "Cleantech IoT, Smart Water Management",
  founders: [
    { name: "Ritik Pradip Yelekar", role: "Founder & CEO" },
    { name: "Aditya Bhagwan Deole", role: "Co-Founder & CTO" },
  ],
  tagline: "Your universe of Sustainable Solutions",
  supportingLine: "Monitoring. Automating. Optimizing.",
  /** Live-site headline voice, evaratech.com */
  headline: "Your Water Intelligence Platform",
  subhead: "Sustainable Intelligence",
  promise: "Every drop monitored. Every insight actionable.",
  positioning:
    "One Platform. Complete Control. Intelligent Water Infrastructure.",
  mission:
    "Building intelligent infrastructure that makes every drop of water measurable, predictable and optimizable.",
  vision:
    "A world where no drop is wasted, where every tank, borewell, meter and pump can think, report and protect the water it carries.",
  values: [
    {
      title: "Retrofit first",
      detail:
        "We add intelligence to what already exists. Nothing is ripped out, no pipe is cut, no community waits on civil work.",
    },
    {
      title: "Measure before you claim",
      detail:
        "Every number we publish comes from a device in the field. Water problems are solved with evidence, not estimates.",
    },
    {
      title: "Built for the hard places",
      detail:
        "Rural borewells, monsoon rooftops, industrial pump rooms. If it does not survive there, it is not finished.",
    },
    {
      title: "Sustainability is the product",
      detail:
        "Saved water, protected pumps and lower energy per litre are the outcomes we are measured on.",
    },
  ],
  coreIdea:
    "EvaraTech makes existing water infrastructure smart. Borewells, tanks, meters and pumps get non-intrusive IoT devices added on top, so users get real-time data, AI-powered alerts and remote control without replacing anything.",
  differentiator:
    "Most smart water solutions require breaking pipes, replacing meters or submerging sensors. That is expensive, intrusive and impractical at scale. EvaraTech's products clip on, sit above or attach externally: no infrastructure replacement, no civil work, no water contact.",
  email: "contact@evaratech.com",
  web: "www.evaratech.com",
};

/**
 * Operational figures published on evaratech.com.
 * Kept separate from spec-sheet figures so it is obvious which numbers
 * describe the deployed fleet vs. an individual device's capability.
 */
export const liveMetrics = [
  { value: 120, suffix: "", label: "Devices installed" },
  { value: 15, suffix: "", label: "Active sites" },
  { value: 2.5, suffix: "M", decimals: 1, label: "Litres monitored" },
  { value: 99.9, suffix: "%", decimals: 1, label: "System uptime" },
];

export const audiences = [
  "Governments & municipal water bodies",
  "Smart cities & infrastructure",
  "Universities & research",
  "Industries & manufacturing",
  "Commercial buildings & utilities",
  "RWAs & gated communities",
];

export const differentiators = [
  {
    title: "Retrofit-first architecture",
    detail:
      "Clip-on, non-contact devices. No pipe cutting, no civil work, no permits, and roughly 10x cheaper to deploy than replacement.",
  },
  {
    title: "Granted Indian patent",
    detail:
      "Patent No. 202241055442 for IoT borewell/tank tracking, plus 4 registered industrial designs.",
  },
  {
    title: "On-device AI",
    detail:
      "97% digit-recognition accuracy on EvaraFlow, running on the device itself. Works offline, with no cloud dependency for core metering.",
  },
  {
    title: "Full-stack platform",
    detail: "Hardware + EvaraOne cloud + AI analytics in one ecosystem.",
  },
  {
    title: "Research-backed",
    detail: "Built with IIIT Hyderabad research collaboration.",
  },
];

export type Deployment = {
  place: string;
  city: string;
  detail: string;
  /** WGS84, for the map. */
  lat: number;
  lon: number;
  /** What is installed there, in the site's own words. */
  installed: string[];
  /** Slug of a case study page, where one exists. */
  caseStudy?: string;
};

export const deployments: Deployment[] = [
  {
    place: "Rashtrapati Nilayam",
    city: "Hyderabad",
    detail: "The Presidential Residence. Stepwell, borewell and rainfall monitoring for campus water budgeting.",
    lat: 17.53,
    lon: 78.53,
    installed: ["Water level sensors on 3 stepwells", "Current and level sensing on 5 borewells", "Rain gauge"],
    caseStudy: "rashtrapati-nilayam",
  },
  {
    place: "IIIT Hyderabad",
    city: "Hyderabad",
    detail: "Bakul Boys Hostel and campus tanks. Tank monitoring, retrofit meters and the ML research testbed.",
    lat: 17.445,
    lon: 78.35,
    installed: ["5 tank and sump level nodes", "4 EvaraFlow retrofits", "RO water quality monitoring"],
    caseStudy: "sangareddy",
  },
  {
    place: "Lulu Mall",
    city: "Hyderabad",
    detail: "Commercial deployment.",
    lat: 17.46,
    lon: 78.39,
    installed: ["Water monitoring on a live commercial site"],
  },
  {
    place: "Rudraram, Sangareddy",
    city: "Sangareddy district",
    detail: "Village water system under the TTDF 5G NB-IoT pilot. 62 borewells, 5 overhead tanks and 4 sumps surveyed for monitoring.",
    lat: 17.6,
    lon: 78.0,
    installed: ["Site survey complete", "Flow metering on borewell outlets", "Tank and sump level monitoring"],
    caseStudy: "sangareddy",
  },
  {
    place: "Jakkur Lake",
    city: "Bangalore",
    detail: "Open water-body level monitoring.",
    lat: 13.08,
    lon: 77.6,
    installed: ["Water level monitoring on an open lake"],
  },
];

export const platformModules = [
  { title: "Device Management", detail: "See every deployed EvaraTech device in one place" },
  { title: "Live Monitoring", detail: "Tank levels, borewell levels, water flow, consumption" },
  { title: "Alert Engine", detail: "Leakage, overflow, pump anomalies, low water" },
  { title: "AI/ML Analytics", detail: "Predictive maintenance, usage forecasting, leak prediction" },
  { title: "Multi-Site Management", detail: "Apartments, industries and entire smart cities" },
  { title: "API Integration", detail: "Third-party apps can pull data" },
  { title: "Voice Alerts", detail: "Spoken alerts with multi-language support" },
];

export const products: Product[] = [
  {
    slug: "evaratank",
    name: "EvaraTank",
    tagline: "Smart eyes on your water tank",
    category: "Overhead Tank Monitoring",
    oneLine:
      "Real-time tank level, overflow and usage insights, measured without touching the water.",
    problem:
      "Every home, hotel, hospital, school and apartment has overhead tanks, yet nobody knows when they are full, half-empty or dry. Tanks overflow and waste water; pumps run dry and burn out; climbing to the roof to check is unsafe and impractical.",
    howItWorks:
      "EvaraTank sits on top of the tank and times an ultrasonic pulse to the water surface and back. It estimates inflow and outflow, detects leaks, and sends overflow alerts without ever contacting the water.",
    mechanism: [
      {
        step: "Trigger",
        detail:
          "A 10 µs pulse on the TRIG pin starts a measurement cycle.",
      },
      {
        step: "Transmit",
        detail:
          "The sensor emits eight ultrasonic pulses at 40 kHz toward the water surface.",
      },
      {
        step: "Listen",
        detail:
          "The reflected echo returns and the Time of Flight is measured.",
      },
      {
        step: "Compute",
        detail:
          "Distance = (speed of sound × echo time) ÷ 2. Water level = tank height − distance, corrected for water temperature.",
      },
      {
        step: "Report",
        detail:
          "The level is transmitted to EvaraOne for live monitoring, trends and alerts.",
      },
    ],
    specs: [
      { label: "Range", value: "0.3 m – 5 m" },
      { label: "Precision", value: "99.7%" },
      { label: "Frequency", value: "40 kHz ultrasonic" },
      { label: "Compensation", value: "Water temperature" },
      { label: "Enclosure", value: "IP65 waterproof" },
      { label: "Connectivity", value: "WiFi / BLE / LoRaWAN / 4G-5G" },
      { label: "Battery", value: "1000 mAh, deep sleep" },
      { label: "Bonus", value: "Contactless temperature sensing" },
    ],
    applications: [
      "Overhead tanks, residential & commercial",
      "Apartments & gated communities",
      "Industrial water storage",
      "Hotels, hospitals & institutions",
      "Smart cities & municipalities",
      "Agriculture & irrigation",
    ],
    features: [
      { title: "Live level monitoring", detail: "Accurate, real-time water level and volume tracking." },
      { title: "Overflow & empty alerts", detail: "Instant notification before a tank spills or a pump runs dry." },
      { title: "Leakage & flow monitoring", detail: "Detects leaks and measures fill and draw rates in real time." },
      { title: "Temperature compensation", detail: "Contactless temperature sensing keeps readings accurate as conditions change." },
      { title: "Long battery life", detail: "Up to 30 days of backup through a blackout." },
      { title: "Rugged & reliable", detail: "IP65 waterproof design for rooftop exposure." },
    ],
    image: "/images/products/evaratank.webp",
    hasSpecSheet: true,
    accent: "water",
  },
  {
    slug: "evaradeep",
    name: "EvaraDeep",
    tagline: "The patented borewell brain",
    category: "Borewell Intelligence",
    oneLine:
      "Live borewell water level, runtime and dry-run protection, with no electronics inside the well.",
    problem:
      "Farmers and rural communities depend on borewells but nobody knows how much water is left. Pumps run blindly, wells run dry mid-irrigation and damage motors, and overnight recharge goes unnoticed. Sensors dropped into the water corrode and are expensive to replace.",
    howItWorks:
      "EvaraDeep measures groundwater depth by sensing the tension in a string holding a floating bob. A motor lowers the bob until it reaches the surface; the string goes slack, a tension switch fires, and an encoder reports exactly how much string was paid out. Only string and bob ever enter the well.",
    mechanism: [
      {
        step: "Lower",
        detail:
          "A DC motor with an encoder pays out a string carrying a floating bob down the casing.",
      },
      {
        step: "Detect",
        detail:
          "The instant the bob reaches the water it floats, the string goes slack, and a tension switch registers the release.",
      },
      {
        step: "Measure",
        detail:
          "The encoder reports the exact length of string paid out. That length is the depth to water.",
      },
      {
        step: "Retract",
        detail:
          "The motor reels the bob back up, leaving nothing submerged between readings.",
      },
      {
        step: "Report",
        detail:
          "The depth is pushed to EvaraOne, building a live picture of drawdown and overnight recharge.",
      },
    ],
    specs: [
      { label: "Depth range", value: "Up to 100 m" },
      { label: "Accuracy", value: "99.4%" },
      { label: "Sensing", value: "String tension + floating bob" },
      { label: "Actuation", value: "DC motor with encoder" },
      { label: "In-well electronics", value: "None" },
      { label: "Patent", value: "IN 202241055442 (Granted)" },
      { label: "Connectivity", value: "WiFi / BLE / LoRaWAN / 4G-5G" },
      { label: "Battery", value: "2000 mAh backup" },
    ],
    applications: [
      "Borewells, residential & community",
      "Deep tanks & sumps",
      "Agriculture & irrigation",
      "Industrial water supply",
      "Smart cities & municipalities",
      "Construction sites",
      "Remote & off-grid locations",
    ],
    features: [
      { title: "Live level monitoring", detail: "Accurate, real-time tracking of the water column." },
      { title: "Low water level alerts", detail: "Instant warning to prevent dry-run damage and scarcity." },
      { title: "Leakage insight", detail: "Detects abnormal usage patterns against normal drawdown." },
      { title: "Historical data & trends", detail: "Tracks long-term groundwater behaviour and overnight recharge." },
      { title: "Long battery life", detail: "Up to 15 days of backup in case of blackout." },
      { title: "Rugged & reliable", detail: "IP65 waterproof design for harsh environments." },
    ],
    image: "/images/products/evaradeep.webp",
    hasSpecSheet: true,
    accent: "navy",
  },
  {
    slug: "evaraflow",
    name: "EvaraFlow",
    tagline: "AI eyes on your water meter",
    category: "Smart Meter Retrofit",
    oneLine:
      "Turns any existing analog meter smart with a clip-on camera and on-device Edge AI. No pipe cutting.",
    problem:
      "Most water meters in India are analog, with spinning dials read manually once a month. No leak detection, no real-time data, and replacing them with digital meters costs thousands per meter, which is impossible for apartments, factories and municipalities with hundreds of meters.",
    howItWorks:
      "EvaraFlow clips onto the existing analog meter. Its camera captures the dial, an on-device AI model reads the digits, and the reading is sent to the cloud. No pipe cutting, no replacement, no plumber.",
    mechanism: [
      {
        step: "Clamp",
        detail:
          "The housing clips over the meter face. Nothing is cut, drilled or unplumbed.",
      },
      {
        step: "Capture",
        detail:
          "An 8 MP Sony IMX219PQ camera photographs the dial on a schedule, with illumination compensation for angle and light.",
      },
      {
        step: "Infer",
        detail:
          "A deep-learning OCR model runs on the onboard quad-core ARM processor, resolving digits at 97% accuracy, entirely offline.",
      },
      {
        step: "Analyse",
        detail:
          "Night-flow analysis compares consumption against periods when nothing should be drawing water, surfacing silent leaks.",
      },
      {
        step: "Report",
        detail:
          "Readings and anomalies stream to EvaraOne over whichever network the site already has.",
      },
    ],
    specs: [
      { label: "Camera", value: "8 MP, Sony IMX219PQ" },
      { label: "Processor", value: "1 GHz quad-core ARM Cortex-A53" },
      { label: "Memory", value: "512 MB SDRAM" },
      { label: "AI accuracy", value: "97% digit recognition" },
      { label: "Edge inference", value: "On-device, offline capable" },
      { label: "Connectivity", value: "WiFi / BLE / LoRaWAN / GSM-4G-5G" },
      { label: "Power", value: "5V 1A + 3000 mAh backup" },
      { label: "Leak detection", value: "Night-flow analysis" },
    ],
    applications: [
      "Smart water distribution",
      "Irrigation management",
      "Industrial water systems",
      "Apartments & communities",
      "Commercial buildings",
      "Municipal water supply",
    ],
    features: [
      { title: "Easy retrofit", detail: "Plug-and-play installation on any analog meter." },
      { title: "AI digit recognition", detail: "Reads the dial on-device at up to 97% accuracy, offline." },
      { title: "Leakage detection", detail: "Night-flow analysis surfaces silent leaks nobody is watching for." },
      { title: "Local data storage", detail: "Images and readings are held on the device when the network drops." },
      { title: "Long battery life", detail: "Up to 14 days of backup." },
      { title: "Compact & durable", detail: "IP67 rated for real-world meter chambers." },
    ],
    image: "/images/products/evaraflow-full.webp",
    price: "₹10K",
    hasSpecSheet: true,
    accent: "teal",
  },
  {
    slug: "evaravalve",
    name: "EvaraValve",
    tagline: "Remote control of your water flow",
    category: "Automated Valve Control",
    oneLine:
      "Turns a conventional pipeline into a connected, remotely controllable, data-driven distribution system.",
    problem:
      "Water distribution is managed by manually opening and closing valves across sites. It is slow, labour-intensive and error-prone. Operators cannot react quickly to demand, leaks or scheduling needs, and there is no record of who changed what.",
    howItWorks:
      "EvaraValve is a motorised valve actuator with metering built in. Rather than simply opening and closing, it measures consumption, automates supply on rules, detects abnormal usage, and reports to EvaraOne, enabling fair, transparent, automated billing.",
    mechanism: [
      {
        step: "Meter",
        detail:
          "Inline sensing measures real-time flow and cumulative consumption per connection.",
      },
      {
        step: "Attribute",
        detail:
          "Usage is resolved user-wise, time-wise and location-wise across a building or campus.",
      },
      {
        step: "Automate",
        detail:
          "Rules and schedules open, close or throttle supply per zone without anyone on site.",
      },
      {
        step: "Detect",
        detail:
          "Abnormal consumption and pipeline anomalies raise alerts and can trigger isolation.",
      },
    ],
    specs: [
      { label: "Valve type", value: "2-way motorised ball valve" },
      { label: "Available sizes", value: "DN15 (½\") – DN50 (2\")" },
      { label: "Operation time", value: "5 – 8 seconds, open or close" },
      { label: "Body material", value: "Stainless steel 304 / brass, PTFE seal" },
      { label: "Protection", value: "IP67, water and dust proof" },
      { label: "Manual override", value: "Yes, local operation on power or network loss" },
      { label: "Connectivity", value: "4G / NB-IoT / WiFi / LoRaWAN / BLE" },
      { label: "Pressure rating", value: "PN16" },
    ],
    applications: [
      "Municipal water distribution",
      "Irrigation & agriculture",
      "Industrial water systems",
      "Smart buildings & campuses",
      "Leakage control zones",
      "Tanker filling & transfer lines",
      "Water treatment plants",
    ],
    features: [
      { title: "Remote control", detail: "Open or close from anywhere via dashboard or mobile app." },
      { title: "Automated operation", detail: "Schedule, automate and integrate with the rest of the site." },
      { title: "Leakage prevention", detail: "Instant shut-off limits water loss and damage." },
      { title: "Flow management", detail: "Accurate control for fair, efficient distribution." },
      { title: "Manual override", detail: "Easy local operation if power or network fails." },
      { title: "Rugged & reliable", detail: "Corrosion-resistant body built for long life in tough environments." },
    ],
    image: "/images/products/evaravalve.webp",
    hasSpecSheet: true,
    accent: "water",
  },
  {
    slug: "evaraphase",
    name: "EvaraPhase",
    tagline: "Pump control from your pocket",
    category: "Remote Pump & Phase Control",
    oneLine:
      "Start and stop pumps from your phone, with automatic protection from voltage and phase faults.",
    problem:
      "Farmers physically walk to the pump to switch it on and off, in heat, rain or at night. Industrial pumps need protection from single-phasing, overload and low voltage, but most rural and agricultural pumps have none. A failed motor costs ₹10,000 to ₹50,000 to replace.",
    howItWorks:
      "EvaraPhase is a smart pump starter controlled from a mobile app. It continuously monitors voltage across all phases and automatically shuts the pump down on voltage drop, phase failure or dry run.",
    mechanism: [
      {
        step: "Command",
        detail:
          "A tap in the app sends start or stop to the starter over GSM or WiFi, from anywhere.",
      },
      {
        step: "Watch",
        detail:
          "Voltage is monitored continuously across every phase feeding the motor.",
      },
      {
        step: "Protect",
        detail:
          "On phase failure, voltage anomaly, overload or dry run, the pump is cut automatically before the winding is damaged.",
      },
    ],
    specs: [
      { label: "Supports", value: "Single, two and three-phase motors" },
      { label: "Protection", value: "Phase failure, dry-run, overload" },
      { label: "Control", value: "Mobile app ON/OFF, IoT telemetry" },
      { label: "Connectivity", value: "GSM and WiFi" },
    ],
    applications: [
      "Agricultural borewell pumps",
      "Irrigation systems",
      "Industrial motor rooms",
      "Apartment & campus pump rooms",
      "Remote & off-grid pumping",
    ],
    features: [
      { title: "Control from anywhere", detail: "Start and stop the pump from your phone. No walk to the field." },
      { title: "Phase-fault protection", detail: "Cuts the motor on single-phasing before a winding burns out." },
      { title: "Dry-run protection", detail: "Stops the pump when there is no water to draw." },
      { title: "Voltage monitoring", detail: "Watches every phase feeding the motor, continuously." },
    ],
    hasSpecSheet: true,
    accent: "leaf",
  },
  {
    slug: "evaraamp",
    name: "EvaraAMP",
    tagline: "Pump health & energy doctor",
    category: "Motor Health & Energy Analytics",
    oneLine:
      "Clamp-on current sensing that watches pump electrical health and warns before failure.",
    problem:
      "Pumps are the heart of any water system. They fail from dry running, voltage spikes, overload or aging windings, and there is no early-warning system today. Operators only find out when the pump dies.",
    howItWorks:
      "EvaraAMP clamps a split-core current transducer around the line feeding the motor, with no circuit interruption. It tracks RMS current sub-second, spots abnormal signatures, and totals energy for billing and efficiency.",
    mechanism: [
      {
        step: "Clamp",
        detail:
          "A split-core current transformer closes around the existing supply line. The circuit is never broken.",
      },
      {
        step: "Sample",
        detail:
          "A high-accuracy ADC tracks RMS current and waveform shape at sub-second resolution.",
      },
      {
        step: "Diagnose",
        detail:
          "Dry-run, overload and abnormal current spikes each leave a distinct signature that raises an alert.",
      },
      {
        step: "Total",
        detail:
          "Cumulative energy use feeds efficiency reporting and cost attribution in EvaraOne.",
      },
    ],
    specs: [
      { label: "Sensing", value: "Split-core current transducer" },
      { label: "Installation", value: "Clamp-on, non-invasive" },
      { label: "Resolution", value: "Sub-second RMS tracking" },
      { label: "Monitors", value: "Current, voltage, power, runtime" },
      { label: "Detection", value: "Dry-run, overload, current spikes" },
      { label: "Enclosure", value: "IP65 weatherproof" },
    ],
    applications: [
      "Industrial motors & pumps",
      "Water supply & distribution",
      "HVAC systems",
      "Manufacturing units",
      "Agriculture irrigation systems",
      "Commercial buildings",
      "Solar pump applications",
    ],
    features: [
      { title: "Real-time monitoring", detail: "Live current, voltage, power and energy tracking." },
      { title: "Motor protection", detail: "Detects overload, underload, phase loss and imbalance." },
      { title: "Energy optimisation", detail: "Track consumption and cut cost per litre pumped." },
      { title: "Instant alerts", detail: "Notified by app, SMS or email the moment a fault appears." },
      { title: "Easy installation", detail: "Compact DIN-rail or wall mount with a clip-on CT sensor." },
      { title: "Built for plant rooms", detail: "Flame-retardant ABS body, rated for industrial panels." },
    ],
    image: "/images/products/evaraamp.webp",
    hasSpecSheet: true,
    accent: "water",
  },
  {
    slug: "evaratds",
    name: "EvaraTDS",
    tagline: "Water quality at a glance",
    category: "Water Quality Monitoring",
    oneLine:
      "Inline TDS monitoring at RO outlets, running 24×7 with temperature-compensated readings.",
    problem:
      "Water quality is usually checked with occasional manual sampling, if at all. Users have no continuous visibility into whether their water is safe or within acceptable limits, and contamination or drift goes unnoticed until it becomes a problem.",
    howItWorks:
      "EvaraTDS sits inline at the RO storage tank and measures total dissolved solids and temperature continuously. Readings are temperature-compensated and median-filtered on-device before being streamed to the cloud for trends and alerts.",
    mechanism: [
      {
        step: "Sense",
        detail:
          "Inline sensors capture TDS and temperature continuously through the monitoring cycle.",
      },
      {
        step: "Compensate",
        detail:
          "Local processing corrects for temperature, which otherwise skews conductivity readings.",
      },
      {
        step: "Filter",
        detail:
          "A median across multiple readings suppresses sensor noise and transient spikes.",
      },
      {
        step: "Stream",
        detail:
          "Processed values are transmitted for storage, live trends and out-of-range alerts.",
      },
    ],
    specs: [
      { label: "Parameters", value: "TDS, EC, temperature" },
      { label: "Placement", value: "Inline at RO storage tank" },
      { label: "Duty cycle", value: "24×7 continuous" },
      { label: "Compensation", value: "Temperature corrected" },
      { label: "Filtering", value: "Median-based noise rejection" },
      { label: "Output", value: "Web dashboard and Android app" },
    ],
    applications: [
      "Drinking water quality monitoring",
      "RO plant monitoring",
      "Water treatment plants",
      "Industrial process water",
      "Aquaculture & hydroponics",
      "Swimming pools",
      "Community water projects",
    ],
    features: [
      { title: "Real-time TDS monitoring", detail: "Continuous measurement across the full 0 – 2000 ppm range." },
      { title: "Temperature compensation", detail: "A built-in sensor corrects readings that conductivity alone would skew." },
      { title: "Threshold alerts", detail: "Custom warnings for high TDS and failing water quality." },
      { title: "Cloud connected", detail: "Live sync with the EvaraOne dashboard." },
      { title: "Data insights", detail: "Historical trends, reports and quality analytics." },
      { title: "Anti-corrosion probe", detail: "Titanium alloy probe holds accuracy over the long term." },
    ],
    image: "/images/products/evaratds.webp",
    hasSpecSheet: true,
    accent: "teal",
  },
  {
    slug: "evararain",
    name: "EvaraRain",
    tagline: "Hyperlocal rainfall intelligence",
    category: "Rainwater & Weather Intelligence",
    oneLine:
      "Precision tipping-bucket rain gauge for hyperlocal rainfall, flood warning and harvesting insight.",
    problem:
      "Rainfall data is regional when decisions are local. Harvesting systems get installed then forgotten, reservoirs are managed on stale forecasts, and flood warnings arrive too late to act on.",
    howItWorks:
      "EvaraRain measures precipitation in real time with a precision tipping-bucket gauge, transmits wirelessly, and feeds hyperlocal rainfall data into forecasting, flood early-warning and harvesting analytics in EvaraOne.",
    mechanism: [
      {
        step: "Collect",
        detail:
          "A precision tipping-bucket gauge registers a discrete tip per fixed volume of rainfall.",
      },
      {
        step: "Count",
        detail:
          "Tips are counted and timestamped, giving both total depth and intensity over time.",
      },
      {
        step: "Transmit",
        detail:
          "Low-power wireless uplink reports continuously from unattended field sites.",
      },
      {
        step: "Model",
        detail:
          "Data feeds flood prediction, reservoir and watershed monitoring, and research datasets.",
      },
    ],
    specs: [
      { label: "Method", value: "Precision tipping-bucket gauge" },
      { label: "Measurement", value: "Real-time rainfall depth & intensity" },
      { label: "Enclosure", value: "Rugged, weatherproof" },
      { label: "Power", value: "Low-power, long-term autonomous" },
      { label: "Applications", value: "Agriculture, flood warning, watersheds" },
      { label: "Output", value: "Via EvaraOne dashboard" },
    ],
    applications: [
      "Smart cities & municipalities",
      "Flood monitoring & early warning",
      "Water resource management",
      "Agriculture & irrigation planning",
      "Dams, reservoirs & watersheds",
      "Industrial & construction sites",
      "Weather stations & research",
    ],
    features: [
      { title: "Accurate measurement", detail: "High-precision tipping bucket, 0.2 mm per tip." },
      { title: "Real-time data", detail: "Live rainfall depth and intensity streamed to EvaraOne." },
      { title: "Smart alerts", detail: "Instant notification for heavy rainfall and threshold breaches." },
      { title: "Self-emptying design", detail: "Prevents overflow and keeps measurement accurate unattended." },
      { title: "Two-year battery", detail: "Low-power design for remote field sites." },
      { title: "Weatherproof", detail: "UV-resistant IP65 body built for permanent outdoor exposure." },
    ],
    image: "/images/products/evararain.webp",
    hasSpecSheet: true,
    accent: "leaf",
  },
];

/** Products shown on the site's listings: the row, the footer, "next product". */
export const listedProducts = products.filter((p) => !unlistedProductSlugs.has(p.slug));

const WORDS = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
/** "Seven instruments" reads better than "7 instruments" in a headline. */
export const listedCountWord = WORDS[listedProducts.length] ?? String(listedProducts.length);

export const evaraOne = {
  name: "EvaraOne",
  tagline: "The brain behind everything",
  category: "Unified Cloud Platform",
  oneLine:
    "One AI-powered web and mobile dashboard for monitoring, analytics, alerts and automation across every device and site.",
  /** Who logs in, and what each of them sees. From the EvaraOne SRS. */
  roles: [
    {
      name: "Command",
      who: "EvaraTech operations",
      detail: "Every deployment, device and user across the platform. Allocates devices, sets system-wide parameters, watches platform health.",
    },
    {
      name: "Admin",
      who: "Distributors and partners",
      detail: "Only the customers, sites and devices they have deployed. Onboarding, device registration, deployment tracking, reporting.",
    },
    {
      name: "Customer",
      who: "Societies, institutions, facilities",
      detail: "Only their own premises. Water availability, consumption, trends, alerts and downloadable reports.",
    },
  ],
  /** What the platform computes per instrument, again from the SRS. */
  intelligence: [
    {
      device: "EvaraTank",
      watches: "Level, volume, available litres, consumption",
      computes: "Consumption trends over 24 hours, 3, 7 and 30 days. Daily refill cycle identification. Abnormal usage detection.",
      alerts: "Low level, overflow risk, rapid depletion, device offline",
    },
    {
      device: "EvaraDeep",
      watches: "Static and dynamic water level, recharge rate",
      computes: "Long-term groundwater trends, seasonal variation, borewell sustainability indicators.",
      alerts: "Critical depth thresholds, source health",
    },
    {
      device: "EvaraFlow",
      watches: "Instantaneous flow, cumulative usage",
      computes: "Daily, weekly and monthly consumption. Peak-period identification. Time-based comparison.",
      alerts: "Continuous flow (leak), unusual spike, no-flow condition",
    },
  ],
  capabilities: [
    "Real-time and historical views over any time range",
    "Alert history you can audit, not just a notification",
    "Reports in shareable formats for offline analysis",
    "Multi-tenant: one platform for manufacturer, distributor and end user",
    "Keeps working through partial network or device failure",
    "Role-scoped access so each user sees only their own scope",
  ],
};

/* --------------------------------------------------------------------------
   Case studies. Every figure is taken from EvaraTech's own project decks:
   the Rashtrapati Nilayam stepwell monitoring presentation and the TTDF
   milestone reviews. Nothing here is estimated.
   -------------------------------------------------------------------------- */
export type CaseStudy = {
  slug: string;
  title: string;
  place: string;
  kicker: string;
  summary: string;
  status: "live" | "in progress";
  hero: { label: string; value: string }[];
  challenge: string[];
  approach: string[];
  findings: { title: string; detail: string }[];
  outcome: string;
  devices: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "rashtrapati-nilayam",
    title: "A year of water, measured at the Presidential Residence",
    place: "Rashtrapati Nilayam, Hyderabad",
    kicker: "Stepwell monitoring project",
    summary:
      "Three historic stepwells, five borewells and a rain gauge, read at high frequency through every season, turned a campus that was once a lakh litres a day short into one that can budget its own water.",
    status: "live",
    hero: [
      { label: "Stepwells monitored", value: "3" },
      { label: "Borewells instrumented", value: "5" },
      { label: "Water drawn, one year", value: "26,455 kL" },
      { label: "Water recovered, one year", value: "27,497 kL" },
    ],
    challenge: [
      "In 2019 a CPWD report found the campus more than one lakh litres a day short of its needs, with visitor numbers and plantation growing.",
      "Chinna Baavi, the smallest of the three stepwells, ran completely dry every summer.",
      "Rainwater interventions were made, but nobody could say how much they had changed the water table, or which well to draw from on which day.",
    ],
    approach: [
      "Water level sensors on the Jai Hind, Nakshatra and Chinna Baavi stepwells, reading continuously rather than once a week.",
      "Current sensors on the pump motors and level sensing on five borewells, so every pumping cycle is matched to the drawdown it causes.",
      "A rain gauge at Chinna Baavi, so recharge events can be tied to the rainfall that caused them.",
    ],
    findings: [
      {
        title: "Two wells share an aquifer",
        detail: "Jai Hind and Nakshatra rise and fall together and give similar yields. Chinna Baavi does not, and yields poorly. That is now known, not guessed.",
      },
      {
        title: "Consumption is highest in winter, not summer",
        detail: "Seasonal totals across all three wells peak in winter and bottom out in the monsoon, which is the opposite of the assumption the campus was planning on.",
      },
      {
        title: "Yield tests without a survey crew",
        detail: "Recuperation tests, normally a specialist exercise, fall out of the data on any day the well returns to ground level after pumping.",
      },
      {
        title: "Motor use, per well, per day",
        detail: "Nakshatra runs 3.18 hours a day on average, Jai Hind 2.25, Chinna Baavi 0.87. Dry-run risk and over-pumping are visible before they cost a motor.",
      },
    ],
    outcome:
      "All three wells showed strong post-monsoon recovery, with Jai Hind and Nakshatra filling almost to the top. Across the year the wells recovered 1,042 kL more than was drawn from them. The campus now has a water budget built on measurement: inflows, outflows and change in storage, per well, per season.",
    devices: ["EvaraDeep", "EvaraAMP", "EvaraRain"],
  },
  {
    slug: "sangareddy",
    title: "Bringing a village water system online",
    place: "Rudraram, Sangareddy district",
    kicker: "TTDF 5G NB-IoT pilot",
    summary:
      "A Department of Telecommunications pilot to prove cellular smart water monitoring for rural India, from the IIIT Hyderabad campus to a Mission Bhagiratha village where the entire water operation is still run by hand.",
    status: "in progress",
    hero: [
      { label: "Borewells surveyed", value: "62" },
      { label: "Storage units", value: "9" },
      { label: "Campus nodes live", value: "9" },
      { label: "Data points, one tank", value: "2.6 lakh" },
    ],
    challenge: [
      "Rudraram draws its daily supply from Singur Dam under Mission Bhagiratha and falls back on 62 borewells when it runs short. Every motor is switched by hand.",
      "There are no water meters. Nobody measures inflow, outflow or tank level, and overflow from one sump is diverted to another manually.",
      "The village pays about three lakh rupees a month for power, and the 10 and 15 HP three-phase motors burn out roughly every three months from running continuously.",
    ],
    approach: [
      "Phase one, at IIIT Hyderabad: 27 locations surveyed, five tank and sump level nodes and four EvaraFlow retrofits deployed, pushing live data into the ctOP middleware and dashboard.",
      "Migration of the fleet to Jio NB-IoT SIMs and a BG95 cellular module designed and fabricated for the retrofit and borewell devices.",
      "Phase two, at Rudraram: flow metering on all 62 borewell outlets and level monitoring on the five overhead tanks and four sumps, sized from the completed site survey.",
    ],
    findings: [
      {
        title: "Nine nodes, months of continuous data",
        detail: "The KRB overhead tank alone has produced over 2.6 lakh readings. Fill and draw cycles for every monitored tank are now visible hour by hour.",
      },
      {
        title: "Retrofit meters on live pipework",
        detail: "Four EvaraFlow units on terrace and pump-house meters at Vindhya, Bodh, KRB and Pump House 2 are reading the dials nobody used to read.",
      },
      {
        title: "Cellular, not Wi-Fi",
        detail: "NB-IoT connectivity is being validated end to end, because a village pump house does not have a router.",
      },
    ],
    outcome:
      "The campus phase is live and the village survey is complete. The next milestone is the 20-node Rudraram deployment with dashboard integration, analytics and ten spare nodes, at which point a water system that has never been measured will report on itself for the first time.",
    devices: ["EvaraTank", "EvaraFlow", "EvaraDeep"],
  },
];

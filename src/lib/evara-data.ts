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
    "India loses 40–60% of its urban water supply to leakage, theft and analog billing errors.",
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
  },
  {
    name: "Aditya Bhagwan Deole",
    role: "Co-Founder & CTO",
    bio: "B.Tech. Embedded systems, firmware and sensor hardware, with 3+ years of development experience.",
  },
  {
    name: "Jagan Mohan Reddy",
    role: "Hardware Lead",
    bio: "Electronics engineer specialising in PCB design, sensor integration and field deployment.",
  },
];

export const advisors = [
  {
    name: "Dr. Sachin Chaudhari",
    role: "Technology Advisor",
    affiliation:
      "Associate Professor, Signal Processing & Communications Research Center, IIIT Hyderabad",
  },
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
  /** Ordered teardown of the operating principle — drives the product page. */
  mechanism?: { step: string; detail: string }[];
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
  /** Live-site headline voice — evaratech.com */
  headline: "Your Water Intelligence Platform",
  subhead: "Sustainable Intelligence",
  promise: "Every drop monitored. Every insight actionable.",
  positioning:
    "One Platform. Complete Control. Intelligent Water Infrastructure.",
  mission:
    "Building intelligent infrastructure that makes every drop of water measurable, predictable and optimizable.",
  coreIdea:
    "EvaraTech makes existing water infrastructure — borewells, tanks, meters and pumps — smart by adding non-intrusive IoT devices on top of them, so users get real-time data, AI-powered alerts and remote control without replacing anything.",
  differentiator:
    "Most smart water solutions require breaking pipes, replacing meters or submerging sensors — expensive, intrusive and impractical at scale. EvaraTech's products clip on, sit above or attach externally: no infrastructure replacement, no civil work, no water contact.",
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

export const secondaryMetrics = [
  { value: "±2%", label: "Measurement accuracy" },
  { value: "2.5M", label: "Data points processed" },
  { value: "24/7", label: "Support coverage" },
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
      "Clip-on, non-contact devices. No pipe cutting, no civil work, no permits — roughly 10x cheaper to deploy than replacement.",
  },
  {
    title: "Granted Indian patent",
    detail:
      "Patent No. 202241055442 for IoT borewell/tank tracking, plus 4 registered industrial designs.",
  },
  {
    title: "On-device AI",
    detail:
      "97% digit-recognition accuracy on EvaraFlow, running on-device — works offline, no cloud dependency for core metering.",
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

export const deployments = [
  {
    place: "IIIT Hyderabad",
    detail: "Bakul Boys Hostel — tank monitoring + ML research testbed",
  },
  {
    place: "Rashtrapati Nilayam",
    detail: "Hyderabad — the Presidential Residence",
  },
  { place: "Lulu Mall", detail: "Hyderabad — commercial deployment" },
  { place: "Jakkur Lake", detail: "Bangalore — open water-body monitoring" },
  {
    place: "Sangareddy District",
    detail: "Rudraram — 50+ water monitoring nodes, public infrastructure",
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
      "EvaraTank sits on top of the tank and times an ultrasonic pulse to the water surface and back. It estimates inflow and outflow, detects leaks, and sends overflow alerts — without ever contacting the water.",
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
    image: "/images/products/evaratank-1.png",
    gallery: ["/images/products/evaratank-2.png"],
    hasSpecSheet: true,
    accent: "water",
  },
  {
    slug: "evaradeep",
    name: "EvaraDeep",
    tagline: "The patented borewell brain",
    category: "Borewell Intelligence",
    oneLine:
      "Live borewell water level, runtime and dry-run protection — with no electronics inside the well.",
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
          "The encoder reports the exact length of string paid out — that length is the depth to water.",
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
    image: "/images/products/evaradeep.png",
    gallery: [
      "/images/deployments/borewell-install-1.jpg",
      "/images/deployments/node-1.jpg",
    ],
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
      "Most water meters in India are analog, with spinning dials read manually once a month. No leak detection, no real-time data, and replacing them with digital meters costs thousands per meter — impossible for apartments, factories and municipalities with hundreds of meters.",
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
          "A deep-learning OCR model runs on the onboard quad-core ARM processor, resolving digits at 97% accuracy — entirely offline.",
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
    image: "/images/products/evaraflow.png",
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
      "Water distribution is managed by manually opening and closing valves across sites — slow, labour-intensive and error-prone. Operators cannot react quickly to demand, leaks or scheduling needs, and there is no record of who changed what.",
    howItWorks:
      "EvaraValve is a motorised valve actuator with metering built in. Rather than simply opening and closing, it measures consumption, automates supply on rules, detects abnormal usage, and reports to EvaraOne — enabling fair, transparent, automated billing.",
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
      { label: "Valve size", value: "DN50 – DN450 (tbc)" },
      { label: "Control", value: "Remote open / close / throttle" },
      { label: "Automation", value: "Rule and schedule based" },
      { label: "Metering", value: "Real-time flow and consumption" },
      { label: "Billing", value: "User, time and location attribution" },
      { label: "Connectivity", value: "To be confirmed" },
    ],
    image: "/images/products/evaravalve.png",
    hasSpecSheet: false,
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
      "Farmers physically walk to the pump to switch it on and off — in heat, rain or at night. Industrial pumps need protection from single-phasing, overload and low voltage, but most rural and agricultural pumps have none. A failed motor costs ₹10,000 to ₹50,000 to replace.",
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
      "Pumps are the heart of any water system. They fail from dry running, voltage spikes, overload or aging windings, and there is no early-warning system today — operators only find out when the pump dies.",
    howItWorks:
      "EvaraAMP clamps a split-core current transducer around the line feeding the motor — no circuit interruption. It tracks RMS current sub-second, spots abnormal signatures, and totals energy for billing and efficiency.",
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
    image: "/images/products/evaraamp.png",
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
    hasSpecSheet: false,
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
    image: "/images/products/evararain.png",
    hasSpecSheet: false,
    accent: "leaf",
  },
];

export const evaraOne = {
  name: "EvaraOne",
  tagline: "The brain behind everything",
  category: "Unified Cloud Platform",
  oneLine:
    "One AI-powered web and mobile dashboard for monitoring, analytics, alerts and automation across every device and site.",
};

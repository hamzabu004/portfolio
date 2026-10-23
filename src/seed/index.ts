/**
 * Fills an empty database with the content from Hamza_Tariq_Master_Knowledge_Base.md.
 *
 *   pnpm seed               # refuses to run if projects already exist
 *   SEED_FORCE=1 pnpm seed  # wipes seeded collections first (DESTROYS edits made in the admin)
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import type { Project } from '@/payload-types'

import { doc, h, p, textBlock, ul } from './lexical'

const payload = await getPayload({ config })
const context = { disableRevalidate: true }
const force = process.env.SEED_FORCE === '1'

const existing = await payload.count({ collection: 'projects' })
if (existing.totalDocs > 0 && !force) {
  payload.logger.warn(`Database already has ${existing.totalDocs} projects; not seeding. Set SEED_FORCE=1 to wipe and reseed.`)
  process.exit(0)
}

if (force) {
  for (const collection of ['experience', 'projects', 'publications', 'activities'] as const) {
    await payload.delete({ collection, where: { id: { exists: true } }, context })
  }
}

payload.logger.info('Seeding site settings…')
await payload.updateGlobal({
  slug: 'site-settings',
  context,
  data: {
    name: 'Hamza Tariq',
    headline: 'CS undergrad · IoT, AI & systems',
    bio: doc(
      p(
        'I’m a Computer Science undergraduate at FAST NUCES, Islamabad, building at the intersection of IoT, AI and systems. My final-year project, MedMusketeer, is a secure edge-intelligent cardiac telemetry system that combines ECG acquisition, TinyML arrhythmia classification and IoT intrusion detection.',
      ),
      p(
        'Previously I was a research intern at the KDD Lab working on spiking neural networks for IoT botnet detection, and an AI & web development intern at Ishraaq Labs. I also freelance on computer-vision and full-stack projects, and teach as a TA.',
      ),
    ),
    email: 'hamzabu2004@gmail.com',
    location: 'Islamabad, Pakistan',
    socials: [
      { label: 'GitHub', url: 'https://github.com/hamzabu004' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/hamza-tariq-butt/' },
    ],
    projects: { show: true, title: 'Projects', subtitle: 'IoT, AI & systems' },
    experience: { show: true, title: 'Experience', subtitle: 'Work, research & teaching' },
    research: { show: true, title: 'Research', subtitle: 'Papers & manuscripts' },
    activities: { show: true, title: 'Activities', subtitle: 'Competitions & community' },
    writing: { show: false, title: 'Writing', subtitle: 'Notes & blog posts' },
    photos: { show: false, title: 'Photography', subtitle: 'Places & observations' },
    description:
      'Hamza Tariq is a Computer Science student at FAST NUCES building IoT, AI and systems projects: edge-intelligent medical telemetry, computer vision, GPU acceleration and LLM inference.',
  },
})

payload.logger.info('Seeding projects…')
type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>

const projectData: ProjectInput[] = [
  {
    title: 'MedMusketeer',
    summary:
      'A secure, edge-intelligent cardiac telemetry system: ECG acquisition, on-device TinyML arrhythmia classification, encrypted IoT communication and intrusion detection, surfaced through a clinician dashboard.',
    categories: ['iot', 'ai', 'research'],
    context: 'Final Year Project',
    period: '2026 – Present',
    stage: 'in-progress',
    featured: true,
    order: 10,
    tech: ['ESP32-S3', 'Raspberry Pi', 'TinyML', 'ECG', 'IoT security', 'IDS/IPS', 'Cloud', 'Dashboard'],
    layout: [
      textBlock(
        h('h2', 'Overview'),
        p(
          'Building a secure remote patient-monitoring platform that combines ECG acquisition, TinyML-based arrhythmia classification, encrypted IoT communication, intrusion detection/prevention, and cloud sync, surfaced through a clinician-facing dashboard.',
        ),
        h('h3', 'What the system combines'),
        ul([
          'ECG acquisition at the edge',
          'TinyML arrhythmia classification on-device',
          'Encrypted IoT communication',
          'Intrusion detection & prevention (IDS/IPS)',
          'Cloud sync and a clinician-facing dashboard',
        ]),
      ),
      {
        blockType: 'hardware',
        title: 'Hardware',
        items: [{ name: 'ESP32-S3' }, { name: 'Raspberry Pi' }],
      },
    ],
  },
  {
    title: 'Medusa Heads with Turbo-Quantized KV Caches',
    summary:
      'Implemented Medusa speculative decoding with Turbo Quantized KV Caches, cutting memory use by roughly 3.7×, and trained domain-specific speculative heads for coding and cooking workloads.',
    categories: ['ai', 'hpc', 'research'],
    context: 'Parallel & Distributed Computing course',
    featured: true,
    order: 20,
    tech: ['Python', 'Medusa', 'KV-cache quantization', 'LLM inference'],
    highlights: [{ value: '3.7×', label: 'memory reduction' }],
    layout: [
      {
        blockType: 'stats',
        items: [{ value: '3.7×', label: 'KV-cache memory reduction' }],
      },
      textBlock(
        h('h2', 'Overview'),
        p(
          'Implemented Medusa speculative decoding with Turbo Quantized KV Caches, achieving a 3.7× memory reduction, and trained niche-specific speculative heads (coding / cooking) to cut task-specific training time.',
        ),
      ),
    ],
  },
  {
    title: 'GPU-Accelerated KLT Feature Tracking',
    summary:
      'Profiled a C++ KLT feature tracker, traced ~70% of runtime to convolutions, and offloaded them to the GPU with CUDA and OpenACC for up to a 2× speedup on an RTX 3080.',
    categories: ['hpc'],
    context: 'High Performance Computing course',
    featured: true,
    order: 30,
    tech: ['C++', 'CUDA', 'OpenACC', 'Profiling', 'NVIDIA RTX 3080'],
    highlights: [{ value: '2×', label: 'GPU speedup' }],
    links: [{ label: 'Code', kind: 'code', url: 'https://github.com/hamzabu004/CCP' }],
    layout: [
      {
        blockType: 'stats',
        items: [
          { value: '~70%', label: 'of runtime spent in convolutions', note: 'found by profiling the CPU baseline' },
          { value: '2×', label: 'peak speedup on NVIDIA RTX 3080', note: 'CUDA and OpenACC versions' },
        ],
      },
      textBlock(
        h('h2', 'Overview'),
        p(
          'Profiled a C++ implementation of the KLT Feature Tracker and traced roughly 70% of runtime to convolution operations. Offloaded these bottlenecks to the GPU with CUDA and OpenACC, achieving up to a 2× speedup on an NVIDIA RTX 3080.',
        ),
      ),
    ],
  },
  {
    title: 'Pool Ball Aim Assistant',
    summary:
      'A computer-vision aim assistant that detects pool balls in real time with YOLO and OpenCV and overlays the predicted trajectory on the table.',
    categories: ['cv', 'ai'],
    context: 'Freelance',
    featured: true,
    order: 40,
    tech: ['Python', 'OpenCV', 'YOLO'],
    layout: [
      textBlock(
        h('h2', 'Overview'),
        p(
          'Built a computer-vision aim assistant using OpenCV and YOLO that detects pool balls in real time and overlays predicted trajectory paths on the table.',
        ),
      ),
    ],
  },
  {
    title: 'FAST Papers',
    summary:
      'A past-papers repository that helps students prepare for exams; students upload papers, which admins review and approve.',
    categories: ['web'],
    period: 'July 2025',
    featured: true,
    order: 50,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'AWS S3'],
    layout: [
      textBlock(
        h('h2', 'Overview'),
        p(
          'Built a platform: a repository of past papers that supports students in exam preparation and lets them upload papers that are approved by admins.',
        ),
      ),
    ],
  },
  {
    title: 'Homework Checker',
    summary:
      'A desktop tool that streamlines TA grading, from reviewing Google Classroom submissions to exporting marks for Google Sheets.',
    categories: ['automation'],
    context: 'Built for my TA work',
    period: 'Aug 2026',
    featured: true,
    order: 60,
    tech: ['Python', 'PyQt', 'Google Classroom', 'Google Sheets'],
    highlights: [{ value: '20–30%', label: 'less marking time' }],
    links: [{ label: 'Code', kind: 'code', url: 'https://github.com/hamzabu004/Homework-Checker' }],
    layout: [
      textBlock(
        h('h2', 'Overview'),
        p(
          'Built a desktop tool that streamlines the TA grading workflow, from reviewing Google Classroom submissions to exporting marks for Google Sheets.',
        ),
        ul([
          'Mark each homework with keyboard shortcuts.',
          'Export the marks of a whole section at once.',
          'Saves 20–30% of marking time, plus the time spent entering marks into Google Sheets by hand.',
        ]),
      ),
    ],
  },
  {
    title: 'Mobile-Controlled RC Vehicle',
    summary:
      'An Android-controlled RC car for wireless remote navigation; the next milestone is onboard computer vision and SLAM for autonomous mapping.',
    categories: ['iot'],
    order: 70,
    tech: ['ESP microcontroller', 'Android', 'Wireless control'],
    layout: [
      textBlock(
        p(
          'Built an Android-controlled RC car for wireless remote navigation; next milestone is adding onboard computer vision and SLAM for autonomous mapping and guidance.',
        ),
      ),
    ],
  },
  {
    title: 'Programmable Universal IR Remote',
    summary:
      'A universal IR remote controlled from an Android app that operates existing appliances and can capture and store new IR signals for reuse.',
    categories: ['iot'],
    order: 80,
    tech: ['ESP microcontroller', 'Android', 'Infrared'],
    layout: [
      textBlock(
        p(
          'Built a universal IR remote controlled via an Android app that operates existing appliances and can store/capture new IR signals for reuse.',
        ),
      ),
    ],
  },
  {
    title: 'Image Cloak',
    summary: 'A platform for image encryption, decryption and steganography: hide images inside other images.',
    categories: ['cv'],
    context: 'Freelance',
    order: 90,
    tech: ['Python', 'OpenCV'],
    layout: [
      textBlock(
        p(
          'Developed a platform for image encryption, decryption, and steganography using Python and OpenCV, allowing users to encrypt and decrypt images and hide images within other images.',
        ),
      ),
    ],
  },
  {
    title: 'PopMart Auto Purchaser',
    summary:
      'End-to-end automation that detects product availability and auto-purchases limited-edition items, with a 90% success rate.',
    categories: ['automation'],
    context: 'Freelance',
    order: 100,
    tech: ['Python', 'Selenium', 'BeautifulSoup'],
    highlights: [{ value: '90%', label: 'success rate' }],
    layout: [
      textBlock(
        p(
          'Built end-to-end automation that detects product availability and auto-purchases using Selenium and BeautifulSoup, achieving a 90% success rate in securing limited-edition items.',
        ),
      ),
    ],
  },
  {
    title: 'Voter-List PDF Parser',
    summary:
      'A multithreaded parser for large voter-list PDFs, grouping records and cutting parsing time by 60% versus a single-threaded approach.',
    categories: ['automation'],
    context: 'Freelance',
    order: 110,
    tech: ['Python', 'Multithreading'],
    highlights: [{ value: '60%', label: 'faster parsing' }],
    layout: [
      textBlock(
        p(
          'Automated PDF parser for voters lists based on grouping; uses multithreading to process large documents efficiently, reducing parsing time by 60% compared to single-threaded approaches.',
        ),
      ),
    ],
  },
]

const projects: Record<string, number> = {}
for (const data of projectData) {
  const created = await payload.create({
    collection: 'projects',
    data: { ...data, _status: 'published' },
    draft: false,
    context,
  })
  projects[data.title] = created.id
}

payload.logger.info('Seeding experience…')
const experience = [
  {
    role: 'Research Intern',
    organization: 'KDD Lab, FAST NUCES',
    period: 'Jul 2026 – Aug 2026',
    location: 'Islamabad',
    kind: 'research' as const,
    order: 10,
    bullets: [
      'Developed and compared baseline and attention-enhanced spiking neural networks for IoT botnet detection in PyTorch.',
      'Tested model robustness on the external MedBIoT dataset and refined feature scaling to improve classification accuracy.',
    ],
  },
  {
    role: 'Teaching Assistant',
    organization: 'FAST NUCES',
    period: 'Aug 2025 – Present',
    location: 'Islamabad',
    kind: 'teaching' as const,
    order: 20,
    bullets: [
      'Courses: Linear Algebra, Multivariable Calculus, Calculus and Analytical Geometry.',
      'Designed and evaluated a project involving neural networks for 350+ students in Multivariable Calculus.',
    ],
    projects: [projects['Homework Checker']],
  },
  {
    role: 'Lab Demonstrator',
    organization: 'FAST NUCES',
    period: 'Aug 2025 – Jun 2026',
    location: 'Islamabad',
    kind: 'teaching' as const,
    order: 30,
    bullets: [
      'Operating Systems & Computer Networks Lab.',
      'Supported 40+ students per session in OS and computer-networks lab work, debugging implementations and grading assessments.',
    ],
  },
  {
    role: 'AI & Web Development Intern',
    organization: 'Ishraaq Labs',
    period: 'Aug 2025 – Oct 2025',
    kind: 'internship' as const,
    order: 40,
    bullets: [
      'Built web-scraping pipelines to extract large-scale structured data from domain-specific sources.',
      'Annotated datasets and fine-tuned YOLO for domain-specific object detection, replacing a legacy pattern-based system and lifting detection accuracy by 30%.',
    ],
  },
  {
    role: 'Freelance AI & Web Developer',
    organization: 'Remote',
    period: 'Jun 2023 – Present',
    kind: 'freelance' as const,
    order: 50,
    bullets: ['Computer-vision, automation and full-stack (MERN) projects for clients.'],
    projects: [
      projects['Pool Ball Aim Assistant'],
      projects['PopMart Auto Purchaser'],
      projects['Image Cloak'],
      projects['Voter-List PDF Parser'],
    ],
  },
  {
    role: 'BS Computer Science',
    organization: 'FAST NUCES, Islamabad',
    period: 'Aug 2023 – Aug 2027 (expected)',
    kind: 'education' as const,
    order: 100,
    bullets: [
      'CGPA 3.57 / 4.0.',
      'Relevant coursework: Generative AI, Digital Image Processing, High Performance Computing with GPUs, Parallel and Distributed Computing.',
    ],
  },
]

for (const { bullets, ...entry } of experience) {
  await payload.create({
    collection: 'experience',
    data: { ...entry, bullets: bullets.map((text) => ({ text })) },
    context,
  })
}

payload.logger.info('Seeding publications…')
await payload.create({
  collection: 'publications',
  context,
  data: {
    title: 'Chasing Greatness: A Robust Multi-Criteria Ranking of One-Day International Batsmen (1971–2026)',
    venue: 'Journal of Quantitative Analysis in Sports',
    status: 'submitted',
    order: 10,
    tldr: 'Consolidated and cleaned ODI career statistics from 1971–2026, then ran comparative and sensitivity analyses across ranking methods and weighting schemes, with a reproducible workflow.',
  },
})
await payload.create({
  collection: 'publications',
  context,
  data: {
    title: 'Foreign Aid, Mineral Resources, and Institutional Quality: Evidence from South Asian Countries',
    venue: 'Zagreb International Review of Economics and Business',
    status: 'submitted',
    order: 20,
    tldr: 'Assembled cross-country data on aid inflows, mineral resources and institutional quality for South Asia, and analysed how they relate.',
  },
})

payload.logger.info('Seeding activities…')
const activities = [
  { title: 'LabLab AI Hackathon: Second Best Solution', kind: 'award' as const },
  { title: 'ICPC Regional', kind: 'competition' as const, year: '2025' },
  { title: 'NaSCon Web Hackathon', kind: 'competition' as const, year: '2024' },
  { title: 'SOFTEC Speed Programming', kind: 'competition' as const, year: '2024' },
  {
    title: 'Helping Hand NGO',
    kind: 'volunteering' as const,
    description: 'Ran basic computer-literacy workshops at a local school over four months.',
  },
]
for (const [i, activity] of activities.entries()) {
  await payload.create({ collection: 'activities', data: { ...activity, order: (i + 1) * 10 }, context })
}

payload.logger.info('Seed complete.')
process.exit(0)

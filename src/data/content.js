export const siteContent = {
  home: {
    title: "Burak's Lab",
    subtitle: 'I build systems software, compiler-oriented tooling, and applied AI experiments with a focus on correctness, performance, and maintainable implementation.',
    skills: ['Systems Programming', 'Compiler Design', 'Applied ML / NLP'],
    cta: {
      primary: 'Explore projects',
      secondary: 'Browse notes'
    },
    spotlight: {
      label: 'Current focus',
      description: 'Designing practical software at the intersection of runtime systems, language tooling, and machine learning.',
      bullets: ['Runtime internals and interpreters', 'Compiler and parser engineering', 'Applied NLP and model experimentation']
    },
    sections: {
      writing: {
        title: 'Selected Writing',
        viewAllLabel: 'View all writing'
      },
      projects: {
        title: 'Selected Projects',
        viewAllLabel: 'View all projects'
      }
    }
  },
  blog: {
    title: 'Blog',
    intro: 'Notes on systems, compilers, low-level engineering, and the occasional rant about software conventions.'
  },
  about: {
    title: 'About',
    intro: 'I work at the intersection of systems engineering, tooling, and applied research, often building things from first principles.',
    body: [
      'I am interested in low-level software, compiler design, performance tuning, and the practical side of making ambitious ideas executable.',
      'Most of my work centers on writing software that is explicit, portable, and close to the underlying hardware when it matters.',
      'When I am not building tools, I am usually writing about them so the reasoning behind the implementation is easier to revisit later.'
    ]
  },
  projects: {
    title: 'Projects',
    intro: 'A selection of tools, interpreters, and experiments built to understand systems from the inside out.'
  }
};

export const posts = [
  {
    slug: 'why-markdown',
    title: 'Why the heck are we still using Markdown??',
    href: '/blog/why-markdown',
    date: '2026-03-02',
    excerpt: 'Markdown has survived for years because it balances readability, portability, and just enough structure for the web.',
    tags: ['markdown', 'standards', 'writing'],
    body: [
      'Markdown is one of those tools that feels deceptively simple on the surface, but its longevity comes from a very practical compromise. It is readable in plain text, easy to edit, and flexible enough to power everything from docs to blogs to developer notes.',
      'Its success is not because it is perfect. It is successful because it sits at the right layer of abstraction: expressive enough to capture structure, but light enough to remain approachable for humans and machines alike.',
      'That makes it resilient in a way most formats are not. Even when new standards and formats appear, Markdown still offers a common language that everyone can understand and extend.'
    ]
  },
  {
    slug: 'x86-simd-evolution',
    title: 'The Evolution of x86 SIMD: From SSE to AVX-512',
    href: '/blog/x86-simd-evolution',
    date: '2026-01-16',
    excerpt: 'The story of x86 SIMD is a story of incremental specialization, widening vectors, and increasing pressure to make hardware and software speak the same language.',
    tags: ['simd', 'x86', 'performance'],
    body: [
      'SIMD instruction sets on x86 evolved from narrow, pragmatic extensions into a broad family of vector execution mechanisms. Each generation added more width, more flexibility, and more opportunities to match the computation model to modern workloads.',
      'What makes the progression interesting is not only the raw throughput. It is how software had to adapt to new instruction sets and how compiler support, microarchitecture, and compiler-friendly programming patterns all matured together.',
      'The result is a long-running platform where low-level care still pays off, especially when the goal is to squeeze a few more cycles out of critical code paths.'
    ]
  }
];

export const projects = [
  {
    slug: 'varm-vasm',
    title: 'varm/vasm',
    href: '/projects/varm-vasm',
    year: '2026',
    tags: ['C99', 'ASM', 'Networking', 'Multithreading'],
    description: 'An ARMv7 inspired bytecode virtual machine without a garbage collector.',
    details: 'A compact runtime for experimenting with instruction encoding, execution semantics, and low-level design without the overhead of a full VM stack.',
    body: [
      'varm/vasm is a bytecode virtual machine designed for exploring instruction semantics and execution behavior without leaning on a garbage collector.',
      'The project is focused on low-level clarity: explicit control flow, compact instruction encoding, and a runtime model that remains approachable for experimentation.',
      'It is the sort of project that makes the system stack feel visible rather than abstract.'
    ]
  },
  {
    slug: 'arith',
    title: 'Arith',
    href: '/projects/arith',
    year: '2025',
    tags: ['Rust', 'Compiler Design', 'VM'],
    description: 'A complete command-line arithmetic interpreter built from the ground up in Rust. Features a multi-stage pipeline: lexer, Pratt parser, and a stack-based VM.',
    details: 'Built as a practical systems project, Arith focuses on parser architecture, error handling, and a clear separation between front-end and execution stages.',
    body: [
      'Arith is a small but complete arithmetic interpreter that walks through lexical analysis, parsing, and execution in a deliberately structured way.',
      'The implementation is intended to feel educational and practical at once, showing how a simple language can be compiled into a straightforward runtime model.',
      'It is a good example of turning a narrow problem into a full-stack engineering exercise without adding unnecessary complexity.'
    ]
  },
  {
    slug: '89crypt',
    title: '89crypt: Matrix-Based Encryption',
    href: '/projects/89crypt',
    year: '2025',
    tags: ['Python', 'Cryptography', 'Math'],
    description: 'A novel encryption library based on periodic decimal expansions and matrix transformations. Finalist in the I-MAT Project Competition.',
    details: 'This project explores unusual mathematical structures for encoding and transformation, with an emphasis on theoretical curiosity and usable implementation.',
    body: [
      '89crypt investigates non-standard encryption ideas by combining periodic decimal expansions with matrix transformations.',
      'The work is less about conventional cryptographic practice and more about exploring whether unusual mathematical structures can produce a usable and interesting encoding scheme.',
      'It is a strong example of how research curiosity can become a concrete, testable implementation.'
    ]
  },
  {
    slug: 'sumerian-nmt',
    title: 'Ancient Sumerian NMT',
    href: '/projects/sumerian-nmt',
    year: '2023',
    tags: ['Python', 'T5 Transformer', 'NLP', 'Perl'],
    description: 'A Neural Machine Translation system for the bidirectional translation of ancient Sumerian and modern Turkish using T5 Transformers.',
    details: 'This project combines transformer-based translation with historical language modeling, aiming for a practical and research-friendly setup for low-resource translation.',
    body: [
      'Ancient Sumerian NMT focuses on the challenge of translating between a historical language and a modern one using transformer-based models.',
      'The project sits at the boundary between language tooling and historical corpus work, where data scarcity, linguistic nuance, and model design all matter.',
      'It is a reminder that applied AI is often a mix of engineering discipline and careful adaptation to imperfect datasets.'
    ]
  }
];

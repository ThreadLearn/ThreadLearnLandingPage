export const mockAIResults = [
  {
    id: 'ai1',
    userId: 'u1',
    createdAt: '2026-03-20T10:30:00Z',
    code: `let counter = 0;

async function increment() {
  const current = counter;
  await fetch('/api/log');
  counter = current + 1;
}

await Promise.all(Array(50).fill(0).map(increment));
console.log(counter); // Expected 50, but gets ~1-5
`,
    language: 'javascript',
    raceConditions: [
      {
        id: 'rc1',
        severity: 'critical',
        pattern: 'TOCTOU',
        line: 4,
        endLine: 6,
        description: 'Read-yield-write race condition on shared variable `counter`.',
        detail: 'Line 4 reads `counter` into `current`, then yields at line 5 (await). During the yield, other concurrent tasks can also read and modify `counter`. When execution resumes at line 6, `current` is stale — it no longer reflects the actual counter value.',
      },
    ],
    suggestions: [
      {
        id: 's1',
        title: 'Use Atomics with SharedArrayBuffer',
        description: 'Convert to SharedArrayBuffer + Atomics for true atomic increment without race conditions.',
        code: `// Create a shared integer counter
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
const counter = new Int32Array(sharedBuffer);

async function increment() {
  await fetch('/api/log');
  // Atomics.add is atomic — no race condition possible
  Atomics.add(counter, 0, 1);
}

await Promise.all(Array(50).fill(0).map(increment));
console.log(Atomics.load(counter, 0)); // Always 50
`,
        complexity: 'low',
        speedup: '1x (correctness fix)',
      },
      {
        id: 's2',
        title: 'Use a Mutex for Critical Section',
        description: 'Wrap the read-modify-write in a mutex to ensure exclusive access.',
        code: `class Mutex {
  constructor() { this._locked = false; this._queue = []; }
  async acquire() {
    while (this._locked) await new Promise(r => this._queue.push(r));
    this._locked = true;
  }
  release() { this._locked = false; this._queue.shift()?.(); }
}

const mutex = new Mutex();
let counter = 0;

async function increment() {
  await mutex.acquire();
  try {
    await fetch('/api/log');
    counter++;
  } finally {
    mutex.release();
  }
}

await Promise.all(Array(50).fill(0).map(increment));
console.log(counter); // Always 50
`,
        complexity: 'medium',
        speedup: '1x (sequential within mutex)',
      },
    ],
    summary: 'Found 1 critical race condition. The counter increment is not atomic due to an async yield between read and write operations. Two fixes provided: Atomics (preferred for performance) or Mutex (preferred for complex critical sections).',
  },
  {
    id: 'ai2',
    userId: 'u1',
    createdAt: '2026-03-18T14:00:00Z',
    code: `async function processItems(items) {
  const results = [];
  for (const item of items) {
    const result = await fetch(\`/api/process/\${item.id}\`);
    results.push(await result.json());
  }
  return results;
}`,
    language: 'javascript',
    raceConditions: [],
    suggestions: [
      {
        id: 's3',
        title: 'Parallelize with Promise.all',
        description: 'Sequential await in a loop processes items one-by-one. Use Promise.all for parallel execution.',
        code: `async function processItems(items) {
  // Process all items in parallel
  const results = await Promise.all(
    items.map(item =>
      fetch(\`/api/process/\${item.id}\`).then(r => r.json())
    )
  );
  return results;
}`,
        complexity: 'low',
        speedup: `~${Math.min(10, 4)}x for ${4} items`,
      },
    ],
    summary: 'No race conditions detected. However, sequential await in a loop is a performance anti-pattern. Parallelizing with Promise.all can reduce total time by N× (where N = number of items).',
  },
]

export const mockCodeTemplates = {
  javascript: `// ThreadLearn IDE - JavaScript
// Try writing concurrent code below!

async function main() {
  // Your code here
  console.log('Hello, concurrent world!');
}

main();`,
  race_condition_example: `// Classic race condition example
let counter = 0;

async function unsafeIncrement() {
  const current = counter;      // Read
  await new Promise(r => setTimeout(r, 1)); // Yield
  counter = current + 1;        // Write (stale!)
}

// Run 10 concurrent increments
await Promise.all(Array(10).fill(0).map(unsafeIncrement));
console.log('Expected: 10, Got:', counter); // Will be wrong!`,
}

export const mockExecutionResults = {
  success: {
    status: 'success',
    stdout: 'Expected: 10, Got: 3\n',
    stderr: '',
    runtime: '127ms',
    memory: '18.4 MB',
  },
  error: {
    status: 'error',
    stdout: '',
    stderr: 'ReferenceError: counter is not defined\n    at main (index.js:3:5)',
    runtime: '45ms',
    memory: '12.1 MB',
  },
}

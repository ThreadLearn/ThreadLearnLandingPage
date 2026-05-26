export const mockLessons = {
  c1: [
    {
      id: 'l1-1',
      courseId: 'c1',
      title: 'What is Concurrency?',
      order: 1,
      duration: '25m',
      isLocked: false,
      isFree: true,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      content: `# What is Concurrency?

Concurrency is the ability of a program to **execute multiple tasks simultaneously** or in overlapping time periods.

## Key Concepts

\`\`\`javascript
// Sequential execution
function sequential() {
  const result1 = task1(); // waits...
  const result2 = task2(); // waits...
  return [result1, result2];
}

// Concurrent execution
async function concurrent() {
  const [result1, result2] = await Promise.all([task1(), task2()]);
  return [result1, result2];
}
\`\`\`

## Why Does It Matter?

Modern CPUs have multiple cores. Sequential code uses only **1 core** — leaving 7 idle on an 8-core CPU.

### Benefits
- **Throughput**: More work done per unit time
- **Responsiveness**: UI doesn't freeze during heavy operations
- **Resource utilization**: CPU cores stay busy

## Concurrency vs Parallelism

| | Concurrency | Parallelism |
|---|---|---|
| Definition | Dealing with multiple things at once | Doing multiple things at once |
| Requires | Single-core OK | Multi-core required |
| Example | Event loop | Worker threads |

> **Key insight**: Concurrency is about *structure*, parallelism is about *execution*.
`,
      attachments: [{ name: 'concurrency-cheatsheet.pdf', url: '#' }],
    },
    {
      id: 'l1-2',
      courseId: 'c1',
      title: 'Threads vs Processes',
      order: 2,
      duration: '30m',
      isLocked: false,
      isFree: true,
      videoUrl: null,
      content: `# Threads vs Processes

Understanding the difference is fundamental to concurrent programming.

## Processes

A **process** is an independent program instance with its own memory space.

\`\`\`javascript
// Node.js child_process example
const { fork } = require('child_process');

const child = fork('./worker.js');
child.send({ task: 'heavy-computation' });
child.on('message', (result) => {
  console.log('Got result:', result);
});
\`\`\`

## Threads

**Threads** share the same memory space within a process.

\`\`\`javascript
// Node.js Worker Threads
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on('message', (result) => console.log(result));
} else {
  // This runs in a separate thread
  parentPort.postMessage('Hello from worker thread!');
}
\`\`\`

## Comparison

| Feature | Process | Thread |
|---------|---------|--------|
| Memory | Isolated | Shared |
| Communication | IPC (slow) | Shared memory (fast) |
| Crash impact | Independent | Can crash whole process |
| Creation cost | High | Low |
`,
      attachments: [],
    },
    {
      id: 'l1-3',
      courseId: 'c1',
      title: 'The JavaScript Event Loop',
      order: 3,
      duration: '40m',
      isLocked: false,
      isFree: false,
      videoUrl: null,
      content: `# The JavaScript Event Loop

JavaScript is single-threaded but handles concurrency through the **event loop**.

## Architecture

\`\`\`
   Call Stack        Web APIs         Callback Queue
   ┌────────┐       ┌────────┐        ┌────────────┐
   │ main() │  →→→  │setTimeout│  →→→  │ callback   │
   │        │       │ fetch   │        │ callback   │
   └────────┘       │ DOM     │        └────────────┘
        ↑           └────────┘               ↓
        └──────────── Event Loop ────────────┘
\`\`\`

## Microtask vs Macrotask Queue

\`\`\`javascript
console.log('1'); // sync

setTimeout(() => console.log('2'), 0); // macrotask

Promise.resolve().then(() => console.log('3')); // microtask

console.log('4'); // sync

// Output: 1, 4, 3, 2
// Microtasks (Promise) always run before macrotasks (setTimeout)
\`\`\`
`,
      attachments: [],
    },
    {
      id: 'l1-4',
      courseId: 'c1',
      title: 'Shared State & Data Races',
      order: 4,
      duration: '35m',
      isLocked: false,
      isFree: false,
      videoUrl: null,
      content: `# Shared State & Data Races

When multiple threads access shared data without synchronization, **data races** occur.

## Classic Counter Bug

\`\`\`javascript
// UNSAFE: Race condition!
let counter = 0;

async function increment() {
  const current = counter;      // read
  await someAsyncWork();        // yield — another task can run!
  counter = current + 1;        // write (stale!)
}

// Run 100 times — counter will NOT be 100
await Promise.all(Array(100).fill(0).map(increment));
console.log(counter); // Could be anything < 100!
\`\`\`

## The Fix: Atomic Operations

\`\`\`javascript
// SAFE: Atomic increment with SharedArrayBuffer + Atomics
const sharedBuffer = new SharedArrayBuffer(4);
const counter = new Int32Array(sharedBuffer);

// This is atomic — no race condition possible
Atomics.add(counter, 0, 1);
\`\`\`
`,
      attachments: [],
    },
    {
      id: 'l1-5',
      courseId: 'c1',
      title: 'Mutexes and Locks',
      order: 5,
      duration: '45m',
      isLocked: false,
      isFree: false,
      videoUrl: null,
      content: `# Mutexes and Locks

A **mutex** (mutual exclusion) ensures only one thread accesses a critical section at a time.

## Mutex Pattern in JavaScript

\`\`\`javascript
class Mutex {
  constructor() {
    this._locked = false;
    this._queue = [];
  }

  async acquire() {
    while (this._locked) {
      await new Promise(resolve => this._queue.push(resolve));
    }
    this._locked = true;
  }

  release() {
    this._locked = false;
    const next = this._queue.shift();
    if (next) next();
  }
}

const mutex = new Mutex();
let counter = 0;

async function safeIncrement() {
  await mutex.acquire();
  try {
    counter++;          // critical section
  } finally {
    mutex.release();    // always release!
  }
}
\`\`\`
`,
      attachments: [],
    },
    {
      id: 'l1-6',
      courseId: 'c1',
      title: 'Semaphores & Signaling',
      order: 6,
      duration: '35m',
      isLocked: true,
      isFree: false,
      videoUrl: null,
      content: `# Semaphores & Signaling`,
      attachments: [],
    },
    {
      id: 'l1-7',
      courseId: 'c1',
      title: 'Producer-Consumer Pattern',
      order: 7,
      duration: '40m',
      isLocked: true,
      isFree: false,
      videoUrl: null,
      content: `# Producer-Consumer Pattern`,
      attachments: [],
    },
    {
      id: 'l1-8',
      courseId: 'c1',
      title: 'Final Project: Thread-Safe Data Store',
      order: 8,
      duration: '60m',
      isLocked: true,
      isFree: false,
      videoUrl: null,
      content: `# Final Project: Thread-Safe Data Store`,
      attachments: [],
    },
  ],
  c2: [
    { id: 'l2-1', courseId: 'c2', title: 'Understanding Race Conditions', order: 1, duration: '30m', isLocked: false, isFree: true, videoUrl: null, content: '# Understanding Race Conditions\n\nDetailed analysis of race conditions...', attachments: [] },
    { id: 'l2-2', courseId: 'c2', title: 'Detecting Races with Tools', order: 2, duration: '35m', isLocked: false, isFree: false, videoUrl: null, content: '# Detecting Races with Tools\n\nUsing ThreadSanitizer and AST analysis...', attachments: [] },
    { id: 'l2-3', courseId: 'c2', title: 'Deadlock: Causes & Solutions', order: 3, duration: '40m', isLocked: false, isFree: false, videoUrl: null, content: '# Deadlock: Causes & Solutions\n\nCircular dependency patterns...', attachments: [] },
    { id: 'l2-4', courseId: 'c2', title: 'Lock Ordering Strategy', order: 4, duration: '30m', isLocked: true, isFree: false, videoUrl: null, content: '# Lock Ordering Strategy', attachments: [] },
    { id: 'l2-5', courseId: 'c2', title: 'Timeout-Based Deadlock Breaking', order: 5, duration: '25m', isLocked: true, isFree: false, videoUrl: null, content: '# Timeout-Based Deadlock Breaking', attachments: [] },
  ],
}

export const mockProgress = {
  c1: { completedLessons: ['l1-1', 'l1-2', 'l1-3'], totalLessons: 8, percentage: 37 },
  c2: { completedLessons: ['l2-1', 'l2-2'], totalLessons: 10, percentage: 20 },
  c4: { completedLessons: [], totalLessons: 9, percentage: 0 },
  c7: { completedLessons: [], totalLessons: 7, percentage: 0 },
}

export const mockComments = [
  {
    id: 'cm1',
    lessonId: 'l1-1',
    userId: 'u2',
    userName: 'Ha Van An',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=An',
    content: 'Great explanation! The table comparing concurrency vs parallelism really cleared things up for me.',
    createdAt: '2026-03-15T10:30:00Z',
    replies: [
      {
        id: 'cm1-r1',
        userId: 'admin1',
        userName: 'ThreadLearn Team',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        content: 'Glad it helped! Make sure to check the cheatsheet attachment too.',
        createdAt: '2026-03-15T11:00:00Z',
      },
    ],
  },
  {
    id: 'cm2',
    lessonId: 'l1-1',
    userId: 'u3',
    userName: 'Vo Van Tin',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tin',
    content: 'Could you add more real-world examples? Like how Node.js handles thousands of requests concurrently?',
    createdAt: '2026-03-16T09:00:00Z',
    replies: [],
  },
  {
    id: 'cm3',
    lessonId: 'l1-2',
    userId: 'u4',
    userName: 'Pham Ngoc Hoang Anh',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anh',
    content: 'The Worker Threads example is very helpful. I\'ve been looking for this exact pattern.',
    createdAt: '2026-03-17T14:20:00Z',
    replies: [],
  },
]

export const mockBookmarks = [
  { id: 'bm1', lessonId: 'l1-3', courseId: 'c1', lessonTitle: 'The JavaScript Event Loop', note: 'Microtask vs macrotask order is key', createdAt: '2026-03-14T08:00:00Z' },
  { id: 'bm2', lessonId: 'l1-4', courseId: 'c1', lessonTitle: 'Shared State & Data Races', note: 'Counter bug example — must review before interview', createdAt: '2026-03-15T09:30:00Z' },
  { id: 'bm3', lessonId: 'l2-3', courseId: 'c2', lessonTitle: 'Deadlock: Causes & Solutions', note: '', createdAt: '2026-03-16T11:00:00Z' },
]

export const mockNotes = {
  'l1-1': 'Concurrency = structure, Parallelism = execution. Remember this distinction for interviews!',
  'l1-3': 'Event loop order: sync → microtasks (Promise) → macrotasks (setTimeout/setInterval)',
  'l2-1': 'Race condition happens when: read → yield → write pattern with shared state',
}

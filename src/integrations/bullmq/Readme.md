# BullMQ

BullMQ integration example:

Create queue to add a job and work on it

```typescript
/* -------------------------------------------------------------------------- */
/*                                Create Queue                                */
/* -------------------------------------------------------------------------- */
import BullMQ from './integrations/bullmq'

const bull = new BullMQ('queueName')
const connection = bull.connection
const queue = bull.queue
```

&nbsp;

For create a job you can use this function

```typescript
/* -------------------------------------------------------------------------- */
/*                                 Create Job                                 */
/* -------------------------------------------------------------------------- */
import BullMQ from './integrations/bullmq'

function createJob() {
  const bull = new BullMQ('queueName')
  const connection = bull.connection
  const queue = bull.queue

  bull.job.create(
    'jobName',
    { name: 'clean-boilerplate', auther: 'Kasra' },
    { delay: 5000, removeOnComplete: true }
  )
}
```

&nbsp;

With this function you be able to get your job by name

```typescript
/* -------------------------------------------------------------------------- */
/*                                   Get Job                                  */
/* -------------------------------------------------------------------------- */
import BullMQ from './integrations/bullmq'

async function getJob() {
  const bull = new BullMQ('queueName')
  const connection = bull.connection
  const queue = bull.queue

  const job = await bull.job.getJob('job-order-10')
  console.log(job)
}
```

&nbsp;

Renew is useful in cases where you need to delete a job and re create that

```typescript
/* -------------------------------------------------------------------------- */
/*                                  Renew Job                                 */
/* -------------------------------------------------------------------------- */
import BullMQ from './integrations/bullmq'

async function renewJob() {
  const bull = new BullMQ('queueName')
  const connection = bull.connection
  const queue = bull.queue

  await bull.job.renewJob('job-order-4', { opts: { delay: 0 } })
}
```

&nbsp;

Worker is another needed part you can use to what should be done

```typescript
/* -------------------------------------------------------------------------- */
/*                                Create Worker                               */
/* -------------------------------------------------------------------------- */
import BullMQ, { Job, Worker } from './integrations/bullmq'

async function createWorker() {
  const bull = new BullMQ('queueName')
  const connection = bull.connection
  const queue = bull.queue

  const worker = new Worker('queueName', async (job: Job) => console.log(job.data), { connection })
  worker.on('completed', (job) => console.log(`${job.id} has completed!`))
  worker.on('failed', (job, err) => console.log(`${job.id} has failed with ${err.message}`))
}
```

&nbsp;

This integration covered this methods:

## messaging

- [createJob]()
- [getJob]()
- [renewJob]()
- [createWorker]()

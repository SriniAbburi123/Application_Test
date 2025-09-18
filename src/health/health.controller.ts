import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private mongoose: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.http.pingCheck('application', 'https://localhost:3000'),
      // To check if the storage exceeds 50% limit
      async () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
      // Check if the storage exceedds 250 GB
      // () => this.disk.checkStorage('storage', {  path: '/', threshold: 250 * 1024 * 1024 * 1024, })
      // Memory health check indicator for heap size.
      async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      async () => this.mongoose.pingCheck('mongoose'),
    ]);
  }
}

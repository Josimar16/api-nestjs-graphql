import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';

@Module({
  providers: [ProjectsService],
  controllers: [],
})
export class ProjectsModule {}

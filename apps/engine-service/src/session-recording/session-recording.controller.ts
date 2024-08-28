import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SessionRecordingService } from './session-recording.service';
import { Prisma } from '@prisma/client';

@Controller('session-recording')
export class SessionRecordingController {
  constructor(
    private readonly sessionRecordingService: SessionRecordingService,
  ) {}

  @Post()
  async create(
    @Body() createSessionRecordingDto: Prisma.SessionRecordingCreateArgs,
  ) {
    const created = await this.sessionRecordingService.create(
      createSessionRecordingDto,
    );
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.sessionRecordingService.findAll(query);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const match = await this.sessionRecordingService.findOne({ id });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSessionRecordingDto: Prisma.SessionRecordingUpdateArgs,
  ) {
    const updated = await this.sessionRecordingService.update(
      updateSessionRecordingDto,
    );
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sessionRecordingService.remove({ id });
  }
}

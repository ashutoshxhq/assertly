import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/crud/crud.service';
import { Prisma, SessionRecording } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SessionRecordingService extends CrudService<
  SessionRecording,
  Prisma.SessionRecordingCreateArgs,
  Prisma.SessionRecordingUpdateArgs,
  Prisma.SessionRecordingWhereUniqueInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'SessionRecording');
  }
}

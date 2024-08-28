import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionRecordingDto } from './create-session-recording.dto';

export class UpdateSessionRecordingDto extends PartialType(CreateSessionRecordingDto) {}

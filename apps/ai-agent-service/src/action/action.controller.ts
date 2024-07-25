import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFiles,
    Body,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ActionService } from './action.service';

@Controller('v1/actions')
export class ActionController {
    constructor(private readonly actionService: ActionService) {}

    @Post('find-locator')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'message', maxCount: 1 },
            { name: 'pageContent', maxCount: 1 },
        ]),
    )
    async findLocator(
        @UploadedFiles()
        files: {
            message?: Express.Multer.File[];
            pageContent?: Express.Multer.File[];
        },
        @Body() body: any,
    ) {
        let message: string;
        let pageContent: string;

        // Check if data is in files (multipart form data)
        if (files.message && files.pageContent) {
            message = files.message[0].buffer.toString();
            pageContent = files.pageContent[0].buffer.toString();
        }
        // Check if data is in body (regular form data or JSON)
        else if (body.message && body.pageContent) {
            message = body.message;
            pageContent = body.pageContent;
        } else {
            throw new Error('Missing required fields');
        }

        return await this.actionService.findLocator({ message, pageContent });
    }
}

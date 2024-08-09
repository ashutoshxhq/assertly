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

    @Post('ai-assert')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'message', maxCount: 1 },
            { name: 'pageContent', maxCount: 1 },
        ]),
    )
    async aiAssert(
        @UploadedFiles()
        files: {
            assertion?: Express.Multer.File[];
            screenshot?: Express.Multer.File[];
            pageContent?: Express.Multer.File[];
        },
        @Body() body: any,
    ) {
        let assertion: string;
        let pageContent: string;
        let screenshot: string;

        // Check if data is in files (multipart form data)
        if (files.assertion && files.pageContent && files.screenshot) {
            assertion = files.assertion[0].buffer.toString();
            pageContent = files.pageContent[0].buffer.toString();
            screenshot = files.screenshot[0].buffer.toString();
        }
        // Check if data is in body (regular form data or JSON)
        else if (body.assertion && body.screenshot) {
            assertion = body.assertion;
            screenshot = body.screenshot;
        } else {
            throw new Error('Missing required fields');
        }

        return await this.actionService.aiAssert({
            assertion,
            pageContent,
            screenshot,
        });
    }
}

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CopyService } from '../service/copies.service';
import { CreateCopyDto } from '../dtos/CreateCopy.dto';
import { UpdateCopyDto } from '../dtos/UpdateCopy.dto';

@Controller('api/copies')
export class CopiesController {
    constructor(private copyService: CopyService) {}

    @Post('createCopy')
    createCopy(@Body() copyPayload : CreateCopyDto) {
      return this.copyService.createCopy(copyPayload);
    }
  
    @Get('getCopies')
    getCopies(){
      return this.copyService.getCopies();
    }
  
    @Get('getCopyById/:id')
    async getCopyById( @Param('id', ParseIntPipe) id: number){
      const copy = await this.copyService.getCopyById(id);
      if (!copy) {
        throw new HttpException(
          'No records found. The provided ID might not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
      return copy;
    }
  
    @Put('updateCopy/:id')
   async updateCopyById(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCopyDetails : UpdateCopyDto,
    ) {
      const result = await this.copyService.updateCopy(id,updateCopyDetails);
      if (result.affected > 0) {
        return { message: 'Copy details are updated successfully!' };
      } else {
        throw new HttpException('No records updated. The provided ID might not exist.', HttpStatus.NOT_FOUND);
      }
    }
  
    @Delete("deleteCopy/:id")
    async deleteCopy(@Param('id',ParseIntPipe) id : number){
      const result = await this.copyService.deleteCopy(id);
      if (result.affected > 0) {
        return { message: 'Copy details are deleted successfully!' };
      } else {
        throw new HttpException('No records deleted. The provided ID might not exist.', HttpStatus.NOT_FOUND);
      }
    }
}

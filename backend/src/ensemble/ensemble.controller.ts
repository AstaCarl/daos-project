import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EnsembleService } from './ensemble.service';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './dto/update-ensemble.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../user/users.service';

@Controller('ensemble')
export class EnsembleController {
  constructor(
    private readonly ensembleService: EnsembleService,
    private readonly usersService: UsersService
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createEnsembleDto: CreateEnsembleDto, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token) as any;
    const email = decodedToken.email;
    const userResponse = await this.usersService.findByEmail(email);
    const userId = userResponse._id;

    return this.ensembleService.create(createEnsembleDto, userId);
  }

  @Get()
  findAll() {
    return this.ensembleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ensembleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnsembleDto: UpdateEnsembleDto,
  ) {
    return this.ensembleService.update(+id, updateEnsembleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ensembleService.remove(+id);
  }
}

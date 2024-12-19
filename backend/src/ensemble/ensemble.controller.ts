import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EnsembleService } from './ensemble.service';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './dto/update-ensemble.dto';
import { AuthGuard } from '../auth/auth.guard';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../user/users.service';

@Controller('ensemble')
export class EnsembleController {
  constructor(
    private readonly ensembleService: EnsembleService,
    private readonly usersService: UsersService
  ) {}

  //Create ensemble
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createEnsembleDto: CreateEnsembleDto, @Req() req) {
    // Get the payload from the token in the headers
    const payload = req.headers.authorization.split(' ')[1];
    // decode the payload to get the email
    const decodedPayload = jwt.decode(payload) as any;
    // get the email from the decoded payload
    const email = decodedPayload.email;
    // find the user by email
    const userResponse = await this.usersService.findByEmail(email);
    // get the user is from find user response
    const userId = userResponse._id;

    return this.ensembleService.createEnsemble(createEnsembleDto, userId);
  }

  //Get all ensembles
  @Get()
  findAll() {
    return this.ensembleService.findAll();
  }

  //Get ensemble by user id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ensembleService.findEnsembleByUserId(id);
  }

  //Update ensemble by id and add user as activeUsers
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEnsembleDto: UpdateEnsembleDto, @Req() req
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token) as any;
    const email = decodedToken.email;
    const userResponse = await this.usersService.findByEmail(email);
    const userId = userResponse._id;
    return this.ensembleService.updateEnsemble(id, updateEnsembleDto, userId);
  }
}

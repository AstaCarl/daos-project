import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../src/test.module';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UsersService } from '../src/user/users.service';
import { EnsembleService } from '../src/ensemble/ensemble.service';
import { AuthService } from '../src/auth/auth.service';

describe('Controller (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;
  let ensembleService: EnsembleService;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    userService = moduleFixture.get<UsersService>(UsersService);
    ensembleService = moduleFixture.get<EnsembleService>(EnsembleService);
    authService = moduleFixture.get<AuthService>(AuthService);

    // Clear the database before each test

    app = moduleFixture.createNestApplication();

    await app.init();
    await ensembleService.deleteMany();
  });
  it('should create an ensemble', async () => {
    const validUser: CreateUserDto = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'carl@test.dk',
      password: 'password',
    };
    await userService.createUser(validUser);

    const loginResponse = await authService.signIn(
      validUser.email,
      validUser.password,
    );

    const ensembleData = {
      title: 'Ensemble1',
      description: 'Ensemble1',
      website: 'ensemble1.dk',
      zipcode: '1234',
      city: 'City1',
      genre: ['Genre1'],
      rehearsalFrequency: 'Once a week',
      playType: 'Projectbased',
    };
    const expectedData = {
      title: 'Ensemble1',
      description: 'Ensemble1',
      website: 'ensemble1.dk',
      zipcode: '1234',
      city: 'City1',
      genre: ['Genre1'],
      rehearsalFrequency: 'Once a week',
      playType: 'Projectbased',
    };

    const { body } = await request(app.getHttpServer())
      .post('/ensemble')
      .send(ensembleData)
      .set('Authorization', `Bearer ${loginResponse.access_token}`)
      .expect(201);

    expect(body._id).toBeDefined();
    expect(body).toMatchObject(expectedData);
  });

  it('should register a user to an ensemble', async () => {
    const validUser: CreateUserDto = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'rikke@test.dk',
      password: 'password',
    };
    await userService.createUser(validUser);

    const loginResponse = await authService.signIn(
      validUser.email,
      validUser.password,
    );

    const ensembleData = {
      title: 'Ensemble1',
      description: 'Ensemble1',
      website: 'ensemble1.dk',
      zipcode: '1234',
      city: 'City1',
      genre: ['Genre1'],
      rehearsalFrequency: 'Once a week',
      playType: 'Projectbased',
    };

    const ensembleResponse = await request(app.getHttpServer())
      .post('/ensemble')
      .send(ensembleData)
      .set('Authorization', `Bearer ${loginResponse.access_token}`)
      .expect(201);

    const ensembleId = ensembleResponse.body._id;

    const validUser2: CreateUserDto = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'sam@test.dk',
      password: 'password',
    };
    const user2: any = await userService.createUser(validUser2);

    const loginResponse2 = await authService.signIn(
      validUser2.email,
      validUser2.password,
    );

    const { body } = await request(app.getHttpServer())
      .patch(`/ensemble/${ensembleId}`)
      .set('Authorization', `Bearer ${loginResponse2.access_token}`)
      .expect(200);

    expect(body.activeUsers.length).toEqual(2);
    expect(body.activeUsers[1]).toEqual(user2._id.toString());
  });

  it('should get all ensembles', async () => {
    const validUser: CreateUserDto = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'mina@test.dk',
      password: 'password',
    };
    await userService.createUser(validUser);

    const loginResponse = await authService.signIn(
      validUser.email,
      validUser.password,
    );

    const ensembleData = {
      title: 'Ensemble1',
      description: 'Ensemble1',
      website: 'ensemble1.dk',
      zipcode: '1234',
      city: 'City1',
      genre: 'Genre1',
      rehearsalFrequency: 'Once a week',
    };

    await request(app.getHttpServer())
      .post('/ensemble')
      .send(ensembleData)
      .set('Authorization', `Bearer ${loginResponse.access_token}`)
      .expect(201);

    const ensembleData2 = {
      title: 'Ensemble1',
      description: 'Ensemble1',
      website: 'ensemble1.dk',
      zipcode: '1234',
      city: 'City1',
      genre: 'Genre1',
      rehearsalFrequency: 'Once a week',
    };

    await request(app.getHttpServer())
      .post('/ensemble')
      .send(ensembleData2)
      .set('Authorization', `Bearer ${loginResponse.access_token}`)
      .expect(201);

    const { body } = await request(app.getHttpServer())
      .get('/ensemble')
      .expect(200);

    expect(body.length).toEqual(2);
  });
});

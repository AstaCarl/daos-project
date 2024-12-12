import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../src/test.module';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from '../src/user/users.service';

describe('authController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    userService = moduleFixture.get<UsersService>(UsersService);

    // Clear the database before each test
    await userService.deleteMany();

    app = moduleFixture.createNestApplication();

    await app.init();

  });

  describe('authController /auth/login', () => {
    it('should return a token when logging in', async () => {
      const validUser: CreateUserDto = {
        name: 'Test',
        lastname: 'Testsen',
        email: 'test4@test.dk',
        password: 'password',
      };
      await userService.createUser(validUser);

      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test4@test.dk',
          password: 'password',
        })
        .expect(200);

      expect(body.access_token).toBeDefined();
    });
  });
});

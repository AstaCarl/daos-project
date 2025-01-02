import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../src/test.module';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UsersService } from '../src/user/users.service';

// This is an end-to-end test of the authController.

describe('authController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;

  // Before each test create a new module with the TestModule and get the UsersService.
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    userService = moduleFixture.get<UsersService>(UsersService);

    // Clear the test database before each test
    await userService.deleteMany();

    // Create a new Nest application
    app = moduleFixture.createNestApplication();

    // Start the application
    await app.init();
  });

  describe('authController /auth/login', () => {
    // test that checks if we get a accesToken when logging in
    it('should return a token when logging in', async () => {
      // Arrange
      // setting up a valid user to login with
      const validUser: CreateUserDto = {
        name: 'Test',
        lastname: 'Testsen',
        email: 'test4@test.dk',
        password: 'password',
      };
      await userService.createUser(validUser); // Create the user in the database

      // Act
      // Send a POST request to the /auth/login endpoint with the valid user credentials, email and password
      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test4@test.dk',
          password: 'password',
        })
        .expect(200);
      // Assert
      // Check if the response body contains an access_token
      expect(body.access_token).toBeDefined();
    });
  });
});

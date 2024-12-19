import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../src/test.module';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UsersService } from '../src/user/users.service';

// This is an end-to-end test of the userController.

describe('userController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;

  // Before each test create a new module with the TestModule and get the UsersService.
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    userService = moduleFixture.get<UsersService>(UsersService);
    // Clear the database before each test
    await userService.deleteMany();

    // Create a new Nest application
    app = moduleFixture.createNestApplication();
    // Start the application
    await app.init();
  });

  //******************* Create user endpoint test *******************/
  it('should signup a valid user', async () => {
    // Arrange
    // setting up a valid user object
    const validUser: CreateUserDto = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'test@test.dk',
      password: 'password',
    };

    const expectedObject = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'test@test.dk',
      password: 'password',
    };

    // Act
    // Send a POST request to the /user endpoint with the valid user object
    const { body } = await request(app.getHttpServer())
      .post('/user')
      .send(validUser)
      .expect(201);

    // Assert
    // Check if the response body contains the expected user object and that an _id is defined
    expect(body._id).toBeDefined();
    expect(body).toMatchObject(expectedObject);
  });

  // ******************* Delete endpoint test *******************/
  it('/user (DELETE)', async () => {
    // Arrange
    // setting up a valid user object
    const validUser: CreateUserDto = {
      name: 'Test1',
      lastname: 'Testsen1',
      email: 'test1@test.dk',
      password: 'password1',
    };
    // create the user in the database
    const createUserResponse = await request(app.getHttpServer())
      .post('/user')
      .send(validUser)
      .expect(201);

    // extract the user id from the response
    const userId = createUserResponse.body._id;

    // Login the user
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: validUser.email,
        password: validUser.password,
      })
      .expect(200);

    // extract the access token from the response
    const token = loginResponse.body.access_token;

    // Act
    // Send a DELETE request to the /user endpoint with the user id and the access token
    const deletedResponse = await request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // Assert
    // Check if the response body contains the user id
    expect(deletedResponse.body._id).toMatch(userId);
  });

  //******************* Get user by ID *******************/
  it('/user (GET)', async () => {
    // Arrange
    // setting up a valid user object and creating the user in the database
    const validUser: CreateUserDto = {
      name: 'Test1',
      lastname: 'Testsen1',
      email: 'test1@test.dk',
      password: 'password1',
    };
    const createUserResponse = await request(app.getHttpServer())
      .post('/user')
      .send(validUser)
      .expect(201);

    // extract the user id from the response
    const userId = createUserResponse.body._id;

    // Act
    // Send a GET request to the /user endpoint with the user id
    const getUserResponse = await request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200);

    // Assert
    // Check if the response body contains the user id
    expect(getUserResponse.body._id).toMatch(userId);
  });
});

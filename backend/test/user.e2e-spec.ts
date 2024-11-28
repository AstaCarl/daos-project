import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../src/test.module';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from '../src/user/users.service';
import { after } from 'node:test';

describe('userController (e2e)', () => {
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

  //******************* Create user endpoint test *******************/
  it('should signup a valid user', async () => {
    // Arrange
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
    const { body } = await request(app.getHttpServer())
      .post('/user')
      .send(validUser)
      .expect(201); // assert

    expect(body._id).toBeDefined();
    expect(body).toMatchObject(expectedObject);
  });

  //******************* Delete endpoint test *******************/

  it('/user (DELETE)', async () => {
    // Arrange
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

    const userId = createUserResponse.body._id;

    // Then, delete the user
    const response = await request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .expect(200);

    expect(response.body._id).toMatch(userId);
  });

  //******************* Get user by ID *******************/

  it('/user (GET)', async () => {
    // Arrange
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

    const userId = createUserResponse.body._id;

    // Act
    const response = await request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200);

    // Assert
    expect(response.body._id).toMatch(userId);
  });

  //******************* Get all users endpoint test *******************/
  it('should return all users', async () => {
    // Arrange
    const validUser1: CreateUserDto = {
      name: 'Test1',
      lastname: 'Testsen1',
      email: 'test1@test.dk',
      password: 'password1',
    };
    const validUser2: CreateUserDto = {
      name: 'Test2',
      lastname: 'Testsen2',
      email: 'test2@test.dk',
      password: 'password2',
    };

    await request(app.getHttpServer())
      .post('/user')
      .send(validUser1)
      .expect(201);
    await request(app.getHttpServer())
      .post('/user')
      .send(validUser2)
      .expect(201);

    // Act
    const { body } = await request(app.getHttpServer())
      .get('/user')
      .expect(200);

    // Assert
    expect(body.length).toBeGreaterThanOrEqual(2);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ email: 'test1@test.dk' }),
        expect.objectContaining({ email: 'test2@test.dk' }),
      ]),
    );
  });
});

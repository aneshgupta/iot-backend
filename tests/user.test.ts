import api from './api';

describe('users api testing', () => {
    let token = '';
    let userId = '';

    describe('login user', () => {
        it('should login the user', async () => {
            const data = JSON.stringify({
                query: `mutation Login($loginInput: LoginInput!) {
                    login(loginInput: $loginInput) {
                        token
                    }
                }`,
                variables: {
                    loginInput: {
                        email: 'admin@iot.com',
                        password: 'Admin@iot',
                    },
                },
            });

            const response = await api.post('/', data);
            expect(response.status).toEqual(200);
            expect(response.data).toBeDefined();
            expect(response.data.data).not.toBeNull();
            expect(response.data.data.login).not.toBeNull();
            expect(response.data.data.login.token).not.toBeNull();

            token = response.data.data.login.token;
        });
    });

    describe('creating a new user', () => {
        it('should create a user into the database', async () => {
            const data = JSON.stringify({
                query: `mutation CreateUser($userInput: UserInput!) {
                    createUser(userInput: $userInput) {
                        _id
                    }
                }`,
                variables: {
                    userInput: {
                        email: 'user1@iot.com',
                        password: 'User@123',
                        role: 'USER',
                    },
                },
            });

            const response = await api.post('/', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(response.status).toEqual(200);
            expect(response.data).toBeDefined();
            expect(response.data.data).not.toBeNull();
            expect(response.data.data.createUser).not.toBeNull();
            expect(response.data.data.createUser._id).not.toBeNull();

            userId = response.data.data.createUser._id;
        });
    });

    describe('getting the list of users', () => {
        it('should list all users', async () => {
            const data = JSON.stringify({
                query: `query GetUsers {
                    getUsers {
                        _id
                        role
                        email
                        password
                        isActive
                        createdBy
                        createdOn
                    }
                }`,
            });

            const response = await api.post('/', data);
            expect(response.status).toEqual(200);
            expect(response.data).toBeDefined();
            expect(response.data.getUsers).not.toBeNull();
        });
    });

    describe('deleting the user', () => {
        it('should delete a user', async () => {
            const data = JSON.stringify({
                query: `mutation DeleteUser($userId: ID!) {
                    deleteUser(userId: $userId) {
                      _id
                    }
                  }`,
                variables: { userId },
            });

            const response = await api.post('/', data);
            expect(response.status).toEqual(200);
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.deleteUser).toBeDefined();
            expect(response.data.data.deleteUser._id).not.toBeNull();
        });
    });
});

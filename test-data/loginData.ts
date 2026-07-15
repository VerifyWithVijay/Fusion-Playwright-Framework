export const loginTestData = [

    {
        testName: 'Invalid Username',
        username: 'invalid_user',
        password: 'secret_sauce',
        expectedError:
            'Epic sadface: Username and password do not match any user in this service'
    },

    {
        testName: 'Invalid Password',
        username: 'standard_user',
        password: 'invalid_password',
        expectedError:
            'Epic sadface: Username and password do not match any user in this service'
    },

    {
        testName: 'Both Invalid',
        username: 'invalid_user',
        password: 'invalid_password',
        expectedError:
            'Epic sadface: Username and password do not match any user in this service'
    },

    {
        testName: 'Locked User',
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectedError:
            'Epic sadface: Sorry, this user has been locked out.'
    }

];
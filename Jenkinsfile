pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

    environment {
        TEST_ENV = 'qa'
        BROWSER = 'chromium'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                withCredentials([

            string(
                credentialsId: 'BASE_URL_QA',
                variable: 'BASE_URL'
            ),

            usernamePassword(
                credentialsId: 'SAUCE_QA_LOGIN',
                usernameVariable: 'SAUCE_USERNAME',
                passwordVariable: 'SAUCE_PASSWORD'
            )

        ]) {
                    bat '''
            echo BASE_URL=%BASE_URL%
            echo USERNAME=%SAUCE_USERNAME%
            echo PASSWORD=%SAUCE_PASSWORD%

            echo Running Tests...
            echo Environment = %TEST_ENV%
            echo Browser = %BROWSER%

            npx playwright test
            '''
        }
            }
        }
    }
}

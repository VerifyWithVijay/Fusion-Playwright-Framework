pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

    parameters {

    choice(
        name: 'TEST_ENV',
        choices: ['qa', 'stage', 'uat', 'prod'],
        description: 'Select Environment'
    )

    choice(
        name: 'BROWSER',
        choices: ['chromium', 'firefox', 'webkit', 'all'],
        description: 'Select Browser'
    )

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
            
                bat """
                if exist allure-results rmdir /s /q allure-results
                if exist allure-report rmdir /s /q allure-report
                if exist test-results rmdir /s /q test-results

                echo Running Playwright Tests...
                echo Environment = %TEST_ENV%
                echo Browser = %BROWSER%
                echo Credentials loaded successfully.

                npx playwright test
                """

        }
            }
        }
    }
}

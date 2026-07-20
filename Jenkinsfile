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

                script {

                def baseUrlCredential = "BASE_URL_${params.TEST_ENV.toUpperCase()}"
                def loginCredential = "SAUCE_${params.TEST_ENV.toUpperCase()}_LOGIN"

                echo "Base URL Credential : ${baseUrlCredential}"
                echo "Login Credential    : ${loginCredential}"

                withCredentials([

                string(
                credentialsId: baseUrlCredential,
                variable: 'BASE_URL'
            ),

                usernamePassword(
                credentialsId: loginCredential,
                usernameVariable: 'SAUCE_USERNAME',
                passwordVariable: 'SAUCE_PASSWORD'
            )

        ])

            }
                 {
            
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

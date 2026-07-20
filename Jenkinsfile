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

            echo "===================================="
            echo "Base URL Credential : ${baseUrlCredential}"
            echo "Login Credential    : ${loginCredential}"
            echo "===================================="

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

            ]) {

                bat """
                set TEST_ENV=${params.TEST_ENV}
                set BROWSER=${params.BROWSER}

                if exist allure-results rmdir /s /q allure-results
                if exist allure-report rmdir /s /q allure-report
                if exist test-results rmdir /s /q test-results

                echo.
                echo ============================================
                echo Running Playwright Tests...
                echo ============================================
                echo Environment = %TEST_ENV%
                echo Browser = %BROWSER%
                echo Credentials loaded successfully.
                echo ============================================

                npx playwright test
                """

                }

             }

        }
    }

}

post {

    always {

        allure(
            includeProperties: false,
            jdk: '',
            reportBuildPolicy: 'ALWAYS',
            results: [[path: 'allure-results']]
        )

    }

}

}


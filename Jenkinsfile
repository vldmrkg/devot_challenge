// NOTE: This Jenkins pipeline file is not currently in use.
// It is included in the project as a reference for future CI/CD setup using Jenkins.
// Do not execute this file unless you intend to use Jenkins for running tests.

pipeline {
    agent any
    stages {
        stage('Many tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.44.1'
                    args '-u root'
                }
            }
            steps {
                sh 'pwd'
                sh 'mkdir -p /.npm/_logs'
                sh 'chown -R pwuser:pwuser /.npm'
                sh 'pwd'
                sh 'npm ci'
                sh 'npx playwright test'
            }
        }
    }
}
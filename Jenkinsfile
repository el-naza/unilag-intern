pipeline {
    agent any
    environment {
        DOCKER_HOME = tool 'local_docker'
        NODE_HOME = tool 'local_node'
        PATH = "${DOCKER_HOME}/bin:${NODE_HOME}/bin:${env.PATH}"
        DOCKERHUB_ACCOUNT_ID = credentials('dockerHub')
        DOCKERHUB_PASSWORD = credentials('dockerHub')
        APPLICATION = 'unilag-intern'
    }
    stages {
        stage('Initialize') {
            steps {
                echo "Initializing build environment..."
            }
        }
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }
        stage('Build Image') {
            steps {
                script {
                    app = docker.build("baslensinc/${APPLICATION}:${BUILD_NUMBER}")
                }
            }
        }
        stage('Push Image') {
            steps {
                withDockerRegistry([credentialsId: 'dockerHub', url: 'https://index.docker.io/v1/']) {
                    script {
                        app.push()
                        app.push("latest")
                    }
                }
            }
        }
        stage('Docker Unilag Intern Network') {
            steps {
                sh ("docker network inspect unilag-intern-network || docker network create --driver bridge unilag-intern-network")
            }
        }
        stage('Deploy') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'UNILAG_INTERN_NODE_ENV_SECRET_ID', variable: 'NODE_ENV'),
                        string(credentialsId: 'UNILAG_INTERN_DATABASE_URI_SECRET_ID', variable: 'DATABASE_URI'),
                        string(credentialsId: 'UNILAG_INTERN_PAYLOAD_SECRET_SECRET_ID', variable: 'PAYLOAD_SECRET'),
                        string(credentialsId: 'UNILAG_INTERN_NEXT_PUBLIC_SERVER_URL_SECRET_ID', variable: 'NEXT_PUBLIC_SERVER_URL'),
                        string(credentialsId: 'UNILAG_INTERN_EMAIL_USER_SECRET_ID', variable: 'EMAIL_USER'),
                        string(credentialsId: 'UNILAG_INTERN_RESEND_API_KEY_SECRET_ID', variable: 'RESEND_API_KEY'),
                        string(credentialsId: 'UNILAG_INTERN_NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY_SECRET_ID', variable: 'NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY'),
                        string(credentialsId: 'UNILAG_INTERN_PAYSTACK_SECRET_KEY_SECRET_ID', variable: 'PAYSTACK_SECRET_KEY')
                    ]) {
                        sh """
                        docker stop ${APPLICATION} || true
                        docker rm ${APPLICATION} || true
                        docker run -d --name ${APPLICATION} -p 5000:5000 --network unilag-intern-network --restart=unless-stopped \
                        -e NODE_ENV='${NODE_ENV}' \
                        -e DATABASE_URI='${DATABASE_URI}' \
                        -e PAYLOAD_SECRET='${PAYLOAD_SECRET}' \
                        -e NEXT_PUBLIC_SERVER_URL='${NEXT_PUBLIC_SERVER_URL}' \
                        -e EMAIL_USER='${EMAIL_USER}' \
                        -e RESEND_API_KEY='${RESEND_API_KEY}' \
                        -e NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY='${NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}' \
                        -e PAYSTACK_SECRET_KEY='${PAYSTACK_SECRET_KEY}' \
                        baslensinc/${APPLICATION}:${BUILD_NUMBER}
                        """
                    }
                }
            }
        }
        stage('Cleanup') {
            steps {
                sh "docker image prune -f"
            }
        }
    }
    post {
        always {
            echo 'Build completed.'
        }
        failure {
            echo 'Build failed. Please check the logs.'
        }
        success {
            echo 'Build succeeded. Image deployed successfully.'
        }
    }
}

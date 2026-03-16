# 🎮 End-to-End DevSecOps Kubernetes Project - Tetris on AWS EKS

[![LinkedIn](https://img.shields.io/badge/Connect%20with%20me%20on-LinkedIn-blue.svg)](https://www.linkedin.com/in/amanpathak-devops/)
[![GitHub](https://img.shields.io/github/stars/AmanPathak-DevOps/End-to-End-Kubernetes-DevSecOps-Tetris-Project.svg?style=social)](https://github.com/AmanPathak-DevOps/End-to-End-Kubernetes-DevSecOps-Tetris-Project)
![DevSecOps](https://img.shields.io/badge/DevSecOps-Mastery-brightgreen)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-blueviolet)
![Jenkins](https://img.shields.io/badge/Jenkins-Automation-orange)
![ArgoCD](https://img.shields.io/badge/ArgoCD-Continuous%20Delivery-blue)
![Docker](https://img.shields.io/badge/Docker-Containerization-blue)
![Terraform](https://img.shields.io/badge/Terraform-IaC-9cf)

![Infrastructure Diagram](assets/Infra.gif)

## 📋 Overview

This is a comprehensive **DevSecOps learning project** that demonstrates how to deploy a React-based Tetris game on **AWS EKS (Elastic Kubernetes Service)** using industry-standard tools and practices. The project covers the entire software development lifecycle from infrastructure provisioning to continuous deployment with integrated security scanning.

### What You'll Learn

- ☁️ **Infrastructure as Code** - Provision AWS EKS clusters and Jenkins servers using Terraform
- 🔄 **CI/CD Automation** - Build automated pipelines with Jenkins
- 🐳 **Containerization** - Dockerize React applications
- ☸️ **Kubernetes Orchestration** - Deploy and manage containerized apps on EKS
- 🔒 **Security Integration** - Implement security scanning with Trivy, OWASP Dependency-Check, and SonarQube
- 🚀 **GitOps** - Continuous delivery with ArgoCD

---

## 🏗️ Architecture

```diagram
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Developer     │────▶│   Jenkins CI/CD  │────▶│   Docker Hub    │
│   (Git Push)    │     │   Pipelines      │     │   (Registry)    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │                        │
                               ▼                        ▼
                        ┌──────────────────┐     ┌─────────────────┐
                        │   SonarQube      │     │   AWS EKS       │
                        │   (Code Quality) │     │   Cluster       │
                        └──────────────────┘     └─────────────────┘
                               │                        ▲
                               ▼                        │
                        ┌──────────────────┐     ┌─────────────────┐
                        │   Trivy & OWASP  │────▶│   ArgoCD        │
                        │   (Security Scan)│     │   (GitOps)      │
                        └──────────────────┘     └─────────────────┘
```

---

## 📁 Project Structure

```folder
Tetris-game/
├── EKS-TF/                     # Terraform scripts for EKS cluster deployment
│   ├── backend.tf             # S3 backend configuration
│   ├── eks-cluster.tf         # EKS cluster configuration
│   ├── eks-node-group.tf      # Node group configuration
│   ├── iam-policy.tf          # IAM policies for EKS
│   ├── iam-role.tf            # IAM roles for EKS
│   ├── provider.tf            # AWS provider configuration
│   ├── variables.tf           # Input variables
│   ├── variables.tfvars       # Variable values
│   └── vpc.tf                 # VPC and networking
│
├── Jenkins-Server-TF/          # Terraform scripts for Jenkins EC2 instance
│   ├── backend.tf             # S3 backend configuration
│   ├── ec2.tf                 # EC2 instance configuration
│   ├── gather.tf              # Data sources
│   ├── iam-instance-profile.tf # Instance profile
│   ├── iam-policy.tf          # IAM policies for Jenkins
│   ├── iam-role.tf            # IAM role for Jenkins
│   ├── provider.tf            # AWS provider configuration
│   ├── tools-install.sh       # Jenkins tools installation script
│   ├── variables.tf           # Input variables
│   ├── variables.tfvars       # Variable values
│   └── vpc.tf                 # VPC configuration
│
├── Jenkins-Pipeline-Code/      # Jenkins pipeline definitions
│   ├── Jenkinsfile-EKS-Terraform  # Pipeline for EKS infrastructure
│   ├── Jenkinsfile-TetrisV1       # CI/CD pipeline for Tetris V1
│   └── Jenkinsfile-TetrisV2       # CI/CD pipeline for Tetris V2
│
├── Manifest-file/              # Kubernetes manifests
│   ├── deployment-service.yml # Deployment and Service definitions
│   └── ingress.yaml           # Ingress configuration (ALB)
│
├── Tetris-V1/                  # Initial version of Tetris game
│   ├── Dockerfile             # Docker configuration
│   ├── package.json           # Node.js dependencies
│   ├── public/                # Static assets
│   ├── src/                   # React source code
│   └── README.md              # Version-specific documentation
│
├── Tetris-V2/                  # Enhanced version of Tetris game
│   ├── Dockerfile             # Docker configuration
│   ├── package.json           # Node.js dependencies
│   ├── public/                # Static assets
│   ├── src/                   # React source code
│   └── README.md              # Version-specific documentation
│
├── assets/                     # Project assets and diagrams
│   └── Infra.gif              # Infrastructure architecture diagram
│
├── Process.md                  # Implementation process documentation
└── LICENSE                     # Apache 2.0 License
```

---

## 🛠️ Tools & Technologies

| Category | Tools |

|----------|-------|
| **Cloud Platform** | AWS (EC2, EKS, IAM, VPC, S3) |
| **Infrastructure as Code** | Terraform |
| **CI/CD** | Jenkins |
| **Container Orchestration** | Kubernetes (EKS) |
| **Containerization** | Docker |
| **Code Quality** | SonarQube |
| **Security Scanning** | Trivy, OWASP Dependency-Check |
| **GitOps** | ArgoCD |
| **Application** | React.js, Node.js |

---

## 🚀 Quick Start

### Prerequisites

- AWS Account with appropriate IAM permissions
- Terraform installed (v1.0+)
- Git installed
- Basic understanding of AWS, Kubernetes, and CI/CD concepts

### Step 1: Clone the Repository

```bash
git clone https://github.com/x0lg0n/Tetris-game.git
cd Tetris-game
```

### Step 2: Deploy Jenkins Server

```bash
cd Jenkins-Server-TF
terraform init
terraform plan -var-file=variables.tfvars
terraform apply -var-file=variables.tfvars
```

### Step 3: Deploy EKS Cluster

```bash
cd ../EKS-TF
terraform init
terraform plan -var-file=variables.tfvars
terraform apply -var-file=variables.tfvars
```

### Step 4: Configure Jenkins Pipelines

1. Access Jenkins UI (EC2 public IP:8080)
2. Install required plugins
3. Configure credentials:
   - AWS credentials (`aws-key`)
   - Docker Hub credentials (`docker`)
   - SonarQube token (`sonar-token`)
   - GitHub token (`github`)
4. Create pipeline jobs using the Jenkinsfiles

### Step 5: Deploy the Application

Run the Jenkins pipelines in order:

1. **EKS-Terraform Pipeline** - Provisions infrastructure
2. **TetrisV1/V2 Pipeline** - Builds, scans, and deploys the application

---

## 📊 CI/CD Pipeline Stages

### TetrisV1/V2 Pipeline

1. **Code Checkout** - Pull latest code from Git
2. **SonarQube Analysis** - Code quality and security analysis
3. **Quality Gate** - Wait for quality gate results
4. **Dependency Installation** - Install npm packages
5. **OWASP Dependency-Check** - Scan for vulnerable dependencies
6. **Trivy File Scan** - Scan source code for vulnerabilities
7. **Docker Build** - Build Docker image
8. **Docker Push** - Push image to Docker Hub
9. **Trivy Image Scan** - Scan Docker image for vulnerabilities
10. **Update Deployment** - Update Kubernetes manifests with new image tag

### EKS-Terraform Pipeline

1. **Checkout** - Pull Terraform code
2. **Terraform Init** - Initialize Terraform working directory
3. **Terraform Validate** - Validate Terraform configuration
4. **Terraform Plan** - Generate execution plan
5. **Terraform Apply/Destroy** - Provision or destroy infrastructure

---

## 🔒 Security Features

- **SonarQube**: Static code analysis for bugs, vulnerabilities, and code smells
- **OWASP Dependency-Check**: Identifies known vulnerabilities in project dependencies
- **Trivy**: Comprehensive vulnerability scanner for:
  - Source code (file scan)
  - Container images (image scan)
- **Quality Gates**: Automated approval/rejection based on security and quality thresholds

---

## 📖 Detailed Documentation

For a complete step-by-step implementation guide, refer to the [blog post](https://amanpathakdevops.medium.com/devsecops-mastery-a-step-by-step-guide-to-deploying-tetris-on-aws-eks-with-jenkins-and-argocd-3adcf21b3120).

Additional documentation:

- [Process.md](Process.md) - Implementation process and milestones
- [Tetris-V1/README.md](Tetris-V1/README.md) - Tetris V1 specific documentation
- [Tetris-V2/README.md](Tetris-V2/README.md) - Tetris V2 specific documentation

---

## 🧹 Cleanup

To avoid unnecessary AWS charges, destroy the infrastructure when done:

```bash
# Destroy EKS Cluster
cd EKS-TF
terraform destroy -var-file=variables.tfvars

# Destroy Jenkins Server
cd ../Jenkins-Server-TF
terraform destroy -var-file=variables.tfvars
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgments

- Open-source community for amazing tools and frameworks
- [SonarQube](https://www.sonarqube.org/) for code quality insights
- [Trivy](https://github.com/aquasecurity/trivy) for security scanning
- [OWASP](https://owasp.org/) for dependency security checks
- All contributors who make learning and collaboration possible

---

## 📬 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/siddhartha-kunwar/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/x0lg0n)
[![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@siddharthakunwar)

---

**Happy Learning! 🚀**

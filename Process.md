# 📋 DevSecOps Implementation Process

This document outlines the step-by-step implementation process for deploying the Tetris game on AWS EKS using DevSecOps practices.

---

## ✅ Implementation Status

| # | Task | Status |
|---|------|--------|
| 1 | Create Jenkins/EC2 machines via Terraform | ✅ Completed |
| 2 | Configure Jenkins for AWS integration | ✅ Completed |
| 3 | Create Job and deploy EKS Cluster using Jenkins | ✅ Completed |
| 4 | Configure Jenkins for multiple tools including SonarQube | ✅ Completed |
| 5 | Deploy Source Code via Jenkins on EKS | ✅ Completed |

---

## 🚀 Detailed Implementation Steps

### Phase 1: Infrastructure Setup

#### Step 1: Create Jenkins/EC2 machines via Terraform

**Directory:** `Jenkins-Server-TF/`

**Terraform Resources:**
- `vpc.tf` - VPC, subnets, route tables, and internet gateway
- `ec2.tf` - EC2 instance for Jenkins
- `iam-role.tf` - IAM role for Jenkins
- `iam-policy.tf` - IAM policies with required permissions
- `iam-instance-profile.tf` - Instance profile attachment
- `tools-install.sh` - User data script for Jenkins and tools installation

**Commands:**
```bash
cd Jenkins-Server-TF
terraform init
terraform plan -var-file=variables.tfvars
terraform apply -var-file=variables.tfvars
```

**Outputs:**
- Jenkins EC2 instance ID
- Public IP address
- Security group ID

---

#### Step 2: Configure Jenkins for AWS integration

**Tasks:**
1. Access Jenkins UI at `http://<EC2-Public-IP>:8080`
2. Complete Jenkins setup (admin password, plugins, user creation)
3. Install required plugins:
   - AWS Credentials
   - Docker Pipeline
   - SonarQube Scanner
   - OWASP Dependency-Check
   - Kubernetes CLI
   - Terraform

**Configure AWS Credentials:**
1. Navigate to **Manage Jenkins** → **Credentials**
2. Add credentials:
   - Kind: AWS Credentials
   - ID: `aws-key`
   - Access Key ID & Secret Access Key from IAM user

**Configure Docker Credentials:**
1. Add credentials:
   - Kind: Username with password
   - ID: `docker`
   - Username: Docker Hub username
   - Password: Docker Hub password/token

---

### Phase 2: EKS Cluster Deployment

#### Step 3: Create Job and deploy EKS Cluster using Jenkins

**Directory:** `EKS-TF/`

**Terraform Resources:**
- `vpc.tf` - VPC configuration for EKS
- `eks-cluster.tf` - EKS cluster definition
- `eks-node-group.tf` - Node group configuration
- `iam-role.tf` - IAM roles for EKS cluster and nodes
- `iam-policy.tf` - Required IAM policies
- `backend.tf` - S3 backend for state management

**Jenkins Pipeline:** `Jenkins-Pipeline-Code/Jenkinsfile-EKS-Terraform`

**Pipeline Stages:**
1. **Checkout from Git** - Clone repository
2. **Initializing Terraform** - `terraform init`
3. **Validate Terraform Code** - `terraform validate`
4. **Terraform Plan** - `terraform plan -var-file=variables.tfvars`
5. **Terraform Action** - `terraform apply` or `destroy`

**Create Jenkins Pipeline:**
1. New Item → Pipeline → Name: `EKS-Deployment`
2. Pipeline definition: Pipeline script from SCM
3. Repository: `https://github.com/AmanPathak-DevOps/End-to-End-Kubernetes-DevSecOps-Tetris-Project.git`
4. Script Path: `Jenkins-Pipeline-Code/Jenkinsfile-EKS-Terraform`
5. Build with parameters:
   - `File-Name`: variables.tfvars
   - `Terraform-Action`: plan/apply/destroy

**Execute:**
1. Build with Parameters → Select `apply`
2. Monitor console output
3. Verify EKS cluster in AWS Console

---

### Phase 3: Security Tools Configuration

#### Step 4: Configure Jenkins for multiple tools including SonarQube

**Install Security Tools on Jenkins:**

1. **SonarQube Setup:**
   - Install SonarQube server (EC2 or Docker)
   - Navigate to **Manage Jenkins** → **System** → **SonarQube servers**
   - Add SonarQube server:
     - Name: `sonar-server`
     - Server URL: `http://<SonarQube-IP>:9000`
     - Server authentication token: `sonar-token`
   - Install SonarQube Scanner tool

2. **OWASP Dependency-Check:**
   - Install OWASP Dependency-Check plugin
   - Configure tool in **Global Tool Configuration**
   - Name: `DP-Check`

3. **Trivy:**
   - Install via Jenkins tools installation script
   - Ensure Trivy is in PATH

4. **Node.js:**
   - Install Node.js plugin
   - Configure in **Global Tool Configuration**
   - Name: `nodejs`

**Configure Credentials:**
| Credential ID | Type | Description |
|--------------|------|-------------|
| `aws-key` | AWS Credentials | AWS access for Terraform |
| `docker` | Username/Password | Docker Hub authentication |
| `sonar-token` | Secret text | SonarQube authentication token |
| `github` | Secret text | GitHub personal access token |
| `sonar-server` | Username/Password | SonarQube server credentials |

---

### Phase 4: Application Deployment

#### Step 5: Deploy Source Code via Jenkins on EKS

**Jenkins Pipelines:**
- `Jenkins-Pipeline-Code/Jenkinsfile-TetrisV1` - Tetris V1 deployment
- `Jenkins-Pipeline-Code/Jenkinsfile-TetrisV2` - Tetris V2 deployment

**Pipeline Stages:**

```
┌─────────────────────────────────────────────────────────┐
│  1. Cleaning Workspace                                  │
│  2. Checkout from Git                                   │
│  3. SonarQube Analysis                                  │
│  4. Quality Gate Check                                  │
│  5. Installing Dependencies                             │
│  6. OWASP Dependency-Check Scan                         │
│  7. Trivy File Scan                                     │
│  8. Docker Image Build                                  │
│  9. Docker Image Push                                   │
│ 10. Trivy Image Scan                                    │
│ 11. Update Deployment Manifest                          │
└─────────────────────────────────────────────────────────┘
```

**Create Jenkins Pipeline:**
1. New Item → Pipeline → Name: `Tetris-V1-Deployment`
2. Pipeline definition: Pipeline script from SCM
3. Repository URL
4. Script Path: `Jenkins-Pipeline-Code/Jenkinsfile-TetrisV1`
5. Build

**Kubernetes Manifest:** `Manifest-file/deployment-service.yml`

```yaml
Deployment:
  - Replicas: 3
  - Image: avian19/tetrisv1:<BUILD_NUMBER>
  - Container Port: 3000

Service:
  - Type: LoadBalancer
  - Port: 80 → 3000
```

**Post-Deployment:**
1. Get LoadBalancer URL from AWS Console
2. Access application at `http://<LoadBalancer-DNS>`
3. Verify application health

---

## 🔧 Configuration Files Reference

### Jenkins Credentials Required

| ID | Type | Purpose |
|----|------|---------|
| `aws-key` | AWS Credentials | Terraform AWS operations |
| `docker` | Username/Password | Docker Hub push/pull |
| `sonar-token` | Secret Text | SonarQube authentication |
| `sonar-server` | Username/Password | SonarQube server access |
| `github` | Secret Text | GitHub repository updates |

### Terraform Variables

**Jenkins-Server-TF/variables.tfvars:**
```hcl
region          = "us-east-1"
instance_type   = "t3.medium"
vpc_cidr        = "10.0.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b"]
```

**EKS-TF/variables.tfvars:**
```hcl
region          = "us-east-1"
cluster_name    = "tetris-eks"
node_count      = 3
node_type       = "t3.medium"
```

---

## 🧹 Cleanup Process

To avoid unnecessary AWS charges:

### Step 1: Delete Kubernetes Resources
```bash
kubectl delete deployment tetris
kubectl delete service tetris-service
```

### Step 2: Destroy EKS Cluster
```bash
cd Jenkins-Pipeline-Code
# Run Jenkins pipeline with Terraform-Action = destroy
# Or manually:
cd ../EKS-TF
terraform destroy -var-file=variables.tfvars
```

### Step 3: Destroy Jenkins Server
```bash
cd ../Jenkins-Server-TF
terraform destroy -var-file=variables.tfvars
```

### Step 4: Clean Docker Images
```bash
# Local cleanup
docker rmi tetrisv1
docker rmi avian19/tetrisv1:<tag>
```

---

## 📊 Architecture Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Developer  │────▶│     GitHub   │────▶│    Jenkins   │
│   (Git Push) │     │   (Source)   │     │    (CI/CD)   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                    ┌─────────────────────────────┼─────────────────────────────┐
                    │                             │                             │
                    ▼                             ▼                             ▼
           ┌──────────────┐             ┌──────────────┐             ┌──────────────┐
           │  SonarQube   │             │  Trivy &     │             │   Docker     │
           │  (Quality)   │             │   OWASP      │             │    Hub       │
           │              │             │  (Security)  │             │  (Registry)  │
           └──────────────┘             └──────────────┘             └──────────────┘
                                                                        │
                                                                        ▼
                    ┌──────────────────────────────────────────────────────────────┐
                    │                         AWS EKS                               │
                    │  ┌─────────────────────────────────────────────────────────┐  │
                    │  │              Kubernetes Cluster                          │  │
                    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │  │
                    │  │  │   Tetris    │  │   Tetris    │  │   Tetris    │      │  │
                    │  │  │   Pod V1    │  │   Pod V2    │  │   Pod V3    │      │  │
                    │  │  └─────────────┘  └─────────────┘  └─────────────┘      │  │
                    │  └─────────────────────────────────────────────────────────┘  │
                    └──────────────────────────────────────────────────────────────┘
```

---

## 📝 Notes

- Ensure all IAM policies have minimum required permissions
- Use S3 backend with DynamoDB locking for Terraform state
- Enable CloudWatch logging for EKS cluster
- Configure security groups with least privilege access
- Regularly update and scan dependencies for vulnerabilities

---

## 🔗 Related Documentation

- [Main README](../README.md) - Project overview
- [Tetris V1 README](../Tetris-V1/README.md) - V1 application details
- [Tetris V2 README](../Tetris-V2/README.md) - V2 application details
- [Blog Post](https://amanpathakdevops.medium.com/devsecops-mastery-a-step-by-step-guide-to-deploying-tetris-on-aws-eks-with-jenkins-and-argocd-3adcf21b3120) - Detailed guide

---

**Implementation completed successfully! 🎉**

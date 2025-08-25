# 🚀 DevSecOps Pipeline Implementation  

This project demonstrates a **secure CI/CD pipeline** implementation by integrating **DevSecOps and GitOps practices**. The goal is to ensure security, reliability, and automation in the software delivery process.  

### 🔐 Key Highlights  
- Code and container image **scanning for vulnerabilities**  
- **Private repositories and workflows** to prevent outsider access  
- **GitHub Container Registry** for secure image storage within the GitHub ecosystem  
- **GitOps** to automatically update Kubernetes pods by monitoring repository changes  
- Deployment on **AWS EC2 with kind** and access via port forwarding  

---

## 📸 Pipeline Workflow  

<img width="2996" height="1774" alt="devsecops pipeline" src="https://github.com/user-attachments/assets/451b8d6e-16da-49c6-9a1e-83049b07c189" />  

<img width="1844" height="961" alt="Screenshot From 2025-08-25 02-07-22" src="https://github.com/user-attachments/assets/13902eff-a5c9-46dd-b274-8f7cdad23c4d" />  

---

## 🛠️ Technologies Used  

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React (icons)  
- **Pipeline**: GitHub Actions, GitHub Container Registry  
- **DevOps/Infra**: Docker, Kubernetes (kind), AWS EC2, GitOps practices  

---

## ⚡ Getting Started  

### ✅ Prerequisites  
- [Node.js](https://nodejs.org/) (v14 or higher)  
- npm or yarn  
- Docker (for containerized setup)  

---

### 💻 Local Development  

1. Clone the repository:
   ```bash
   git clone https://github.com/DevSecOps-GitHubAction-Pipeline.git
   cd DevSecOps-GitHubAction-Pipeline
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`


### 🐳 Using Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/DevSecOps-GitHubAction-Pipeline.git
   cd DevSecOps-GitHubAction-Pipeline
   ```
2. Build Docker Image:
   ```bash
   docker build -t mmsalmafaris/devsecops:v1 .
   ```

3. Run the Docker application:
   ```bash
   docker run -d -p 5500:80 mmsalmafaris/devsecops:v1
   ```

3. Access the application:
   ```bash
   HTTP://localhost:5500
   ```

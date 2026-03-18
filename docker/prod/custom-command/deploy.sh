#!/bin/bash
set -euo pipefail

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting deployment process..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  log "Installing Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo usermod -aG docker $USER
  sudo systemctl enable docker
  sudo systemctl start docker
  rm get-docker.sh

  sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" \
    -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose

  log "Docker installed successfully"
fi

# Fix Docker permissions
sudo chmod 666 /var/run/docker.sock

# Login to Docker Hub
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Clean up old resources
log "Cleaning up old resources..."

if [ -f "docker-compose.yml" ]; then
  docker-compose down --remove-orphans 2>/dev/null || true
fi

docker stop $(docker ps -aq) 2>/dev/null || true
docker rm $(docker ps -aq) 2>/dev/null || true
docker system prune -af --volumes
docker volume prune -f

# Pull new images
docker-compose up -d

log "Deployment completed!"
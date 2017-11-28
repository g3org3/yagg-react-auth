#!/bin/bash

NAME=`cat package.json | jq '.name' | sed s.\\"."".g`
echo "> found app name: $NAME"
create_deploy_file() {
  echo -e "---
- hosts: web
  remote_user: george
  tasks:
    - name: Pull new image
      shell: docker pull registry.jorgeadolfo.com/$1:latest

    - name: Stop $1
      shell: cd /var/docker/$1 && docker-compose stop && docker-compose rm -f
      ignore_errors: yes

    - name: Start $1
      shell: cd /var/docker/$1 && docker-compose up -d
      ignore_errors: yes
" > deploy/update.yml
}

if [[ -n "$1" && -n "$2" ]]; then
  create_deploy_file $2
elif [[ -n "$NAME" ]]; then
  echo "ssh -> to server"
  ssh jorgeadolfo.com "mkdir /var/docker/$NAME"
  echo "[ssh] -> created directory"
  scp docker/docker-compose.yml jorgeadolfo.com:/var/docker/$NAME/
  echo "[scp] -> copy compose"
  create_deploy_file $NAME
  echo "generated deploy.yml"
else
  echo "please provide a project name, i.e. init-server.sh my-app"
fi
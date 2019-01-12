# Test task for DRIVEBACK

DEMO: http://35.190.0.204/

## Description

- Use babel settings for transpiling code  for current nodejs version
- Docker use multi-stage builds for minimize image size
- CI/CD
- Simple k8s settings

## Instruction

Clone git repository with project, and execute this commands.

NOTE: Edit files in /k8s folder and cloudbuild.yaml

``
gcloud projects create <project_name> --name="TestProject"
``

``
gcloud config set project <project_name>
``

``
gcloud container clusters create <clustername> --zone us-central1-b --enable-autorepair --num-nodes 2 --enable-autoscaling --min-nodes 2 --max-nodes 4
``

``
gcloud auth configure-docker
``

``
docker build -t gcr.io/<project_name>/test-task-counter:v1.0.0 .
``

``
docker push gcr.io/<project_name>/test-task-counter:v1.0.0
``

``
kubectl apply -f k8s/
``


For Google Cloud settings see:

- Add "Kubernetes Engine Developer" to <project_id>@cloudbuild.gserviceaccount.com user https://cloud.google.com/kubernetes-engine/docs/troubleshooting#gke_service_account_deleted
- Google Cloud Build settings http://prntscr.com/m67qut
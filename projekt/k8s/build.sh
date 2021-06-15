#!/bin/sh

minikube addons enable ingress

kubectl apply -f my-app-namespace.yaml
kubectl apply -f my-app-configmap.yaml

kubectl apply -f my-postgres-secret.yaml
kubectl apply -f my-postgres-pv-local.yaml
kubectl apply -f my-postgres-pvc.yaml

kubectl apply -f my-redis-clusterip.yaml
kubectl apply -f my-postgres-clusterip.yaml
kubectl apply -f my-backend-clusterip.yaml

kubectl apply -f my-redis-deployment.yaml
kubectl apply -f my-postgres-deployment.yaml
kubectl apply -f my-backend-deployment.yaml

kubectl apply -f my-frontend-clusterip.yaml
kubectl apply -f my-frontend-deployment.yaml

kubectl apply -f my-ingress.yaml
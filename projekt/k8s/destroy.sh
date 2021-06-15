#!/bin/sh

kubectl delete ns app
kubectl delete ns ingress-nginx
kubectl delete pv my-postgres-pv-local